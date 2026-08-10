package com.lms.backend.student.grade;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GradeRepository extends JpaRepository<Grade, Long>, JpaSpecificationExecutor<Grade> {
    List<Grade> findByStudentId(String studentId);

    @Query("SELECT COUNT(g) FROM Grade g WHERE g.studentId = :studentId AND g.status = 'Completed'")
    long countCompletedCourses(@Param("studentId") String studentId);

    @Query("SELECT COALESCE(SUM(g.credits), 0) FROM Grade g WHERE g.studentId = :studentId AND g.status = 'Completed'")
    int sumCompletedCredits(@Param("studentId") String studentId);
}
