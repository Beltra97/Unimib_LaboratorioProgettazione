package com.company.repetitionwebapp.service.dto;

import com.company.repetitionwebapp.domain.Repetition;
import com.company.repetitionwebapp.domain.Student;
import com.company.repetitionwebapp.domain.Subject;
import com.company.repetitionwebapp.domain.Tutor;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

/**
 * A DTO representing a MyRepetitionRS.
 */
public class MyRepetitionStudentRS {
    private Long id;

    private Tutor tutor;

    private Subject subject;

    private String topic;

    private Integer duration;

    private Instant dateRepetition;

    private Boolean isAlreadyBooked;

    public MyRepetitionStudentRS() {
        // Empty constructor needed for Jackson.
    }

    public MyRepetitionStudentRS(Repetition repetition) {
        this.id = repetition.getId();
        this.tutor = repetition.getTutor();
        this.subject = repetition.getSubject();
        this.topic = repetition.getTopic();
        this.duration = repetition.getDuration();
        this.dateRepetition = repetition.getDateRepetition();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Tutor getTutor() {
        return tutor;
    }

    public void setTutor(Tutor tutor) {
        this.tutor = tutor;
    }

    public Subject getSubject() {
        return subject;
    }

    public void setSubject(Subject subject) {
        this.subject = subject;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public Instant getDateRepetition() {
        return dateRepetition;
    }

    public void setDateRepetition(Instant dateRepetition) {
        this.dateRepetition = dateRepetition;
    }

    public Boolean getIsAlreadyBooked() {
        return isAlreadyBooked;
    }

    public void setIsAlreadyBooked(Boolean isAlreadyBooked) {
        this.isAlreadyBooked = isAlreadyBooked;
    }
}
