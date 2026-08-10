package com.lms.backend.student.resource;

import com.lms.backend.common.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/resources")
@CrossOrigin(origins = "*")
public class ResourceController {

    @Autowired
    private ResourceService service;

    @GetMapping
    public ApiResponse<Page<Resource>> getResources(
            @RequestParam(required = false) String fileType,
            @RequestParam(required = false) String courseName,
            @RequestParam(required = false) String instructor,
            @RequestParam(required = false) String q,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "uploadDate") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir) {

        Sort sort = sortDir.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);

        return new ApiResponse<>(service.getResourcesPaginated(fileType, courseName, instructor, q, pageable));
    }

    @GetMapping("/stats")
    public ApiResponse<Map<String, Object>> getResourceStats() {
        return new ApiResponse<>(service.getResourceStats());
    }
}
