package com.company.repetitionwebapp.web.rest;

import com.company.repetitionwebapp.domain.Repetition;
import com.company.repetitionwebapp.repository.RepetitionRepository;
import com.company.repetitionwebapp.service.RepetitionService;
import com.company.repetitionwebapp.service.dto.MyRepetitionRS;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link Repetition}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class HistoryRepetitionResource {

    private final Logger log = LoggerFactory.getLogger(HistoryRepetitionResource.class);

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RepetitionRepository repetitionRepository;
    private final RepetitionService repetitionService;

    public HistoryRepetitionResource(RepetitionRepository repetitionRepository,
                                     RepetitionService repetitionService) {
        this.repetitionRepository = repetitionRepository;
        this.repetitionService = repetitionService;
    }

    /**
     * {@code GET  /history-repetition} : get all the my historical Repetitions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of Repetition in body.
     */
    @GetMapping("/history-repetition")
    public List<MyRepetitionRS> getAllRepetition() {
        log.debug("REST request to get all RepetitionStudents");
        return repetitionService.getMyRepetitionsHistory();
    }

    /**
     * {@code GET  /history-repetition/:id} : get the "id" RepetitionStudent.
     *
     * @param id the id of the Repetition to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the Repetition, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/history-repetition/{id}")
    public ResponseEntity<Repetition> getRepetition(@PathVariable Long id) {
        log.debug("REST request to get Repetition : {}", id);
        Optional<Repetition> repetition = repetitionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(repetition);
    }
}
