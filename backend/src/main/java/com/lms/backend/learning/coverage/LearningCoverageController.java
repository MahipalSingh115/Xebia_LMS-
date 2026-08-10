package com.lms.backend.learning.coverage;

import com.lms.backend.learning.coverage.dto.CoverageChartsResponse;
import com.lms.backend.learning.coverage.dto.CoverageSummaryResponse;
import com.lms.backend.learning.coverage.dto.CoverageTableResponse;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/coverage")
@CrossOrigin("*")
public class LearningCoverageController {

    @Autowired
    private LearningCoverageService learningCoverageService;

    @Operation(summary = "Get learning coverage summary")
    @GetMapping("/summary")
    public CoverageSummaryResponse getCoverageSummary() {

        return learningCoverageService.getCoverageSummary();
    }

    @Operation(summary = "Get learning coverage charts")
    @GetMapping("/charts")
    public CoverageChartsResponse getCoverageCharts() {

        return learningCoverageService.getCoverageCharts();
    }

    @Operation(summary = "Get learning coverage employee table")
    @GetMapping("/table")
    public List<CoverageTableResponse> getCoverageTable(

            @RequestParam(required = false) String search,
            @RequestParam(required = false) String region,
            @RequestParam(required = false) String businessUnit,
            @RequestParam(required = false) String department,
            @RequestParam(required = false) String practice,
            @RequestParam(required = false) String datePreset
    ) {

        return learningCoverageService.getCoverageTable(
                search,
                region,
                businessUnit,
                department,
                practice,
                datePreset
        );
    }
}