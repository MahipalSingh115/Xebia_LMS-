package com.lms.backend.assessment;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "assessments")
public class Assessment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String course;
    private Integer questions;
    private String duration;
    private String passScore;
    private String status;

    public Assessment() {}

    public Assessment(String name, String course, Integer questions, String duration, String passScore, String status) {
        this.name = name;
        this.course = course;
        this.questions = questions;
        this.duration = duration;
        this.passScore = passScore;
        this.status = status;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCourse() { return course; }
    public void setCourse(String course) { this.course = course; }

    public Integer getQuestions() { return questions; }
    public void setQuestions(Integer questions) { this.questions = questions; }

    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }

    public String getPassScore() { return passScore; }
    public void setPassScore(String passScore) { this.passScore = passScore; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
