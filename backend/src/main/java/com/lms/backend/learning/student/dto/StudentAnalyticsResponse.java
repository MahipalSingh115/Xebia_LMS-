package com.lms.backend.learning.student.dto;

import java.util.List;
import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentAnalyticsResponse {
    private List<Map<String, Object>> trendData;
    private List<Map<String, Object>> attendanceData;
    private List<Map<String, Object>> marksData;
    private List<Map<String, Object>> skillsData;
    private Map<String, Object> kpis;
    private Map<String, Object> insights;
}
