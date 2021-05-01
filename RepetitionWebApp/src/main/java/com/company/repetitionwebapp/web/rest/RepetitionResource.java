package com.company.repetitionwebapp.web.rest;

import com.company.repetitionwebapp.domain.Repetition;
import com.company.repetitionwebapp.repository.RepetitionRepository;
import com.company.repetitionwebapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.company.repetitionwebapp.domain.Repetition}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class RepetitionResource {

    private final Logger log = LoggerFactory.getLogger(RepetitionResource.class);

    private static final String ENTITY_NAME = "repetition";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RepetitionRepository repetitionRepository;

    public RepetitionResource(RepetitionRepository repetitionRepository) {
        this.repetitionRepository = repetitionRepository;
    }

    /**
     * {@code POST  /repetitions} : Create a new repetition.
     *
     * @param repetition the repetition to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new repetition, or with status {@code 400 (Bad Request)} if the repetition has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/repetitions")
    public ResponseEntity<Repetition> createRepetition(@Valid @RequestBody Repetition repetition) throws URISyntaxException {
        log.debug("REST request to save Repetition : {}", repetition);
        if (repetition.getId() != null) {
            throw new BadRequestAlertException("A new repetition cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Repetition result = repetitionRepository.save(repetition);
        return ResponseEntity.created(new URI("/api/repetitions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /repetitions} : Updates an existing repetition.
     *
     * @param repetition the repetition to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated repetition,
     * or with status {@code 400 (Bad Request)} if the repetition is not valid,
     * or with status {@code 500 (Internal Server Error)} if the repetition couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/repetitions")
    public ResponseEntity<Repetition> updateRepetition(@Valid @RequestBody Repetition repetition) throws URISyntaxException {
        log.debug("REST request to update Repetition : {}", repetition);
        if (repetition.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Repetition result = repetitionRepository.save(repetition);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, repetition.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /repetitions} : get all the repetitions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of repetitions in body.
     */
    @GetMapping("/repetitions")
    public List<Repetition> getAllRepetitions() {
        log.debug("REST request to get all Repetitions");
        return repetitionRepository.findAll();
    }

    /**
     * {@code GET  /repetitions/:id} : get the "id" repetition.
     *
     * @param id the id of the repetition to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the repetition, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/repetitions/{id}")
    public ResponseEntity<Repetition> getRepetition(@PathVariable Long id) {
        log.debug("REST request to get Repetition : {}", id);
        Optional<Repetition> repetition = repetitionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(repetition);
    }

    /**
     * {@code DELETE  /repetitions/:id} : delete the "id" repetition.
     *
     * @param id the id of the repetition to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/repetitions/{id}")
    public ResponseEntity<Void> deleteRepetition(@PathVariable Long id) {
        log.debug("REST request to delete Repetition : {}", id);
        repetitionRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
