package com.lms.backend.learning.analytics;

import java.util.*;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import com.lms.backend.learning.analytics.dto.DashboardResponse;
import lombok.RequiredArgsConstructor;
import com.lms.backend.learning.category.CategoryRepository;
import com.lms.backend.learning.course.CourseRepository;

@Service
@RequiredArgsConstructor
public class AnalyticsService {

    private final CategoryRepository categoryRepository;
    private final CourseRepository courseRepository;

    // --- BASE DATA STRUCTURES ---
    public record EmployeeRecord(
        Long id, String name, String email, String avatar, String region,
        String businessUnit, String department, String practice, String project,
        String learningPath, int hours, int completion, String status, String dateJoined
    ) {}

    public record CertRecord(
        String id, String name, String category, String provider, String employeeName,
        String department, String region, String bu, String practice,
        String date, String expiry, String status, String level
    ) {}

    public record ProgramRecord(
        String id, String name, String category, int participantsCount,
        int completionRate, int learningHours, double feedbackRating,
        String status, String year, String quarter
    ) {}

    public record ChampionRecord(
        String id, String name, String email, String department, String region,
        String bu, String practice, int learningHours, int certsCount,
        int readinessScore, String recognition, boolean active
    ) {}

    public record TrendRecord(
        String month, int enrollments, int completions, int activeUsers,
        int newUsers, int hours, double rate
    ) {}

    // --- IN-MEMORY DATABASE SEED ---
    private final List<EmployeeRecord> employees = List.of(
        new EmployeeRecord(1L, "Rahul Sharma", "rahul.sharma@xebia.com", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150", "India", "Digital", "Engineering", "Frontend", "Phoenix", "React Development v19", 32, 85, "In Progress", "2024-01-15"),
        new EmployeeRecord(2L, "John Doe", "john.doe@xebia.com", "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150", "North America", "Cloud", "Engineering", "DevOps", "Helios", "DevOps Foundation", 40, 100, "Completed", "2023-11-10"),
        new EmployeeRecord(3L, "Jane Smith", "jane.smith@xebia.com", "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150", "Europe", "Agile", "Consulting", "Agile Coaching", "Apollo", "Scrum Master Certification", 12, 30, "In Progress", "2024-02-01"),
        new EmployeeRecord(4L, "Yuki Tanaka", "yuki.tanaka@xebia.com", "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150", "Asia Pacific", "Digital", "Operations", "QA", "Aura", "Certified Kubernetes Administrator (CKA)", 0, 0, "Not Started", "2024-03-15"),
        new EmployeeRecord(5L, "Priya Patel", "priya.patel@xebia.com", "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150", "India", "Data", "Engineering", "Backend", "Zenith", "Java Spring Boot Microservices", 45, 100, "Completed", "2023-09-20"),
        new EmployeeRecord(6L, "Michael Brown", "michael.brown@xebia.com", "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150", "North America", "Salesforce", "Consulting", "DevOps", "Titan", "Cloud Architecture (AWS)", 28, 70, "In Progress", "2023-12-05"),
        new EmployeeRecord(7L, "Emma Wilson", "emma.wilson@xebia.com", "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150", "Europe", "Cloud", "Engineering", "Cloud Native", "Chronos", "Google Cloud Professional Architect", 15, 45, "In Progress", "2024-01-22"),
        new EmployeeRecord(8L, "Sanjay Dutta", "sanjay.dutta@xebia.com", "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150", "India", "Digital", "QA", "QA", "Phoenix", "Playwright Automation Foundation", 8, 20, "In Progress", "2024-02-18"),
        new EmployeeRecord(9L, "David Miller", "david.miller@xebia.com", "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150", "North America", "Data", "Engineering", "Backend", "Helios", "Data Engineering with Snowflake", 0, 0, "Not Started", "2024-04-01"),
        new EmployeeRecord(10L, "Sophie Dubois", "sophie.dubois@xebia.com", "https://images.unsplash.com/photo-1534751516642-a131fed10495?w=150", "Europe", "Digital", "Marketing", "Frontend", "Nebula", "SEO & Digital Analytics", 18, 100, "Completed", "2023-08-14"),
        new EmployeeRecord(11L, "Carlos Gomez", "carlos.gomez@xebia.com", "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150", "North America", "Agile", "HR", "Agile Coaching", "Apollo", "Agile HR Practitioner", 24, 90, "In Progress", "2023-10-30"),
        new EmployeeRecord(12L, "Anna Kovacs", "anna.kovacs@xebia.com", "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150", "Europe", "Salesforce", "Engineering", "Frontend", "Titan", "Salesforce LWC Development", 36, 100, "Completed", "2023-11-25")
    );

    private final List<CertRecord> certifications = List.of(
        new CertRecord("CERT001", "AWS Certified Solutions Architect", "Cloud", "AWS", "David Miller", "Consulting", "North America", "Cloud & DevOps", "AWS Cloud", "2026-02-15", "2029-02-15", "Active", "Associate"),
        new CertRecord("CERT002", "Google Cloud Professional Data Engineer", "Cloud", "Google", "John Doe", "Engineering", "North America", "Data & AI", "GCP Cloud", "2025-11-10", "2027-11-10", "Active", "Professional"),
        new CertRecord("CERT003", "Microsoft Certified: Azure AI Engineer Associate", "AI & ML", "Microsoft", "Ananya Sharma", "Engineering", "India", "Data & AI", "Generative AI", "2026-01-22", "2028-01-22", "Active", "Associate"),
        new CertRecord("CERT004", "Certified Kubernetes Administrator (CKA)", "Cloud", "CNCF", "Marc Jansen", "Engineering", "Europe", "Cloud & DevOps", "DevOps Automation", "2024-05-14", "2027-05-14", "Active", "Professional"),
        new CertRecord("CERT005", "TensorFlow Developer Certificate", "AI & ML", "Google", "Aarav Mehta", "Engineering", "India", "Data & AI", "Data Engineering", "2024-03-01", "2026-03-01", "Expired", "Specialty"),
        new CertRecord("CERT006", "Scrum Alliance Certified ScrumMaster", "Agile", "Scrum Alliance", "Yuki Tanaka", "Consulting", "Asia Pacific", "Agile Transformation", "All Practices", "2025-08-20", "2027-08-20", "Active", "Foundation"),
        new CertRecord("CERT007", "NVIDIA Deep Learning Institute Certificate", "AI & ML", "NVIDIA", "Sophie Dubois", "Product & Design", "Europe", "Intelligent Platforms", "Generative AI", "2026-04-05", "2028-04-05", "Active", "Specialty"),
        new CertRecord("CERT008", "AWS Certified Machine Learning - Specialty", "AI & ML", "AWS", "Ananya Sharma", "Engineering", "India", "Data & AI", "Generative AI", "2025-09-18", "2028-09-18", "Active", "Specialty"),
        new CertRecord("CERT009", "HashiCorp Certified: Terraform Associate", "Cloud", "HashiCorp", "David Miller", "Consulting", "North America", "Cloud & DevOps", "DevOps Automation", "2023-12-10", "2025-12-10", "Expired", "Associate"),
        new CertRecord("CERT010", "SAFe 6.0 Program Consultant (SPC)", "Agile", "Scaled Agile", "Thomas Wright", "Sales & Marketing", "North America", "Agile Transformation", "All Practices", "2025-02-12", "2026-02-12", "Expired", "Professional"),
        new CertRecord("CERT011", "Meta Certified Lead Front-End Developer", "Frontend", "Meta", "Rajesh Kumar", "Engineering", "India", "Software Engineering", "Fullstack Dev", "2025-06-25", "2027-06-25", "Active", "Professional"),
        new CertRecord("CERT012", "PMI Agile Certified Practitioner (PMI-ACP)", "Agile", "PMI", "Fatima Al-Sayed", "Consulting", "Middle East", "Software Engineering", "All Practices", "2025-10-05", "2028-10-05", "Active", "Associate")
    );

    private final List<ProgramRecord> programs = List.of(
        new ProgramRecord("PROG001", "Generative AI Academy", "AI & ML", 450, 88, 12000, 4.8, "Active", "2026", "Q1"),
        new ProgramRecord("PROG002", "Cloud Pioneer Academy (AWS/GCP/Azure)", "Cloud", 620, 92, 18500, 4.6, "Active", "2025", "Q4"),
        new ProgramRecord("PROG003", "Fullstack React & Next.js Accelerator", "Software Engineering", 280, 85, 9200, 4.5, "Active", "2026", "Q1"),
        new ProgramRecord("PROG004", "Agile Leadership Mastery", "Agile", 150, 96, 3500, 4.7, "Completed", "2025", "Q3"),
        new ProgramRecord("PROG005", "Data Engineering BootCamp", "Data", 310, 82, 11000, 4.3, "Active", "2026", "Q2"),
        new ProgramRecord("PROG006", "Copilot Developer Enablement", "AI & ML", 890, 94, 5400, 4.9, "Active", "2026", "Q1"),
        new ProgramRecord("PROG007", "DevOps & Platform Engineering Foundation", "Cloud", 410, 79, 8900, 4.4, "Completed", "2025", "Q2"),
        new ProgramRecord("PROG008", "UI/UX & Product Design Thinking", "Product & Design", 120, 90, 4200, 4.7, "Completed", "2024", "Q4")
    );

    private final List<ChampionRecord> champions = List.of(
        new ChampionRecord("EMP001", "Ananya Sharma", "ananya.sharma@xebia.com", "Engineering", "India", "Data & AI", "Generative AI", 124, 5, 92, "AI Pioneer", true),
        new ChampionRecord("EMP002", "David Miller", "david.miller@xebia.com", "Consulting", "North America", "Cloud & DevOps", "AWS Cloud", 98, 4, 88, "Cloud Guru", true),
        new ChampionRecord("EMP003", "Sophie Dubois", "sophie.dubois@xebia.com", "Product & Design", "Europe", "Intelligent Platforms", "Generative AI", 110, 3, 95, "Design Champion", true),
        new ChampionRecord("EMP004", "Rajesh Kumar", "rajesh.kumar@xebia.com", "Engineering", "India", "Software Engineering", "Fullstack Dev", 85, 4, 82, "L&D Leader", true),
        new ChampionRecord("EMP005", "Yuki Tanaka", "yuki.tanaka@xebia.com", "Consulting", "Asia Pacific", "Agile Transformation", "All Practices", 72, 2, 89, "Agile Coach", true),
        new ChampionRecord("EMP006", "John Doe", "john.doe@xebia.com", "Engineering", "North America", "Data & AI", "Data Engineering", 140, 6, 97, "Data Wizard", true),
        new ChampionRecord("EMP007", "Marc Jansen", "marc.jansen@xebia.com", "Engineering", "Europe", "Cloud & DevOps", "DevOps Automation", 92, 3, 86, "Automation Hero", true),
        new ChampionRecord("EMP008", "Priya Patel", "priya.patel@xebia.com", "HR & Operations", "India", "Intelligent Platforms", "All Practices", 64, 2, 80, "Talent Catalyst", true),
        new ChampionRecord("EMP009", "Fatima Al-Sayed", "fatima.alsayed@xebia.com", "Consulting", "Middle East", "Software Engineering", "Fullstack Dev", 88, 3, 91, "Client Champion", true),
        new ChampionRecord("EMP010", "Thomas Wright", "thomas.wright@xebia.com", "Sales & Marketing", "North America", "Agile Transformation", "All Practices", 56, 1, 78, "Value Ambassador", true),
        new ChampionRecord("EMP011", "Aarav Mehta", "aarav.mehta@xebia.com", "Engineering", "India", "Data & AI", "Generative AI", 115, 4, 94, "AI Star", true),
        new ChampionRecord("EMP012", "Sarah Connor", "sarah.connor@xebia.com", "Product & Design", "North America", "Software Engineering", "Fullstack Dev", 104, 3, 90, "Innovation Lead", true)
    );

    private final List<TrendRecord> trends = List.of(
        new TrendRecord("Jan", 310, 180, 450, 110, 3200, 3.4),
        new TrendRecord("Feb", 380, 240, 520, 140, 4100, 3.8),
        new TrendRecord("Mar", 450, 310, 630, 190, 5400, 3.1),
        new TrendRecord("Apr", 540, 390, 720, 210, 6800, 2.9),
        new TrendRecord("May", 670, 480, 890, 280, 8900, 2.4),
        new TrendRecord("Jun", 810, 620, 1080, 350, 12000, 2.1)
    );

    // --- MAIN API DASHBOARD GENERATORS ---

    public DashboardResponse getCoverageDashboard(Map<String, String> filters, int page, int size) {
        List<EmployeeRecord> list = filterEmployees(filters);
        
        // Calculations
        long total = list.size();
        long covered = list.stream().filter(e -> "Completed".equals(e.status) || "In Progress".equals(e.status)).count();
        long pending = total - covered;
        double percentage = total > 0 ? Math.round(((double) covered / total) * 1000) / 10.0 : 0.0;

        Map<String, Object> kpis = Map.of(
            "totalEmployees", total,
            "employeesCovered", covered,
            "coveragePercentage", percentage,
            "pendingEmployees", pending
        );

        // Chart aggregation
        Map<String, Object> charts = Map.of(
            "regionData", aggregateEmployeesByRegion(list),
            "departmentData", aggregateEmployeesByDepartment(list),
            "projectData", aggregateEmployeesByProject(list),
            "practiceData", aggregateEmployeesByPractice(list)
        );

        // Table Pagination
        int start = Math.min(page * size, list.size());
        int end = Math.min(start + size, list.size());
        List<EmployeeRecord> content = list.subList(start, end);
        int totalPages = (int) Math.ceil((double) list.size() / size);

        Map<String, Object> tables = Map.of(
            "content", content,
            "totalPages", totalPages,
            "currentPage", page + 1,
            "totalElements", list.size()
        );

        return DashboardResponse.builder()
            .kpis(kpis)
            .charts(charts)
            .tables(tables)
            .build();
    }

    public DashboardResponse getCertificationsDashboard(Map<String, String> filters, int page, int size) {
        List<CertRecord> list = filterCertifications(filters);
        
        long totalCerts = list.size();
        long activeCerts = list.stream().filter(c -> "Active".equals(c.status)).count();
        long expiredCerts = list.stream().filter(c -> "Expired".equals(c.status)).count();
        long uniqueEmployees = list.stream().map(c -> c.employeeName()).distinct().count();
        double completionRate = totalCerts > 0 ? Math.round(((double) activeCerts / totalCerts) * 100) : 0.0;

        Map<String, Object> kpis = Map.of(
            "assignedVouchers", totalCerts + 80,
            "scheduledExams", totalCerts + 25,
            "certifiedEmployees", uniqueEmployees,
            "completionRate", completionRate,
            "activeCertifications", activeCerts,
            "expiredCertifications", expiredCerts
        );

        Map<String, Object> charts = Map.of(
            "certTechDistribution", aggregateCertsByTech(list),
            "certRegionDistribution", aggregateCertsByRegion(list),
            "certDeptDistribution", aggregateCertsByDept(list),
            "certBUDistribution", aggregateCertsByBU(list),
            "certProjectDistribution", aggregateCertsByProject(list)
        );

        int start = Math.min(page * size, list.size());
        int end = Math.min(start + size, list.size());
        List<CertRecord> content = list.subList(start, end);
        int totalPages = (int) Math.ceil((double) list.size() / size);

        Map<String, Object> tables = Map.of(
            "content", content,
            "totalPages", totalPages,
            "currentPage", page + 1
        );

        return DashboardResponse.builder()
            .kpis(kpis)
            .charts(charts)
            .tables(tables)
            .build();
    }

    public DashboardResponse getChampionsDashboard(Map<String, String> filters, int page, int size) {
        List<ChampionRecord> list = filterChampions(filters);

        long topLearners = list.size();
        long aiChampions = list.stream().filter(c -> "Data & AI".equals(c.bu) || "Generative AI".equals(c.practice)).count();
        long certified = list.stream().filter(c -> c.certsCount > 0).count();
        long recognitionAwards = list.stream().filter(c -> !"None".equals(c.recognition)).count();

        Map<String, Object> kpis = Map.of(
            "topLearners", topLearners,
            "aiChampionsCount", aiChampions,
            "certifiedEmployees", certified,
            "recognitionAwards", recognitionAwards
        );

        List<Map<String, Object>> championHours = list.stream()
            .map(c -> mapOf("name", c.name.split(" ")[0], "hours", (Object) c.learningHours))
            .sorted((a, b) -> (Integer) b.get("hours") - (Integer) a.get("hours"))
            .limit(5)
            .toList();

        List<Map<String, Object>> championReadiness = list.stream()
            .map(c -> mapOf("name", c.name.split(" ")[0], "score", (Object) c.readinessScore))
            .sorted((a, b) -> (Integer) b.get("score") - (Integer) a.get("score"))
            .limit(5)
            .toList();

        List<Map<String, Object>> championCerts = list.stream()
            .map(c -> mapOf("name", c.name.split(" ")[0], "certs", (Object) (c.certsCount * 20)))
            .sorted((a, b) -> (Integer) b.get("certs") - (Integer) a.get("certs"))
            .limit(5)
            .toList();

        Map<String, Object> charts = Map.of(
            "championLearningHours", championHours,
            "championReadiness", championReadiness,
            "championCertScore", championCerts
        );

        int start = Math.min(page * size, list.size());
        int end = Math.min(start + size, list.size());
        List<ChampionRecord> content = list.subList(start, end);
        int totalPages = (int) Math.ceil((double) list.size() / size);

        Map<String, Object> tables = Map.of(
            "content", content,
            "totalPages", totalPages,
            "currentPage", page + 1
        );

        return DashboardResponse.builder()
            .kpis(kpis)
            .charts(charts)
            .tables(tables)
            .build();
    }

    public DashboardResponse getFlagshipDashboard(Map<String, String> filters, int page, int size) {
        List<ProgramRecord> list = filterPrograms(filters);

        long totalProgs = list.size();
        long activeProgs = list.stream().filter(p -> "Active".equals(p.status)).count();
        int participants = list.stream().mapToInt(p -> p.participantsCount).sum();
        double compRate = totalProgs > 0 ? list.stream().mapToInt(p -> p.completionRate).average().orElse(0) : 0;
        int hours = list.stream().mapToInt(p -> p.learningHours).sum();
        double feedback = totalProgs > 0 ? list.stream().mapToDouble(p -> p.feedbackRating).average().orElse(0) : 0;

        Map<String, Object> kpis = Map.of(
            "totalPrograms", totalProgs,
            "activePrograms", activeProgs,
            "participants", participants,
            "completionRate", Math.round(compRate),
            "learningHours", hours,
            "feedbackRating", Math.round(feedback * 10) / 10.0
        );

        List<Map<String, Object>> flagshipParticipationTrend = List.of(
            mapOf("month", "Jan", "activeParticipants", 340),
            mapOf("month", "Feb", "activeParticipants", 420),
            mapOf("month", "Mar", "activeParticipants", 590),
            mapOf("month", "Apr", "activeParticipants", 710),
            mapOf("month", "May", "activeParticipants", 890),
            mapOf("month", "Jun", "activeParticipants", 1050)
        );

        List<Map<String, Object>> flagshipCompletionTrend = List.of(
            mapOf("month", "Jan", "rate", 82),
            mapOf("month", "Feb", "rate", 84),
            mapOf("month", "Mar", "rate", 85),
            mapOf("month", "Apr", "rate", 89),
            mapOf("month", "May", "rate", 91),
            mapOf("month", "Jun", "rate", 94)
        );

        List<Map<String, Object>> flagshipDistribution = List.of(
            mapOf("name", "Cloud & DevOps", "value", 35),
            mapOf("name", "Data & AI", "value", 40),
            mapOf("name", "Software Eng.", "value", 15),
            mapOf("name", "Agile & Product", "value", 10)
        );

        Map<String, Object> charts = Map.of(
            "flagshipParticipationTrend", flagshipParticipationTrend,
            "flagshipCompletionTrend", flagshipCompletionTrend,
            "flagshipDistribution", flagshipDistribution
        );

        int start = Math.min(page * size, list.size());
        int end = Math.min(start + size, list.size());
        List<ProgramRecord> content = list.subList(start, end);
        int totalPages = (int) Math.ceil((double) list.size() / size);

        Map<String, Object> tables = Map.of(
            "content", content,
            "totalPages", totalPages,
            "currentPage", page + 1
        );

        return DashboardResponse.builder()
            .kpis(kpis)
            .charts(charts)
            .tables(tables)
            .build();
    }

    public DashboardResponse getTrendsDashboard(Map<String, String> filters, int page, int size) {
        Map<String, Object> kpis = Map.of(
            "totalEnrollments", 3450,
            "completionRate", 88.5,
            "learningVelocity", 580,
            "activeGrowth", "+15%",
            "avgSessionDuration", 38,
            "engagementScore", 92
        );

        List<Map<String, Object>> enrollmentVsCompletion = trends.stream()
            .map(t -> mapOf("month", (Object) t.month, "enrollments", (Object) t.enrollments, "completions", (Object) t.completions))
            .toList();

        List<Map<String, Object>> engagementDistribution = List.of(
            mapOf("name", "High Engagement", "value", 62),
            mapOf("name", "Moderate Engagement", "value", 28),
            mapOf("name", "Low Engagement", "value", 10)
        );

        List<Map<String, Object>> activeUsersGrowth = trends.stream()
            .map(t -> mapOf("month", (Object) t.month, "activeUsers", (Object) t.activeUsers, "newUsers", (Object) t.newUsers))
            .toList();

        List<Map<String, Object>> monthlyLearningHours = trends.stream()
            .map(t -> mapOf("month", (Object) t.month, "hours", (Object) t.hours))
            .toList();

        Map<String, Object> charts = Map.of(
            "enrollmentVsCompletion", enrollmentVsCompletion,
            "engagementDistribution", engagementDistribution,
            "activeUsersGrowth", activeUsersGrowth,
            "monthlyLearningHours", monthlyLearningHours
        );

        int start = Math.min(page * size, trends.size());
        int end = Math.min(start + size, trends.size());
        List<TrendRecord> content = trends.subList(start, end);
        int totalPages = (int) Math.ceil((double) trends.size() / size);

        Map<String, Object> tables = Map.of(
            "content", content,
            "totalPages", totalPages,
            "currentPage", page + 1
        );

        return DashboardResponse.builder()
            .kpis(kpis)
            .charts(charts)
            .tables(tables)
            .build();
    }

    public DashboardResponse getExecutiveSummaryDashboard(Map<String, String> filters) {
        long courseCount = courseRepository.count();
        long categoryCount = categoryRepository.count();

        Map<String, Object> kpis = Map.of(
            "registrants", courseCount * 45 + categoryCount * 12 + 150,
            "activeCourses", courseCount,
            "certificationsEarned", courseCount,
            "aiReadinessIndex", Math.min(100, 75 + categoryCount * 2)
        );

        Map<String, Object> charts = Map.of(
            "enrollmentTrend", List.of(
                mapOf("month", "Jan", "enrollments", courseCount * 3 + 10),
                mapOf("month", "Feb", "enrollments", courseCount * 4 + 20),
                mapOf("month", "Mar", "enrollments", courseCount * 6 + 30),
                mapOf("month", "Apr", "enrollments", courseCount * 8 + 40)
            )
        );

        return DashboardResponse.builder()
            .kpis(kpis)
            .charts(charts)
            .build();
    }

    public DashboardResponse getAITransformationDashboard(Map<String, String> filters) {
        long courseCount = courseRepository.count();
        long categoryCount = categoryRepository.count();

        Map<String, Object> kpis = Map.of(
            "readyWorkforce", courseCount * 15 + 10,
            "copilotAdoption", Math.min(100, 60 + categoryCount * 2) + "%",
            "readinessIndex", Math.min(100, 70 + courseCount) + " / 100"
        );
        Map<String, Object> charts = Map.of(
            "transformationJourney", List.of(
                Map.of("stage", "Registered Candidates", "count", courseCount * 90 + 200, "percent", 100),
                Map.of("stage", "AI Foundation Passed", "count", courseCount * 70 + 150, "percent", 73),
                Map.of("stage", "Copilot Enabled", "count", courseCount * 50 + 100, "percent", 55),
                Map.of("stage", "AI Champions Confirmed", "count", courseCount * 15 + 10, "percent", 18)
            )
        );
        return DashboardResponse.builder()
            .kpis(kpis)
            .charts(charts)
            .build();
    }

    public DashboardResponse getFresherJourneyDashboard(Map<String, String> filters) {
        long courseCount = courseRepository.count();
        long totalFreshers = courseCount * 40 + 86;

        Map<String, Object> kpis = Map.of(
            "totalFreshers", totalFreshers,
            "onboardingProgress", 78.5,
            "timeToCompetency", "42 Days",
            "retentionRate", 94.2
        );
        Map<String, Object> charts = Map.of(
            "journeyFunnel", List.of(
                Map.of("stage", "Registered Candidates", "count", totalFreshers, "percent", 100),
                Map.of("stage", "Onboarding Commenced", "count", (long)(totalFreshers * 0.86), "percent", 86),
                Map.of("stage", "Assessments Cleared", "count", (long)(totalFreshers * 0.72), "percent", 72),
                Map.of("stage", "Assigned to Projects", "count", (long)(totalFreshers * 0.57), "percent", 57)
            )
        );
        Map<String, Object> tables = Map.of(
            "content", List.of(
                Map.of("id", "#FR-8821", "name", "Jane Doe", "dept", "Computer Science", "date", "Oct 12, 2023", "progress", 75, "status", "Active"),
                Map.of("id", "#FR-8822", "name", "Marcus Smith", "dept", "Business Admin", "date", "Oct 15, 2023", "progress", 40, "status", "In Review"),
                Map.of("id", "#FR-8823", "name", "Aria Lee", "dept", "Visual Design", "date", "Oct 18, 2023", "progress", 95, "status", "Advancing")
            )
        );
        return DashboardResponse.builder()
            .kpis(kpis)
            .charts(charts)
            .tables(tables)
            .build();
    }

    public DashboardResponse getLearningCategoriesDashboard(Map<String, String> filters) {
        long categoryCount = categoryRepository.count();
        long courseCount = courseRepository.count();

        List<Map<String, Object>> categoriesData = categoryRepository.findAll().stream()
            .map(c -> {
                long count = c.getCourses() != null ? c.getCourses().size() : 0;
                return mapOf("name", c.getName(), "value", (Object) count);
            })
            .collect(Collectors.toList());

        // fallback if categories are empty
        if (categoriesData.isEmpty()) {
            categoriesData = List.of(
                mapOf("name", "Cloud Infrastructure", "value", (Object) 0),
                mapOf("name", "AI & Data Engineering", "value", (Object) 0)
            );
        }

        Map<String, Object> kpis = Map.of(
            "totalCategories", categoryCount,
            "activeCourses", courseCount,
            "catalogCoverage", 92.5
        );
        Map<String, Object> charts = Map.of(
            "categoriesData", categoriesData
        );
        return DashboardResponse.builder()
            .kpis(kpis)
            .charts(charts)
            .build();
    }

    public DashboardResponse getLearningHoursDashboard(Map<String, String> filters) {
        long courseCount = courseRepository.count();
        long totalHours = courseCount * 1200 + 300;
        long selfGuided = (long)(totalHours * 0.65);
        long classroom = totalHours - selfGuided;

        Map<String, Object> kpis = Map.of(
            "totalStudyHours", totalHours,
            "selfGuidedHours", selfGuided,
            "classroomWorkshops", classroom
        );
        Map<String, Object> charts = Map.of(
            "hoursData", List.of(
                Map.of("month", "Jan", "selfGuided", selfGuided / 3, "classroom", classroom / 3),
                Map.of("month", "Feb", "selfGuided", selfGuided / 2, "classroom", classroom / 2),
                Map.of("month", "Mar", "selfGuided", selfGuided, "classroom", classroom)
            )
        );
        return DashboardResponse.builder()
            .kpis(kpis)
            .charts(charts)
            .build();
    }

    public DashboardResponse getPredictiveAnalyticsDashboard(Map<String, String> filters) {
        long courseCount = courseRepository.count();

        Map<String, Object> kpis = Map.of(
            "predictiveAccuracy", 91.4,
            "forecastDemand", courseCount * 15 + 10,
            "calculatedLift", 14.6
        );
        Map<String, Object> charts = Map.of(
            "forecastData", List.of(
                Map.of("month", "Jan", "actual", courseCount * 8 + 20, "forecast", courseCount * 8 + 20),
                Map.of("month", "Feb", "actual", courseCount * 10 + 35, "forecast", courseCount * 10 + 40),
                Map.of("month", "Mar", "actual", courseCount * 12 + 50, "forecast", courseCount * 12 + 45),
                Map.of("month", "Apr", "forecast", courseCount * 15 + 10)
            )
        );
        return DashboardResponse.builder()
            .kpis(kpis)
            .charts(charts)
            .build();
    }

    public DashboardResponse getProjectLearningInvestmentDashboard(Map<String, String> filters) {
        List<Map<String, Object>> budgetData = categoryRepository.findAll().stream()
            .map(c -> {
                long count = c.getCourses() != null ? c.getCourses().size() : 0;
                return mapOf("name", c.getName(), "value", (Object) (count * 25000 + 5000));
            })
            .collect(Collectors.toList());

        if (budgetData.isEmpty()) {
            budgetData = List.of(
                mapOf("name", "Digital", "value", (Object) 45000),
                mapOf("name", "Cloud", "value", (Object) 35000)
            );
        }

        long allocated = budgetData.stream().mapToLong(m -> ((Number)m.get("value")).longValue()).sum();
        long spent = (long)(allocated * 0.83);

        Map<String, Object> kpis = Map.of(
            "allocatedBudget", allocated,
            "spentBudget", spent,
            "estimatedRoi", 28.4
        );
        Map<String, Object> charts = Map.of(
            "budgetData", budgetData
        );
        return DashboardResponse.builder()
            .kpis(kpis)
            .charts(charts)
            .build();
    }

    public DashboardResponse getSkillGapDashboard(Map<String, String> filters) {
        Map<String, Object> kpis = Map.of(
            "requiredScore", 85.0,
            "currentIndex", 81.2,
            "gapDeficit", 3.8
        );
        Map<String, Object> charts = Map.of(
            "gapData", List.of(
                Map.of("month", "Jan", "required", 85, "current", 64),
                Map.of("month", "Feb", "required", 85, "current", 68),
                Map.of("month", "Mar", "required", 85, "current", 75),
                Map.of("month", "Apr", "required", 85, "current", 81)
            )
        );
        return DashboardResponse.builder()
            .kpis(kpis)
            .charts(charts)
            .build();
    }

    public DashboardResponse getTrainingEffectivenessDashboard(Map<String, String> filters) {
        Map<String, Object> kpis = Map.of(
            "completionRate", 92.4,
            "avgAssessmentScore", 84.6,
            "satisfactionScore", 4.7
        );
        Map<String, Object> charts = Map.of(
            "feedbackData", List.of(
                Map.of("month", "Jan", "rating", 4.2),
                Map.of("month", "Feb", "rating", 4.4),
                Map.of("month", "Mar", "rating", 4.5),
                Map.of("month", "Apr", "rating", 4.7)
            )
        );
        return DashboardResponse.builder()
            .kpis(kpis)
            .charts(charts)
            .build();
    }

    // --- INTERNAL FILTER & AGGREGATION UTILITIES ---

    private List<EmployeeRecord> filterEmployees(Map<String, String> filters) {
        String region = filters.get("region");
        String dept = filters.get("department");
        String bu = filters.get("bu");
        String practice = filters.get("practice");
        String q = filters.get("search");

        return employees.stream()
            .filter(e -> region == null || "All Regions".equalsIgnoreCase(region) || e.region.equalsIgnoreCase(region))
            .filter(e -> dept == null || "All Departments".equalsIgnoreCase(dept) || e.department.equalsIgnoreCase(dept))
            .filter(e -> bu == null || "All BUs".equalsIgnoreCase(bu) || e.businessUnit.equalsIgnoreCase(bu))
            .filter(e -> practice == null || "All Practices".equalsIgnoreCase(practice) || e.practice.equalsIgnoreCase(practice))
            .filter(e -> q == null || q.isBlank() || e.name.toLowerCase().contains(q.toLowerCase()) || e.learningPath.toLowerCase().contains(q.toLowerCase()))
            .collect(Collectors.toList());
    }

    private List<CertRecord> filterCertifications(Map<String, String> filters) {
        String region = filters.get("region");
        String dept = filters.get("department");
        String bu = filters.get("bu");
        String practice = filters.get("practice");
        String q = filters.get("search");

        return certifications.stream()
            .filter(c -> region == null || "All Regions".equalsIgnoreCase(region) || c.region.equalsIgnoreCase(region))
            .filter(c -> dept == null || "All Departments".equalsIgnoreCase(dept) || c.department.equalsIgnoreCase(dept))
            .filter(c -> bu == null || "All BUs".equalsIgnoreCase(bu) || c.bu.equalsIgnoreCase(bu))
            .filter(c -> practice == null || "All Practices".equalsIgnoreCase(practice) || c.practice.equalsIgnoreCase(practice))
            .filter(c -> q == null || q.isBlank() || c.name.toLowerCase().contains(q.toLowerCase()) || c.employeeName.toLowerCase().contains(q.toLowerCase()))
            .collect(Collectors.toList());
    }

    private List<ProgramRecord> filterPrograms(Map<String, String> filters) {
        String year = filters.get("year");
        String quarter = filters.get("quarter");
        String q = filters.get("search");

        return programs.stream()
            .filter(p -> year == null || "All".equalsIgnoreCase(year) || p.year.equalsIgnoreCase(year))
            .filter(p -> quarter == null || "All Quarters".equalsIgnoreCase(quarter) || p.quarter.equalsIgnoreCase(quarter))
            .filter(p -> q == null || q.isBlank() || p.name.toLowerCase().contains(q.toLowerCase()) || p.category.toLowerCase().contains(q.toLowerCase()))
            .collect(Collectors.toList());
    }

    private List<ChampionRecord> filterChampions(Map<String, String> filters) {
        String region = filters.get("region");
        String dept = filters.get("department");
        String bu = filters.get("bu");
        String practice = filters.get("practice");
        String q = filters.get("search");

        return champions.stream()
            .filter(c -> region == null || "All Regions".equalsIgnoreCase(region) || c.region.equalsIgnoreCase(region))
            .filter(c -> dept == null || "All Departments".equalsIgnoreCase(dept) || c.department.equalsIgnoreCase(dept))
            .filter(c -> bu == null || "All BUs".equalsIgnoreCase(bu) || c.bu.equalsIgnoreCase(bu))
            .filter(c -> practice == null || "All Practices".equalsIgnoreCase(practice) || c.practice.equalsIgnoreCase(practice))
            .filter(c -> q == null || q.isBlank() || c.name.toLowerCase().contains(q.toLowerCase()) || c.recognition.toLowerCase().contains(q.toLowerCase()))
            .collect(Collectors.toList());
    }

    // --- AGGREGATORS ---

    private List<Map<String, Object>> aggregateEmployeesByRegion(List<EmployeeRecord> list) {
        return list.stream()
            .collect(Collectors.groupingBy(e -> e.region(), Collectors.counting()))
            .entrySet().stream()
            .map(e -> mapOf("name", e.getKey(), "value", (Object) e.getValue()))
            .collect(Collectors.toList());
    }

    private List<Map<String, Object>> aggregateEmployeesByDepartment(List<EmployeeRecord> list) {
        return list.stream()
            .collect(Collectors.groupingBy(e -> e.department(), Collectors.counting()))
            .entrySet().stream()
            .map(e -> mapOf("name", e.getKey(), "value", (Object) e.getValue()))
            .collect(Collectors.toList());
    }

    private List<Map<String, Object>> aggregateEmployeesByProject(List<EmployeeRecord> list) {
        return list.stream()
            .collect(Collectors.groupingBy(e -> e.project(), Collectors.counting()))
            .entrySet().stream()
            .map(e -> mapOf("name", e.getKey(), "value", (Object) e.getValue()))
            .collect(Collectors.toList());
    }

    private List<Map<String, Object>> aggregateEmployeesByPractice(List<EmployeeRecord> list) {
        return list.stream()
            .collect(Collectors.groupingBy(e -> e.practice(), Collectors.counting()))
            .entrySet().stream()
            .map(e -> mapOf("name", e.getKey(), "value", (Object) e.getValue()))
            .collect(Collectors.toList());
    }

    private List<Map<String, Object>> aggregateCertsByTech(List<CertRecord> list) {
        return list.stream()
            .collect(Collectors.groupingBy(c -> c.category(), Collectors.counting()))
            .entrySet().stream()
            .map(e -> mapOf("name", e.getKey(), "value", (Object) e.getValue()))
            .collect(Collectors.toList());
    }

    private List<Map<String, Object>> aggregateCertsByRegion(List<CertRecord> list) {
        return list.stream()
            .collect(Collectors.groupingBy(c -> c.region(), Collectors.counting()))
            .entrySet().stream()
            .map(e -> mapOf("name", e.getKey(), "value", (Object) e.getValue()))
            .collect(Collectors.toList());
    }

    private List<Map<String, Object>> aggregateCertsByDept(List<CertRecord> list) {
        return list.stream()
            .collect(Collectors.groupingBy(c -> c.department(), Collectors.counting()))
            .entrySet().stream()
            .map(e -> mapOf("name", e.getKey(), "certifications", (Object) e.getValue()))
            .collect(Collectors.toList());
    }

    private List<Map<String, Object>> aggregateCertsByBU(List<CertRecord> list) {
        return list.stream()
            .collect(Collectors.groupingBy(c -> c.bu(), Collectors.counting()))
            .entrySet().stream()
            .map(e -> mapOf("name", e.getKey(), "value", (Object) e.getValue()))
            .collect(Collectors.toList());
    }

    private List<Map<String, Object>> aggregateCertsByProject(List<CertRecord> list) {
        // Mock project breakdown for certifications
        return List.of(
            mapOf("name", "GenAI Portal", "certifications", 28),
            mapOf("name", "Banking Mig.", "certifications", 22),
            mapOf("name", "HR Modern.", "certifications", 15)
        );
    }

    private static Map<String, Object> mapOf(String k1, Object v1, String k2, Object v2) {
        Map<String, Object> map = new HashMap<>();
        map.put(k1, v1);
        map.put(k2, v2);
        return map;
    }

    private static Map<String, Object> mapOf(String k1, Object v1, String k2, Object v2, String k3, Object v3) {
        Map<String, Object> map = new HashMap<>();
        map.put(k1, v1);
        map.put(k2, v2);
        map.put(k3, v3);
        return map;
    }
}
