package com.lms.backend.learning.module;

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
import com.lms.backend.learning.course.Course;
import com.lms.backend.learning.course.CourseRepository;
import com.lms.backend.learning.module.dto.ModuleRequest;
import com.lms.backend.learning.module.dto.ModuleResponse;

import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class ModuleService {

    private static final Logger log = LoggerFactory.getLogger(ModuleService.class);

    private final ModuleRepository repository;
    private final CourseRepository courseRepository;
    private final ModuleMapper mapper;

    public ModuleService(
            ModuleRepository repository,
            CourseRepository courseRepository,
            ModuleMapper mapper) {

        this.repository = repository;
        this.courseRepository = courseRepository;
        this.mapper = mapper;
    }

    // TODO: Add role-based visibility filtering once Spring Security auth is implemented.
    public List<ModuleResponse> getAllModules() {
        return repository.findAll()
                .stream()
                .map(mapper::toResponse)
                .collect(Collectors.toList());
    }

    public List<ModuleResponse> getModulesByCourseId(Long courseId) {
        return repository.findByCourse_IdOrderBySortOrderAsc(courseId)
                .stream()
                .map(mapper::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public ModuleResponse createModule(ModuleRequest request) {

        if (repository.existsByTitleAndCourse_Id(request.getTitle(), request.getCourseId())) {
            throw new ResourceAlreadyExistsException("Module with this title already exists in this course");
        }

        Course course = courseRepository.findById(Objects.requireNonNull(request.getCourseId()))
                .orElseThrow(() -> new ResourceNotFoundException("Course not found"));

        log.info("Creating module {}", request.getTitle());

        Module entity = mapper.toEntity(request, course);
        Module saved = repository.save(Objects.requireNonNull(entity));

        return mapper.toResponse(saved);
    }

    @Transactional
    public ModuleResponse updateModule(
            @NonNull Long id,
            ModuleRequest request) {

        Module existing = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Module not found"));

        Course course = courseRepository.findById(Objects.requireNonNull(request.getCourseId()))
                .orElseThrow(() -> new ResourceNotFoundException("Course not found"));

        mapper.updateEntity(existing, request, course);

        Module updated = repository.save(Objects.requireNonNull(existing));
        return mapper.toResponse(updated);
    }

    @Transactional
    public void deleteModule(@NonNull Long id) {
        repository.deleteById(id);
    }

    @Transactional
    public void reorderModules(List<Map<String, Long>> reorderList) {
        for (Map<String, Long> item : reorderList) {
            Long moduleId = item.get("id");
            Long sortOrderLong = item.get("sortOrder");
            if (moduleId == null || sortOrderLong == null) continue;

            Module module = repository.findById(moduleId).orElse(null);
            if (module != null) {
                module.setSortOrder(sortOrderLong.intValue());
                repository.save(module);
            }
        }
    }
}