package com.lms.backend.event;

import java.time.LocalDateTime;

public class EventRegistrationDto {
    private String id;
    private String eventId;
    private String studentId;
    private String studentName;
    private String studentEmail;
    private LocalDateTime registeredAt;

    public EventRegistrationDto() {}

    public EventRegistrationDto(String id, String eventId, String studentId, String studentName, String studentEmail, LocalDateTime registeredAt) {
        this.id = id;
        this.eventId = eventId;
        this.studentId = studentId;
        this.studentName = studentName;
        this.studentEmail = studentEmail;
        this.registeredAt = registeredAt;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEventId() {
        return eventId;
    }

    public void setEventId(String eventId) {
        this.eventId = eventId;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getStudentEmail() {
        return studentEmail;
    }

    public void setStudentEmail(String studentEmail) {
        this.studentEmail = studentEmail;
    }

    public LocalDateTime getRegisteredAt() {
        return registeredAt;
    }

    public void setRegisteredAt(LocalDateTime registeredAt) {
        this.registeredAt = registeredAt;
    }
}
