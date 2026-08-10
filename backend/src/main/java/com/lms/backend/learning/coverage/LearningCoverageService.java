package com.lms.backend.learning.coverage;

import com.lms.backend.learning.coverage.dto.ChartDataResponse;
import com.lms.backend.learning.coverage.dto.CoverageChartsResponse;
import com.lms.backend.learning.coverage.dto.CoverageSummaryResponse;
import com.lms.backend.learning.coverage.dto.CoverageTableResponse;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class LearningCoverageService {

    public CoverageSummaryResponse getCoverageSummary() {

        return new CoverageSummaryResponse(
                12,
                10,
                83.3,
                2
        );
    }

    public CoverageChartsResponse getCoverageCharts() {

        List<ChartDataResponse> regionData = Arrays.asList(
                new ChartDataResponse("India", 4),
                new ChartDataResponse("AMER", 4),
                new ChartDataResponse("EMEA", 4)
        );

        List<ChartDataResponse> departmentData = Arrays.asList(
                new ChartDataResponse("Engineering", 6),
                new ChartDataResponse("Consulting", 3),
                new ChartDataResponse("QA", 2),
                new ChartDataResponse("Marketing", 1)
        );

        List<ChartDataResponse> projectData = Arrays.asList(
                new ChartDataResponse("Phoenix", 2),
                new ChartDataResponse("Helios", 2),
                new ChartDataResponse("Apollo", 2),
                new ChartDataResponse("Titan", 2)
        );

        List<ChartDataResponse> practiceData = Arrays.asList(
                new ChartDataResponse("Frontend", 3),
                new ChartDataResponse("Backend", 2),
                new ChartDataResponse("DevOps", 2),
                new ChartDataResponse("QA", 2)
        );

        return new CoverageChartsResponse(
                regionData,
                departmentData,
                projectData,
                practiceData
        );
    }

    public List<CoverageTableResponse> getCoverageTable(
        String search,
        String region,
        String businessUnit,
        String department,
        String practice,
        String datePreset
) {

    List<CoverageTableResponse> employees = Arrays.asList(

            new CoverageTableResponse(
                    1L,
                    "Rahul Sharma",
                    "rahul.sharma@xebia.com",
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
                    "India",
                    "Digital",
                    "Engineering",
                    "Frontend",
                    "Phoenix",
                    "React Development v19",
                    32,
                    85,
                    "In Progress",
                    "2024-01-15"
            ),

            new CoverageTableResponse(
                    2L,
                    "John Doe",
                    "john.doe@xebia.com",
                    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
                    "AMER",
                    "Cloud",
                    "Engineering",
                    "DevOps",
                    "Helios",
                    "DevOps Foundation",
                    40,
                    100,
                    "Completed",
                    "2023-11-10"
            ),

            new CoverageTableResponse(
                    3L,
                    "Jane Smith",
                    "jane.smith@xebia.com",
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
                    "EMEA",
                    "Agile",
                    "Consulting",
                    "Agile Coaching",
                    "Apollo",
                    "Scrum Master Certification",
                    12,
                    30,
                    "In Progress",
                    "2024-02-01"
            )
    );

    return employees.stream()

            // Search Filter
            .filter(emp -> {

                if (search == null || search.isBlank()) {
                    return true;
                }

                String query = search.toLowerCase();

                return emp.getName().toLowerCase().contains(query)
                        || emp.getEmail().toLowerCase().contains(query)
                        || emp.getProject().toLowerCase().contains(query)
                        || emp.getLearningPath().toLowerCase().contains(query);
            })

            // Region Filter
            .filter(emp -> {

                if (region == null || region.equalsIgnoreCase("All")) {
                    return true;
                }

                return emp.getRegion().equalsIgnoreCase(region);
            })

            // Business Unit Filter
            .filter(emp -> {

                if (businessUnit == null || businessUnit.equalsIgnoreCase("All")) {
                    return true;
                }

                return emp.getBusinessUnit().equalsIgnoreCase(businessUnit);
            })

            // Department Filter
            .filter(emp -> {

                if (department == null || department.equalsIgnoreCase("All")) {
                    return true;
                }

                return emp.getDepartment().equalsIgnoreCase(department);
            })

            // Practice Filter
            .filter(emp -> {

                if (practice == null || practice.equalsIgnoreCase("All")) {
                    return true;
                }

                return emp.getPractice().equalsIgnoreCase(practice);
            })

            // Date Filter
            .filter(emp -> {

                if (datePreset == null || datePreset.equalsIgnoreCase("All")) {
                    return true;
                }

                if (datePreset.equalsIgnoreCase("This Year")) {
                    return emp.getDateJoined().startsWith("2024");
                }

                if (datePreset.equalsIgnoreCase("Last Year")) {
                    return emp.getDateJoined().startsWith("2023");
                }

                return true;
            })

            .toList();
        }
}