package com.lms.backend.learning.submodule;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import com.lms.backend.exception.ResourceAlreadyExistsException;
import com.lms.backend.exception.ResourceNotFoundException;
import com.lms.backend.learning.module.Module;
import com.lms.backend.learning.module.ModuleRepository;
import com.lms.backend.learning.submodule.dto.SubModuleRequest;
import com.lms.backend.learning.submodule.dto.SubModuleResponse;

import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class SubModuleService {

    private static final Logger log = LoggerFactory.getLogger(SubModuleService.class);

    private final SubModuleRepository repository;
    private final ModuleRepository moduleRepository;
    private final SubModuleMapper mapper;

    public SubModuleService(
            SubModuleRepository repository,
            ModuleRepository moduleRepository,
            SubModuleMapper mapper) {

        this.repository = repository;
        this.moduleRepository = moduleRepository;
        this.mapper = mapper;
    }

    // TODO: Add role-based visibility filtering once Spring Security auth is implemented.
    public List<SubModuleResponse> getAllSubModules() {
        return repository.findAll()
                .stream()
                .map(mapper::toResponse)
                .collect(Collectors.toList());
    }

    public List<SubModuleResponse> getSubModulesByModuleId(Long moduleId) {
        return repository.findByModule_IdOrderBySortOrderAsc(moduleId)
                .stream()
                .map(mapper::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public SubModuleResponse createSubModule(SubModuleRequest request) {

        if (repository.existsByTitleAndModule_Id(request.getTitle(), request.getModuleId())) {
            throw new ResourceAlreadyExistsException("Submodule with this title already exists in this module");
        }

        Module module = moduleRepository.findById(Objects.requireNonNull(request.getModuleId()))
                .orElseThrow(() ->
                        new ResourceNotFoundException("Module not found"));

        log.info("Creating submodule {}", request.getTitle());

        SubModule entity = mapper.toEntity(request, module);
        SubModule saved = repository.save(Objects.requireNonNull(entity));

        return mapper.toResponse(saved);
    }

    @Transactional
    public SubModuleResponse updateSubModule(
            @NonNull Long id,
            SubModuleRequest request) {

        SubModule existing = repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("SubModule not found"));

        Module module = moduleRepository.findById(Objects.requireNonNull(request.getModuleId()))
                .orElseThrow(() ->
                        new ResourceNotFoundException("Module not found"));

        mapper.updateEntity(existing, request, module);

        SubModule updated = repository.save(Objects.requireNonNull(existing));
        return mapper.toResponse(updated);
    }

    @Transactional
    public void deleteSubModule(@NonNull Long id) {
        repository.deleteById(id);
    }

    @Transactional
    public void reorderSubModules(List<Map<String, Long>> reorderList) {
        for (Map<String, Long> item : reorderList) {
            Long subModuleId = item.get("id");
            Long sortOrderLong = item.get("sortOrder");
            if (subModuleId == null || sortOrderLong == null) continue;

            SubModule subModule = repository.findById(subModuleId).orElse(null);
            if (subModule != null) {
                subModule.setSortOrder(sortOrderLong.intValue());
                repository.save(subModule);
            }
        }
    }
}