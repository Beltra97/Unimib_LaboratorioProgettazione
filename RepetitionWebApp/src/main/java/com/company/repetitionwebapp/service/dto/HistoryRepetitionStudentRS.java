package com.company.repetitionwebapp.service.dto;

import com.company.repetitionwebapp.domain.Repetition;
import com.company.repetitionwebapp.domain.Student;
import com.company.repetitionwebapp.domain.Subject;
import com.company.repetitionwebapp.domain.Tutor;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

/**
 * A DTO representing a HistoryRepetitionRS.
 */
public class HistoryRepetitionStudentRS {
    private Long id;

    private Tutor tutor;

    private Subject subject;

    private String topic;

    private String additionalNote;

    private Integer duration;

    private Float price;

    private Instant dateRepetition;

    private Boolean isFree;

    private Boolean isAlreadyBooked;

    public HistoryRepetitionStudentRS() {
        // Empty constructor needed for Jackson.
    }

    public HistoryRepetitionStudentRS(Repetition repetition) {
        this.id = repetition.getId();
        this.tutor = repetition.getTutor();
        this.subject = repetition.getSubject();
        this.topic = repetition.getTopic();
        this.additionalNote = repetition.getAdditionalNote();
        this.duration = repetition.getDuration();
        this.price = repetition.getPrice();
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

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public String getAdditionalNote() {
        return additionalNote;
    }

    public void setAdditionalNote(String additionalNote) {
        this.additionalNote = additionalNote;
    }

    public Instant getDateRepetition() {
        return dateRepetition;
    }

    public void setDateRepetition(Instant dateRepetition) {
        this.dateRepetition = dateRepetition;
    }

    public Boolean getIsFree() {
        return isFree;
    }

    public void setIsFree(Boolean isFree) {
        this.isFree = isFree;
    }

    public Boolean getIsAlreadyBooked() {
        return isAlreadyBooked;
    }

    public void setIsAlreadyBooked(Boolean isAlreadyBooked) {
        this.isAlreadyBooked = isAlreadyBooked;
    }
}
