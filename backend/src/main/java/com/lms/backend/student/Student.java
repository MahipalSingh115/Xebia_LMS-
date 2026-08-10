package com.lms.backend.student;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity(name = "SubStudent")
@Table(name = "student")
public class Student {
    @Id
    private String id;
    private String name;
    private String batch;
    private String status;
    private String email;
    private String dept;
    private String course;
    private Integer progress;
    private String hours;

    public Student() {}

    public Student(String id, String name, String batch, String status) {
        this.id = id;
        this.name = name;
        this.batch = batch;
        this.status = status;
    }

    public Student(String id, String name, String batch, String status, String email, String dept, String course, Integer progress, String hours) {
        this.id = id;
        this.name = name;
        this.batch = batch;
        this.status = status;
        this.email = email;
        this.dept = dept;
        this.course = course;
        this.progress = progress;
        this.hours = hours;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBatch() {
        return batch;
    }

    public void setBatch(String batch) {
        this.batch = batch;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDept() {
        return dept;
    }

    public void setDept(String dept) {
        this.dept = dept;
    }

    public String getCourse() {
        return course;
    }

    public void setCourse(String course) {
        this.course = course;
    }

    public Integer getProgress() {
        return progress;
    }

    public void setProgress(Integer progress) {
        this.progress = progress;
    }

    public String getHours() {
        return hours;
    }

    public void setHours(String hours) {
        this.hours = hours;
    }
}
