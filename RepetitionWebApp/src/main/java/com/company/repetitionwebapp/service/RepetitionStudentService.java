package com.company.repetitionwebapp.service;

import com.company.repetitionwebapp.domain.*;
import com.company.repetitionwebapp.repository.RepetitionRepository;
import com.company.repetitionwebapp.repository.RepetitionStudentRepository;
import com.company.repetitionwebapp.service.dto.MyRepetitionRS;
import com.company.repetitionwebapp.service.dto.MyRepetitionStudentRS;
import com.company.repetitionwebapp.service.dto.HistoryRepetitionStudentRS;
import com.company.repetitionwebapp.service.dto.RepetitionStudentDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

    Clock cl = Clock.systemUTC();

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

    // get the current repetitions student (repetition date is after now instant)
    public List<MyRepetitionStudentRS> getMyRepetitions() {

        List<MyRepetitionStudentRS> myRepetitions = new ArrayList<MyRepetitionStudentRS>();

        // get only the logged student
        Student student = studentService.getStudentByUser();

        if(student != null) {
            // create the list of future repetitions for the logged student
            repetitionRepository.findAll().stream().filter(r -> r.getDateDeleted() == null).forEach(
                repetition -> {

                    // get only repetions student that have the repetition ID equal to at least one present in the repetitions set
                    List<RepetitionStudent> students = new ArrayList<RepetitionStudent>();
                    for(RepetitionStudent s : repetitionStudentRepository.findAll()){
                        if(s.getRepetition() != null && s.getRepetition().getId().equals(repetition.getId()) && s.getDateDeleted() == null){
                            students.add(s);
                        }
                    }

                    // get only future repetions
                    if(((students.stream().filter(s -> s.getStudent().equals(student)).count() == 1)
                        || (long) students.size() < repetition.getnPartecipants()) && (Instant.now(cl).isBefore(repetition.getDateRepetition()))){

                        MyRepetitionStudentRS myRepetitionRS = new MyRepetitionStudentRS(repetition);
                        myRepetitionRS.setIsFree(false);
                        myRepetitionRS.setIsAlreadyBooked(false);

                        if(students.stream().anyMatch(s ->
                            s.getStudent() != null && s.getStudent().getId().equals(student.getId()))) {
                            myRepetitionRS.setIsAlreadyBooked(true);
                        }
                        else if((long) students.size() == 0){
                            myRepetitionRS.setIsFree(true);
                        }

                        myRepetitions.add(myRepetitionRS);
                    }
                }
            );
        }
        return myRepetitions;
    }

    // get the past repetitions student (repetition date is before now instant)
    public List<HistoryRepetitionStudentRS> getHistoryRepetitions() {

        List<HistoryRepetitionStudentRS> historyRepetitions = new ArrayList<HistoryRepetitionStudentRS>();

        // get only the logged student
        Student student = studentService.getStudentByUser();

        // get only repetions student that have the repetition ID equal to at least one present in the repetitions set
        for(RepetitionStudent s : repetitionStudentRepository.findAll()){
            if(student != null && s.getDateDeleted() == null) {
                repetitionRepository.findAll().stream().filter(r ->
                    s.getRepetition().getId().equals(r.getId()) && s.getStudent().getId().equals(student.getId()) && r.getDateDeleted() == null).forEach(
                    repetition -> {
                        // // get only past repetions
                        if(Instant.now(cl).isAfter(repetition.getDateRepetition())){
                            HistoryRepetitionStudentRS historyRepetitionRS = new HistoryRepetitionStudentRS(repetition);
                            historyRepetitions.add(historyRepetitionRS);
                        }
                    }
                );
            }
        }
        return historyRepetitions;
    }

    // method for book the repetition student
    public RepetitionStudent bookRepetition(RepetitionStudentDTO repetitionStudentDTO) {

        RepetitionStudent newRepetitionStudent = null;

        Optional<Repetition> optionalRepetition = repetitionRepository.findById(repetitionStudentDTO.getId());
        Student student = studentService.getStudentByUser();

        // check for repetition considering that is optional
        if(optionalRepetition.isPresent() && student != null) {

            Repetition repetition = optionalRepetition.get();

            if(repetitionStudentRepository.findAll().stream().noneMatch(s ->
                s.getRepetition() == repetition && s.getDateDeleted() == null)) {
                repetition.setTopic(repetitionStudentDTO.getTopic());
                repetition.setAdditionalNote(repetitionStudentDTO.getAdditionalNote());
            }

            if(repetitionStudentRepository.findAll().stream().noneMatch(s ->
                s.getStudent().getId().equals(student.getId()) &&
                s.getRepetition() == repetition && s.getDateDeleted() != null)) {

                newRepetitionStudent = new RepetitionStudent();
                newRepetitionStudent.setStudent(student);
                newRepetitionStudent.setRepetition(repetition);
                newRepetitionStudent.setDateCreated(Instant.now());
            }
            else{

                newRepetitionStudent = repetitionStudentRepository.findAll().stream().filter(s ->
                        s.getStudent().getId().equals(student.getId()) &&
                        s.getRepetition() == repetition && s.getDateDeleted() != null).findFirst().get();
            }

            // set correct booking changes
            newRepetitionStudent.setDateModified(Instant.now());
            newRepetitionStudent.setDateDeleted(null);
            repetitionStudentRepository.save(newRepetitionStudent);
            log.debug("Updated Information for Repetition: {}", repetition);
            log.debug("Created Information for RepetitionStudent: {}", newRepetitionStudent);

            mailService.sendRepetitionBookingMail(repetition.getTutor().getUser(), student, repetition, true);
        }
        return newRepetitionStudent;
    }

    // method for update the repetition student
    public Repetition updateRepetition(RepetitionStudentDTO repetitionStudentDTO) {

        Repetition repetition = null;
        Optional<Repetition> optionalRepetition = repetitionRepository.findById(repetitionStudentDTO.getId());

        if(optionalRepetition.isPresent()) {

            repetition = optionalRepetition.get();

            repetition.setTopic(repetitionStudentDTO.getTopic());
            repetition.setDateModified(Instant.now());
            repetitionRepository.save(repetition);
            log.debug("Updated Information for Repetition: {}", repetition);
        }
        return repetition;
    }

    // method for set the date of the repetition student
    public void setDateDeleted(long idRepetition) {

        Student student = studentService.getStudentByUser();
        Optional<Repetition> optionalRepetition = repetitionRepository.findById(idRepetition);

        if(optionalRepetition.isPresent() && student != null) {

            Repetition repetition = optionalRepetition.get();

            if(repetitionStudentRepository.findAll().stream().filter(s -> s.getRepetition() == repetition &&
                    s.getDateDeleted() == null).count() == 1) {
                repetition.setTopic("");
                repetition.setAdditionalNote("");
            }

            repetitionStudentRepository.findAll().stream().filter(s ->
                    s.getRepetition() != null && s.getRepetition().getId() == idRepetition &&
                    s.getStudent() != null && s.getStudent().getId().equals(student.getId())).forEach(
                repetitionStudent -> {
                    repetitionStudent.setDateDeleted(Instant.now());
                }
            );

            mailService.sendRepetitionBookingMail(repetition.getTutor().getUser(), student, repetition, false);
        }
    }
}
