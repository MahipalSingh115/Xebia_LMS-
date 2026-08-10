package com.lms.backend.learning.student;

import java.util.*;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lms.backend.learning.category.Category;
import com.lms.backend.learning.category.CategoryRepository;
import com.lms.backend.learning.course.Course;
import com.lms.backend.learning.course.CourseRepository;
import com.lms.backend.learning.student.dto.CertificateResponse;
import com.lms.backend.learning.student.dto.GradeResponse;
import com.lms.backend.learning.student.dto.StudentAnalyticsResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class StudentService {

    private final CourseRepository courseRepository;
    private final CategoryRepository categoryRepository;
    private final StudentRepository studentRepository;

    public List<GradeResponse> getGrades() {
        List<Course> courses = courseRepository.findAll();
        if (courses.isEmpty()) {
            return Collections.emptyList();
        }

        return courses.stream().map(course -> {
            int offset = course.getId().intValue();
            String grade = calculateGrade(offset);
            int percentage = 80 + (offset % 19);
            int credits = course.getModules() != null ? Math.max(1, course.getModules().size()) : 3;
            String semester = "Semester " + (1 + (offset % 6));
            String academicYear = (2024 - (offset % 3)) + "-" + (2025 - (offset % 3));
            String status = "Draft".equalsIgnoreCase(course.getStatus()) ? "In Progress" : "Completed";
            String instructor = course.getCategory() != null ? course.getCategory().getName() + " Faculty" : "LMS Faculty";

            return GradeResponse.builder()
                .id(course.getId())
                .course(course.getTitle())
                .instructor(instructor)
                .grade(grade)
                .percentage(percentage)
                .credits(credits)
                .semester(semester)
                .academicYear(academicYear)
                .status(status)
                .build();
        }).collect(Collectors.toList());
    }

    public List<CertificateResponse> getCertificates() {
        List<Course> courses = courseRepository.findAll();
        return courses.stream()
            .filter(c -> c.isHasCertificate())
            .map(course -> {
                int offset = course.getId().intValue();
                String date = "October " + (10 + (offset % 20)) + ", 2024";
                List<String> tags = new ArrayList<>();
                if (course.getDifficulty() != null) tags.add(course.getDifficulty());
                if (course.getLanguage() != null) tags.add(course.getLanguage());

                return CertificateResponse.builder()
                    .id("LL-" + (40000 + offset))
                    .title(course.getTitle())
                    .date(date)
                    .type("Course Completion")
                    .tags(tags)
                    .build();
            }).collect(Collectors.toList());
    }

    public StudentAnalyticsResponse getAnalytics() {
        List<GradeResponse> grades = getGrades();
        List<Category> categories = categoryRepository.findAll();
        
        // Fetch student profile stats from database
        Optional<Student> studentOpt = studentRepository.findAll().stream().findFirst();
        double currentGpa = studentOpt.map(s -> s.getGpa()).orElse(3.8);
        int streak = studentOpt.map(s -> s.getStudyStreak()).orElse(14);
        String name = studentOpt.map(s -> s.getName()).orElse("Alex");

        // 1. Trend Data
        List<Map<String, Object>> trendData = List.of(
            Map.of("name", "Jan", "performance", 75),
            Map.of("name", "Feb", "performance", 78),
            Map.of("name", "Mar", "performance", 80),
            Map.of("name", "Apr", "performance", 85),
            Map.of("name", "May", "performance", 84),
            Map.of("name", "Jun", "performance", 89)
        );

        // 2. Attendance Data
        List<Map<String, Object>> attendanceData = List.of(
            Map.of("name", "Present", "value", 94, "color", "#01AC9F"),
            Map.of("name", "Absent", "value", 6, "color", "#E2E8F0")
        );

        // 3. Marks Data (based on actual db courses)
        List<Map<String, Object>> marksData = grades.stream()
            .limit(5)
            .map(g -> Map.of(
                "subject", g.getCourse().length() > 10 ? g.getCourse().substring(0, 10) : g.getCourse(),
                "score", (Object) g.getPercentage(),
                "color", (Object) "#6C1D5F"
            ))
            .collect(Collectors.toList());
        if (marksData.isEmpty()) {
            marksData = List.of(
                Map.of("subject", "Coding", "score", 88, "color", "#6C1D5F"),
                Map.of("subject", "UX Design", "score", 94, "color", "#84117C")
            );
        }

        // 4. Skills Data (based on actual db categories)
        List<Map<String, Object>> skillsData = categories.stream()
            .limit(5)
            .map(c -> Map.of(
                "subject", c.getName().length() > 8 ? c.getName().substring(0, 8) : c.getName(),
                "A", (Object) (100 + (c.getName().hashCode() % 45)),
                "fullMark", (Object) 150
            ))
            .collect(Collectors.toList());
        if (skillsData.isEmpty()) {
            skillsData = List.of(
                Map.of("subject", "Logic", "A", 120, "fullMark", 150),
                Map.of("subject", "Design", "A", 140, "fullMark", 150)
            );
        }

        // 5. KPIs
        int totalCreditsEarned = grades.stream()
            .filter(g -> "Completed".equals(g.getStatus()))
            .mapToInt(g -> g.getCredits())
            .sum();

        int creditsTotal = 120;
        double pct = totalCreditsEarned * 100.0 / creditsTotal;
        String creditsPercent = String.format("%.1f%%", pct);

        Map<String, Object> kpis = Map.of(
            "gpa", currentGpa,
            "gpaDiff", "+0.2",
            "credits", totalCreditsEarned,
            "creditsTotal", creditsTotal,
            "creditsPercent", creditsPercent,
            "studyStreak", streak
        );

        // 6. Insights
        String catNames = categories.stream().map(c -> c.getName()).collect(Collectors.joining(", "));
        String performanceText = "Welcome back, " + name + "! Your consistent performance in your enrolled courses suggests a strong academic aptitude. "
            + "With active categories like [" + (catNames.isEmpty() ? "General Studies" : catNames) + "], "
            + "consider focusing your upcoming term electives on these subject areas.";

        Map<String, Object> insights = Map.of("performanceText", performanceText);

        return StudentAnalyticsResponse.builder()
            .trendData(trendData)
            .attendanceData(attendanceData)
            .marksData(marksData)
            .skillsData(skillsData)
            .kpis(kpis)
            .insights(insights)
            .build();
    }

    private String calculateGrade(int offset) {
        String[] grades = {"A+", "A", "A-", "B+", "B", "B-", "C+"};
        return grades[offset % grades.length];
    }
}
