package com.lms.backend.role;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

/**
 * Seeds the four default LMS roles into the database on every application startup.
 *
 * <p>The operation is <strong>idempotent</strong>: a role is only inserted when a record
 * with the same name does not already exist, so restarting the application never creates
 * duplicates.
 *
 * <p>{@code @Order(1)} ensures this runner fires before the general {@link com.lms.backend.config.StartupRunner}
 * so that roles are available as soon as the application is ready.
 */
@Component
@Order(1)
public class RoleInitializer implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(RoleInitializer.class);

    /**
     * Default roles with their descriptions.
     */
    private static final String[][] DEFAULT_ROLES = {
            {"ADMIN",   "System Administrator"},
            {"MANAGER", "Learning Manager"},
            {"TRAINER", "Course Trainer"},
            {"STUDENT", "LMS Student"},
    };

    private final RoleRepository roleRepository;

    public RoleInitializer(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public void run(String... args) {
        log.info("--- Role Initializer: checking default roles ---");

        int created = 0;
        int skipped = 0;

        for (String[] entry : DEFAULT_ROLES) {
            String name        = entry[0];
            String description = entry[1];

            if (roleRepository.existsByName(name)) {
                log.debug("Role '{}' already exists — skipping.", name);
                skipped++;
            } else {
                Role role = Role.builder()
                        .name(name)
                        .description(description)
                        .build();
                roleRepository.save(role);
                log.info("Created default role: '{}'", name);
                created++;
            }
        }

        log.info("--- Role Initializer complete: {} created, {} skipped ---", created, skipped);
    }
}
