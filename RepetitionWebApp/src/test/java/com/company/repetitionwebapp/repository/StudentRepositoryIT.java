package com.company.repetitionwebapp.repository;

import static org.assertj.core.api.Assertions.assertThat;

import com.company.repetitionwebapp.RepetitionWebApp;
import com.company.repetitionwebapp.domain.Student;
import java.time.Instant;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for studentRepository}.
 */
@SpringBootTest(classes = RepetitionWebApp.class)
@Transactional
public class StudentRepositoryIT {
    @Autowired
    private StudentRepository studentRepository;

    @Test
    public void addStudentEvent() {
        Student student = new Student();
        student.setName("student1");
        student.setSurname("surnames1");
        student.setBirthDate(Instant.now());
        studentRepository.save(student);
        long id = student.getId();
        assertThat(studentRepository.findById(id).get()).isEqualTo(student);
    }

    @Test
    public void deleteStudentEvent() {
        Student student = new Student();
        student.setName("student1");
        student.setSurname("surnames1");
        student.setBirthDate(Instant.now());
        studentRepository.save(student);
        long id = student.getId();
        assertThat(studentRepository.findById(id)).isNotEmpty();
        studentRepository.deleteById(id);
        assertThat(studentRepository.findById(id)).isEmpty();
    }
}
