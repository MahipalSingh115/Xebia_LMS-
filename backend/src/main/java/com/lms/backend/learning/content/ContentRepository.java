package com.lms.backend.learning.content;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContentRepository extends JpaRepository<Content, Long> {

    boolean existsByTitleAndSubModule_Id(String title, Long subModuleId);

    List<Content> findBySubModule_IdOrderByIdAsc(Long subModuleId);
}