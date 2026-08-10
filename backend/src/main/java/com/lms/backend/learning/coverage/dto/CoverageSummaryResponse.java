package com.lms.backend.learning.coverage.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CoverageSummaryResponse {

    private int totalEmployees;
    private int employeesCovered;
    private double coveragePercentage;
    private int pendingEmployees;
}