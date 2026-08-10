package com.lms.backend.learning.analytics;

import java.util.HashMap;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.lms.backend.common.response.ApiResponse;
import com.lms.backend.common.response.ResponseBuilder;
import com.lms.backend.learning.analytics.dto.DashboardResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/analytics")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    @GetMapping("/coverage/dashboard")
    public ResponseEntity<ApiResponse<DashboardResponse>> getCoverageDashboard(
            @RequestParam(required = false) String year,
            @RequestParam(required = false) String quarter,
            @RequestParam(required = false) String region,
            @RequestParam(required = false) String department,
            @RequestParam(required = false) String bu,
            @RequestParam(required = false) String practice,
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {

        Map<String, String> filters = buildFiltersMap(year, quarter, region, department, bu, practice, search);
        return ResponseEntity.ok(
            ResponseBuilder.success(
                "Coverage dashboard payload fetched successfully",
                analyticsService.getCoverageDashboard(filters, page, size),
                200
            )
        );
    }

    @GetMapping("/certifications/dashboard")
    public ResponseEntity<ApiResponse<DashboardResponse>> getCertificationsDashboard(
            @RequestParam(required = false) String year,
            @RequestParam(required = false) String quarter,
            @RequestParam(required = false) String region,
            @RequestParam(required = false) String department,
            @RequestParam(required = false) String bu,
            @RequestParam(required = false) String practice,
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {

        Map<String, String> filters = buildFiltersMap(year, quarter, region, department, bu, practice, search);
        return ResponseEntity.ok(
            ResponseBuilder.success(
                "Certifications dashboard payload fetched successfully",
                analyticsService.getCertificationsDashboard(filters, page, size),
                200
            )
        );
    }

    @GetMapping("/champions/dashboard")
    public ResponseEntity<ApiResponse<DashboardResponse>> getChampionsDashboard(
            @RequestParam(required = false) String year,
            @RequestParam(required = false) String quarter,
            @RequestParam(required = false) String region,
            @RequestParam(required = false) String department,
            @RequestParam(required = false) String bu,
            @RequestParam(required = false) String practice,
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {

        Map<String, String> filters = buildFiltersMap(year, quarter, region, department, bu, practice, search);
        return ResponseEntity.ok(
            ResponseBuilder.success(
                "Champions dashboard payload fetched successfully",
                analyticsService.getChampionsDashboard(filters, page, size),
                200
            )
        );
    }

    @GetMapping("/flagship/dashboard")
    public ResponseEntity<ApiResponse<DashboardResponse>> getFlagshipDashboard(
            @RequestParam(required = false) String year,
            @RequestParam(required = false) String quarter,
            @RequestParam(required = false) String region,
            @RequestParam(required = false) String department,
            @RequestParam(required = false) String bu,
            @RequestParam(required = false) String practice,
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {

        Map<String, String> filters = buildFiltersMap(year, quarter, region, department, bu, practice, search);
        return ResponseEntity.ok(
            ResponseBuilder.success(
                "Flagship programs dashboard payload fetched successfully",
                analyticsService.getFlagshipDashboard(filters, page, size),
                200
            )
        );
    }

    @GetMapping("/trends/dashboard")
    public ResponseEntity<ApiResponse<DashboardResponse>> getTrendsDashboard(
            @RequestParam(required = false) String year,
            @RequestParam(required = false) String quarter,
            @RequestParam(required = false) String region,
            @RequestParam(required = false) String department,
            @RequestParam(required = false) String bu,
            @RequestParam(required = false) String practice,
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {

        Map<String, String> filters = buildFiltersMap(year, quarter, region, department, bu, practice, search);
        return ResponseEntity.ok(
            ResponseBuilder.success(
                "Trends dashboard payload fetched successfully",
                analyticsService.getTrendsDashboard(filters, page, size),
                200
            )
        );
    }

    @GetMapping("/executive/dashboard")
    public ResponseEntity<ApiResponse<DashboardResponse>> getExecutiveSummaryDashboard(
            @RequestParam(required = false) String year,
            @RequestParam(required = false) String quarter,
            @RequestParam(required = false) String region,
            @RequestParam(required = false) String department,
            @RequestParam(required = false) String bu,
            @RequestParam(required = false) String practice,
            @RequestParam(required = false) String search) {

        Map<String, String> filters = buildFiltersMap(year, quarter, region, department, bu, practice, search);
        return ResponseEntity.ok(
            ResponseBuilder.success(
                "Executive summary dashboard payload fetched successfully",
                analyticsService.getExecutiveSummaryDashboard(filters),
                200
            )
        );
    }

    @GetMapping("/ai-transformation/dashboard")
    public ResponseEntity<ApiResponse<DashboardResponse>> getAITransformationDashboard(
            @RequestParam(required = false) String year,
            @RequestParam(required = false) String quarter,
            @RequestParam(required = false) String region,
            @RequestParam(required = false) String department,
            @RequestParam(required = false) String bu,
            @RequestParam(required = false) String practice,
            @RequestParam(required = false) String search) {

        Map<String, String> filters = buildFiltersMap(year, quarter, region, department, bu, practice, search);
        return ResponseEntity.ok(
            ResponseBuilder.success(
                "AI transformation dashboard payload fetched successfully",
                analyticsService.getAITransformationDashboard(filters),
                200
            )
        );
    }

    @GetMapping("/fresher/dashboard")
    public ResponseEntity<ApiResponse<DashboardResponse>> getFresherJourneyDashboard(
            @RequestParam(required = false) String year,
            @RequestParam(required = false) String quarter,
            @RequestParam(required = false) String region,
            @RequestParam(required = false) String department,
            @RequestParam(required = false) String bu,
            @RequestParam(required = false) String practice,
            @RequestParam(required = false) String search) {

        Map<String, String> filters = buildFiltersMap(year, quarter, region, department, bu, practice, search);
        return ResponseEntity.ok(
            ResponseBuilder.success(
                "Fresher journey dashboard payload fetched successfully",
                analyticsService.getFresherJourneyDashboard(filters),
                200
            )
        );
    }

    @GetMapping("/learning/categories/dashboard")
    public ResponseEntity<ApiResponse<DashboardResponse>> getLearningCategoriesDashboard(
            @RequestParam(required = false) String year,
            @RequestParam(required = false) String quarter,
            @RequestParam(required = false) String region,
            @RequestParam(required = false) String department,
            @RequestParam(required = false) String bu,
            @RequestParam(required = false) String practice,
            @RequestParam(required = false) String search) {

        Map<String, String> filters = buildFiltersMap(year, quarter, region, department, bu, practice, search);
        return ResponseEntity.ok(
            ResponseBuilder.success(
                "Learning categories dashboard payload fetched successfully",
                analyticsService.getLearningCategoriesDashboard(filters),
                200
            )
        );
    }

    @GetMapping("/learning/hours/dashboard")
    public ResponseEntity<ApiResponse<DashboardResponse>> getLearningHoursDashboard(
            @RequestParam(required = false) String year,
            @RequestParam(required = false) String quarter,
            @RequestParam(required = false) String region,
            @RequestParam(required = false) String department,
            @RequestParam(required = false) String bu,
            @RequestParam(required = false) String practice,
            @RequestParam(required = false) String search) {

        Map<String, String> filters = buildFiltersMap(year, quarter, region, department, bu, practice, search);
        return ResponseEntity.ok(
            ResponseBuilder.success(
                "Learning hours dashboard payload fetched successfully",
                analyticsService.getLearningHoursDashboard(filters),
                200
            )
        );
    }

    @GetMapping("/predictive/dashboard")
    public ResponseEntity<ApiResponse<DashboardResponse>> getPredictiveAnalyticsDashboard(
            @RequestParam(required = false) String year,
            @RequestParam(required = false) String quarter,
            @RequestParam(required = false) String region,
            @RequestParam(required = false) String department,
            @RequestParam(required = false) String bu,
            @RequestParam(required = false) String practice,
            @RequestParam(required = false) String search) {

        Map<String, String> filters = buildFiltersMap(year, quarter, region, department, bu, practice, search);
        return ResponseEntity.ok(
            ResponseBuilder.success(
                "Predictive analytics dashboard payload fetched successfully",
                analyticsService.getPredictiveAnalyticsDashboard(filters),
                200
            )
        );
    }

    @GetMapping("/project-investment/dashboard")
    public ResponseEntity<ApiResponse<DashboardResponse>> getProjectLearningInvestmentDashboard(
            @RequestParam(required = false) String year,
            @RequestParam(required = false) String quarter,
            @RequestParam(required = false) String region,
            @RequestParam(required = false) String department,
            @RequestParam(required = false) String bu,
            @RequestParam(required = false) String practice,
            @RequestParam(required = false) String search) {

        Map<String, String> filters = buildFiltersMap(year, quarter, region, department, bu, practice, search);
        return ResponseEntity.ok(
            ResponseBuilder.success(
                "Project learning investment dashboard payload fetched successfully",
                analyticsService.getProjectLearningInvestmentDashboard(filters),
                200
            )
        );
    }

    @GetMapping("/skill-gap/dashboard")
    public ResponseEntity<ApiResponse<DashboardResponse>> getSkillGapDashboard(
            @RequestParam(required = false) String year,
            @RequestParam(required = false) String quarter,
            @RequestParam(required = false) String region,
            @RequestParam(required = false) String department,
            @RequestParam(required = false) String bu,
            @RequestParam(required = false) String practice,
            @RequestParam(required = false) String search) {

        Map<String, String> filters = buildFiltersMap(year, quarter, region, department, bu, practice, search);
        return ResponseEntity.ok(
            ResponseBuilder.success(
                "Skill gap dashboard payload fetched successfully",
                analyticsService.getSkillGapDashboard(filters),
                200
            )
        );
    }

    @GetMapping("/training-effectiveness/dashboard")
    public ResponseEntity<ApiResponse<DashboardResponse>> getTrainingEffectivenessDashboard(
            @RequestParam(required = false) String year,
            @RequestParam(required = false) String quarter,
            @RequestParam(required = false) String region,
            @RequestParam(required = false) String department,
            @RequestParam(required = false) String bu,
            @RequestParam(required = false) String practice,
            @RequestParam(required = false) String search) {

        Map<String, String> filters = buildFiltersMap(year, quarter, region, department, bu, practice, search);
        return ResponseEntity.ok(
            ResponseBuilder.success(
                "Training effectiveness dashboard payload fetched successfully",
                analyticsService.getTrainingEffectivenessDashboard(filters),
                200
            )
        );
    }

    private Map<String, String> buildFiltersMap(
            String year, String quarter, String region, String department, String bu, String practice, String search) {
        Map<String, String> map = new HashMap<>();
        if (year != null) map.put("year", year);
        if (quarter != null) map.put("quarter", quarter);
        if (region != null) map.put("region", region);
        if (department != null) map.put("department", department);
        if (bu != null) map.put("bu", bu);
        if (practice != null) map.put("practice", practice);
        if (search != null) map.put("search", search);
        return map;
    }
}
