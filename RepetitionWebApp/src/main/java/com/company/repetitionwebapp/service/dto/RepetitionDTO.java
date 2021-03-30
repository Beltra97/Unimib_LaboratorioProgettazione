package com.company.repetitionwebapp.service.dto;

import com.company.repetitionwebapp.config.Constants;
import com.company.repetitionwebapp.domain.Authority;
import com.company.repetitionwebapp.domain.Repetition;
import com.company.repetitionwebapp.domain.User;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.time.Instant;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * A DTO representing a user, with his authorities.
 */
public class RepetitionDTO {
    private Long id;

    private Instant dateRepetition;

    public RepetitionDTO() {
        // Empty constructor needed for Jackson.
    }

    public RepetitionDTO(Repetition repetition) {
        this.id = repetition.getId();
        this.dateRepetition = repetition.getDateRepetition();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDateRepetition() {
        return dateRepetition;
    }

    public void setDateRepetition(Instant createdBy) {
        this.dateRepetition = createdBy;
    }
}
