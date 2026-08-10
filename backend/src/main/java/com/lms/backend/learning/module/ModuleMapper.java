package com.lms.backend.learning.module;

import org.springframework.stereotype.Component;

import com.lms.backend.learning.course.Course;
import com.lms.backend.learning.module.dto.ModuleRequest;
import com.lms.backend.learning.module.dto.ModuleResponse;

@Component
public class ModuleMapper {

    public Module toEntity(ModuleRequest request, Course course) {

        if (request == null) {
            return null;
        }

        Module module = new Module();
        module.setTitle(request.getTitle());
        module.setDescription(request.getDescription());
        module.setSortOrder(request.getSortOrder() != null ? request.getSortOrder() : 0);
        module.setCourse(course);

        return module;
    }

    public ModuleResponse toResponse(Module module) {

        if (module == null) {
            return null;
        }

        return new ModuleResponse(
                module.getId(),
                module.getTitle(),
                module.getDescription(),
                module.getSortOrder(),
                module.getCourse().getId(),
                module.getCourse().getTitle()
        );
    }

    public void updateEntity(
            Module module,
            ModuleRequest request,
            Course course) {

        module.setTitle(request.getTitle());
        module.setDescription(request.getDescription());
        if (request.getSortOrder() != null) {
            module.setSortOrder(request.getSortOrder());
        }
        module.setCourse(course);
    }
}