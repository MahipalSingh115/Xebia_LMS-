package com.lms.backend.student.grade;

import com.lms.backend.common.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/grades")
@CrossOrigin(origins = "*")
public class GradeController {

    @Autowired
    private GradeService service;

    @GetMapping
    public ApiResponse<Page<Grade>> getGrades(
            @RequestParam(required = false) String studentId,
            @RequestParam(required = false) String semester,
            @RequestParam(required = false) String academicYear,
            @RequestParam(required = false) String q,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "course") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir) {

        if (studentId == null || studentId.trim().isEmpty()) {
            studentId = "s4";
        }
        Sort sort = sortDir.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);

        return new ApiResponse<>(service.getGradesPaginated(studentId, semester, academicYear, q, pageable));
    }

    @GetMapping("/stats")
    public ApiResponse<Map<String, Object>> getGradeStats(@RequestParam(required = false) String studentId) {
        if (studentId == null || studentId.trim().isEmpty()) {
            studentId = "s4";
        }
        return new ApiResponse<>(service.getGradeStats(studentId));
    }
}
