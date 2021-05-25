package com.company.repetitionwebapp.web.rest;

import com.company.repetitionwebapp.domain.Repetition;
import com.company.repetitionwebapp.domain.RepetitionStudent;
import com.company.repetitionwebapp.repository.RepetitionRepository;
import com.company.repetitionwebapp.repository.RepetitionStudentRepository;
import com.company.repetitionwebapp.service.RepetitionStudentService;
import com.company.repetitionwebapp.service.dto.MyRepetitionStudentRS;
import com.company.repetitionwebapp.service.dto.RepetitionStudentDTO;
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
public class MyRepetitionStudentResource {

    private final Logger log = LoggerFactory.getLogger(MyRepetitionStudentResource.class);

    private static final String ENTITY_NAME = "myRepetitionStudent";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RepetitionRepository repetitionRepository;
    private final RepetitionStudentRepository repetitionStudentRepository;
    private final RepetitionStudentService repetitionStudentService;

    public MyRepetitionStudentResource(RepetitionRepository repetitionRepository,
                                       RepetitionStudentRepository repetitionStudentRepository,
                                       RepetitionStudentService repetitionStudentService) {
        this.repetitionRepository = repetitionRepository;
        this.repetitionStudentRepository = repetitionStudentRepository;
        this.repetitionStudentService = repetitionStudentService;
    }

    /**
     * {@code POST  /my-repetition-students} : Create a new RepetitionStudent.
     *
     * @param repetitionStudent the RepetitionStudent to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new RepetitionStudent, or with status {@code 400 (Bad Request)} if the RepetitionStudent has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/my-repetition-students")
    public ResponseEntity<RepetitionStudent> bookRepetition(@RequestBody RepetitionStudentDTO repetitionStudent) throws URISyntaxException {
        log.debug("REST request to save RepetitionStudent : {}", repetitionStudent);
        if (repetitionStudent.getId() == null) {
            throw new BadRequestAlertException("A new Repetition need have an ID", ENTITY_NAME, "idexists");
        }
        RepetitionStudent result = repetitionStudentService.bookRepetition(repetitionStudent);
        return ResponseEntity.created(new URI("/api/my-repetition-students/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /my-repetition-students} : Updates an existing RepetitionStudent.
     *
     * @param repetitionStudent the RepetitionStudent to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated RepetitionStudent,
     * or with status {@code 400 (Bad Request)} if the RepetitionStudent is not valid,
     * or with status {@code 500 (Internal Server Error)} if the RepetitionStudent couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/my-repetition-students")
    public ResponseEntity<Repetition> updateRepetitionStudent(@RequestBody RepetitionStudentDTO repetitionStudent) throws URISyntaxException {
        log.debug("REST request to update RepetitionStudent : {}", repetitionStudent);
        if (repetitionStudent.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Repetition result = repetitionStudentService.updateRepetition(repetitionStudent);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, repetitionStudent.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /my-repetition-students} : get all the RepetitionStudents.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of RepetitionStudents in body.
     */
    @GetMapping("/my-repetition-students")
    public List<MyRepetitionStudentRS> getAllRepetitionStudents() {
        log.debug("REST request to get all RepetitionStudents");
        return repetitionStudentService.getMyRepetitions();
    }

    /**
     * {@code GET  /my-repetition-students/:id} : get the "id" RepetitionStudent.
     *
     * @param id the id of the RepetitionStudent to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the RepetitionStudent, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/my-repetition-students/{id}")
    public ResponseEntity<Repetition> getRepetitionStudent(@PathVariable Long id) {
        log.debug("REST request to get Repetition : {}", id);
        Optional<Repetition> repetition = repetitionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(repetition);
    }

    /**
     * {@code DELETE  /my-repetition-students/:id} : delete the "id" RepetitionStudent.
     *
     * @param id the id of the RepetitionStudent to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/my-repetition-students/{id}")
    public ResponseEntity<Void> deleteRepetitionStudent(@PathVariable Long id) {
        log.debug("REST request to delete RepetitionStudent : {}", id);
        repetitionStudentService.setDateDeleted(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
