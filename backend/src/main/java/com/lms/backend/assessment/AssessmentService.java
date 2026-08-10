package com.lms.backend.assessment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

// TODO: Add role-based visibility filtering once Spring Security auth is implemented.
@Service
@SuppressWarnings("null")
public class AssessmentService {

    @Autowired
    private AssessmentRepository repository;

    public Page<Assessment> getAssessmentsPaginated(String query, Pageable pageable) {
        return repository.findAll((root, criteriaQuery, cb) -> {
            if (query == null || query.trim().isEmpty()) {
                return null;
            }
            String searchPattern = "%" + query.trim().toLowerCase() + "%";
            return cb.or(
                cb.like(cb.lower(root.get("name")), searchPattern),
                cb.like(cb.lower(root.get("course")), searchPattern)
            );
        }, pageable);
    }

    public Assessment createAssessment(Assessment assessment) {
        return repository.save(assessment);
    }

    public Map<String, Object> getAssessmentStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalAssessments", repository.count());
        stats.put("activeCount", repository.countByStatus("Active"));
        stats.put("draftCount", repository.countByStatus("Draft"));
        stats.put("avgPassScore", 78.5); // static or derived
        return stats;
    }
}
