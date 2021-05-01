package com.company.repetitionwebapp.web.rest;

import com.company.repetitionwebapp.domain.RepetitionStudent;
import com.company.repetitionwebapp.repository.RepetitionStudentRepository;
import com.company.repetitionwebapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.company.repetitionwebapp.domain.RepetitionStudent}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class RepetitionStudentResource {

    private final Logger log = LoggerFactory.getLogger(RepetitionStudentResource.class);

    private static final String ENTITY_NAME = "repetitionStudent";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RepetitionStudentRepository repetitionStudentRepository;

    public RepetitionStudentResource(RepetitionStudentRepository repetitionStudentRepository) {
        this.repetitionStudentRepository = repetitionStudentRepository;
    }

    /**
     * {@code POST  /repetition-students} : Create a new repetitionStudent.
     *
     * @param repetitionStudent the repetitionStudent to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new repetitionStudent, or with status {@code 400 (Bad Request)} if the repetitionStudent has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/repetition-students")
    public ResponseEntity<RepetitionStudent> createRepetitionStudent(@RequestBody RepetitionStudent repetitionStudent) throws URISyntaxException {
        log.debug("REST request to save RepetitionStudent : {}", repetitionStudent);
        if (repetitionStudent.getId() != null) {
            throw new BadRequestAlertException("A new repetitionStudent cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RepetitionStudent result = repetitionStudentRepository.save(repetitionStudent);
        return ResponseEntity.created(new URI("/api/repetition-students/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /repetition-students} : Updates an existing repetitionStudent.
     *
     * @param repetitionStudent the repetitionStudent to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated repetitionStudent,
     * or with status {@code 400 (Bad Request)} if the repetitionStudent is not valid,
     * or with status {@code 500 (Internal Server Error)} if the repetitionStudent couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/repetition-students")
    public ResponseEntity<RepetitionStudent> updateRepetitionStudent(@RequestBody RepetitionStudent repetitionStudent) throws URISyntaxException {
        log.debug("REST request to update RepetitionStudent : {}", repetitionStudent);
        if (repetitionStudent.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RepetitionStudent result = repetitionStudentRepository.save(repetitionStudent);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, repetitionStudent.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /repetition-students} : get all the repetitionStudents.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of repetitionStudents in body.
     */
    @GetMapping("/repetition-students")
    public List<RepetitionStudent> getAllRepetitionStudents() {
        log.debug("REST request to get all RepetitionStudents");
        return repetitionStudentRepository.findAll();
    }

    /**
     * {@code GET  /repetition-students/:id} : get the "id" repetitionStudent.
     *
     * @param id the id of the repetitionStudent to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the repetitionStudent, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/repetition-students/{id}")
    public ResponseEntity<RepetitionStudent> getRepetitionStudent(@PathVariable Long id) {
        log.debug("REST request to get RepetitionStudent : {}", id);
        Optional<RepetitionStudent> repetitionStudent = repetitionStudentRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(repetitionStudent);
    }

    /**
     * {@code DELETE  /repetition-students/:id} : delete the "id" repetitionStudent.
     *
     * @param id the id of the repetitionStudent to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/repetition-students/{id}")
    public ResponseEntity<Void> deleteRepetitionStudent(@PathVariable Long id) {
        log.debug("REST request to delete RepetitionStudent : {}", id);
        repetitionStudentRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
