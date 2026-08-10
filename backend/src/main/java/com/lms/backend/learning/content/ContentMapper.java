package com.lms.backend.learning.content;

import org.springframework.stereotype.Component;

import com.lms.backend.learning.content.dto.ContentRequest;
import com.lms.backend.learning.content.dto.ContentResponse;
import com.lms.backend.learning.submodule.SubModule;

@Component
public class ContentMapper {

    public Content toEntity(ContentRequest request, SubModule subModule) {

        if (request == null) {
            return null;
        }

        Content content = new Content();
        content.setTitle(request.getTitle());
        content.setContent(request.getContent());
        content.setVideoUrl(request.getVideoUrl());
        content.setPdfUrl(request.getPdfUrl());
        content.setBlockType(request.getBlockType());
        content.setImageUrl(request.getImageUrl());
        content.setSubModule(subModule);

        return content;
    }

    public ContentResponse toResponse(Content content) {

        if (content == null) {
            return null;
        }

        return new ContentResponse(
                content.getId(),
                content.getTitle(),
                content.getContent(),
                content.getVideoUrl(),
                content.getPdfUrl(),
                content.getBlockType(),
                content.getImageUrl(),
                content.getSubModule().getId(),
                content.getSubModule().getTitle()
        );
    }

    public void updateEntity(
            Content content,
            ContentRequest request,
            SubModule subModule) {

        content.setTitle(request.getTitle());
        content.setContent(request.getContent());
        content.setVideoUrl(request.getVideoUrl());
        content.setPdfUrl(request.getPdfUrl());
        content.setBlockType(request.getBlockType());
        content.setImageUrl(request.getImageUrl());
        content.setSubModule(subModule);
    }
}