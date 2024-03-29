package com.company.repetitionwebapp.service;

import com.company.repetitionwebapp.config.Constants;
import com.company.repetitionwebapp.domain.Authority;
import com.company.repetitionwebapp.domain.Student;
import com.company.repetitionwebapp.domain.Subject;
import com.company.repetitionwebapp.domain.Tutor;
import com.company.repetitionwebapp.domain.User;
import com.company.repetitionwebapp.repository.AuthorityRepository;
import com.company.repetitionwebapp.repository.StudentRepository;
import com.company.repetitionwebapp.repository.SubjectRepository;
import com.company.repetitionwebapp.repository.TutorRepository;
import com.company.repetitionwebapp.repository.UserRepository;
import com.company.repetitionwebapp.security.AuthoritiesConstants;
import com.company.repetitionwebapp.security.SecurityUtils;
import com.company.repetitionwebapp.service.dto.ManagedUserVM;
import com.company.repetitionwebapp.service.dto.UserDTO;
import io.github.jhipster.security.RandomUtil;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.CacheManager;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service class for managing users.
 */
@Service
@Transactional
public class UserService {
    private final Logger log = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;

    private final SubjectRepository subjectRepository;

    private final TutorRepository tutorRepository;

    private final StudentRepository studentRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthorityRepository authorityRepository;

    private final CacheManager cacheManager;

    public UserService(
        UserRepository userRepository,
        StudentRepository studentRepository,
        TutorRepository tutorRepository,
        PasswordEncoder passwordEncoder,
        AuthorityRepository authorityRepository,
        SubjectRepository subjectRepository,
        CacheManager cacheManager
    ) {
        this.userRepository = userRepository;
        this.studentRepository = studentRepository;
        this.tutorRepository = tutorRepository;
        this.passwordEncoder = passwordEncoder;
        this.subjectRepository = subjectRepository;
        this.authorityRepository = authorityRepository;
        this.cacheManager = cacheManager;
    }

    // method for activate the user registration 
    public Optional<User> activateRegistration(String key) {
        log.debug("Activating user for activation key {}", key);
        return userRepository
            .findOneByActivationKey(key)
            .map(
                user -> {
                    // activate given user for the registration key.
                    user.setActivated(true);
                    user.setActivationKey(null);
                    this.clearUserCaches(user);
                    log.debug("Activated user: {}", user);
                    return user;
                }
            );
    }

    // method for complete the operation of password reset for user account
    public Optional<User> completePasswordReset(String newPassword, String key) {
        log.debug("Reset user password for reset key {}", key);
        return userRepository
            .findOneByResetKey(key)
            .filter(user -> user.getResetDate().isAfter(Instant.now().minusSeconds(86400)))
            .map(
                user -> {
                    user.setPassword(passwordEncoder.encode(newPassword));
                    user.setResetKey(null);
                    user.setResetDate(null);
                    this.clearUserCaches(user);
                    return user;
                }
            );
    }

    // method for initializate the operation of password reset for user account 
    public Optional<User> requestPasswordReset(String mail) {
        return userRepository
            .findOneByEmailIgnoreCase(mail)
            .filter(User::getActivated)
            .map(
                user -> {
                    user.setResetKey(RandomUtil.generateResetKey());
                    user.setResetDate(Instant.now());
                    this.clearUserCaches(user);
                    return user;
                }
            );
    }

    // method for register a new user
    public User registerUser(ManagedUserVM userDTO, String password) {
        userRepository
            .findOneByLogin(userDTO.getLogin().toLowerCase())
            .ifPresent(
                existingUser -> {
                    boolean removed = removeNonActivatedUser(existingUser);
                    if (!removed) {
                        throw new UsernameAlreadyUsedException();
                    }
                }
            );
        userRepository
            .findOneByEmailIgnoreCase(userDTO.getEmail())
            .ifPresent(
                existingUser -> {
                    boolean removed = removeNonActivatedUser(existingUser);
                    if (!removed) {
                        throw new EmailAlreadyUsedException();
                    }
                }
            );
        User newUser = new User();
        String encryptedPassword = passwordEncoder.encode(password);
        newUser.setLogin(userDTO.getLogin().toLowerCase());
        // new user gets initially a generated password
        newUser.setPassword(encryptedPassword);
        newUser.setFirstName(userDTO.getFirstName());
        newUser.setLastName(userDTO.getLastName());
        if (userDTO.getEmail() != null) {
            newUser.setEmail(userDTO.getEmail().toLowerCase());
        }
        newUser.setImageUrl(userDTO.getImageUrl());
        newUser.setLangKey(userDTO.getLangKey());
        // new user is not active
        newUser.setActivated(false);
        // new user gets registration key
        newUser.setActivationKey(RandomUtil.generateActivationKey());
        Set<Authority> authorities = new HashSet<>();
        authorityRepository.findById(AuthoritiesConstants.USER).ifPresent(authorities::add);

        // check if the new user is a student or a tutor
        if (userDTO.getIsStudent()) {
            Student newStudent = new Student();
            newStudent.setName(userDTO.getFirstName());
            newStudent.setSurname(userDTO.getLastName());
            newStudent.setUser(newUser);
            newStudent.setDateCreated(Instant.now());
            newStudent.setBirthDate(userDTO.getBirthdate().toInstant());
            studentRepository.save(newStudent);
            authorityRepository.findById(AuthoritiesConstants.STUDENT).ifPresent(authorities::add);
        } else {
            Tutor newTutor = new Tutor();
            newTutor.setDateCreated(Instant.now());
            newTutor.setDegree(userDTO.getDegree());
            newTutor.setName(userDTO.getFirstName());
            newTutor.setSurname(userDTO.getLastName());
            newTutor.setSubjects(returnSubjects(userDTO.getSubject()));
            newTutor.setBirthDate(userDTO.getBirthdate().toInstant());
            newTutor.setUser(newUser);
            tutorRepository.save(newTutor);
            authorityRepository.findById(AuthoritiesConstants.TUTOR).ifPresent(authorities::add);
        }
        newUser.setAuthorities(authorities);
        userRepository.save(newUser);
        this.clearUserCaches(newUser);
        log.debug("Created Information for User: {}", newUser);
        return newUser;
    }

    // method for remove the user that hasn't activate the account
    private boolean removeNonActivatedUser(User existingUser) {
        if (existingUser.getActivated()) {
            return false;
        }
        tutorRepository
            .findAll()
            .stream()
            .filter(t -> t.getUser() != null && t.getUser().getId() == existingUser.getId())
            .findFirst()
            .ifPresent(
                t -> {
                    tutorRepository.delete(t);
                }
            );

        studentRepository
            .findAll()
            .stream()
            .filter(s -> s.getUser() != null && s.getUser().getId() == existingUser.getId())
            .findFirst()
            .ifPresent(
                s -> {
                    studentRepository.delete(s);
                }
            );

        userRepository.delete(existingUser);
        userRepository.flush();
        this.clearUserCaches(existingUser);
        return true;
    }

    // method for create a new user
    public User createUser(UserDTO userDTO) {
        User user = new User();
        user.setLogin(userDTO.getLogin().toLowerCase());
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        if (userDTO.getEmail() != null) {
            user.setEmail(userDTO.getEmail().toLowerCase());
        }
        user.setImageUrl(userDTO.getImageUrl());
        if (userDTO.getLangKey() == null) {
            user.setLangKey(Constants.DEFAULT_LANGUAGE); // default language
        } else {
            user.setLangKey(userDTO.getLangKey());
        }
        String encryptedPassword = passwordEncoder.encode(RandomUtil.generatePassword());
        user.setPassword(encryptedPassword);
        user.setResetKey(RandomUtil.generateResetKey());
        user.setResetDate(Instant.now());
        user.setActivated(true);
        if (userDTO.getAuthorities() != null) {
            Set<Authority> authorities = userDTO
                .getAuthorities()
                .stream()
                .map(authorityRepository::findById)
                .filter(Optional::isPresent)
                .map(Optional::get)
                .collect(Collectors.toSet());
            user.setAuthorities(authorities);
        }
        userRepository.save(user);
        this.clearUserCaches(user);
        log.debug("Created Information for User: {}", user);
        return user;
    }

    /**
     * Update all information for a specific user, and return the modified user.
     *
     * @param userDTO user to update.
     * @return updated user.
     */
    public Optional<UserDTO> updateUser(UserDTO userDTO) {
        return Optional
            .of(userRepository.findById(userDTO.getId()))
            .filter(Optional::isPresent)
            .map(Optional::get)
            .map(
                user -> {
                    this.clearUserCaches(user);
                    user.setLogin(userDTO.getLogin().toLowerCase());
                    user.setFirstName(userDTO.getFirstName());
                    user.setLastName(userDTO.getLastName());
                    if (userDTO.getEmail() != null) {
                        user.setEmail(userDTO.getEmail().toLowerCase());
                    }
                    user.setImageUrl(userDTO.getImageUrl());
                    user.setActivated(userDTO.isActivated());
                    user.setLangKey(userDTO.getLangKey());
                    Set<Authority> managedAuthorities = user.getAuthorities();
                    managedAuthorities.clear();
                    userDTO
                        .getAuthorities()
                        .stream()
                        .map(authorityRepository::findById)
                        .filter(Optional::isPresent)
                        .map(Optional::get)
                        .forEach(managedAuthorities::add);
                    this.clearUserCaches(user);
                    log.debug("Changed Information for User: {}", user);
                    return user;
                }
            )
            .map(UserDTO::new);
    }

    // method for delete a user
    public void deleteUser(String login) {
        userRepository
            .findOneByLogin(login)
            .ifPresent(
                user -> {
                    userRepository.delete(user);
                    this.clearUserCaches(user);
                    log.debug("Deleted User: {}", user);
                }
            );
    }

    /**
     * Update basic information (first name, last name, email, language) for the
     * current user.
     *
     * @param firstName first name of user.
     * @param lastName  last name of user.
     * @param email     email id of user.
     * @param langKey   language key.
     * @param imageUrl  image URL of user.
     */
    public void updateUser(String firstName, String lastName, String email, String langKey, String imageUrl) {
        SecurityUtils
            .getCurrentUserLogin()
            .flatMap(userRepository::findOneByLogin)
            .ifPresent(
                user -> {
                    user.setFirstName(firstName);
                    user.setLastName(lastName);
                    if (email != null) {
                        user.setEmail(email.toLowerCase());
                    }
                    user.setLangKey(langKey);
                    user.setImageUrl(imageUrl);
                    this.clearUserCaches(user);
                    log.debug("Changed Information for User: {}", user);
                }
            );
    }

    // method for change the password of user account
    @Transactional
    public void changePassword(String currentClearTextPassword, String newPassword) {
        SecurityUtils
            .getCurrentUserLogin()
            .flatMap(userRepository::findOneByLogin)
            .ifPresent(
                user -> {
                    String currentEncryptedPassword = user.getPassword();
                    if (!passwordEncoder.matches(currentClearTextPassword, currentEncryptedPassword)) {
                        throw new InvalidPasswordException();
                    }
                    String encryptedPassword = passwordEncoder.encode(newPassword);
                    user.setPassword(encryptedPassword);
                    this.clearUserCaches(user);
                    log.debug("Changed password for User: {}", user);
                }
            );
    }

    @Transactional(readOnly = true)
    public Page<UserDTO> getAllManagedUsers(Pageable pageable) {
        return userRepository.findAllByLoginNot(pageable, Constants.ANONYMOUS_USER).map(UserDTO::new);
    }

    @Transactional(readOnly = true)
    public Optional<User> getUserWithAuthoritiesByLogin(String login) {
        return userRepository.findOneWithAuthoritiesByLogin(login);
    }

    @Transactional(readOnly = true)
    public Optional<User> getUserWithAuthorities() {
        return SecurityUtils.getCurrentUserLogin().flatMap(userRepository::findOneWithAuthoritiesByLogin);
    }

    /**
     * Not activated users should be automatically deleted after 3 days.
     * <p>
     * This is scheduled to get fired everyday, at 01:00 (am).
     */
    @Scheduled(cron = "0 0 1 * * ?")
    public void removeNotActivatedUsers() {
        userRepository
            .findAllByActivatedIsFalseAndActivationKeyIsNotNullAndCreatedDateBefore(Instant.now().minus(3, ChronoUnit.DAYS))
            .forEach(
                user -> {
                    log.debug("Deleting not activated user {}", user.getLogin());
                    userRepository.delete(user);
                    this.clearUserCaches(user);
                }
            );
    }

    /**
     * Gets a list of all the authorities.
     *
     * @return a list of all the authorities.
     */
    @Transactional(readOnly = true)
    public List<String> getAuthorities() {
        return authorityRepository.findAll().stream().map(Authority::getName).collect(Collectors.toList());
    }

    private void clearUserCaches(User user) {
        Objects.requireNonNull(cacheManager.getCache(UserRepository.USERS_BY_LOGIN_CACHE)).evict(user.getLogin());
        if (user.getEmail() != null) {
            Objects.requireNonNull(cacheManager.getCache(UserRepository.USERS_BY_EMAIL_CACHE)).evict(user.getEmail());
        }
    }

    private Set<Subject> returnSubjects(ArrayList<Number> subjects) {
        Set<Subject> newSubjects = new HashSet<Subject>();

        System.out.println("*************************************************************");
        System.out.println(subjects);
        System.out.println("*************************************************************");

        for (Number id : subjects) newSubjects.add(subjectRepository.findById(id.longValue()).get());

        System.out.println("*************************************************************");
        System.out.println("*************************************************************");

        return newSubjects;
    }
}
