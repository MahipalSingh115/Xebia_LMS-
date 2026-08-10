package com.lms.backend.approval;

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
@RequestMapping("/api/approval-requests")
@CrossOrigin(origins = "*")
public class ApprovalRequestController {

    @Autowired
    private ApprovalRequestService service;

    @GetMapping
    public ApiResponse<Page<ApprovalRequest>> getRequests(
            @RequestParam(required = false) String q,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir) {

        Sort sort = sortDir.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);

        return new ApiResponse<>(service.getRequestsPaginated(q, pageable));
    }

    @GetMapping("/stats")
    public ApiResponse<Map<String, Object>> getStats() {
        return new ApiResponse<>(service.getApprovalStats());
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<ApiResponse<ApprovalRequest>> updateStatus(
            @PathVariable Long id,
            @RequestParam String status) {
        return service.updateStatus(id, status)
                .map(req -> ResponseEntity.ok(new ApiResponse<>(req)))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }
}
