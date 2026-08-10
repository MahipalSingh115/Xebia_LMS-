package com.lms.backend.learning.module;

import java.util.List;
import java.util.Map;

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
import com.lms.backend.learning.module.dto.ModuleRequest;
import com.lms.backend.learning.module.dto.ModuleResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/modules")
@CrossOrigin(origins = "*")
@Tag(name = "Module", description = "Module APIs")
public class ModuleController {

    private final ModuleService service;

    public ModuleController(ModuleService service) {
        this.service = service;
    }

    @Operation(summary = "Get all modules")
    @GetMapping
    public ResponseEntity<ApiResponse<List<ModuleResponse>>> getAllModules(
            @org.springframework.web.bind.annotation.RequestParam(required = false) Long courseId) {
        List<ModuleResponse> data = (courseId != null) 
                ? service.getModulesByCourseId(courseId) 
                : service.getAllModules();
        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "Modules fetched successfully",
                        data,
                        HttpStatus.OK.value()));
    }

    @Operation(summary = "Create module")
    @PostMapping
    public ResponseEntity<ApiResponse<ModuleResponse>> createModule(
            @Valid @RequestBody ModuleRequest request) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ResponseBuilder.success(
                        "Module created successfully",
                        service.createModule(request),
                        HttpStatus.CREATED.value()));
    }

    @Operation(summary = "Update module")
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ModuleResponse>> updateModule(
            @PathVariable @NonNull Long id,
            @Valid @RequestBody ModuleRequest request) {

        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "Module updated successfully",
                        service.updateModule(id, request),
                        HttpStatus.OK.value()));
    }

    @Operation(summary = "Delete module")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteModule(
            @PathVariable @NonNull Long id) {

        service.deleteModule(id);

        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "Module deleted successfully",
                        null,
                        HttpStatus.OK.value()));
    }

    @Operation(summary = "Reorder modules")
    @PutMapping("/reorder")
    public ResponseEntity<ApiResponse<Void>> reorderModules(
            @RequestBody List<Map<String, Long>> reorderList) {

        service.reorderModules(reorderList);

        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "Modules reordered successfully",
                        null,
                        HttpStatus.OK.value()));
    }
}