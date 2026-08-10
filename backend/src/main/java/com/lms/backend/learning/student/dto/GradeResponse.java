package com.lms.backend.learning.student.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GradeResponse {
    private Long id;
    private String course;
    private String instructor;
    private String grade;
    private int percentage;
    private int credits;
    private String semester;
    private String academicYear;
    private String status;
}
