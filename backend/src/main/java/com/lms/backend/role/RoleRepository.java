package com.lms.backend.role;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository for the {@link Role} entity.
 */
@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

    /**
     * Find a role by its exact name (case-sensitive).
     *
     * @param name the role name to search for
     * @return an Optional containing the matching Role, or empty if none found
     */
    Optional<Role> findByName(String name);

    /**
     * Check whether a role with the given name already exists.
     *
     * @param name the role name to check
     * @return true if a role with that name exists, false otherwise
     */
    boolean existsByName(String name);
}
