package com.lms.backend.notification;

import com.lms.backend.common.ApiResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin
@SuppressWarnings("null")
public class NotificationController {

    private final NotificationService service;

    public NotificationController(NotificationService service) {
        this.service = service;
    }

    @GetMapping
    public ApiResponse<Page<Notification>> getNotifications(
            @RequestParam String role,
            @RequestParam String userId,
            @RequestParam(required = false) String category,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        return new ApiResponse<>(service.getNotifications(role, userId, category, pageable));
    }

    @GetMapping("/unread-count")
    public ApiResponse<Long> getUnreadCount(
            @RequestParam String role,
            @RequestParam String userId) {
        return new ApiResponse<>(service.getUnreadCount(role, userId));
    }

    @PutMapping("/{id}/read")
    public ResponseEntity<ApiResponse<Notification>> markAsRead(@PathVariable String id) {
        return service.markAsRead(id)
                .map(n -> ResponseEntity.ok(new ApiResponse<>(n)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/mark-all-read")
    public ResponseEntity<ApiResponse<Void>> markAllRead(
            @RequestParam String role,
            @RequestParam String userId) {
        service.markAllRead(role, userId);
        return ResponseEntity.ok(new ApiResponse<>(null));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteNotification(@PathVariable String id) {
        service.deleteNotification(id);
        return ResponseEntity.ok(new ApiResponse<>(null));
    }
}
