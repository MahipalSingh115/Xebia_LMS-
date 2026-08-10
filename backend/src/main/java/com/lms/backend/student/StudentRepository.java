package com.lms.backend.student;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("subStudentRepository")
public interface StudentRepository extends JpaRepository<Student, String>, JpaSpecificationExecutor<Student> {
    List<Student> findByBatch(String batch);
    long countByStatus(String status);
}
