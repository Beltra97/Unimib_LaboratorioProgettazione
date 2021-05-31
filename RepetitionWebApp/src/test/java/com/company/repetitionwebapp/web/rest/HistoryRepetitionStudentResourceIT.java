package com.company.repetitionwebapp.web.rest;

import com.company.repetitionwebapp.RepetitionWebApp;
import com.company.repetitionwebapp.domain.*;
import com.company.repetitionwebapp.repository.*;
import com.company.repetitionwebapp.service.dto.RepetitionStudentDTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link RepetitionResource} REST controller.
 */
@SpringBootTest(classes = RepetitionWebApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class HistoryRepetitionStudentResourceIT {

    private static final String DEFAULT_TOPIC = "AAAAAAAAAA";
    private static final String UPDATED_TOPIC = "BBBBBBBBBB";

    private static final Instant DEFAULT_DATE_REPETITION = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_REPETITION = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Integer DEFAULT_DURATION = 120;
    private static final Integer UPDATED_DURATION = 60;

    private static final Float DEFAULT_PRICE = 9.99F;
    private static final Float UPDATED_PRICE = 8.99F;

    private static final Instant DEFAULT_DATE_CREATED = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_CREATED = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_DATE_MODIFIED = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_MODIFIED = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_DATE_DELETED = null;
    private static final Instant UPDATED_DATE_DELETED = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private RepetitionStudentRepository repetitionStudentRepository;

    @Autowired
    private RepetitionRepository repetitionRepository;

    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TutorRepository tutorRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restRepetitionMockMvc;

    private Repetition repetition;

    public HistoryRepetitionStudentResourceIT() {
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */

    public Repetition createEntity(EntityManager em) {

        Optional<User> user = userRepository.findById(Long.valueOf(4));

        Tutor tutor = new Tutor();
        tutor.setName("TUTOR");
        tutor.setSurname("TUTOR");
        tutor.setBirthDate(DEFAULT_DATE_CREATED);
        tutor.setDateCreated(DEFAULT_DATE_CREATED);
        tutor.setDateModified(DEFAULT_DATE_MODIFIED);
        tutor.setUser(user.get());
        tutorRepository.saveAndFlush(tutor);

        Subject subject = new Subject();
        subject.setName("Math");
        subject.setDescription("Math");
        subject.setImageUrl("");
        subjectRepository.saveAndFlush(subject);

        Repetition repetition = new Repetition()
            .tutor(tutor)
            .subject(subject)
            .dateRepetition(DEFAULT_DATE_REPETITION)
            .duration(DEFAULT_DURATION)
            .price(DEFAULT_PRICE)
            .dateCreated(DEFAULT_DATE_CREATED)
            .dateModified(DEFAULT_DATE_MODIFIED)
            .dateDeleted(DEFAULT_DATE_DELETED);
        repetitionRepository.saveAndFlush(repetition);

        return repetition;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Repetition createUpdatedEntity(EntityManager em) {
        Repetition repetition = new Repetition()
            .dateRepetition(UPDATED_DATE_REPETITION)
            .duration(UPDATED_DURATION)
            .price(UPDATED_PRICE)
            .dateCreated(UPDATED_DATE_CREATED)
            .dateModified(UPDATED_DATE_MODIFIED)
            .dateDeleted(UPDATED_DATE_DELETED);
        return repetition;
    }

    @BeforeEach
    public void initTest() {
        repetition = createEntity(em);
    }

    @Test
    @Transactional
    public void getAllRepetitions() throws Exception {
        // Initialize the database

        Optional<User> user = userRepository.findById(Long.valueOf(4));

        Student student = new Student();
        student.setName("STUDENT");
        student.setSurname("STUDENT");
        student.setBirthDate(DEFAULT_DATE_CREATED);
        student.setDateCreated(DEFAULT_DATE_CREATED);
        student.setDateModified(DEFAULT_DATE_MODIFIED);
        student.setUser(user.get());
        studentRepository.saveAndFlush(student);

        // Get all the repetitionList
        restRepetitionMockMvc.perform(get("/api/history-repetition-students"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE));
    }

    @Test
    @Transactional
    public void getRepetition() throws Exception {
        // Initialize the database
        repetitionRepository.saveAndFlush(repetition);

        // Get the repetition
        restRepetitionMockMvc.perform(get("/api/history-repetition-students/{id}", repetition.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE));
    }

    @Test
    @Transactional
    public void getNonExistingRepetition() throws Exception {
        // Get the repetition
        restRepetitionMockMvc.perform(get("/api/history-repetition-students/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

}
