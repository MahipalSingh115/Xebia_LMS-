package com.lms.backend.learning.content;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lms.backend.common.response.ApiResponse;
import com.lms.backend.common.response.ResponseBuilder;
import com.lms.backend.learning.content.dto.ContentRequest;
import com.lms.backend.learning.content.dto.ContentResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/contents")
@CrossOrigin(origins = "*")
@Tag(name = "Content", description = "Content APIs")
public class ContentController {

    private final ContentService service;

    public ContentController(ContentService service) {
        this.service = service;
    }

    @Operation(summary = "Get all contents")
    @GetMapping
    public ResponseEntity<ApiResponse<List<ContentResponse>>> getAllContents(
            @org.springframework.web.bind.annotation.RequestParam(required = false) Long subModuleId) {
        List<ContentResponse> data = (subModuleId != null)
                ? service.getContentsBySubModuleId(subModuleId)
                : service.getAllContents();
        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "Contents fetched successfully",
                        data,
                        HttpStatus.OK.value()));
    }

    @Operation(summary = "Create content")
    @PostMapping
    public ResponseEntity<ApiResponse<ContentResponse>> createContent(
            @Valid @RequestBody ContentRequest request) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ResponseBuilder.success(
                        "Content created successfully",
                        service.createContent(request),
                        HttpStatus.CREATED.value()));
    }

    @Operation(summary = "Update content")
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ContentResponse>> updateContent(
            @PathVariable @NonNull Long id,
            @Valid @RequestBody ContentRequest request) {

        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "Content updated successfully",
                        service.updateContent(id, request),
                        HttpStatus.OK.value()));
    }

    @Operation(summary = "Delete content")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteContent(
            @PathVariable @NonNull Long id) {

        service.deleteContent(id);

        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "Content deleted successfully",
                        null,
                        HttpStatus.OK.value()));
    }
}