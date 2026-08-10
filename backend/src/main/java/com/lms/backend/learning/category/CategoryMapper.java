package com.lms.backend.learning.category;

import org.springframework.stereotype.Component;

import com.lms.backend.learning.category.dto.CategoryRequest;
import com.lms.backend.learning.category.dto.CategoryResponse;

@Component
public class CategoryMapper {

    public Category toEntity(CategoryRequest request, byte[] imageBytes) {

        if (request == null) {
            return null;
        }

        Category category = new Category();
        category.setName(request.getName());
        category.setDescription(request.getDescription());
        category.setImage(imageBytes);
        category.setPublishState(request.getPublishState());
        category.setStatus(request.getStatus());
        
        category.setSlug(request.getSlug());
        category.setParentCat(request.getParentCat());
        category.setEmoji(request.getEmoji());
        category.setAccentColor(request.getAccentColor());
        category.setLongDesc(request.getLongDesc());
        category.setVisibleCatalog(request.getVisibleCatalog() != null ? request.getVisibleCatalog() : true);
        category.setFeatured(request.getFeatured() != null ? request.getFeatured() : false);
        category.setAllowEnroll(request.getAllowEnroll() != null ? request.getAllowEnroll() : true);
        category.setShowNav(request.getShowNav() != null ? request.getShowNav() : false);
        category.setMetaTitle(request.getMetaTitle());
        category.setMetaDesc(request.getMetaDesc());
        category.setFocusKeyword(request.getFocusKeyword());
        category.setTags(request.getTags());

        return category;
    }

    public CategoryResponse toResponse(Category category) {

        if (category == null) {
            return null;
        }

        return new CategoryResponse(
            category.getId(),
            category.getName(),
            category.getDescription(),
            category.getImage(),
            category.getPublishState(),
            category.getStatus(),
            category.getSlug(),
            category.getParentCat(),
            category.getEmoji(),
            category.getAccentColor(),
            category.getLongDesc(),
            category.isVisibleCatalog(),
            category.isFeatured(),
            category.isAllowEnroll(),
            category.isShowNav(),
            category.getMetaTitle(),
            category.getMetaDesc(),
            category.getFocusKeyword(),
            category.getTags() != null ? new java.util.ArrayList<>(category.getTags()) : null,
            category.getCreatedAt(),
            category.getUpdatedAt()
        );
    }

    public void updateEntity(Category category, CategoryRequest request, byte[] imageBytes) {

        category.setName(request.getName());
        category.setDescription(request.getDescription());
        
        category.setSlug(request.getSlug());
        category.setParentCat(request.getParentCat());
        category.setEmoji(request.getEmoji());
        category.setAccentColor(request.getAccentColor());
        category.setLongDesc(request.getLongDesc());
        if (request.getVisibleCatalog() != null) category.setVisibleCatalog(request.getVisibleCatalog());
        if (request.getFeatured() != null) category.setFeatured(request.getFeatured());
        if (request.getAllowEnroll() != null) category.setAllowEnroll(request.getAllowEnroll());
        if (request.getShowNav() != null) category.setShowNav(request.getShowNav());
        category.setMetaTitle(request.getMetaTitle());
        category.setMetaDesc(request.getMetaDesc());
        category.setFocusKeyword(request.getFocusKeyword());
        category.setTags(request.getTags());

        // Only overwrite image if a new file was uploaded
        if (imageBytes != null && imageBytes.length > 0) {
            category.setImage(imageBytes);
        }

        if (request.getStatus() != null && !request.getStatus().isBlank()) {
            category.setStatus(request.getStatus());
        }
        category.setPublishState(request.getPublishState());
    }
}