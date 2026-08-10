package com.lms.backend.approval;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "approval_requests")
public class ApprovalRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type;
    private String name;
    private String course;
    private String date;
    private String cost;
    private String priority;
    private String status;
    private String provider;

    @Column(length = 1000)
    private String justification;

    public ApprovalRequest() {}

    public ApprovalRequest(String type, String name, String course, String date, String cost, String priority, String status, String provider, String justification) {
        this.type = type;
        this.name = name;
        this.course = course;
        this.date = date;
        this.cost = cost;
        this.priority = priority;
        this.status = status;
        this.provider = provider;
        this.justification = justification;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCourse() { return course; }
    public void setCourse(String course) { this.course = course; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public String getCost() { return cost; }
    public void setCost(String cost) { this.cost = cost; }

    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getProvider() { return provider; }
    public void setProvider(String provider) { this.provider = provider; }

    public String getJustification() { return justification; }
    public void setJustification(String justification) { this.justification = justification; }
}
