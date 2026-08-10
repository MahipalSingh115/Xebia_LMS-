package com.lms.backend.event;

import com.lms.backend.common.ApiResponse;
import com.lms.backend.exception.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/events")
@SuppressWarnings("null")
public class EventController {

    @Autowired
    private EventService eventService;

    @Value("${app.upload.dir:uploads}")
    private String uploadDir;

    @PostMapping("/upload-image")
    public ResponseEntity<ApiResponse<Map<String, String>>> uploadImage(
            @RequestParam("file") MultipartFile file) throws IOException {
        
        try {
            if (file.isEmpty()) {
                throw new BadRequestException("File is empty");
            }

            // Validate size: max 5MB (5 * 1024 * 1024 bytes)
            if (file.getSize() > 5 * 1024 * 1024) {
                throw new BadRequestException("File size exceeds the 5MB limit");
            }

            // Validate file type
            String contentType = file.getContentType();
            String originalFilename = file.getOriginalFilename();
            String extension = "";
            if (originalFilename != null && originalFilename.contains(".")) {
                extension = originalFilename.substring(originalFilename.lastIndexOf(".")).toLowerCase();
            }

            boolean isValidType = false;
            if (contentType != null && (contentType.equals("image/jpeg") || contentType.equals("image/png") || 
                                        contentType.equals("image/gif") || contentType.equals("image/webp"))) {
                isValidType = true;
            } else if (extension.equals(".jpg") || extension.equals(".jpeg") || extension.equals(".png") || 
                       extension.equals(".gif") || extension.equals(".webp")) {
                isValidType = true;
            }

            if (!isValidType) {
                throw new BadRequestException("Only JPEG, PNG, GIF, and WEBP image files are allowed");
            }

            // Create upload directory if it doesn't exist
            String targetDir = uploadDir != null ? uploadDir : "uploads";
            Path uploadPath = Paths.get(targetDir).toAbsolutePath().normalize();
            Files.createDirectories(uploadPath);

            // Generate unique filename to avoid collisions
            String uniqueFilename = UUID.randomUUID().toString() + extension;

            // Save the file
            Path targetPath = uploadPath.resolve(uniqueFilename);
            Files.copy(file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);

            // Return the URL that can be used to access the file
            String fileUrl = "/uploads/" + uniqueFilename;

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ApiResponse<>(Map.of("url", fileUrl)));
        } catch (Exception e) {
            e.printStackTrace();
            if (e instanceof BadRequestException) {
                throw (BadRequestException) e;
            }
            throw new BadRequestException("DEBUG_ERROR: " + e.getClass().getName() + " - " + e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Event>> createEvent(@RequestBody Event event) {
        Event created = eventService.createEvent(event);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse<>(created));
    }

    @GetMapping
    public ApiResponse<Page<Event>> getEvents(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "DESC") String direction) {
        Sort sort = Sort.by(Sort.Direction.fromString(direction), sortBy);
        Pageable pageable = PageRequest.of(page, size, sort);
        return new ApiResponse<>(eventService.getEventsPaginated(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Event>> getEventById(@PathVariable String id) {
        return eventService.getEventById(id)
                .map(event -> ResponseEntity.ok(new ApiResponse<>(event)))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Event>> updateEvent(@PathVariable String id, @RequestBody Event event) {
        return eventService.updateEvent(id, event)
                .map(updated -> ResponseEntity.ok(new ApiResponse<>(updated)))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Boolean>> deleteEvent(@PathVariable String id) {
        boolean deleted = eventService.deleteEvent(id);
        if (deleted) {
            return ResponseEntity.ok(new ApiResponse<>(true));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse<>(false));
    }

    @PostMapping("/{id}/register")
    public ResponseEntity<ApiResponse<EventRegistration>> registerStudent(
            @PathVariable String id,
            @RequestParam(required = false) String studentId,
            @RequestBody(required = false) Map<String, String> body) {
        
        String targetStudentId = studentId;
        if ((targetStudentId == null || targetStudentId.trim().isEmpty()) && body != null) {
            targetStudentId = body.get("studentId");
        }

        if (targetStudentId == null || targetStudentId.trim().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse<>(null));
        }

        EventRegistration registration = eventService.registerStudent(id, targetStudentId);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse<>(registration));
    }

    @GetMapping("/{id}/registrations")
    public ResponseEntity<ApiResponse<List<EventRegistrationDto>>> getRegistrations(@PathVariable String id) {
        List<EventRegistrationDto> registrations = eventService.getRegistrationsForEvent(id);
        return ResponseEntity.ok(new ApiResponse<>(registrations));
    }
}
