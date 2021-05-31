package com.company.repetitionwebapp.repository;

import com.company.repetitionwebapp.domain.Tutor;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Tutor entity.
 */
@Repository
public interface TutorRepository extends JpaRepository<Tutor, Long> {
    @Query(
        value = "select distinct tutor from Tutor tutor left join fetch tutor.subjects",
        countQuery = "select count(distinct tutor) from Tutor tutor"
    )
    Page<Tutor> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct tutor from Tutor tutor left join fetch tutor.subjects")
    List<Tutor> findAllWithEagerRelationships();

    @Query("select tutor from Tutor tutor left join fetch tutor.subjects where tutor.id =:id")
    Optional<Tutor> findOneWithEagerRelationships(@Param("id") Long id);
}
