package com.company.repetitionwebapp.web.rest;

import com.company.repetitionwebapp.domain.Tutor;
import com.company.repetitionwebapp.service.TutorService;
import com.company.repetitionwebapp.repository.TutorRepository;
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
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

/**
 * REST controller for managing {@link com.company.repetitionwebapp.domain.Tutor}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class TutorResource {
    private final Logger log = LoggerFactory.getLogger(TutorResource.class);

    private static final String ENTITY_NAME = "tutor";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TutorRepository tutorRepository;
    private final TutorService tutorService;

    public TutorResource(TutorRepository tutorRepository, TutorService tutorService) {
        this.tutorRepository = tutorRepository;
        this.tutorService = tutorService;
    }

    /**
     * {@code POST  /tutors} : Create a new tutor.
     *
     * @param tutor the tutor to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tutor, or with status {@code 400 (Bad Request)} if the tutor has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tutors")
    public ResponseEntity<Tutor> createTutor(@Valid @RequestBody Tutor tutor) throws URISyntaxException {
        log.debug("REST request to save Tutor : {}", tutor);
        if (tutor.getId() != null) {
            throw new BadRequestAlertException("A new tutor cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Tutor result = tutorRepository.save(tutor);
        return ResponseEntity
            .created(new URI("/api/tutors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tutors} : Updates an existing tutor.
     *
     * @param tutor the tutor to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tutor,
     * or with status {@code 400 (Bad Request)} if the tutor is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tutor couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tutors")
    public ResponseEntity<Tutor> updateTutor(@Valid @RequestBody Tutor tutor) throws URISyntaxException {
        log.debug("REST request to update Tutor : {}", tutor);
        if (tutor.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Tutor result = tutorRepository.save(tutor);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tutor.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /tutors} : get all the tutors.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tutors in body.
     */
    @GetMapping("/tutors")
    public List<Tutor> getAllTutors(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Tutors");
        return tutorRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /students-user} : get the student by the logged user.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of students in body.
     */
    @GetMapping("/tutors-user")
    public Tutor getTutorUser() {
        log.debug("REST request to get all Turors");
        return tutorService.getTutorByUser();
    }

    /**
     * {@code GET  /tutors/:id} : get the "id" tutor.
     *
     * @param id the id of the tutor to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tutor, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tutors/{id}")
    public ResponseEntity<Tutor> getTutor(@PathVariable Long id) {
        log.debug("REST request to get Tutor : {}", id);
        Optional<Tutor> tutor = tutorRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(tutor);
    }

    /**
     * {@code DELETE  /tutors/:id} : delete the "id" tutor.
     *
     * @param id the id of the tutor to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tutors/{id}")
    public ResponseEntity<Void> deleteTutor(@PathVariable Long id) {
        log.debug("REST request to delete Tutor : {}", id);
        tutorRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
