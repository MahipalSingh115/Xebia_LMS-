package com.lms.backend.student.grade;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

// TODO: Add role-based visibility filtering once Spring Security auth is implemented.
@Service
@SuppressWarnings("null")
public class GradeService {

    @Autowired
    private GradeRepository repository;

    @Autowired
    private com.lms.backend.student.certificate.CertificateRepository certificateRepository;

    public Page<Grade> getGradesPaginated(String studentId, String semester, String academicYear, String query, Pageable pageable) {
        return repository.findAll((root, criteriaQuery, cb) -> {
            java.util.List<jakarta.persistence.criteria.Predicate> predicates = new java.util.ArrayList<>();

            if (studentId != null && !studentId.trim().isEmpty()) {
                predicates.add(cb.equal(root.get("studentId"), studentId));
            }

            if (semester != null && !semester.trim().isEmpty() && !"all".equalsIgnoreCase(semester)) {
                predicates.add(cb.equal(root.get("semester"), semester));
            }

            if (academicYear != null && !academicYear.trim().isEmpty() && !"all".equalsIgnoreCase(academicYear)) {
                predicates.add(cb.equal(root.get("academicYear"), academicYear));
            }

            if (query != null && !query.trim().isEmpty()) {
                String searchPattern = "%" + query.trim().toLowerCase() + "%";
                predicates.add(cb.or(
                    cb.like(cb.lower(root.get("course")), searchPattern),
                    cb.like(cb.lower(root.get("instructor")), searchPattern)
                ));
            }

            return cb.and(predicates.toArray(new jakarta.persistence.criteria.Predicate[0]));
        }, pageable);
    }

    public Map<String, Object> getGradeStats(String studentId) {
        List<Grade> studentGrades = repository.findByStudentId(studentId);
        long certificatesCount = certificateRepository.countByStudentId(studentId);
        
        long completedCourses = 0;
        int creditsEarned = 0;
        double totalPercentage = 0;
        int gradedCoursesCount = 0;
        
        double totalPoints = 0;
        int totalCreditsForGpa = 0;

        for (Grade g : studentGrades) {
            if ("Completed".equalsIgnoreCase(g.getStatus())) {
                completedCourses++;
                creditsEarned += g.getCredits();
            }
            if (g.getPercentage() != null) {
                totalPercentage += g.getPercentage();
                gradedCoursesCount++;
            }
            
            Double points = getPointsForGrade(g.getGrade());
            if (points != null && g.getCredits() != null) {
                totalPoints += points * g.getCredits();
                totalCreditsForGpa += g.getCredits();
            }
        }

        double avgPercentage = gradedCoursesCount > 0 ? (totalPercentage / gradedCoursesCount) : 0.0;
        double cgpa = totalCreditsForGpa > 0 ? (totalPoints / totalCreditsForGpa) : 0.0;

        Map<String, Object> stats = new HashMap<>();
        stats.put("completedCourses", completedCourses);
        stats.put("creditsEarned", creditsEarned);
        stats.put("averagePercentage", Math.round(avgPercentage * 10.0) / 10.0);
        stats.put("cgpa", Math.round(cgpa * 100.0) / 100.0);
        stats.put("certificatesCount", certificatesCount);

        return stats;
    }

    private Double getPointsForGrade(String letterGrade) {
        if (letterGrade == null) return null;
        switch (letterGrade.toUpperCase()) {
            case "A+": return 4.0;
            case "A": return 4.0;
            case "A-": return 3.7;
            case "B+": return 3.3;
            case "B": return 3.0;
            case "B-": return 2.7;
            case "C+": return 2.3;
            case "C": return 2.0;
            case "D": return 1.0;
            case "F": return 0.0;
            default: return null;
        }
    }
}
