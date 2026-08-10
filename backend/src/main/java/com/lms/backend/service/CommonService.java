package com.lms.backend.service;

import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import com.lms.backend.exception.ResourceNotFoundException;
import com.lms.backend.learning.category.Category;
import com.lms.backend.learning.category.CategoryRepository;

@Service
public class CommonService {

    private final CategoryRepository categoryRepository;

    public CommonService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public Category getCategory(@NonNull Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Category not found"));
    }
}