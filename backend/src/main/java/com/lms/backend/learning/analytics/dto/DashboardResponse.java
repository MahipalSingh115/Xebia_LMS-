package com.lms.backend.learning.analytics.dto;

import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardResponse {
    private Map<String, Object> summary;
    private Map<String, Object> kpis;
    private Map<String, Object> charts;
    private Map<String, Object> tables;
}
