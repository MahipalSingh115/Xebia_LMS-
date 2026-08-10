package com.lms.backend.assessment;

import com.lms.backend.common.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/assessments")
@CrossOrigin(origins = "*")
public class AssessmentController {

    @Autowired
    private AssessmentService service;

    @GetMapping
    public ApiResponse<Page<Assessment>> getAssessments(
            @RequestParam(required = false) String q,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "name") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir) {

        Sort sort = sortDir.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);

        return new ApiResponse<>(service.getAssessmentsPaginated(q, pageable));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Assessment>> createAssessment(@RequestBody Assessment assessment) {
        Assessment created = service.createAssessment(assessment);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse<>(created));
    }

    @GetMapping("/stats")
    public ApiResponse<Map<String, Object>> getStats() {
        return new ApiResponse<>(service.getAssessmentStats());
    }
}
