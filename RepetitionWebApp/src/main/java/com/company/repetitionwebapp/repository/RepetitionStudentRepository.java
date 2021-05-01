package com.company.repetitionwebapp.repository;

import com.company.repetitionwebapp.domain.RepetitionStudent;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the RepetitionStudent entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RepetitionStudentRepository extends JpaRepository<RepetitionStudent, Long> {
}
