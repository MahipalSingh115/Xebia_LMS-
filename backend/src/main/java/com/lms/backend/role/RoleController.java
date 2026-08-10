package com.lms.backend.role;

import com.lms.backend.common.response.ApiResponse;
import com.lms.backend.common.response.ResponseBuilder;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for Role management.
 *
 * <p>All endpoints return the project's standard {@link ApiResponse} envelope via
 * {@link ResponseBuilder} — consistent with the {@code GlobalExceptionHandler} format.
 *
 * <p>Base path: {@code /api/roles}
 */
@RestController
@RequestMapping("/api/roles")
public class RoleController {

    private final RoleService roleService;

    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    // -----------------------------------------------------------------------
    // GET /api/roles
    // -----------------------------------------------------------------------

    /**
     * Retrieve all roles.
     *
     * @return 200 OK with a list of all roles
     */
    @GetMapping
    public ResponseEntity<ApiResponse<List<RoleResponse>>> getAllRoles() {
        List<RoleResponse> roles = roleService.getAllRoles();
        return ResponseEntity.ok(
                ResponseBuilder.success("Roles retrieved successfully", roles, HttpStatus.OK.value()));
    }

    // -----------------------------------------------------------------------
    // GET /api/roles/{id}
    // -----------------------------------------------------------------------

    /**
     * Retrieve a single role by its ID.
     *
     * @param id the role primary key
     * @return 200 OK with the matching role, or 404 if not found (handled globally)
     */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<RoleResponse>> getRoleById(@PathVariable("id") Long id) {
        RoleResponse role = roleService.getRoleById(id);
        return ResponseEntity.ok(
                ResponseBuilder.success("Role retrieved successfully", role, HttpStatus.OK.value()));
    }

    // -----------------------------------------------------------------------
    // POST /api/roles
    // -----------------------------------------------------------------------

    /**
     * Create a new role.
     *
     * @param request validated role creation payload
     * @return 201 Created with the persisted role
     */
    @PostMapping
    public ResponseEntity<ApiResponse<RoleResponse>> createRole(
            @Valid @RequestBody RoleRequest request) {
        RoleResponse created = roleService.createRole(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ResponseBuilder.success("Role created successfully", created, HttpStatus.CREATED.value()));
    }

    // -----------------------------------------------------------------------
    // PUT /api/roles/{id}
    // -----------------------------------------------------------------------

    /**
     * Update an existing role by its ID.
     *
     * @param id      the role primary key
     * @param request validated update payload
     * @return 200 OK with the updated role
     */
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<RoleResponse>> updateRole(
            @PathVariable("id") Long id,
            @Valid @RequestBody RoleRequest request) {
        RoleResponse updated = roleService.updateRole(id, request);
        return ResponseEntity.ok(
                ResponseBuilder.success("Role updated successfully", updated, HttpStatus.OK.value()));
    }

    // -----------------------------------------------------------------------
    // DELETE /api/roles/{id}
    // -----------------------------------------------------------------------

    /**
     * Delete a role by its ID.
     *
     * @param id the role primary key
     * @return 200 OK with a confirmation message
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteRole(@PathVariable("id") Long id) {
        roleService.deleteRole(id);
        return ResponseEntity.ok(
                ResponseBuilder.success("Role deleted successfully", null, HttpStatus.OK.value()));
    }
}
