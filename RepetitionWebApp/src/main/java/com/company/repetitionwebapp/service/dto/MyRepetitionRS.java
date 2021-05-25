package com.company.repetitionwebapp.service.dto;

import com.company.repetitionwebapp.domain.Repetition;
import com.company.repetitionwebapp.domain.Student;
import com.company.repetitionwebapp.domain.Subject;
import java.time.Instant;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

/**
 * A DTO representing a MyRepetitionRS.
 */
public class MyRepetitionRS {
    private Long id;

    private Subject subject;

    private String topic;

    private String additionalNote;

    private Integer duration;

    private Float price;

    private String meetingLink;

    private Instant dateRepetition;

    private List<Student> students = new ArrayList<Student>();

    private Integer nPartecipants;

    public MyRepetitionRS() {
        // Empty constructor needed for Jackson.
    }

    public MyRepetitionRS(Repetition repetition) {
        this.id = repetition.getId();
        this.subject = repetition.getSubject();
        this.topic = repetition.getTopic();
        this.additionalNote = repetition.getAdditionalNote();
        this.duration = repetition.getDuration();
        this.price = repetition.getPrice();
        this.dateRepetition = repetition.getDateRepetition();
        this.nPartecipants = repetition.getnPartecipants();
        this.meetingLink = repetition.getMeetingLink();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public List<Student> getStudents() {
        return (List<Student>) students;
    }

    public void setStudents(List<Student> students) {
        this.students = students;
    }

    public Integer getnPartecipants() {
        return nPartecipants;
    }

    public void setnPartecipants(Integer nPartecipants) {
        this.nPartecipants = nPartecipants;
    }

    public String getMeetingLink() {
        return meetingLink;
    }

    public void setMeetingLink(String meetingLink) {
        this.meetingLink = meetingLink;
    }
}
