package com.lms.backend.batch;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.util.List;
import java.util.Map;
import java.util.LinkedHashMap;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

// TODO: Add role-based visibility filtering once Spring Security auth is implemented.
// Trainers should only see batches they instruct.
@Service
@SuppressWarnings("null")
public class BatchService {

    @Autowired
    private BatchRepository batchRepository;

    @PostConstruct
    public void seedInitialData() {
        // Seeding disabled to clean up dummy data
    }

    private org.springframework.data.jpa.domain.Specification<Batch> getSpec(String query, String status) {
        return (root, criteriaQuery, cb) -> {
            java.util.List<jakarta.persistence.criteria.Predicate> predicates = new java.util.ArrayList<>();
            
            if (query != null && !query.trim().isEmpty()) {
                String searchPattern = "%" + query.trim().toLowerCase() + "%";
                predicates.add(cb.or(
                    cb.like(cb.lower(root.get("name")), searchPattern),
                    cb.like(cb.lower(root.get("course")), searchPattern),
                    cb.like(cb.lower(root.get("instructor")), searchPattern)
                ));
            }
            
            if (status != null && !status.trim().isEmpty() && !"All".equalsIgnoreCase(status)) {
                predicates.add(cb.equal(cb.lower(root.get("status")), status.trim().toLowerCase()));
            }
            
            return cb.and(predicates.toArray(new jakarta.persistence.criteria.Predicate[0]));
        };
    }

    public Page<Batch> getBatchesPaginated(String query, String status, Pageable pageable) {
        return batchRepository.findAll(getSpec(query, status), pageable);
    }

    public List<Batch> getBatches(String query, String status, org.springframework.data.domain.Sort sort) {
        return batchRepository.findAll(getSpec(query, status), sort);
    }

    public List<Batch> getAllBatches() {
        return batchRepository.findAll();
    }

    public Optional<Batch> getBatchById(String id) {
        return batchRepository.findById(id);
    }

    public Batch createBatch(Batch batch) {
        if (batch.getId() == null || batch.getId().trim().isEmpty()) {
            batch.setId("BT-" + (1000 + (int)(Math.random() * 9000)));
        }
        if (batch.getStatus() == null || batch.getStatus().trim().isEmpty()) {
            batch.setStatus("Active");
        }
        batch.setEnrolled(batch.getStudentIds() != null ? batch.getStudentIds().size() : 0);
        return batchRepository.save(batch);
    }

    public Optional<Batch> updateBatch(String id, Batch updatedBatch) {
        return batchRepository.findById(id).map(existing -> {
            if (updatedBatch.getName() != null) existing.setName(updatedBatch.getName());
            if (updatedBatch.getCourse() != null) existing.setCourse(updatedBatch.getCourse());
            if (updatedBatch.getCapacity() != null) existing.setCapacity(updatedBatch.getCapacity());
            if (updatedBatch.getStartDate() != null) existing.setStartDate(updatedBatch.getStartDate());
            if (updatedBatch.getEndDate() != null) existing.setEndDate(updatedBatch.getEndDate());
            if (updatedBatch.getStatus() != null) existing.setStatus(updatedBatch.getStatus());
            if (updatedBatch.getInstructor() != null) existing.setInstructor(updatedBatch.getInstructor());
            if (updatedBatch.getStudentIds() != null) {
                existing.setStudentIds(updatedBatch.getStudentIds());
            }
            return batchRepository.save(existing);
        });
    }

    public boolean deleteBatch(String id) {
        if (batchRepository.existsById(id)) {
            batchRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Map<String, Object> getBatchStats() {
        Map<String, Object> stats = new LinkedHashMap<>();
        stats.put("totalBatches", batchRepository.count());
        stats.put("activeBatches", batchRepository.countByStatus("Active"));
        stats.put("upcomingBatches", batchRepository.countByStatus("Upcoming"));
        stats.put("completedBatches", batchRepository.countByStatus("Completed"));
        return stats;
    }
}
