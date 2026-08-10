import React, { useState, useEffect } from "react";
import { Brain, Star, Sparkles } from "lucide-react";
import { useAnalyticsFilters } from "../context/AnalyticsFilterContext";
import analyticsService from "../services/analyticsService";
import AnalyticsPageLayout from "../components/AnalyticsPageLayout";
import AnalyticsKpiCard from "../components/AnalyticsKpiCard";
import AnalyticsCard from "../components/AnalyticsCard";
import AnalyticsChart from "../components/AnalyticsChart";

export default function AITransformation() {
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
      const response = await analyticsService.getAITransformationDashboard({ ...filters, search });
      setData(response);
    } catch (err) {
      console.error(err);
      setError("Failed to retrieve AI transformation metrics.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, [filters, search]);

  const kpis = data?.kpis || {};
  const charts = data?.charts || {};
  const funnelData = charts.transformationJourney || [];

  return (
    <AnalyticsPageLayout
      title="AI Transformation Dashboard"
      description="Track generative AI learning paths, Copilot developer adoption rates, and readiness indicators."
      breadcrumbs={[{ label: "AI Transformation" }]}
      isLoading={loading || simLoading}
      isError={error !== null || simError}
      isEmpty={simEmpty || funnelData.length === 0}
      onRetry={fetchDashboard}
      simulateLoading={simLoading}
      setSimulateLoading={setSimLoading}
      simulateError={simError}
      setSimulateError={setSimError}
      simulateEmpty={simEmpty}
      setSimulateEmpty={setSimEmpty}
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <AnalyticsKpiCard title="AI Ready Workforce" value={kpis.readyWorkforce} icon={Brain} type="primary" />
        <AnalyticsKpiCard title="Copilot Adoption" value={kpis.copilotAdoption} icon={Star} type="success" />
        <AnalyticsKpiCard title="Readiness Index" value={kpis.readinessIndex} icon={Sparkles} type="warning" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsCard title="Transformation Journey stages" subtitle="Progression breakdown of AI-certified engineers">
          <AnalyticsChart type="funnel" data={funnelData} />
        </AnalyticsCard>
        <AnalyticsCard title="Institutional Readiness" subtitle="AI capability benchmarks by business division">
          <div className="h-full flex items-center justify-center text-slate-400 italic text-xs py-12">
            Readiness scores are compiled in collaboration with AI Guild coordinators.
          </div>
        </AnalyticsCard>
      </div>
    </AnalyticsPageLayout>
  );
}
