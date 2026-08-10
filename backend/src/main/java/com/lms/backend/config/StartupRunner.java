package com.lms.backend.config;

import java.sql.Connection;
import java.util.List;

import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.lms.backend.learning.course.Course;
import com.lms.backend.learning.course.CourseRepository;
import com.lms.backend.learning.module.Module;
import com.lms.backend.learning.submodule.SubModule;
import com.lms.backend.learning.content.Content;
import com.lms.backend.notification.NotificationService;

@Component
@Order(2)
public class StartupRunner implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(StartupRunner.class);

    private final DataSource dataSource;
    private final CourseRepository courseRepository;
    private final NotificationService notificationService;

    public StartupRunner(DataSource dataSource, CourseRepository courseRepository, NotificationService notificationService) {
        this.dataSource = dataSource;
        this.courseRepository = courseRepository;
        this.notificationService = notificationService;
    }

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        // Seed default notifications for initial testing
        if (notificationService.getUnreadCount("student", "s4") == 0) {
            notificationService.createNotification("s4", "student", "reminder", "ClipboardList", "Upcoming Deadline: Advanced Data Structures", "Your final project is due tomorrow at 11:59 PM. Don't forget to submit.");
            notificationService.createNotification("s4", "student", "system", "Megaphone", "Platform Maintenance Scheduled", "Lumina Learning will be down for scheduled maintenance on Sunday, 2 AM - 4 AM EST.");
            notificationService.createNotification("s4", "student", "community", "MessageSquare", "New Discussion Reply", "Sarah Jenkins replied to your post in 'Ethical AI Principles'.");
        }
        if (notificationService.getUnreadCount("trainer", "t1") == 0) {
            notificationService.createNotification("t1", "trainer", "reminder", "ClipboardList", "Batch 3 Submissions Pending", "There are 12 assignments pending grading in Advanced UI Design.");
            notificationService.createNotification("t1", "trainer", "system", "Megaphone", "New Trainer Portal Policy", "Please review the updated grading timeline guidelines in Trainer settings.");
        }
        if (notificationService.getUnreadCount("manager", "m1") == 0) {
            notificationService.createNotification("m1", "manager", "reminder", "ClipboardList", "Pending Enrollment Approvals", "You have 5 student enrollment requests awaiting your approval.");
            notificationService.createNotification("m1", "manager", "system", "Megaphone", "Quarterly Learning Review", "The Q3 learning progress report has been generated. Please review.");
        }
        if (notificationService.getUnreadCount("admin", "a1") == 0) {
            notificationService.createNotification("a1", "admin", "system", "Megaphone", "System Security Update", "All security protocols have been successfully updated. No action required.");
            notificationService.createNotification("a1", "admin", "reminder", "ClipboardList", "Sync Status Report", "Daily workspace sync was successfully completed.");
        }

        try (Connection connection = dataSource.getConnection()) {

            log.info("========================================");
            log.info("XEBIA LMS BACKEND STARTED");
            log.info("Database : {}", connection.getCatalog());
            log.info("Status   : RUNNING");
            log.info("URL      : http://localhost:8080");
            log.info("========================================");

            log.info("Verifying entity hierarchy and checking for N+1 query issue...");
            List<Course> courses = courseRepository.findAllWithCategory();
            
            int moduleCount = 0;
            int submoduleCount = 0;
            int contentCount = 0;

            for (Course course : courses) {
                List<Module> modules = course.getModules();
                if (modules != null) {
                    moduleCount += modules.size();
                    for (Module module : modules) {
                        List<SubModule> submodules = module.getSubModules();
                        if (submodules != null) {
                            submoduleCount += submodules.size();
                            for (SubModule submodule : submodules) {
                                List<Content> contents = submodule.getContents();
                                if (contents != null) {
                                    contentCount += contents.size();
                                }
                            }
                        }
                    }
                }
            }

            log.info("--- STARTUP VERIFICATION SUMMARY ---");
            log.info("Courses    : {}", courses.size());
            log.info("Modules    : {}", moduleCount);
            log.info("Submodules : {}", submoduleCount);
            log.info("Contents   : {}", contentCount);
            log.info("------------------------------------");

        } catch (Exception e) {

            log.error("DATABASE CONNECTION OR VERIFICATION FAILED");
            log.error(e.getMessage(), e);

        }

    }
}