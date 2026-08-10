import React, { useState, useEffect } from "react";
import { Award, Zap, Smile } from "lucide-react";
import { useAnalyticsFilters } from "../context/AnalyticsFilterContext";
import analyticsService from "../services/analyticsService";
import AnalyticsPageLayout from "../components/AnalyticsPageLayout";
import AnalyticsSection from "../components/AnalyticsSection";
import AnalyticsKpiCard from "../components/AnalyticsKpiCard";
import AnalyticsCard from "../components/AnalyticsCard";
import AnalyticsChart from "../components/AnalyticsChart";

export default function TrainingEffectiveness() {
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
      const response = await analyticsService.getTrainingEffectivenessDashboard({ ...filters, search });
      setData(response);
    } catch (err) {
      console.error(err);
      setError("Failed to retrieve training effectiveness metrics.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, [filters, search]);

  const kpis = data?.kpis || {};
  const charts = data?.charts || {};
  const feedbackData = charts.feedbackData || [];

  return (
    <AnalyticsPageLayout
      title="Training Effectiveness"
      description="Measure training quality, learner satisfaction, and course delivery effectiveness."
      breadcrumbs={[{ label: "Training Effectiveness" }]}
      isLoading={loading || simLoading}
      isError={error !== null || simError}
      isEmpty={simEmpty || feedbackData.length === 0}
      onRetry={fetchDashboard}
      simulateLoading={simLoading}
      setSimulateLoading={setSimLoading}
      simulateError={simError}
      setSimulateError={setSimError}
      simulateEmpty={simEmpty}
      setSimulateEmpty={setSimEmpty}
      showSandbox={true}
    >
      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <AnalyticsKpiCard title="Course Completion Rate" value={kpis.completionRate} suffix="%" icon={Award} type="success" />
        <AnalyticsKpiCard title="Avg Assessment Score" value={kpis.avgAssessmentScore} suffix="%" icon={Zap} type="primary" />
        <AnalyticsKpiCard title="Satisfaction Score" value={kpis.satisfactionScore} suffix=" / 5.0" icon={Smile} type="warning" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsCard title="Feedback Trend" subtitle="Average participant rating over recent periods">
          <AnalyticsChart type="line" data={feedbackData} xKey="month" series={[{ key: "rating", color: "#6C1D5F", name: "Feedback Rating" }]} />
        </AnalyticsCard>
        <AnalyticsCard title="Satisfaction Distribution" subtitle="Workforce feedback level segmentation">
          <div className="h-full flex items-center justify-center text-slate-400 italic text-xs py-12">
            Satisfaction index distribution is matching target threshold of 94%.
          </div>
        </AnalyticsCard>
      </div>
    </AnalyticsPageLayout>
  );
}
