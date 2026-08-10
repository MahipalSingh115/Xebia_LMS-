package com.lms.backend.role;

import com.lms.backend.exception.ResourceAlreadyExistsException;
import com.lms.backend.exception.ResourceNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service layer for Role management.
 *
 * <p>Business rules enforced here:
 * <ul>
 *   <li>Role names are normalized (trimmed + uppercased) before persistence.</li>
 *   <li>Duplicate role names are rejected with a {@link ResourceAlreadyExistsException}.</li>
 *   <li>All lookups by ID raise {@link ResourceNotFoundException} when the record is missing.</li>
 * </ul>
 *
 * <p>Constructor injection is used throughout (no {@code @Autowired} on fields).
 */
@Service
@Transactional(readOnly = true)
public class RoleService {

    private static final Logger log = LoggerFactory.getLogger(RoleService.class);

    private final RoleRepository roleRepository;
    private final RoleMapper roleMapper;

    public RoleService(RoleRepository roleRepository, RoleMapper roleMapper) {
        this.roleRepository = roleRepository;
        this.roleMapper = roleMapper;
    }

    // -----------------------------------------------------------------------
    // Read operations
    // -----------------------------------------------------------------------

    /**
     * Return all roles sorted by ID ascending.
     */
    public List<RoleResponse> getAllRoles() {
        return roleRepository.findAll()
                .stream()
                .map(roleMapper::toResponse)
                .toList();
    }

    /**
     * Return a single role by its primary key.
     *
     * @throws ResourceNotFoundException when no role with the given id exists
     */
    public RoleResponse getRoleById(Long id) {
        Role role = findByIdOrThrow(id);
        return roleMapper.toResponse(role);
    }

    // -----------------------------------------------------------------------
    // Write operations
    // -----------------------------------------------------------------------

    /**
     * Create a new role.
     *
     * @throws ResourceAlreadyExistsException when the normalized name already exists
     */
    @Transactional
    public RoleResponse createRole(RoleRequest request) {
        String normalizedName = request.getName().trim().toUpperCase();

        if (roleRepository.existsByName(normalizedName)) {
            throw new ResourceAlreadyExistsException(
                    "Role with name '" + normalizedName + "' already exists");
        }

        Role role = roleMapper.toEntity(request);
        Role saved = roleRepository.save(role);

        log.info("Created role: id={}, name={}", saved.getId(), saved.getName());
        return roleMapper.toResponse(saved);
    }

    /**
     * Update an existing role by id.
     *
     * @throws ResourceNotFoundException      when the role is not found
     * @throws ResourceAlreadyExistsException when the new name conflicts with another role
     */
    @Transactional
    public RoleResponse updateRole(Long id, RoleRequest request) {
        Role existing = findByIdOrThrow(id);

        String normalizedName = request.getName().trim().toUpperCase();

        // Allow keeping the same name, but reject conflicts with OTHER roles
        if (!existing.getName().equals(normalizedName)
                && roleRepository.existsByName(normalizedName)) {
            throw new ResourceAlreadyExistsException(
                    "Role with name '" + normalizedName + "' already exists");
        }

        roleMapper.updateEntity(request, existing);
        Role saved = roleRepository.save(existing);

        log.info("Updated role: id={}, name={}", saved.getId(), saved.getName());
        return roleMapper.toResponse(saved);
    }

    /**
     * Delete a role by id.
     *
     * @throws ResourceNotFoundException when the role is not found
     */
    @Transactional
    public void deleteRole(Long id) {
        Role role = findByIdOrThrow(id);
        roleRepository.delete(role);
        log.info("Deleted role: id={}, name={}", role.getId(), role.getName());
    }

    // -----------------------------------------------------------------------
    // Internal helpers
    // -----------------------------------------------------------------------

    private Role findByIdOrThrow(Long id) {
        return roleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Role not found with id: " + id));
    }
}
