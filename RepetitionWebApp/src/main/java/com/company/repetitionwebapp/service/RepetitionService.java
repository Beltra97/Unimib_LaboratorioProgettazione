package com.company.repetitionwebapp.service;

import com.company.repetitionwebapp.domain.*;
import com.company.repetitionwebapp.repository.*;
import com.company.repetitionwebapp.service.dto.MyRepetitionRS;
import com.company.repetitionwebapp.service.dto.RepetitionDTO;
import java.time.Instant;
import java.util.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service class for managing users.
 */
@Service
@Transactional
public class RepetitionService {
    private final Logger log = LoggerFactory.getLogger(RepetitionService.class);

    private final RepetitionRepository repetitionRepository;
    private final SubjectRepository subjectRepository;
    private final RepetitionStudentRepository repetitionStudentRepository;

    private final TutorService tutorService;
    private final MailService mailService;

    private final CacheManager cacheManager;

    public RepetitionService(
        RepetitionRepository repetitionRepository,
        SubjectRepository subjectRepository,
        RepetitionStudentRepository repetitionStudentRepository,
        TutorService tutorService,
        MailService mailService,
        CacheManager cacheManager
    ) {
        this.repetitionRepository = repetitionRepository;
        this.subjectRepository = subjectRepository;
        this.repetitionStudentRepository = repetitionStudentRepository;
        this.tutorService = tutorService;
        this.mailService = mailService;
        this.cacheManager = cacheManager;
    }

    // get the tutor current repetitions (repetition date is after now instant)
    public List<MyRepetitionRS> getMyRepetitions() {
        List<MyRepetitionRS> myRepetitions = new ArrayList<MyRepetitionRS>();

        // get only the logged tutor
        Tutor tutor = tutorService.getTutorByUser();

        if (tutor != null) {
            // create the list of future repetitions for the logged tutor
            repetitionRepository
                .findAll()
                .stream()
                .filter(
                    r ->
                        r.getTutor() != null &&
                        r.getTutor().getId() == tutor.getId() &&
                        r.getDateDeleted() == null &&
                        r.getDateRepetition().compareTo(Instant.now()) > 0
                )
                .forEach(
                    repetition -> {
                        // get only repetions student that have the repetition ID equal to at least one present in the repetitions set
                        List<Student> students = new ArrayList<Student>();
                        for (RepetitionStudent s : repetitionStudentRepository.findAll()) {
                            if (
                                s.getRepetition() != null && s.getRepetition().getId() == repetition.getId() && s.getDateDeleted() == null
                            ) {
                                students.add(s.getStudent());
                            }
                        }

                        MyRepetitionRS myRepetitionRS = new MyRepetitionRS(repetition);
                        myRepetitionRS.setStudents(students);
                        myRepetitions.add(myRepetitionRS);
                    }
                );
        }
        return myRepetitions;
    }

    // get the tutot historical repetitions (repetition date is before now instant)
    public List<MyRepetitionRS> getMyRepetitionsHistory() {
        List<MyRepetitionRS> myRepetitions = new ArrayList<MyRepetitionRS>();

        // get only the logged tutor
        Tutor tutor = tutorService.getTutorByUser();

        if (tutor != null) {
            // create the list of past repetitions for the logged tutor
            repetitionRepository
                .findAll()
                .stream()
                .filter(
                    r ->
                        r.getTutor() != null &&
                        r.getTutor().getId() == tutor.getId() &&
                        r.getDateDeleted() == null &&
                        r.getDateRepetition().compareTo(Instant.now()) < 0 &&
                        r.getDateDeleted() == null
                )
                .forEach(
                    repetition -> {
                        // get only repetions student that have the repetition ID equal to at least one present in the repetitions set
                        List<Student> students = new ArrayList<Student>();
                        for (RepetitionStudent s : repetitionStudentRepository.findAll()) {
                            if (
                                s.getRepetition() != null && s.getRepetition().getId() == repetition.getId() && s.getDateDeleted() == null
                            ) {
                                students.add(s.getStudent());
                            }
                        }

                        MyRepetitionRS myRepetitionRS = new MyRepetitionRS(repetition);
                        myRepetitionRS.setStudents(students);
                        myRepetitions.add(myRepetitionRS);
                    }
                );
        }
        return myRepetitions;
    }

    // method for post the repetition
    public Repetition postRepetition(RepetitionDTO repetitionDTO) {
        Repetition newRepetition = null;

        Tutor tutor = tutorService.getTutorByUser();
        Subject subject = subjectRepository.findById(repetitionDTO.getSubject().getId()).get();

        if (tutor != null && subject != null) {
            newRepetition = new Repetition();
            newRepetition.setTutor(tutor);
            newRepetition.setSubject(subject);
            newRepetition.setDuration(repetitionDTO.getDuration());
            newRepetition.setPrice(repetitionDTO.getPrice());
            newRepetition.setMeetingLink("https://www.experte.com/online-meeting?join=" + generateLink(10));
            newRepetition.setDateRepetition(repetitionDTO.getDateRepetition());
            newRepetition.setDateCreated(Instant.now());
            newRepetition.setDateModified(Instant.now());
            newRepetition.setDateDeleted(null);
            repetitionRepository.save(newRepetition);
            log.debug("Created Information for Repetition: {}", newRepetition);
        }
        return newRepetition;
    }

    // method for genetere the random link for the repetion
    protected String generateLink(int n) {
        String SALTCHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        StringBuilder salt = new StringBuilder();
        Random rnd = new Random();
        while (salt.length() < n) {
            int index = (int) (rnd.nextFloat() * SALTCHARS.length());
            salt.append(SALTCHARS.charAt(index));
        }
        String saltStr = salt.toString();

        return saltStr;
    }

    // method for update the repetition
    public Repetition updateRepetition(RepetitionDTO repetitionDTO) {
        Repetition repetition = repetitionRepository.findById(repetitionDTO.getId()).get();

        Subject subject = subjectRepository.findById(repetitionDTO.getSubject().getId()).get();

        if (repetition != null && subject != null) {
            repetition.setSubject(subject);
            repetition.setDuration(repetitionDTO.getDuration());
            repetition.setPrice(repetitionDTO.getPrice());
            repetition.setDateRepetition(repetitionDTO.getDateRepetition());
            repetition.setDateModified(Instant.now());
            repetitionRepository.save(repetition);
            log.debug("Updated Information for Repetition: {}", repetition);
        }
        return repetition;
    }

    // method for set the date of the repetition
    public void setDateDeleted(long id) {
        repetitionRepository
            .findById(id)
            .ifPresent(
                repetition -> {
                    repetition.setDateDeleted(Instant.now());

                    List<Student> students = new ArrayList<Student>();
                    for (RepetitionStudent s : repetitionStudentRepository.findAll()) {
                        if (s.getRepetition() != null && s.getRepetition().getId() == repetition.getId() && s.getDateDeleted() == null) {
                            students.add(s.getStudent());
                        }
                    }

                    for (Student s : students) {
                        mailService.sendRepetitionDeletedMail(s.getUser(), repetition.getTutor(), repetition);
                    }
                }
            );
    }

    // method for set a repetition as group repetition (4 partecipants)
    public void makeRepetitionGroup(long id) {
        repetitionRepository
            .findById(id)
            .ifPresent(
                repetition -> {
                    repetition.setnPartecipants(4);
                }
            );
    }
}
