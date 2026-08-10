package com.lms.backend.event;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TimelineEntryRepository extends JpaRepository<TimelineEntry, String> {
    List<TimelineEntry> findByEventId(String eventId);
    void deleteByEventId(String eventId);
}
