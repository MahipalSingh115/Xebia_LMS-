package com.lms.backend.event;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface EventRegistrationRepository extends JpaRepository<EventRegistration, String> {
    boolean existsByEventIdAndStudentId(String eventId, String studentId);
    List<EventRegistration> findByEventId(String eventId);
    List<EventRegistration> findByStudentId(String studentId);
}
