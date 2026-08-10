package com.lms.backend.learning.student;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "students")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(length = 255)
    private String avatar;

    @Column(length = 100)
    private String department;

    @Column(name = "academic_year", length = 30)
    private String academicYear;

    @Column(nullable = false)
    private double gpa;

    @Column(name = "study_streak", nullable = false)
    private int studyStreak;
}
