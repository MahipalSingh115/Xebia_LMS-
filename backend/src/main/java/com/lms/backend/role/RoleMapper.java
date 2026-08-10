package com.lms.backend.role;

import org.springframework.stereotype.Component;

/**
 * Mapper for converting between {@link Role} entity, {@link RoleRequest}, and {@link RoleResponse}.
 * Kept as a plain Spring component to avoid additional framework dependencies.
 */
@Component
public class RoleMapper {

    /**
     * Map a {@link RoleRequest} to a new {@link Role} entity.
     * The name is trimmed and uppercased as per business rules.
     *
     * @param request the incoming request DTO
     * @return a new Role entity (id and audit fields not set yet)
     */
    public Role toEntity(RoleRequest request) {
        return Role.builder()
                .name(normalizeName(request.getName()))
                .description(request.getDescription() != null ? request.getDescription().trim() : null)
                .build();
    }

    /**
     * Map a {@link Role} entity to a {@link RoleResponse} DTO.
     *
     * @param role the persisted Role entity
     * @return the corresponding response DTO
     */
    public RoleResponse toResponse(Role role) {
        return RoleResponse.builder()
                .id(role.getId())
                .name(role.getName())
                .description(role.getDescription())
                .createdAt(role.getCreatedAt())
                .updatedAt(role.getUpdatedAt())
                .build();
    }

    /**
     * Apply fields from a {@link RoleRequest} onto an existing {@link Role} entity in place.
     * Used for PUT (full update) operations.
     *
     * @param request the incoming update DTO
     * @param role    the existing entity to update
     */
    public void updateEntity(RoleRequest request, Role role) {
        role.setName(normalizeName(request.getName()));
        role.setDescription(request.getDescription() != null ? request.getDescription().trim() : null);
    }

    /**
     * Trim and uppercase a role name.
     */
    private String normalizeName(String name) {
        return name.trim().toUpperCase();
    }
}
