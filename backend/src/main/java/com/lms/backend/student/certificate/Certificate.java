package com.lms.backend.student.certificate;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "student_certificates")
public class Certificate {
    @Id
    private String id;

    private String studentId;
    private String title;
    private String date;
    private String type;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "certificate_tags", joinColumns = @JoinColumn(name = "certificate_id"))
    private List<String> tags = new ArrayList<>();

    public Certificate() {}

    public Certificate(String id, String studentId, String title, String date, String type, List<String> tags) {
        this.id = id;
        this.studentId = studentId;
        this.title = title;
        this.date = date;
        this.type = type;
        this.tags = tags;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getStudentId() { return studentId; }
    public void setStudentId(String studentId) { this.studentId = studentId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public List<String> getTags() { return tags; }
    public void setTags(List<String> tags) { this.tags = tags; }
}
