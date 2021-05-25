package com.company.repetitionwebapp.service.dto;

import com.company.repetitionwebapp.config.Constants;
import com.company.repetitionwebapp.domain.Authority;
import com.company.repetitionwebapp.domain.Repetition;
import com.company.repetitionwebapp.domain.Subject;
import com.company.repetitionwebapp.domain.User;
import java.time.Instant;
import java.util.Set;
import java.util.stream.Collectors;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

/**
 * A DTO representing a user, with his authorities.
 */
public class RepetitionDTO {
    private Long id;

    private Subject subject;

    private Integer duration;

    private Instant dateRepetition;

    private Float price;

    public RepetitionDTO() {
        // Empty constructor needed for Jackson.
    }

    public RepetitionDTO(Repetition repetition) {
        this.id = repetition.getId();
        this.subject = repetition.getSubject();
        this.dateRepetition = repetition.getDateRepetition();
        this.duration = repetition.getDuration();
        this.price = repetition.getPrice();
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

    public Instant getDateRepetition() {
        return dateRepetition;
    }

    public void setDateRepetition(Instant dateRepetition) {
        this.dateRepetition = dateRepetition;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }
}
