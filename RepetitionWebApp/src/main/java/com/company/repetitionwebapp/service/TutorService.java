package com.company.repetitionwebapp.service;

import com.company.repetitionwebapp.domain.*;
import com.company.repetitionwebapp.repository.*;
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
public class TutorService {
    private final Logger log = LoggerFactory.getLogger(TutorService.class);

    private final TutorRepository tutorRepository;
    private final UserRepository userRepository;

    private final CacheManager cacheManager;

    public TutorService(
        TutorRepository tutorRepository,
        UserRepository userRepository,
        CacheManager cacheManager
    ) {
        this.tutorRepository = tutorRepository;
        this.userRepository = userRepository;
        this.cacheManager = cacheManager;
    }

    public Tutor getTutorByUser() {

        AtomicReference<Tutor> loggedTutor = new AtomicReference<Tutor>();

        SecurityUtils
            .getCurrentUserLogin()
            .flatMap(userRepository::findOneByLogin)
            .ifPresent(
                user -> {

                    Optional<Tutor> tutor = tutorRepository.findAll().stream().filter(t ->
                        t.getUser() != null && t.getUser().getId() == user.getId()).findFirst();

                    tutor.ifPresent(
                        t -> {
                            loggedTutor.set(t);
                        }
                    );
                }
            );
        return loggedTutor.get();
    }
}
