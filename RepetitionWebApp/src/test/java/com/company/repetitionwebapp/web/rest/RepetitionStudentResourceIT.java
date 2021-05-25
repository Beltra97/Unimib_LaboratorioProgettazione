package com.company.repetitionwebapp.web.rest;

import com.company.repetitionwebapp.RepetitionWebApp;
import com.company.repetitionwebapp.domain.RepetitionStudent;
import com.company.repetitionwebapp.repository.RepetitionStudentRepository;

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

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link RepetitionStudentResource} REST controller.
 */
@SpringBootTest(classes = RepetitionWebApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class RepetitionStudentResourceIT {

    private static final Instant DEFAULT_DATE_CREATED = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_CREATED = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_DATE_MODIFIED = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_MODIFIED = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_DATE_DELETED = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_DELETED = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private RepetitionStudentRepository repetitionStudentRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restRepetitionStudentMockMvc;

    private RepetitionStudent repetitionStudent;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RepetitionStudent createEntity(EntityManager em) {
        RepetitionStudent repetitionStudent = new RepetitionStudent()
            .dateCreated(DEFAULT_DATE_CREATED)
            .dateModified(DEFAULT_DATE_MODIFIED)
            .dateDeleted(DEFAULT_DATE_DELETED);
        return repetitionStudent;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RepetitionStudent createUpdatedEntity(EntityManager em) {
        RepetitionStudent repetitionStudent = new RepetitionStudent()
            .dateCreated(UPDATED_DATE_CREATED)
            .dateModified(UPDATED_DATE_MODIFIED)
            .dateDeleted(UPDATED_DATE_DELETED);
        return repetitionStudent;
    }

    @BeforeEach
    public void initTest() {
        repetitionStudent = createEntity(em);
    }

    @Test
    @Transactional
    public void createRepetitionStudent() throws Exception {
        int databaseSizeBeforeCreate = repetitionStudentRepository.findAll().size();
        // Create the RepetitionStudent
        restRepetitionStudentMockMvc.perform(post("/api/repetition-students")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(repetitionStudent)))
            .andExpect(status().isCreated());

        // Validate the RepetitionStudent in the database
        List<RepetitionStudent> repetitionStudentList = repetitionStudentRepository.findAll();
        assertThat(repetitionStudentList).hasSize(databaseSizeBeforeCreate + 1);
        RepetitionStudent testRepetitionStudent = repetitionStudentList.get(repetitionStudentList.size() - 1);
        assertThat(testRepetitionStudent.getDateCreated()).isEqualTo(DEFAULT_DATE_CREATED);
        assertThat(testRepetitionStudent.getDateModified()).isEqualTo(DEFAULT_DATE_MODIFIED);
        assertThat(testRepetitionStudent.getDateDeleted()).isEqualTo(DEFAULT_DATE_DELETED);
    }

    @Test
    @Transactional
    public void createRepetitionStudentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = repetitionStudentRepository.findAll().size();

        // Create the RepetitionStudent with an existing ID
        repetitionStudent.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRepetitionStudentMockMvc.perform(post("/api/repetition-students")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(repetitionStudent)))
            .andExpect(status().isBadRequest());

        // Validate the RepetitionStudent in the database
        List<RepetitionStudent> repetitionStudentList = repetitionStudentRepository.findAll();
        assertThat(repetitionStudentList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllRepetitionStudents() throws Exception {
        // Initialize the database
        repetitionStudentRepository.saveAndFlush(repetitionStudent);

        // Get all the repetitionStudentList
        restRepetitionStudentMockMvc.perform(get("/api/repetition-students?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(repetitionStudent.getId().intValue())))
            .andExpect(jsonPath("$.[*].dateCreated").value(hasItem(DEFAULT_DATE_CREATED.toString())))
            .andExpect(jsonPath("$.[*].dateModified").value(hasItem(DEFAULT_DATE_MODIFIED.toString())))
            .andExpect(jsonPath("$.[*].dateDeleted").value(hasItem(DEFAULT_DATE_DELETED.toString())));
    }
    
    @Test
    @Transactional
    public void getRepetitionStudent() throws Exception {
        // Initialize the database
        repetitionStudentRepository.saveAndFlush(repetitionStudent);

        // Get the repetitionStudent
        restRepetitionStudentMockMvc.perform(get("/api/repetition-students/{id}", repetitionStudent.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(repetitionStudent.getId().intValue()))
            .andExpect(jsonPath("$.dateCreated").value(DEFAULT_DATE_CREATED.toString()))
            .andExpect(jsonPath("$.dateModified").value(DEFAULT_DATE_MODIFIED.toString()))
            .andExpect(jsonPath("$.dateDeleted").value(DEFAULT_DATE_DELETED.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingRepetitionStudent() throws Exception {
        // Get the repetitionStudent
        restRepetitionStudentMockMvc.perform(get("/api/repetition-students/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRepetitionStudent() throws Exception {
        // Initialize the database
        repetitionStudentRepository.saveAndFlush(repetitionStudent);

        int databaseSizeBeforeUpdate = repetitionStudentRepository.findAll().size();

        // Update the repetitionStudent
        RepetitionStudent updatedRepetitionStudent = repetitionStudentRepository.findById(repetitionStudent.getId()).get();
        // Disconnect from session so that the updates on updatedRepetitionStudent are not directly saved in db
        em.detach(updatedRepetitionStudent);
        updatedRepetitionStudent
            .dateCreated(UPDATED_DATE_CREATED)
            .dateModified(UPDATED_DATE_MODIFIED)
            .dateDeleted(UPDATED_DATE_DELETED);

        restRepetitionStudentMockMvc.perform(put("/api/repetition-students")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedRepetitionStudent)))
            .andExpect(status().isOk());

        // Validate the RepetitionStudent in the database
        List<RepetitionStudent> repetitionStudentList = repetitionStudentRepository.findAll();
        assertThat(repetitionStudentList).hasSize(databaseSizeBeforeUpdate);
        RepetitionStudent testRepetitionStudent = repetitionStudentList.get(repetitionStudentList.size() - 1);
        assertThat(testRepetitionStudent.getDateCreated()).isEqualTo(UPDATED_DATE_CREATED);
        assertThat(testRepetitionStudent.getDateModified()).isEqualTo(UPDATED_DATE_MODIFIED);
        assertThat(testRepetitionStudent.getDateDeleted()).isEqualTo(UPDATED_DATE_DELETED);
    }

    @Test
    @Transactional
    public void updateNonExistingRepetitionStudent() throws Exception {
        int databaseSizeBeforeUpdate = repetitionStudentRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRepetitionStudentMockMvc.perform(put("/api/repetition-students")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(repetitionStudent)))
            .andExpect(status().isBadRequest());

        // Validate the RepetitionStudent in the database
        List<RepetitionStudent> repetitionStudentList = repetitionStudentRepository.findAll();
        assertThat(repetitionStudentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRepetitionStudent() throws Exception {
        // Initialize the database
        repetitionStudentRepository.saveAndFlush(repetitionStudent);

        int databaseSizeBeforeDelete = repetitionStudentRepository.findAll().size();

        // Delete the repetitionStudent
        restRepetitionStudentMockMvc.perform(delete("/api/repetition-students/{id}", repetitionStudent.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<RepetitionStudent> repetitionStudentList = repetitionStudentRepository.findAll();
        assertThat(repetitionStudentList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
