package com.lms.backend.learning.content;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import com.lms.backend.exception.ResourceNotFoundException;
import com.lms.backend.learning.content.dto.ContentRequest;
import com.lms.backend.learning.content.dto.ContentResponse;
import com.lms.backend.learning.submodule.SubModule;
import com.lms.backend.learning.submodule.SubModuleRepository;

import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class ContentService {

    private static final Logger log = LoggerFactory.getLogger(ContentService.class);

    private final ContentRepository repository;
    private final SubModuleRepository subModuleRepository;
    private final ContentMapper mapper;

    public ContentService(
            ContentRepository repository,
            SubModuleRepository subModuleRepository,
            ContentMapper mapper) {

        this.repository = repository;
        this.subModuleRepository = subModuleRepository;
        this.mapper = mapper;
    }

    // TODO: Add role-based visibility filtering once Spring Security auth is implemented.
    public List<ContentResponse> getAllContents() {
        return repository.findAll()
                .stream()
                .map(mapper::toResponse)
                .collect(Collectors.toList());
    }

    public List<ContentResponse> getContentsBySubModuleId(Long subModuleId) {
        return repository.findBySubModule_IdOrderByIdAsc(subModuleId)
                .stream()
                .map(mapper::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public ContentResponse createContent(ContentRequest request) {

        SubModule subModule = subModuleRepository.findById(Objects.requireNonNull(request.getSubModuleId()))
                .orElseThrow(() -> new ResourceNotFoundException("SubModule not found"));

        log.info("Creating content '{}' (type={}) for submodule {}", request.getTitle(), request.getBlockType(), request.getSubModuleId());

        Content entity = mapper.toEntity(request, subModule);
        Content saved = repository.save(Objects.requireNonNull(entity));

        return mapper.toResponse(saved);
    }

    @Transactional
    public ContentResponse updateContent(
            @NonNull Long id,
            ContentRequest request) {

        Content existing = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Content not found"));

        SubModule subModule = subModuleRepository.findById(Objects.requireNonNull(request.getSubModuleId()))
                .orElseThrow(() -> new ResourceNotFoundException("SubModule not found"));

        mapper.updateEntity(existing, request, subModule);

        Content updated = repository.save(Objects.requireNonNull(existing));
        return mapper.toResponse(updated);
    }

    @Transactional
    public void deleteContent(@NonNull Long id) {
        repository.deleteById(id);
    }
}