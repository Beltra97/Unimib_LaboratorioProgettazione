package com.company.repetitionwebapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * A Repetition.
 */
@Entity
@Table(name = "repetition")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Repetition implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "subject")
    private String subject;

    @NotNull
    @Column(name = "date_repetition", nullable = false)
    private Instant dateRepetition;

    @Column(name = "date_created")
    private Instant dateCreated;

    @Column(name = "date_modified")
    private Instant dateModified = null;

    @Column(name = "date_deleted")
    private Instant dateDeleted = null;

    @ManyToOne
    @JsonIgnoreProperties(value = "repetitions", allowSetters = true)
    private Tutor tutor;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSubject() {
        return subject;
    }

    public Repetition subject(String subject) {
        this.subject = subject;
        return this;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public Instant getDateRepetition() {
        return dateRepetition;
    }

    public Repetition dateRepetition(Instant dateRepetition) {
        this.dateRepetition = dateRepetition;
        return this;
    }

    public void setDateRepetition(Instant dateRepetition) {
        this.dateRepetition = dateRepetition;
    }

    public Instant getDateCreated() {
        return dateCreated;
    }

    public Repetition dateCreated(Instant dateCreated) {
        this.dateCreated = dateCreated;
        return this;
    }

    public void setDateCreated(Instant dateCreated) {
        this.dateCreated = dateCreated;
    }

    public Instant getDateModified() {
        return dateModified;
    }

    public Repetition dateModified(Instant dateModified) {
        this.dateModified = dateModified;
        return this;
    }

    public void setDateModified(Instant dateModified) {
        this.dateModified = dateModified;
    }

    public Instant getDateDeleted() {
        return dateDeleted;
    }

    public Repetition dateDeleted(Instant dateDeleted) {
        this.dateDeleted = dateDeleted;
        return this;
    }

    public void setDateDeleted(Instant dateDeleted) {
        this.dateDeleted = dateDeleted;
    }

    public Tutor getTutor() {
        return tutor;
    }

    public Repetition tutor(Tutor tutor) {
        this.tutor = tutor;
        return this;
    }

    public void setTutor(Tutor tutor) {
        this.tutor = tutor;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Repetition)) {
            return false;
        }
        return id != null && id.equals(((Repetition) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Repetition{" +
            "id=" + getId() +
            ", subject='" + getSubject() + "'" +
            ", dateRepetition='" + getDateRepetition() + "'" +
            ", dateCreated='" + getDateCreated() + "'" +
            ", dateModified='" + getDateModified() + "'" +
            ", dateDeleted='" + getDateDeleted() + "'" +
            "}";
    }
}
