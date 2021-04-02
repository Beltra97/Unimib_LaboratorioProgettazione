package com.company.repetitionwebapp.service;

import com.company.repetitionwebapp.domain.*;
import com.company.repetitionwebapp.repository.*;
import com.company.repetitionwebapp.security.SecurityUtils;
import com.company.repetitionwebapp.service.dto.MyRepetitionRS;
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
    private final SubjectRepository subjectRepository;
    private final RepetitionStudentRepository repetitionStudentRepository;

    private final CacheManager cacheManager;

    public RepetitionService(
        RepetitionRepository repetitionRepository,
        TutorRepository tutorRepository,
        UserRepository userRepository,
        SubjectRepository subjectRepository,
        RepetitionStudentRepository repetitionStudentRepository,
        CacheManager cacheManager
    ) {
        this.repetitionRepository = repetitionRepository;
        this.tutorRepository = tutorRepository;
        this.userRepository = userRepository;
        this.subjectRepository = subjectRepository;
        this.repetitionStudentRepository = repetitionStudentRepository;
        this.cacheManager = cacheManager;
    }

    public List<MyRepetitionRS> getMyRepetitions() {

        List<MyRepetitionRS> myRepetitions = new ArrayList<MyRepetitionRS>();

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
                            {
                                List<Student> students = new ArrayList<Student>();
                                for(RepetitionStudent s : repetitionStudentRepository.findAll()){
                                    if(s.getRepetition() != null && s.getRepetition().getId() == r.getId()){
                                        students.add(s.getStudent());
                                    }
                                }

                                MyRepetitionRS myRepetitionRS = new MyRepetitionRS(r);
                                myRepetitionRS.setStudents(students);
                                myRepetitions.add(myRepetitionRS);
                            }
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

                    Subject subject = subjectRepository.findById(repetitionDTO.getSubject().getId()).get();

                    if(tutor != null && subject != null) {

                        Repetition newRepetition = new Repetition();
                        newRepetition.setTutor(tutor);
                        newRepetition.setSubject(subject);
                        newRepetition.setDuration(repetitionDTO.getDuration());
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

    public Repetition updateRepetition(RepetitionDTO repetitionDTO) {

        AtomicReference<Repetition> result = new AtomicReference<>(new Repetition());

        Subject subject = subjectRepository.findById(repetitionDTO.getSubject().getId()).get();
        Repetition repetition = repetitionRepository.findById(repetitionDTO.getId()).get();

        if(repetition != null && subject != null) {

            repetition.setSubject(subject);
            repetition.setDuration(repetitionDTO.getDuration());
            repetition.setDateRepetition(repetitionDTO.getDateRepetition());
            repetition.setDateModified(Instant.now());
            repetitionRepository.save(repetition);
            log.debug("Updated Information for Repetition: {}", repetition);
            result.set(repetition);
        }
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
