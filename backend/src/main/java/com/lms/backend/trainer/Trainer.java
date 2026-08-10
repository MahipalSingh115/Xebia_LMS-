package com.lms.backend.trainer;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "trainer")
public class Trainer {
    @Id
    private String id;
    private String name;
    private String email;
    private String role;
    private String dept;
    private Integer courses;
    private Integer learners;
    private Double rating;
    private String status;
    private String img;

    public Trainer() {}

    public Trainer(String id, String name, String email, String role, String dept, Integer courses, Integer learners, Double rating, String status, String img) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.dept = dept;
        this.courses = courses;
        this.learners = learners;
        this.rating = rating;
        this.status = status;
        this.img = img;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getDept() {
        return dept;
    }

    public void setDept(String dept) {
        this.dept = dept;
    }

    public Integer getCourses() {
        return courses;
    }

    public void setCourses(Integer courses) {
        this.courses = courses;
    }

    public Integer getLearners() {
        return learners;
    }

    public void setLearners(Integer learners) {
        this.learners = learners;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }
}
