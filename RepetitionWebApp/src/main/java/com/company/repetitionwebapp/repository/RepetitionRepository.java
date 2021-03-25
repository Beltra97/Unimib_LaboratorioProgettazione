package com.company.repetitionwebapp.repository;

import com.company.repetitionwebapp.domain.Repetition;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Repetition entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RepetitionRepository extends JpaRepository<Repetition, Long> {
}
