package com.lms.backend.learning.content;

import com.lms.backend.learning.content.dto.ContentRequest;
import com.lms.backend.learning.content.dto.ContentResponse;
import com.lms.backend.learning.submodule.SubModule;
import com.lms.backend.learning.submodule.SubModuleRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.Spy;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SuppressWarnings("null")
public class ContentServiceTest {

    @Mock
    private ContentRepository contentRepository;

    @Mock
    private SubModuleRepository subModuleRepository;

    @Spy
    private ContentMapper contentMapper = new ContentMapper();

    @InjectMocks
    private ContentService contentService;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testCreateContent_Success() {
        // Arrange
        SubModule subModule = new SubModule();
        subModule.setId(1L);
        subModule.setTitle("Introduction");

        ContentRequest request = new ContentRequest();
        request.setSubModuleId(1L);
        request.setTitle("Video Lecture");
        request.setBlockType("video");
        request.setVideoUrl("https://example.com/video.mp4");

        when(subModuleRepository.findById(1L)).thenReturn(Optional.of(subModule));
        when(contentRepository.save(any(Content.class))).thenAnswer(invocation -> {
            Content c = invocation.getArgument(0);
            c.setId(100L); // simulate auto-generated DB id
            return c;
        });

        // Act
        ContentResponse response = contentService.createContent(request);

        // Assert
        assertNotNull(response);
        assertEquals(100L, response.getId());
        assertEquals("Video Lecture", response.getTitle());
        assertEquals("video", response.getBlockType());
        assertEquals("https://example.com/video.mp4", response.getVideoUrl());
        assertEquals(1L, response.getSubModuleId());
        verify(contentRepository, times(1)).save(any(Content.class));
    }

    @Test
    public void testUpdateContent_Success() {
        // Arrange
        SubModule subModule = new SubModule();
        subModule.setId(1L);
        subModule.setTitle("Introduction");

        Content existing = new Content();
        existing.setId(100L);
        existing.setTitle("Old Title");
        existing.setBlockType("text");
        existing.setContent("Old Content");
        existing.setSubModule(subModule);

        ContentRequest request = new ContentRequest();
        request.setSubModuleId(1L);
        request.setTitle("New Title");
        request.setBlockType("text");
        request.setContent("New Content");

        when(contentRepository.findById(100L)).thenReturn(Optional.of(existing));
        when(subModuleRepository.findById(1L)).thenReturn(Optional.of(subModule));
        when(contentRepository.save(any(Content.class))).thenAnswer(invocation -> invocation.getArgument(0));

        // Act
        ContentResponse response = contentService.updateContent(100L, request);

        // Assert
        assertNotNull(response);
        assertEquals(100L, response.getId());
        assertEquals("New Title", response.getTitle());
        assertEquals("New Content", response.getContent());
        verify(contentRepository, times(1)).save(existing);
    }
}
