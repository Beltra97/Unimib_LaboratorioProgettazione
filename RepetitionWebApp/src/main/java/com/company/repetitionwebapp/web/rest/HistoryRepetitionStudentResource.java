package com.company.repetitionwebapp.web.rest;

import com.company.repetitionwebapp.domain.Repetition;
import com.company.repetitionwebapp.domain.RepetitionStudent;
import com.company.repetitionwebapp.repository.RepetitionRepository;
import com.company.repetitionwebapp.repository.RepetitionStudentRepository;
import com.company.repetitionwebapp.service.RepetitionStudentService;
import com.company.repetitionwebapp.service.dto.HistoryRepetitionStudentRS;
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
public class HistoryRepetitionStudentResource {

    private final Logger log = LoggerFactory.getLogger(HistoryRepetitionStudentResource.class);

    private static final String ENTITY_NAME = "historyRepetitionStudent";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RepetitionRepository repetitionRepository;
    private final RepetitionStudentRepository repetitionStudentRepository;
    private final RepetitionStudentService repetitionStudentService;

    public HistoryRepetitionStudentResource(RepetitionRepository repetitionRepository,
                                       RepetitionStudentRepository repetitionStudentRepository,
                                       RepetitionStudentService repetitionStudentService) {
        this.repetitionRepository = repetitionRepository;
        this.repetitionStudentRepository = repetitionStudentRepository;
        this.repetitionStudentService = repetitionStudentService;
    }

    /**
     * {@code GET  /history-repetition-students} : get all the RepetitionStudents.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of RepetitionStudents in body.
     */
    @GetMapping("/history-repetition-students")
    public List<HistoryRepetitionStudentRS> getAllRepetitionStudents() {
        log.debug("REST request to get all RepetitionStudents");
        return repetitionStudentService.getHistoryRepetitions();
    }

    /**
     * {@code GET  /history-repetition-students/:id} : get the "id" RepetitionStudent.
     *
     * @param id the id of the RepetitionStudent to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the RepetitionStudent, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/history-repetition-students/{id}")
    public ResponseEntity<Repetition> getRepetitionStudent(@PathVariable Long id) {
        log.debug("REST request to get Repetition : {}", id);
        Optional<Repetition> repetition = repetitionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(repetition);
    }
}
