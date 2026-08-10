package com.lms.backend.learning.category;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import io.swagger.v3.oas.annotations.Operation;
import com.lms.backend.common.response.ApiResponse;
import com.lms.backend.common.response.ResponseBuilder;
import com.lms.backend.learning.category.dto.CategoryRequest;
import com.lms.backend.learning.category.dto.CategoryResponse;
import org.springframework.web.bind.annotation.ModelAttribute;
import jakarta.validation.Valid;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "Category", description = "Category Management APIs")
@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "*")
public class CategoryController {

    private final CategoryService service;

    public CategoryController(CategoryService service) {
        this.service = service;
    }

    @Operation(summary = "Get all categories")
    @GetMapping
    public ResponseEntity<ApiResponse<List<CategoryResponse>>> getAllCategories() {
        return ResponseEntity.ok(
            ResponseBuilder.success("Categories fetched successfully", service.getAllCategories(), 200)
        );
    }
    @Operation(
        summary = "Get category by ID",
        description = "Fetches a category using its unique ID"
    )
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CategoryResponse>> getCategoryById(@PathVariable @NonNull Long id) {
    return ResponseEntity.ok(
        ResponseBuilder.success(
            "Category fetched successfully",
            service.getCategoryById(id),
            HttpStatus.OK.value()
        )
        );
    }

    @Operation(summary = "Create category")
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<CategoryResponse>> createCategory(
            @ModelAttribute @Valid CategoryRequest request,
            @RequestParam(value = "image", required = false) MultipartFile imageFile) {

        return ResponseEntity.status(HttpStatus.CREATED)
            .body(ResponseBuilder.success(
                "Category created successfully",
                service.createCategory(request, imageFile),
                HttpStatus.CREATED.value()
            ));
    }

    @Operation(summary = "Update category")
    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<CategoryResponse>> updateCategory(
            @PathVariable @NonNull Long id,
            @ModelAttribute @Valid CategoryRequest request,
            @RequestParam(value = "image", required = false) MultipartFile imageFile) {

        return ResponseEntity.ok(
            ResponseBuilder.success(
                "Category updated successfully",
                service.updateCategory(id, request, imageFile),
                HttpStatus.OK.value()
            )
        );
    }

    @Operation(summary = "Delete category")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteCategory(@PathVariable @NonNull Long id) {
        service.deleteCategory(id);
        return ResponseEntity.ok(
            ResponseBuilder.success("Category deleted successfully", null, HttpStatus.OK.value())
        );
    }
}