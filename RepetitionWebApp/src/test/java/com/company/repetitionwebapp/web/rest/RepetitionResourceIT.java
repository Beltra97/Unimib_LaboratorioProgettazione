package com.company.repetitionwebapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.company.repetitionwebapp.RepetitionWebApp;
import com.company.repetitionwebapp.domain.Repetition;
import com.company.repetitionwebapp.repository.RepetitionRepository;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link RepetitionResource} REST controller.
 */
@SpringBootTest(classes = RepetitionWebApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class RepetitionResourceIT {
    private static final String DEFAULT_TOPIC = "AAAAAAAAAA";
    private static final String UPDATED_TOPIC = "BBBBBBBBBB";

    private static final String DEFAULT_ADDITIONAL_NOTE = "AAAAAAAAAA";
    private static final String UPDATED_ADDITIONAL_NOTE = "BBBBBBBBBB";

    private static final Instant DEFAULT_DATE_REPETITION = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_REPETITION = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Integer DEFAULT_N_PARTECIPANTS = 1;
    private static final Integer UPDATED_N_PARTECIPANTS = 2;

    private static final Integer DEFAULT_DURATION = 1;
    private static final Integer UPDATED_DURATION = 2;

    private static final Float DEFAULT_PRICE = 1F;
    private static final Float UPDATED_PRICE = 2F;

    private static final String DEFAULT_MEETING_LINK = "AAAAAAAAAA";

    private static final Instant DEFAULT_DATE_CREATED = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_CREATED = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_DATE_MODIFIED = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_MODIFIED = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_DATE_DELETED = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_DELETED = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private RepetitionRepository repetitionRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restRepetitionMockMvc;

    private Repetition repetition;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Repetition createEntity(EntityManager em) {
        Repetition repetition = new Repetition()
            .topic(DEFAULT_TOPIC)
            .additionalNote(DEFAULT_ADDITIONAL_NOTE)
            .dateRepetition(DEFAULT_DATE_REPETITION)
            .nPartecipants(DEFAULT_N_PARTECIPANTS)
            .duration(DEFAULT_DURATION)
            .price(DEFAULT_PRICE)
            .meetingLink(DEFAULT_MEETING_LINK)
            .dateCreated(DEFAULT_DATE_CREATED)
            .dateModified(DEFAULT_DATE_MODIFIED)
            .dateDeleted(DEFAULT_DATE_DELETED);
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
            .topic(UPDATED_TOPIC)
            .additionalNote(UPDATED_ADDITIONAL_NOTE)
            .dateRepetition(UPDATED_DATE_REPETITION)
            .nPartecipants(UPDATED_N_PARTECIPANTS)
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
    public void createRepetition() throws Exception {
        int databaseSizeBeforeCreate = repetitionRepository.findAll().size();
        // Create the Repetition
        restRepetitionMockMvc
            .perform(
                post("/api/repetitions").contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(repetition))
            )
            .andExpect(status().isCreated());

        // Validate the Repetition in the database
        List<Repetition> repetitionList = repetitionRepository.findAll();
        assertThat(repetitionList).hasSize(databaseSizeBeforeCreate + 1);
        Repetition testRepetition = repetitionList.get(repetitionList.size() - 1);
        assertThat(testRepetition.getTopic()).isEqualTo(DEFAULT_TOPIC);
        assertThat(testRepetition.getAdditionalNote()).isEqualTo(DEFAULT_ADDITIONAL_NOTE);
        assertThat(testRepetition.getDateRepetition()).isEqualTo(DEFAULT_DATE_REPETITION);
        assertThat(testRepetition.getnPartecipants()).isEqualTo(DEFAULT_N_PARTECIPANTS);
        assertThat(testRepetition.getDuration()).isEqualTo(DEFAULT_DURATION);
        assertThat(testRepetition.getPrice()).isEqualTo(DEFAULT_PRICE);
        assertThat(testRepetition.getDateCreated()).isEqualTo(DEFAULT_DATE_CREATED);
        assertThat(testRepetition.getDateModified()).isEqualTo(DEFAULT_DATE_MODIFIED);
        assertThat(testRepetition.getDateDeleted()).isEqualTo(DEFAULT_DATE_DELETED);
    }

    @Test
    @Transactional
    public void createRepetitionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = repetitionRepository.findAll().size();

        // Create the Repetition with an existing ID
        repetition.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRepetitionMockMvc
            .perform(
                post("/api/repetitions").contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(repetition))
            )
            .andExpect(status().isBadRequest());

        // Validate the Repetition in the database
        List<Repetition> repetitionList = repetitionRepository.findAll();
        assertThat(repetitionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDateRepetitionIsRequired() throws Exception {
        int databaseSizeBeforeTest = repetitionRepository.findAll().size();
        // set the field null
        repetition.setDateRepetition(null);

        // Create the Repetition, which fails.

        restRepetitionMockMvc
            .perform(
                post("/api/repetitions").contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(repetition))
            )
            .andExpect(status().isBadRequest());

        List<Repetition> repetitionList = repetitionRepository.findAll();
        assertThat(repetitionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDurationIsRequired() throws Exception {
        int databaseSizeBeforeTest = repetitionRepository.findAll().size();
        // set the field null
        repetition.setDuration(null);

        // Create the Repetition, which fails.

        restRepetitionMockMvc
            .perform(
                post("/api/repetitions").contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(repetition))
            )
            .andExpect(status().isBadRequest());

        List<Repetition> repetitionList = repetitionRepository.findAll();
        assertThat(repetitionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPriceIsRequired() throws Exception {
        int databaseSizeBeforeTest = repetitionRepository.findAll().size();
        // set the field null
        repetition.setPrice(null);

        // Create the Repetition, which fails.

        restRepetitionMockMvc
            .perform(
                post("/api/repetitions").contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(repetition))
            )
            .andExpect(status().isBadRequest());

        List<Repetition> repetitionList = repetitionRepository.findAll();
        assertThat(repetitionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllRepetitions() throws Exception {
        // Initialize the database
        repetitionRepository.saveAndFlush(repetition);

        // Get all the repetitionList
        restRepetitionMockMvc
            .perform(get("/api/repetitions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(repetition.getId().intValue())))
            .andExpect(jsonPath("$.[*].topic").value(hasItem(DEFAULT_TOPIC)))
            .andExpect(jsonPath("$.[*].additionalNote").value(hasItem(DEFAULT_ADDITIONAL_NOTE)))
            .andExpect(jsonPath("$.[*].dateRepetition").value(hasItem(DEFAULT_DATE_REPETITION.toString())))
            .andExpect(jsonPath("$.[*].nPartecipants").value(hasItem(DEFAULT_N_PARTECIPANTS)))
            .andExpect(jsonPath("$.[*].duration").value(hasItem(DEFAULT_DURATION)))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE.doubleValue())))
            .andExpect(jsonPath("$.[*].meetingLink").value(hasItem(DEFAULT_MEETING_LINK)))
            .andExpect(jsonPath("$.[*].dateCreated").value(hasItem(DEFAULT_DATE_CREATED.toString())))
            .andExpect(jsonPath("$.[*].dateModified").value(hasItem(DEFAULT_DATE_MODIFIED.toString())))
            .andExpect(jsonPath("$.[*].dateDeleted").value(hasItem(DEFAULT_DATE_DELETED.toString())));
    }

    @Test
    @Transactional
    public void getRepetition() throws Exception {
        // Initialize the database
        repetitionRepository.saveAndFlush(repetition);

        // Get the repetition
        restRepetitionMockMvc
            .perform(get("/api/repetitions/{id}", repetition.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(repetition.getId().intValue()))
            .andExpect(jsonPath("$.topic").value(DEFAULT_TOPIC))
            .andExpect(jsonPath("$.additionalNote").value(DEFAULT_ADDITIONAL_NOTE))
            .andExpect(jsonPath("$.dateRepetition").value(DEFAULT_DATE_REPETITION.toString()))
            .andExpect(jsonPath("$.nPartecipants").value(DEFAULT_N_PARTECIPANTS))
            .andExpect(jsonPath("$.duration").value(DEFAULT_DURATION))
            .andExpect(jsonPath("$.price").value(DEFAULT_PRICE.doubleValue()))
            .andExpect(jsonPath("$.meetingLink").value(DEFAULT_MEETING_LINK))
            .andExpect(jsonPath("$.dateCreated").value(DEFAULT_DATE_CREATED.toString()))
            .andExpect(jsonPath("$.dateModified").value(DEFAULT_DATE_MODIFIED.toString()))
            .andExpect(jsonPath("$.dateDeleted").value(DEFAULT_DATE_DELETED.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingRepetition() throws Exception {
        // Get the repetition
        restRepetitionMockMvc.perform(get("/api/repetitions/{id}", Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRepetition() throws Exception {
        // Initialize the database
        repetitionRepository.saveAndFlush(repetition);

        int databaseSizeBeforeUpdate = repetitionRepository.findAll().size();

        // Update the repetition
        Repetition updatedRepetition = repetitionRepository.findById(repetition.getId()).get();
        // Disconnect from session so that the updates on updatedRepetition are not directly saved in db
        em.detach(updatedRepetition);
        updatedRepetition
            .topic(UPDATED_TOPIC)
            .additionalNote(UPDATED_ADDITIONAL_NOTE)
            .dateRepetition(UPDATED_DATE_REPETITION)
            .nPartecipants(UPDATED_N_PARTECIPANTS)
            .duration(UPDATED_DURATION)
            .price(UPDATED_PRICE)
            .dateCreated(UPDATED_DATE_CREATED)
            .dateModified(UPDATED_DATE_MODIFIED)
            .dateDeleted(UPDATED_DATE_DELETED);

        restRepetitionMockMvc
            .perform(
                put("/api/repetitions")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedRepetition))
            )
            .andExpect(status().isOk());

        // Validate the Repetition in the database
        List<Repetition> repetitionList = repetitionRepository.findAll();
        assertThat(repetitionList).hasSize(databaseSizeBeforeUpdate);
        Repetition testRepetition = repetitionList.get(repetitionList.size() - 1);
        assertThat(testRepetition.getTopic()).isEqualTo(UPDATED_TOPIC);
        assertThat(testRepetition.getAdditionalNote()).isEqualTo(UPDATED_ADDITIONAL_NOTE);
        assertThat(testRepetition.getDateRepetition()).isEqualTo(UPDATED_DATE_REPETITION);
        assertThat(testRepetition.getnPartecipants()).isEqualTo(UPDATED_N_PARTECIPANTS);
        assertThat(testRepetition.getDuration()).isEqualTo(UPDATED_DURATION);
        assertThat(testRepetition.getPrice()).isEqualTo(UPDATED_PRICE);
        assertThat(testRepetition.getDateCreated()).isEqualTo(UPDATED_DATE_CREATED);
        assertThat(testRepetition.getDateModified()).isEqualTo(UPDATED_DATE_MODIFIED);
        assertThat(testRepetition.getDateDeleted()).isEqualTo(UPDATED_DATE_DELETED);
    }

    @Test
    @Transactional
    public void updateNonExistingRepetition() throws Exception {
        int databaseSizeBeforeUpdate = repetitionRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRepetitionMockMvc
            .perform(put("/api/repetitions").contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(repetition)))
            .andExpect(status().isBadRequest());

        // Validate the Repetition in the database
        List<Repetition> repetitionList = repetitionRepository.findAll();
        assertThat(repetitionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRepetition() throws Exception {
        // Initialize the database
        repetitionRepository.saveAndFlush(repetition);

        int databaseSizeBeforeDelete = repetitionRepository.findAll().size();

        // Delete the repetition
        restRepetitionMockMvc
            .perform(delete("/api/repetitions/{id}", repetition.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Repetition> repetitionList = repetitionRepository.findAll();
        assertThat(repetitionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
