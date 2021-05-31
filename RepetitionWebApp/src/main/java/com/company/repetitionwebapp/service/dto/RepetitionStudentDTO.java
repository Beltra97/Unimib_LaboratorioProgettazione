package com.company.repetitionwebapp.service.dto;

import com.company.repetitionwebapp.domain.Repetition;
import com.company.repetitionwebapp.domain.RepetitionStudent;
import com.company.repetitionwebapp.domain.Subject;

import java.time.Instant;

/**
 * A DTO representing a user, with his authorities.
 */
public class RepetitionStudentDTO {
    private Long id;

    private String topic;

    private String additionalNote;

    public RepetitionStudentDTO() {
        // Empty constructor needed for Jackson.
    }

    public RepetitionStudentDTO(Repetition repetition) {
        this.id = repetition.getId();
        this.topic = repetition.getTopic();
        this.additionalNote = repetition.getAdditionalNote();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
}
