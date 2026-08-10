package com.lms.backend.learning.submodule;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubModuleRepository extends JpaRepository<SubModule, Long> {

    boolean existsByTitleAndModule_Id(String title, Long moduleId);

    List<SubModule> findByModule_IdOrderBySortOrderAsc(Long moduleId);
}