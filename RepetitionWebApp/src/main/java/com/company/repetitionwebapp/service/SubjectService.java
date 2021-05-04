package com.company.repetitionwebapp.service;

import com.company.repetitionwebapp.domain.*;
import com.company.repetitionwebapp.repository.RepetitionRepository;
import com.company.repetitionwebapp.repository.RepetitionStudentRepository;
import com.company.repetitionwebapp.repository.SubjectRepository;
import com.company.repetitionwebapp.service.dto.MyRepetitionRS;
import com.company.repetitionwebapp.service.dto.RepetitionDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

/**
 * Service class for managing subjects.
 */
@Service
@Transactional
public class SubjectService {
    private final Logger log = LoggerFactory.getLogger(SubjectService.class);

    private final TutorService tutorService;

    private final CacheManager cacheManager;

    public SubjectService(
        TutorService tutorService,
        CacheManager cacheManager
    ) {
        this.tutorService = tutorService;
        this.cacheManager = cacheManager;
    }

    public List<Subject> getMySubjects() {

        List<Subject> mySubjects = new ArrayList<Subject>();

        Tutor tutor = tutorService.getTutorByUser();

        if(tutor != null) {
            mySubjects.addAll(tutor.getSubjects());
        }
        return mySubjects;
    }
}
