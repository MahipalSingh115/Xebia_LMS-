package com.lms.backend.learning.category;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.lms.backend.exception.ResourceAlreadyExistsException;
import com.lms.backend.exception.ResourceNotFoundException;
import com.lms.backend.learning.category.dto.CategoryRequest;
import com.lms.backend.learning.category.dto.CategoryResponse;


import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional(readOnly = true)
public class CategoryService {

    private final CategoryRepository repository;
    private final CategoryMapper mapper;
    private static final Logger log = LoggerFactory.getLogger(CategoryService.class);

    public CategoryService(CategoryRepository repository, CategoryMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    public List<CategoryResponse> getAllCategories() {
        return repository.findAll()
                .stream()
                .map(mapper::toResponse)
                .collect(Collectors.toList());
    }
    /**
     * @param id
     * @return
     */
    public CategoryResponse getCategoryById(@NonNull Long id) {

        Category category = repository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
            return mapper.toResponse(category);
    }

    @Transactional
    public CategoryResponse createCategory(CategoryRequest request, MultipartFile imageFile) {

        if (repository.existsByName(request.getName())) {
            throw new ResourceAlreadyExistsException("Category already exists");
        }

        byte[] imageBytes = extractBytes(imageFile);
        Category category = mapper.toEntity(request, imageBytes);
        log.info("Creating category: {}", request.getName());
        Category saved = repository.save(Objects.requireNonNull(category));
        log.info("Category created with ID: {}", saved.getId());

        return mapper.toResponse(saved);
    }

    @Transactional
    public CategoryResponse updateCategory(@NonNull Long id, CategoryRequest request, MultipartFile imageFile) {

        log.info("Updating category {}", id);
        Category existing = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
        if (!existing.getName().equals(request.getName())
            && repository.existsByName(request.getName())) {
                throw new ResourceAlreadyExistsException("Category already exists");
            }
        byte[] imageBytes = extractBytes(imageFile);
        mapper.updateEntity(existing, request, imageBytes);
        Category updated = repository.save(Objects.requireNonNull(existing));
        log.info("Category {} updated successfully", id);

        return mapper.toResponse(updated);
    }

    @Transactional
    public void deleteCategory(@NonNull Long id) {
        log.info("Deleting category {}", id);
        Category category = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
        repository.delete(Objects.requireNonNull(category));
        log.info("Category {} deleted successfully", id);
    }

    // ─── helpers ───────────────────────────────────────────────────────────────

    private byte[] extractBytes(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            return null;
        }
        try {
            return file.getBytes();
        } catch (Exception e) {
            log.warn("Failed to read image bytes: {}", e.getMessage());
            return null;
        }
    }
}