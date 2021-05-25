package com.company.repetitionwebapp.repository;

import static org.assertj.core.api.Assertions.assertThat;

import com.company.repetitionwebapp.RepetitionWebApp;
import com.company.repetitionwebapp.domain.Tutor;
import java.time.Instant;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for {@link TutorRepository}.
 */
@SpringBootTest(classes = RepetitionWebApp.class)
@Transactional
public class TutorRepositoryIT {
    @Autowired
    private TutorRepository tutorRepository;

    @Test
    public void addTutorEvent() {
        Tutor tutor = new Tutor();
        tutor.setName("name1");
        tutor.setSurname("surname");
        tutor.setBirthDate(Instant.now());
        tutorRepository.save(tutor);
        long id = tutor.getId();
        assertThat(tutorRepository.findById(id).get()).isEqualTo(tutor);
    }

    @Test
    public void deleteTutorEvent() {
        Tutor tutor = new Tutor();
        tutor.setName("name1");
        tutor.setSurname("surname");
        tutor.setBirthDate(Instant.now());
        tutorRepository.save(tutor);
        long id = tutor.getId();
        assertThat(tutorRepository.findById(id)).isNotEmpty();
        tutorRepository.deleteById(id);
        assertThat(tutorRepository.findById(id)).isEmpty();
    }
}
