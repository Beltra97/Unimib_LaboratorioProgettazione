package com.company.repetitionwebapp.web.rest;

import com.company.repetitionwebapp.domain.Repetition;
import com.company.repetitionwebapp.repository.RepetitionRepository;
import com.company.repetitionwebapp.service.RepetitionService;
import com.company.repetitionwebapp.service.dto.MyRepetitionRS;
import com.company.repetitionwebapp.service.dto.RepetitionDTO;
import com.company.repetitionwebapp.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

/**
 * REST controller for managing {@link Repetition}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class MyRepetitionResource {
    private final Logger log = LoggerFactory.getLogger(MyRepetitionResource.class);

    private static final String ENTITY_NAME = "repetition";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RepetitionRepository repetitionRepository;
    private final RepetitionService repetitionService;

    public MyRepetitionResource(RepetitionRepository repetitionRepository, RepetitionService repetitionService) {
        this.repetitionRepository = repetitionRepository;
        this.repetitionService = repetitionService;
    }

    /**
     * {@code POST  /my-repetitions} : Create a new repetition.
     *
     * @param repetition the repetition to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new repetition, or with status {@code 400 (Bad Request)} if the repetition has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/my-repetitions")
    public ResponseEntity<Repetition> postRepetition(@Valid @RequestBody RepetitionDTO repetition) throws URISyntaxException {
        log.debug("REST request to save Repetition : {}", repetition);
        if (repetition.getId() != null) {
            throw new BadRequestAlertException("A new repetition cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Repetition result = repetitionService.postRepetition(repetition);
        return ResponseEntity
            .created(new URI("/api/my-repetitions/" + result.getId()))
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
    @PutMapping("/my-repetitions")
    public ResponseEntity<Repetition> updateRepetition(@Valid @RequestBody RepetitionDTO repetition) throws URISyntaxException {
        log.debug("REST request to update Repetition : {}", repetition);
        if (repetition.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Repetition result = repetitionService.updateRepetition(repetition);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, repetition.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /repetitions} : get all the repetitions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of repetitions in body.
     */
    @GetMapping("/my-repetitions")
    public List<MyRepetitionRS> getAllRepetitions() {
        log.debug("REST request to get all Repetitions");
        return repetitionService.getMyRepetitions();
    }

    /**
     * {@code GET  /repetitions/:id} : get the "id" repetition.
     *
     * @param id the id of the repetition to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the repetition, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/my-repetitions/{id}")
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
    @DeleteMapping("/my-repetitions/{id}")
    public ResponseEntity<Void> deleteRepetition(@PathVariable Long id) {
        log.debug("REST request to delete Repetition : {}", id);
        repetitionService.setDateDeleted(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }

    /**
     * {@code GET  /make-repetition-group/:{id} : change into group repetition.
     *
     * @param id the id of the repetition to make groupable.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @GetMapping("/make-repetition-group/{id}")
    public ResponseEntity<Void> makeRepetitionGroup(@PathVariable Long id) {
        log.debug("REST request to make group Repetition : {}", id);
        repetitionService.makeRepetitionGroup(id);
        return ResponseEntity.noContent().headers(madeRepetitionGroupAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    public static HttpHeaders madeRepetitionGroupAlert(String applicationName, boolean enableTranslation, String entityName, String param) {
        String message = enableTranslation
            ? applicationName + "." + entityName + ".madeRepetitionGroup"
            : "A " + entityName + " with identifier " + param + " is became a group repetition.";
        return HeaderUtil.createAlert(applicationName, message, param);
    }
}
