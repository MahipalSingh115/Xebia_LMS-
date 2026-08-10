package com.lms.backend.learning.coverage.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CoverageChartsResponse {

    private List<ChartDataResponse> regionData;
    private List<ChartDataResponse> departmentData;
    private List<ChartDataResponse> projectData;
    private List<ChartDataResponse> practiceData;
}