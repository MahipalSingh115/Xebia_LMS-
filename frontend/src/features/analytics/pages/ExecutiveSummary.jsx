import React, { useState, useEffect } from "react";
import { LayoutDashboard, Users, BookOpen, Award, Brain, Sparkles } from "lucide-react";
import { useAnalyticsFilters } from "../context/AnalyticsFilterContext";
import analyticsService from "../services/analyticsService";
import AnalyticsPageLayout from "../components/AnalyticsPageLayout";
import AnalyticsSection from "../components/AnalyticsSection";
import AnalyticsKpiCard from "../components/AnalyticsKpiCard";
import AnalyticsCard from "../components/AnalyticsCard";
import AnalyticsChart from "../components/AnalyticsChart";

export default function ExecutiveSummary() {
  const { filters } = useAnalyticsFilters();
  const [data, setData] = useState(null);

  // UI Status
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Dev Simulators
  const [simLoading, setSimLoading] = useState(false);
  const [simError, setSimError] = useState(false);
  const [simEmpty, setSimEmpty] = useState(false);

  const fetchDashboard = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await analyticsService.getExecutiveSummaryDashboard(filters);
      setData(response);
    } catch (err) {
      console.error(err);
      setError("Failed to retrieve executive metrics.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, [filters]);

  const kpis = data?.kpis || {};
  const charts = data?.charts || {};

  return (
    <AnalyticsPageLayout
      title="Executive Summary Dashboard"
      description="View overall learning analytics, delivery reaches, and corporate intelligence insights."
      breadcrumbs={[{ label: "Executive Summary" }]}
      isLoading={loading || simLoading}
      isError={error !== null || simError}
      isEmpty={simEmpty}
      onRetry={fetchDashboard}
      simulateLoading={simLoading}
      setSimulateLoading={setSimLoading}
      simulateError={simError}
      setSimulateError={setSimError}
      simulateEmpty={simEmpty}
      setSimulateEmpty={setSimEmpty}
    >
      {/* Reach & Delivery Cards */}
      <AnalyticsSection id="organization-overview">
        <div className="pb-2 border-b border-[#d5c1cc]/20 mb-4 select-none">
          <h3 className="text-base font-extrabold text-[#6C1D5F] tracking-tight">Organization Overview</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <AnalyticsKpiCard
            title="Total Registrants"
            value={kpis.registrants}
            icon={Users}
            type="primary"
            tooltip="Total users registered in the LMS"
          />
          <AnalyticsKpiCard
            title="Active Courses"
            value={kpis.activeCourses}
            icon={BookOpen}
            type="info"
            tooltip="Active curriculum courses published in directory"
          />
          <AnalyticsKpiCard
            title="Certifications Earned"
            value={kpis.certificationsEarned}
            icon={Award}
            type="success"
            tooltip="Total certified employees"
          />
          <AnalyticsKpiCard
            title="AI Readiness Index"
            value={kpis.aiReadinessIndex}
            suffix="%"
            icon={Brain}
            type="warning"
            tooltip="Composite readiness capability index"
          />
        </div>
      </AnalyticsSection>

      {/* Enrollment Overview */}
      <AnalyticsSection id="enrollment-overview">
        <div className="pb-2 border-b border-[#d5c1cc]/20 mb-4 select-none">
          <h3 className="text-base font-extrabold text-[#6C1D5F] tracking-tight">Enrollment & Engagement Trends</h3>
        </div>
        <div className="grid grid-cols-1 gap-6">
          <AnalyticsCard title="Active Enrollment Trend" subtitle="Monthly course registrations overview">
            <AnalyticsChart type="area" data={charts.enrollmentTrend} xKey="month" series={[{ key: "enrollments", color: "#6C1D5F", name: "Registrants" }]} />
          </AnalyticsCard>
        </div>
      </AnalyticsSection>

      {/* Insights */}
      <AnalyticsSection id="executive-insights">
        <div className="bg-[#6C1D5F] text-white rounded-3xl p-6 shadow-sm flex flex-col justify-between select-none">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles size={20} className="text-white" />
            <h3 className="text-lg font-bold">Executive Insights</h3>
          </div>
          <div className="space-y-4 text-xs font-semibold leading-relaxed">
            <div className="flex gap-3">
              <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white shrink-0" />
              <p>AI adoption across operational teams has increased by 15% following the launch of the Generative AI Academy program.</p>
            </div>
            <div className="flex gap-3">
              <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white shrink-0" />
              <p>Certification exam schedule rates indicate a strong pipeline for GCP and AWS cloud certifications in Q3.</p>
            </div>
            <div className="flex gap-3">
              <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white shrink-0" />
              <p>Course completion velocities are currently averaging 42 days, aligning with corporate benchmark parameters.</p>
            </div>
          </div>
        </div>
      </AnalyticsSection>
    </AnalyticsPageLayout>
  );
}
