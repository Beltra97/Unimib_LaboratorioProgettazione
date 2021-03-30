package com.company.repetitionwebapp.service;

import com.company.repetitionwebapp.domain.Repetition;
import com.company.repetitionwebapp.domain.Tutor;
import com.company.repetitionwebapp.repository.RepetitionRepository;
import com.company.repetitionwebapp.repository.TutorRepository;
import com.company.repetitionwebapp.repository.UserRepository;
import com.company.repetitionwebapp.security.SecurityUtils;
import com.company.repetitionwebapp.service.dto.RepetitionDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.*;
import java.util.concurrent.atomic.AtomicReference;

/**
 * Service class for managing users.
 */
@Service
@Transactional
public class RepetitionService {
    private final Logger log = LoggerFactory.getLogger(RepetitionService.class);

    private final RepetitionRepository repetitionRepository;
    private final TutorRepository tutorRepository;
    private final UserRepository userRepository;

    private final CacheManager cacheManager;

    public RepetitionService(
        RepetitionRepository repetitionRepository,
        TutorRepository tutorRepository,
        UserRepository userRepository,
        CacheManager cacheManager
    ) {
        this.repetitionRepository = repetitionRepository;
        this.tutorRepository = tutorRepository;
        this.userRepository = userRepository;
        this.cacheManager = cacheManager;
    }

    public List<Repetition> getMyRepetitions() {

        List<Repetition> myRepetitions = new ArrayList<Repetition>();

        SecurityUtils
            .getCurrentUserLogin()
            .flatMap(userRepository::findOneByLogin)
            .ifPresent(
                user -> {
                    Tutor tutor = null;
                    for(Tutor t : tutorRepository.findAll()){
                        if(t.getUser() != null && t.getUser().getId() == user.getId())
                            tutor = t;
                    }

                    if(tutor != null) {
                        for(Repetition r : repetitionRepository.findAll()){
                            if(r.getTutor() != null && r.getTutor().getId() == tutor.getId() && r.getDateDeleted() == null)
                                myRepetitions.add(r);
                        }
                    }
                }
            );
        return myRepetitions;
    }

    public Repetition postRepetition(RepetitionDTO repetitionDTO) {

        AtomicReference<Repetition> result = new AtomicReference<>(new Repetition());

        SecurityUtils
            .getCurrentUserLogin()
            .flatMap(userRepository::findOneByLogin)
            .ifPresent(
                user -> {
                    Tutor tutor = null;
                    List<Tutor> tutors = tutorRepository.findAll();
                    for(Tutor t : tutors){
                        if(t.getUser().getId() == user.getId())
                            tutor = t;
                    }

                    if(tutor != null) {
                        Repetition newRepetition = new Repetition();
                        newRepetition.setTutor(tutor);
                        newRepetition.setDateRepetition(repetitionDTO.getDateRepetition());
                        newRepetition.setDateCreated(Instant.now());
                        newRepetition.setDateModified(Instant.now());
                        newRepetition.setDateDeleted(null);
                        repetitionRepository.save(newRepetition);
                        log.debug("Created Information for Repetition: {}", newRepetition);

                        result.set(newRepetition);
                    }
                }
            );
        return result.get();
    }

    public void setDateDeleted(long id) {

        repetitionRepository.findById(id)
        .ifPresent(
            repetition -> {
                repetition.setDateDeleted(Instant.now());
            }
        );
    }
}
