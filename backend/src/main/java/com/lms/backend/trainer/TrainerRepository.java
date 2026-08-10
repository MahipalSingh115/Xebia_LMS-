package com.lms.backend.trainer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TrainerRepository extends JpaRepository<Trainer, String>, JpaSpecificationExecutor<Trainer> {
    long countByStatus(String status);

    @Query("SELECT COALESCE(SUM(t.courses), 0) FROM Trainer t")
    long sumCourses();

    @Query("SELECT COALESCE(AVG(t.rating), 0) FROM Trainer t")
    double avgRating();
}
