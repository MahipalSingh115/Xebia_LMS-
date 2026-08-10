package com.lms.backend.learning.module;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ModuleRepository extends JpaRepository<Module, Long> {

    boolean existsByTitleAndCourse_Id(String title, Long courseId);

    List<Module> findByCourse_IdOrderBySortOrderAsc(Long courseId);
}