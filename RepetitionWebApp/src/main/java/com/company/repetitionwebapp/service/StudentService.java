package com.company.repetitionwebapp.service;

import com.company.repetitionwebapp.domain.Student;
import com.company.repetitionwebapp.domain.Tutor;
import com.company.repetitionwebapp.repository.StudentRepository;
import com.company.repetitionwebapp.repository.UserRepository;
import com.company.repetitionwebapp.security.SecurityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.concurrent.atomic.AtomicReference;

/**
 * Service class for managing users.
 */
@Service
@Transactional
public class StudentService {
    private final Logger log = LoggerFactory.getLogger(StudentService.class);

    private final StudentRepository studentRepository;
    private final UserRepository userRepository;

    private final CacheManager cacheManager;

    public StudentService(
        StudentRepository studentRepository,
        UserRepository userRepository,
        CacheManager cacheManager
    ) {
        this.studentRepository = studentRepository;
        this.userRepository = userRepository;
        this.cacheManager = cacheManager;
    }

    public Student getStudentByUser() {

        AtomicReference<Student> loggedStudent = new AtomicReference<Student>();

        SecurityUtils
            .getCurrentUserLogin()
            .flatMap(userRepository::findOneByLogin)
            .ifPresent(
                user -> {

                    Optional<Student> student = studentRepository.findAll().stream().filter(t ->
                        t.getUser() != null && t.getUser().getId() == user.getId()).findFirst();

                    student.ifPresent(
                        s -> {
                            loggedStudent.set(s);
                        }
                    );
                }
            );
        return loggedStudent.get();
    }
}
