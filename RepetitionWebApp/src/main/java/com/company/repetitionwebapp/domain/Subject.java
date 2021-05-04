package com.company.repetitionwebapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Subject.
 */
@Entity
@Table(name = "subject")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Subject implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "description", nullable = false)
    private String description;

    @NotNull
    @Size(max = 1024)
    @Column(name = "image_url", length = 1024, nullable = false)
    private String imageUrl;

    @Column(name = "date_created")
    private Instant dateCreated;

    @Column(name = "date_modified")
    private Instant dateModified;

    @Column(name = "date_deleted")
    private Instant dateDeleted;

    @OneToMany(mappedBy = "subject")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Repetition> repetitions = new HashSet<>();

    @OneToMany(mappedBy = "subject")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Topic> topics = new HashSet<>();

    @ManyToMany(mappedBy = "subjects")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnore
    private Set<Tutor> tutors = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Subject name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Subject description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public Subject imageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
        return this;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Instant getDateCreated() {
        return dateCreated;
    }

    public Subject dateCreated(Instant dateCreated) {
        this.dateCreated = dateCreated;
        return this;
    }

    public void setDateCreated(Instant dateCreated) {
        this.dateCreated = dateCreated;
    }

    public Instant getDateModified() {
        return dateModified;
    }

    public Subject dateModified(Instant dateModified) {
        this.dateModified = dateModified;
        return this;
    }

    public void setDateModified(Instant dateModified) {
        this.dateModified = dateModified;
    }

    public Instant getDateDeleted() {
        return dateDeleted;
    }

    public Subject dateDeleted(Instant dateDeleted) {
        this.dateDeleted = dateDeleted;
        return this;
    }

    public void setDateDeleted(Instant dateDeleted) {
        this.dateDeleted = dateDeleted;
    }

    public Set<Repetition> getRepetitions() {
        return repetitions;
    }

    public Subject repetitions(Set<Repetition> repetitions) {
        this.repetitions = repetitions;
        return this;
    }

    public Subject addRepetition(Repetition repetition) {
        this.repetitions.add(repetition);
        repetition.setSubject(this);
        return this;
    }

    public Subject removeRepetition(Repetition repetition) {
        this.repetitions.remove(repetition);
        repetition.setSubject(null);
        return this;
    }

    public void setRepetitions(Set<Repetition> repetitions) {
        this.repetitions = repetitions;
    }

    public Set<Topic> getTopics() {
        return topics;
    }

    public Subject topics(Set<Topic> topics) {
        this.topics = topics;
        return this;
    }

    public Subject addTopic(Topic topic) {
        this.topics.add(topic);
        topic.setSubject(this);
        return this;
    }

    public Subject removeTopic(Topic topic) {
        this.topics.remove(topic);
        topic.setSubject(null);
        return this;
    }

    public void setTopics(Set<Topic> topics) {
        this.topics = topics;
    }

    public Set<Tutor> getTutors() {
        return tutors;
    }

    public Subject tutors(Set<Tutor> tutors) {
        this.tutors = tutors;
        return this;
    }

    public Subject addTutor(Tutor tutor) {
        this.tutors.add(tutor);
        tutor.getSubjects().add(this);
        return this;
    }

    public Subject removeTutor(Tutor tutor) {
        this.tutors.remove(tutor);
        tutor.getSubjects().remove(this);
        return this;
    }

    public void setTutors(Set<Tutor> tutors) {
        this.tutors = tutors;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Subject)) {
            return false;
        }
        return id != null && id.equals(((Subject) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Subject{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", imageUrl='" + getImageUrl() + "'" +
            ", dateCreated='" + getDateCreated() + "'" +
            ", dateModified='" + getDateModified() + "'" +
            ", dateDeleted='" + getDateDeleted() + "'" +
            "}";
    }
}
