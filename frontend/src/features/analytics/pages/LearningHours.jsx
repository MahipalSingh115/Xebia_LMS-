import React, { useState, useEffect } from "react";
import { Clock, TrendingUp, Zap } from "lucide-react";
import { useAnalyticsFilters } from "../context/AnalyticsFilterContext";
import analyticsService from "../services/analyticsService";
import AnalyticsPageLayout from "../components/AnalyticsPageLayout";
import AnalyticsKpiCard from "../components/AnalyticsKpiCard";
import AnalyticsCard from "../components/AnalyticsCard";
import AnalyticsChart from "../components/AnalyticsChart";

export default function LearningHours() {
  const { filters, search } = useAnalyticsFilters();
  const [data, setData] = useState(null);
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
      const response = await analyticsService.getLearningHoursDashboard({ ...filters, search });
      setData(response);
    } catch (err) {
      console.error(err);
      setError("Failed to retrieve learning hours log.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, [filters, search]);

  const kpis = data?.kpis || {};
  const charts = data?.charts || {};
  const hoursData = charts.hoursData || [];

  return (
    <AnalyticsPageLayout
      title="Learning Hours Log"
      description="Track total self-guided study hours, training workshops, and classroom sessions."
      breadcrumbs={[{ label: "Learning Hours" }]}
      isLoading={loading || simLoading}
      isError={error !== null || simError}
      isEmpty={simEmpty || hoursData.length === 0}
      onRetry={fetchDashboard}
      simulateLoading={simLoading}
      setSimulateLoading={setSimLoading}
      simulateError={simError}
      setSimulateError={setSimError}
      simulateEmpty={simEmpty}
      setSimulateEmpty={setSimEmpty}
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <AnalyticsKpiCard title="Total Study Hours" value={kpis.totalStudyHours} suffix=" hrs" icon={Clock} type="primary" />
        <AnalyticsKpiCard title="Self-Guided Hours" value={kpis.selfGuidedHours} suffix=" hrs" icon={TrendingUp} type="success" />
        <AnalyticsKpiCard title="Classroom Workshops" value={kpis.classroomWorkshops} suffix=" hrs" icon={Zap} type="warning" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsCard title="Learning Channel Breakdown" subtitle="Comparison of self-paced digital modules vs instructor-led workshops">
          <AnalyticsChart
            type="area"
            data={hoursData}
            xKey="month"
            series={[
              { key: "selfGuided", color: "#6C1D5F", name: "Self-Guided" },
              { key: "classroom", color: "#01AC9F", name: "Classroom / Workshop" }
            ]}
          />
        </AnalyticsCard>
        <AnalyticsCard title="Monthly Learning Milestones" subtitle="Workforce learning volume accomplishments">
          <div className="h-full flex items-center justify-center text-slate-400 italic text-xs py-12">
            Learning milestones are calculated based on Spring Boot calendar feeds.
          </div>
        </AnalyticsCard>
      </div>
    </AnalyticsPageLayout>
  );
}
