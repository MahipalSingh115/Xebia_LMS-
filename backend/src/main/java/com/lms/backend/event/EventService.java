package com.lms.backend.event;

import com.lms.backend.exception.BadRequestException;
import com.lms.backend.exception.ResourceAlreadyExistsException;
import com.lms.backend.exception.ResourceNotFoundException;
import com.lms.backend.student.Student;
import com.lms.backend.student.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@SuppressWarnings("null")
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private EventRegistrationRepository eventRegistrationRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private com.lms.backend.notification.NotificationService notificationService;

    public Event createEvent(Event event) {
        if (event.getId() == null || event.getId().trim().isEmpty()) {
            event.setId("e_" + System.currentTimeMillis());
        }
        event.setCreatedAt(LocalDateTime.now());
        
        if (event.getTimelineEntries() != null) {
            for (int i = 0; i < event.getTimelineEntries().size(); i++) {
                TimelineEntry entry = event.getTimelineEntries().get(i);
                if (entry.getId() == null || entry.getId().trim().isEmpty()) {
                    entry.setId("te_" + System.currentTimeMillis() + "_" + i);
                }
                entry.setEventId(event.getId());
                if (entry.getSortOrder() == null) {
                    entry.setSortOrder(i);
                }
            }
        }
        
        Event saved = eventRepository.save(event);
        try {
            notificationService.createNotification("s4", "student", "community", "MessageSquare", "New Event: " + saved.getTitle(), "A new event has been scheduled: " + saved.getDescription());
            notificationService.createNotification("t1", "trainer", "community", "MessageSquare", "New Event: " + saved.getTitle(), "A new event has been scheduled: " + saved.getDescription());
        } catch (Exception e) {
            // Suppress exception during tests or if seeding
        }
        return saved;
    }

    public Page<Event> getEventsPaginated(Pageable pageable) {
        return eventRepository.findAll(pageable);
    }

    public Optional<Event> getEventById(String id) {
        return eventRepository.findById(id);
    }

    public Optional<Event> updateEvent(String id, Event updatedEvent) {
        // TODO: Enforce Admin/Trainer role restriction once authentication infrastructure is implemented.
        return eventRepository.findById(id)
                .map(existing -> {
                    if (updatedEvent.getTitle() != null) existing.setTitle(updatedEvent.getTitle());
                    if (updatedEvent.getDescription() != null) existing.setDescription(updatedEvent.getDescription());
                    if (updatedEvent.getImageUrl() != null) existing.setImageUrl(updatedEvent.getImageUrl());
                    if (updatedEvent.getTimelineStart() != null) existing.setTimelineStart(updatedEvent.getTimelineStart());
                    if (updatedEvent.getTimelineEnd() != null) existing.setTimelineEnd(updatedEvent.getTimelineEnd());
                    if (updatedEvent.getRegistrationDeadline() != null) existing.setRegistrationDeadline(updatedEvent.getRegistrationDeadline());
                    if (updatedEvent.getLocation() != null) existing.setLocation(updatedEvent.getLocation());
                    
                    if (updatedEvent.getTimelineEntries() != null) {
                        existing.getTimelineEntries().clear();
                        List<TimelineEntry> newEntries = updatedEvent.getTimelineEntries();
                        for (int i = 0; i < newEntries.size(); i++) {
                            TimelineEntry entry = newEntries.get(i);
                            if (entry.getId() == null || entry.getId().trim().isEmpty()) {
                                entry.setId("te_" + System.currentTimeMillis() + "_" + i);
                            }
                            entry.setEventId(existing.getId());
                            entry.setSortOrder(i);
                            existing.getTimelineEntries().add(entry);
                        }
                    }
                    
                    return eventRepository.save(existing);
                });
    }

    public boolean deleteEvent(String id) {
        // TODO: Enforce Admin/Trainer role restriction once authentication infrastructure is implemented.
        if (eventRepository.existsById(id)) {
            eventRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public EventRegistration registerStudent(String eventId, String studentId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with ID: " + eventId));

        if (LocalDateTime.now().isAfter(event.getRegistrationDeadline())) {
            throw new BadRequestException("Registration deadline has passed");
        }

        if (eventRegistrationRepository.existsByEventIdAndStudentId(eventId, studentId)) {
            throw new ResourceAlreadyExistsException("Student is already registered for this event");
        }

        EventRegistration registration = new EventRegistration();
        registration.setId("er_" + System.currentTimeMillis());
        registration.setEventId(eventId);
        registration.setStudentId(studentId);
        registration.setRegisteredAt(LocalDateTime.now());

        return eventRegistrationRepository.save(registration);
    }

    public List<EventRegistrationDto> getRegistrationsForEvent(String eventId) {
        if (!eventRepository.existsById(eventId)) {
            throw new ResourceNotFoundException("Event not found with ID: " + eventId);
        }

        List<EventRegistration> registrations = eventRegistrationRepository.findByEventId(eventId);
        return registrations.stream()
                .map(reg -> {
                    String name = "Unknown Student";
                    String email = "unknown@xebia.com";
                    Optional<Student> studentOpt = studentRepository.findById(reg.getStudentId());
                    if (studentOpt.isPresent()) {
                        Student student = studentOpt.get();
                        name = student.getName() != null ? student.getName() : name;
                        email = student.getEmail() != null ? student.getEmail() : email;
                    }
                    return new EventRegistrationDto(
                            reg.getId(),
                            reg.getEventId(),
                            reg.getStudentId(),
                            name,
                            email,
                            reg.getRegisteredAt()
                    );
                })
                .collect(Collectors.toList());
    }
}
