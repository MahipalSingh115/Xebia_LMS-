package com.lms.backend.learning.course;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CourseRepository extends JpaRepository<Course, Long> {

    boolean existsByTitle(String title);
    List<Course> findTop5ByOrderByIdDesc();

    @Query("SELECT c FROM Course c LEFT JOIN FETCH c.category")
    List<Course> findAllWithCategory();
}