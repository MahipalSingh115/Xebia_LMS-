package com.lms.backend.learning.content.dto;

public class ContentResponse {

    private Long id;
    private String title;
    private String content;
    private String videoUrl;
    private String pdfUrl;
    private String blockType;
    private String imageUrl;
    private Long subModuleId;
    private String subModuleTitle;

    public ContentResponse() {}

    public ContentResponse(
            Long id,
            String title,
            String content,
            String videoUrl,
            String pdfUrl,
            String blockType,
            String imageUrl,
            Long subModuleId,
            String subModuleTitle) {

        this.id = id;
        this.title = title;
        this.content = content;
        this.videoUrl = videoUrl;
        this.pdfUrl = pdfUrl;
        this.blockType = blockType;
        this.imageUrl = imageUrl;
        this.subModuleId = subModuleId;
        this.subModuleTitle = subModuleTitle;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public String getVideoUrl() { return videoUrl; }
    public void setVideoUrl(String videoUrl) { this.videoUrl = videoUrl; }

    public String getPdfUrl() { return pdfUrl; }
    public void setPdfUrl(String pdfUrl) { this.pdfUrl = pdfUrl; }

    public String getBlockType() { return blockType; }
    public void setBlockType(String blockType) { this.blockType = blockType; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public Long getSubModuleId() { return subModuleId; }
    public void setSubModuleId(Long subModuleId) { this.subModuleId = subModuleId; }

    public String getSubModuleTitle() { return subModuleTitle; }
    public void setSubModuleTitle(String subModuleTitle) { this.subModuleTitle = subModuleTitle; }
}