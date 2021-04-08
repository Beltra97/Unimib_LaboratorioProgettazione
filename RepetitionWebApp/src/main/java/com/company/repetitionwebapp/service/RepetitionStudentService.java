package com.company.repetitionwebapp.service;

import com.company.repetitionwebapp.domain.*;
import com.company.repetitionwebapp.repository.RepetitionRepository;
import com.company.repetitionwebapp.repository.RepetitionStudentRepository;
import com.company.repetitionwebapp.service.dto.MyRepetitionRS;
import com.company.repetitionwebapp.service.dto.MyRepetitionStudentRS;
import com.company.repetitionwebapp.service.dto.RepetitionStudentDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

/**
 * Service class for managing users.
 */
@Service
@Transactional
public class RepetitionStudentService {
    private final Logger log = LoggerFactory.getLogger(RepetitionStudentService.class);

    private final RepetitionRepository repetitionRepository;
    private final RepetitionStudentRepository repetitionStudentRepository;

    private final StudentService studentService;
    private final MailService mailService;

    private final CacheManager cacheManager;

    public RepetitionStudentService(
        RepetitionRepository repetitionRepository,
        RepetitionStudentRepository repetitionStudentRepository,
        StudentService studentService,
        MailService mailService,
        CacheManager cacheManager
    ) {
        this.repetitionRepository = repetitionRepository;
        this.repetitionStudentRepository = repetitionStudentRepository;
        this.studentService = studentService;
        this.mailService = mailService;
        this.cacheManager = cacheManager;
    }

    public List<MyRepetitionStudentRS> getMyRepetitions() {

        List<MyRepetitionStudentRS> myRepetitions = new ArrayList<MyRepetitionStudentRS>();

        Student student = studentService.getStudentByUser();

        if(student != null) {
            repetitionRepository.findAll().stream().filter(r -> r.getDateDeleted() == null).forEach(
                repetition -> {

                    List<RepetitionStudent> students = new ArrayList<RepetitionStudent>();
                    for(RepetitionStudent s : repetitionStudentRepository.findAll()){
                        if(s.getRepetition() != null && s.getRepetition().getId() == repetition.getId() && s.getDateDeleted() == null){
                            students.add(s);
                        }
                    }

                    if(students.stream().count() == 0) {
                        MyRepetitionStudentRS myRepetitionRS = new MyRepetitionStudentRS(repetition);
                        myRepetitionRS.setIsAlreadyBooked(false);
                        myRepetitions.add(myRepetitionRS);
                    }
                    else if(students.stream().filter(s ->
                        s.getStudent() != null && s.getStudent().getId() == student.getId()).findFirst().isPresent())
                    {
                        MyRepetitionStudentRS myRepetitionRS = new MyRepetitionStudentRS(repetition);
                        myRepetitionRS.setIsAlreadyBooked(true);
                        myRepetitions.add(myRepetitionRS);
                    }
                }
            );
        }
        return myRepetitions;
    }

    public RepetitionStudent bookRepetition(RepetitionStudentDTO repetitionStudentDTO) {

        RepetitionStudent newRepetitionStudent = null;

        Repetition repetition = repetitionRepository.findById(repetitionStudentDTO.getId()).get();
        Student student = studentService.getStudentByUser();

        if(repetition != null && student != null) {

            repetition.setTopic(repetitionStudentDTO.getTopic());

            newRepetitionStudent = new RepetitionStudent();
            newRepetitionStudent.setStudent(student);
            newRepetitionStudent.setRepetition(repetition);
            newRepetitionStudent.setDateCreated(Instant.now());
            newRepetitionStudent.setDateModified(Instant.now());
            newRepetitionStudent.setDateDeleted(null);
            repetitionStudentRepository.save(newRepetitionStudent);
            log.debug("Updated Information for Repetition: {}", repetition);
            log.debug("Created Information for RepetitionStudent: {}", newRepetitionStudent);

            mailService.sendRepetitionBookingMail(repetition.getTutor().getUser(), student, repetition, true);
        }
        return newRepetitionStudent;
    }

    public Repetition updateRepetition(RepetitionStudentDTO repetitionStudentDTO) {

        Repetition repetition = repetitionRepository.findById(repetitionStudentDTO.getId()).get();

        if(repetition != null) {

            repetition.setTopic(repetitionStudentDTO.getTopic());
            repetition.setDateModified(Instant.now());
            repetitionRepository.save(repetition);
            log.debug("Updated Information for Repetition: {}", repetition);
        }
        return repetition;
    }

    public void setDateDeleted(long idRepetition) {

        Student student = studentService.getStudentByUser();

        Repetition repetition = repetitionRepository.findById(idRepetition).get();

        if(repetition != null && repetition != null) {

            repetition.setTopic("");

            repetitionStudentRepository.findAll().stream().filter(s ->
                s.getRepetition() != null && s.getRepetition().getId() == idRepetition &&
                    s.getStudent() != null && s.getStudent().getId() == student.getId()).forEach(
                repetitionStudent -> {
                    repetitionStudent.setDateDeleted(Instant.now());
                }
            );

            mailService.sendRepetitionBookingMail(repetition.getTutor().getUser(), student, repetition, false);
        }
    }
}
