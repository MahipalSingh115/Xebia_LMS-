package com.lms.backend.learning.submodule;

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
import com.lms.backend.learning.submodule.dto.SubModuleRequest;
import com.lms.backend.learning.submodule.dto.SubModuleResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/submodules")
@CrossOrigin(origins = "*")
@Tag(name = "SubModule", description = "SubModule APIs")
public class SubModuleController {

    private final SubModuleService service;

    public SubModuleController(SubModuleService service) {
        this.service = service;
    }

    @Operation(summary = "Get all submodules")
    @GetMapping
    public ResponseEntity<ApiResponse<List<SubModuleResponse>>> getAllSubModules(
            @org.springframework.web.bind.annotation.RequestParam(required = false) Long moduleId) {
        List<SubModuleResponse> data = (moduleId != null)
                ? service.getSubModulesByModuleId(moduleId)
                : service.getAllSubModules();
        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "SubModules fetched successfully",
                        data,
                        HttpStatus.OK.value()));
    }

    @Operation(summary = "Create submodule")
    @PostMapping
    public ResponseEntity<ApiResponse<SubModuleResponse>> createSubModule(
            @Valid @RequestBody SubModuleRequest request) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ResponseBuilder.success(
                        "SubModule created successfully",
                        service.createSubModule(request),
                        HttpStatus.CREATED.value()));
    }

    @Operation(summary = "Update submodule")
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<SubModuleResponse>> updateSubModule(
            @PathVariable @NonNull Long id,
            @Valid @RequestBody SubModuleRequest request) {

        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "SubModule updated successfully",
                        service.updateSubModule(id, request),
                        HttpStatus.OK.value()));
    }

    @Operation(summary = "Delete submodule")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteSubModule(
            @PathVariable @NonNull Long id) {

        service.deleteSubModule(id);

        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "SubModule deleted successfully",
                        null,
                        HttpStatus.OK.value()));
    }

    @Operation(summary = "Reorder submodules")
    @PutMapping("/reorder")
    public ResponseEntity<ApiResponse<Void>> reorderSubModules(
            @RequestBody List<Map<String, Long>> reorderList) {

        service.reorderSubModules(reorderList);

        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "SubModules reordered successfully",
                        null,
                        HttpStatus.OK.value()));
    }
}