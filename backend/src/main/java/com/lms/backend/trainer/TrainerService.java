package com.lms.backend.trainer;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.LinkedHashMap;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

// TODO: Add role-based visibility filtering once Spring Security auth is implemented.
// Trainers should only see their own batches/students.
@Service
@SuppressWarnings("null")
public class TrainerService {

    @Autowired
    private TrainerRepository trainerRepository;

    @PostConstruct
    public void seedTrainers() {
        // Seeding disabled to clean up dummy data
    }

    private org.springframework.data.jpa.domain.Specification<Trainer> getSpec(String query, String status) {
        return (root, criteriaQuery, cb) -> {
            java.util.List<jakarta.persistence.criteria.Predicate> predicates = new java.util.ArrayList<>();
            
            if (query != null && !query.trim().isEmpty()) {
                String searchPattern = "%" + query.trim().toLowerCase() + "%";
                predicates.add(cb.or(
                    cb.like(cb.lower(root.get("name")), searchPattern),
                    cb.like(cb.lower(root.get("dept")), searchPattern)
                ));
            }
            
            if (status != null && !status.trim().isEmpty() && !"All".equalsIgnoreCase(status)) {
                predicates.add(cb.equal(cb.lower(root.get("status")), status.trim().toLowerCase()));
            }
            
            return cb.and(predicates.toArray(new jakarta.persistence.criteria.Predicate[0]));
        };
    }

    public Page<Trainer> getTrainersPaginated(String query, String status, Pageable pageable) {
        return trainerRepository.findAll(getSpec(query, status), pageable);
    }

    public List<Trainer> getTrainers(String query, String status, org.springframework.data.domain.Sort sort) {
        return trainerRepository.findAll(getSpec(query, status), sort);
    }

    public List<Trainer> getAllTrainers() {
        return trainerRepository.findAll();
    }

    public Optional<Trainer> getTrainerById(String id) {
        return trainerRepository.findById(id);
    }

    public Trainer createTrainer(Trainer trainer) {
        if (trainer.getId() == null || trainer.getId().trim().isEmpty()) {
            trainer.setId("t_" + System.currentTimeMillis());
        }
        if (trainer.getStatus() == null || trainer.getStatus().trim().isEmpty()) {
            trainer.setStatus("Active");
        }
        if (trainer.getRating() == null) {
            trainer.setRating(5.0);
        }
        if (trainer.getCourses() == null) {
            trainer.setCourses(0);
        }
        if (trainer.getLearners() == null) {
            trainer.setLearners(0);
        }
        if (trainer.getImg() == null || trainer.getImg().trim().isEmpty()) {
            trainer.setImg("https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150");
        }
        return trainerRepository.save(trainer);
    }

    public Optional<Trainer> updateTrainer(String id, Trainer updated) {
        return trainerRepository.findById(id).map(existing -> {
            if (updated.getName() != null) existing.setName(updated.getName());
            if (updated.getEmail() != null) existing.setEmail(updated.getEmail());
            if (updated.getRole() != null) existing.setRole(updated.getRole());
            if (updated.getDept() != null) existing.setDept(updated.getDept());
            if (updated.getCourses() != null) existing.setCourses(updated.getCourses());
            if (updated.getLearners() != null) existing.setLearners(updated.getLearners());
            if (updated.getRating() != null) existing.setRating(updated.getRating());
            if (updated.getStatus() != null) existing.setStatus(updated.getStatus());
            if (updated.getImg() != null) existing.setImg(updated.getImg());
            return trainerRepository.save(existing);
        });
    }

    public boolean deleteTrainer(String id) {
        if (trainerRepository.existsById(id)) {
            trainerRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Map<String, Object> getTrainerStats() {
        Map<String, Object> stats = new LinkedHashMap<>();
        stats.put("totalTrainers", trainerRepository.count());
        stats.put("activeTrainers", trainerRepository.countByStatus("Active"));
        stats.put("totalCoursesAssigned", trainerRepository.sumCourses());
        stats.put("averageRating", Math.round(trainerRepository.avgRating() * 10.0) / 10.0);
        return stats;
    }
}
