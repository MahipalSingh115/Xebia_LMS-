package com.lms.backend.student.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

// TODO: Add role-based visibility filtering once Spring Security auth is implemented.
@Service
@SuppressWarnings("null")
public class ResourceService {

    @Autowired
    private ResourceRepository repository;

    public Page<Resource> getResourcesPaginated(String fileType, String courseName, String instructor, String query, Pageable pageable) {
        return repository.findAll((root, criteriaQuery, cb) -> {
            java.util.List<jakarta.persistence.criteria.Predicate> predicates = new java.util.ArrayList<>();

            if (fileType != null && !fileType.trim().isEmpty() && !"all".equalsIgnoreCase(fileType)) {
                predicates.add(cb.equal(cb.lower(root.get("fileType")), fileType.trim().toLowerCase()));
            }

            if (courseName != null && !courseName.trim().isEmpty() && !"all".equalsIgnoreCase(courseName)) {
                predicates.add(cb.equal(root.get("courseName"), courseName));
            }

            if (instructor != null && !instructor.trim().isEmpty() && !"all".equalsIgnoreCase(instructor)) {
                predicates.add(cb.equal(root.get("instructor"), instructor));
            }

            if (query != null && !query.trim().isEmpty()) {
                String searchPattern = "%" + query.trim().toLowerCase() + "%";
                predicates.add(cb.or(
                    cb.like(cb.lower(root.get("title")), searchPattern),
                    cb.like(cb.lower(root.get("description")), searchPattern)
                ));
            }

            return cb.and(predicates.toArray(new jakarta.persistence.criteria.Predicate[0]));
        }, pageable);
    }

    public Map<String, Object> getResourceStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalResources", repository.count());
        stats.put("uniqueCourses", repository.findDistinctCourseNames());
        stats.put("uniqueInstructors", repository.findDistinctInstructors());
        return stats;
    }
}
