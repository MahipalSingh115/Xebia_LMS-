package com.lms.backend.batch;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

@Repository
public interface BatchRepository extends JpaRepository<Batch, String>, JpaSpecificationExecutor<Batch> {
    long countByStatus(String status);
}
