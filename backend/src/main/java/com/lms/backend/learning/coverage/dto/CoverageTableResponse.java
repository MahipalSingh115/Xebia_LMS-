package com.lms.backend.learning.coverage.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CoverageTableResponse {

    private Long id;

    private String name;
    private String email;
    private String avatar;

    private String region;
    private String businessUnit;
    private String department;
    private String practice;
    private String project;

    private String learningPath;

    private int hours;
    private int completion;

    private String status;

    private String dateJoined;
}