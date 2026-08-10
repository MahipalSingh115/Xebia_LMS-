package com.lms.backend.student.resource;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResourceRepository extends JpaRepository<Resource, Long>, JpaSpecificationExecutor<Resource> {

    @Query("SELECT DISTINCT r.courseName FROM Resource r WHERE r.courseName IS NOT NULL")
    List<String> findDistinctCourseNames();

    @Query("SELECT DISTINCT r.instructor FROM Resource r WHERE r.instructor IS NOT NULL")
    List<String> findDistinctInstructors();
}
