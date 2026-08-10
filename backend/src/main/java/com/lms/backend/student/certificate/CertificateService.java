package com.lms.backend.student.certificate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

// TODO: Add role-based visibility filtering once Spring Security auth is implemented.
@Service
@SuppressWarnings("null")
public class CertificateService {

    @Autowired
    private CertificateRepository repository;

    public Page<Certificate> getCertificatesPaginated(String studentId, String type, String query, Pageable pageable) {
        return repository.findAll((root, criteriaQuery, cb) -> {
            java.util.List<jakarta.persistence.criteria.Predicate> predicates = new java.util.ArrayList<>();

            if (studentId != null && !studentId.trim().isEmpty()) {
                predicates.add(cb.equal(root.get("studentId"), studentId));
            }

            if (type != null && !type.trim().isEmpty() && !"all".equalsIgnoreCase(type)) {
                predicates.add(cb.equal(root.get("type"), type));
            }

            if (query != null && !query.trim().isEmpty()) {
                String searchPattern = "%" + query.trim().toLowerCase() + "%";
                predicates.add(cb.or(
                    cb.like(cb.lower(root.get("title")), searchPattern),
                    cb.like(cb.lower(root.get("id")), searchPattern)
                ));
            }

            return cb.and(predicates.toArray(new jakarta.persistence.criteria.Predicate[0]));
        }, pageable);
    }
}
