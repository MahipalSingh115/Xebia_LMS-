import React, { useState, useEffect } from "react";
import { AlertCircle, Target, TrendingUp } from "lucide-react";
import { useAnalyticsFilters } from "../context/AnalyticsFilterContext";
import analyticsService from "../services/analyticsService";
import AnalyticsPageLayout from "../components/AnalyticsPageLayout";
import AnalyticsKpiCard from "../components/AnalyticsKpiCard";
import AnalyticsCard from "../components/AnalyticsCard";
import AnalyticsChart from "../components/AnalyticsChart";

export default function SkillGap() {
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
      const response = await analyticsService.getSkillGapDashboard({ ...filters, search });
      setData(response);
    } catch (err) {
      console.error(err);
      setError("Failed to retrieve skill gap metrics.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, [filters, search]);

  const kpis = data?.kpis || {};
  const charts = data?.charts || {};
  const gapData = charts.gapData || [];

  return (
    <AnalyticsPageLayout
      title="Skill Gap Analysis"
      description="Compare required capability levels against workforce certifications and assessments."
      breadcrumbs={[{ label: "Skill Gap" }]}
      isLoading={loading || simLoading}
      isError={error !== null || simError}
      isEmpty={simEmpty || gapData.length === 0}
      onRetry={fetchDashboard}
      simulateLoading={simLoading}
      setSimulateLoading={setSimLoading}
      simulateError={simError}
      setSimulateError={setSimError}
      simulateEmpty={simEmpty}
      setSimulateEmpty={setSimEmpty}
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <AnalyticsKpiCard title="Required Score" value={kpis.requiredScore} suffix="%" icon={Target} type="primary" />
        <AnalyticsKpiCard title="Current Index" value={kpis.currentIndex} suffix="%" icon={TrendingUp} type="success" />
        <AnalyticsKpiCard title="Gap Deficit" value={kpis.gapDeficit} suffix="%" icon={AlertCircle} type="danger" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsCard title="Target vs Actual Capability" subtitle="Historical bridging of competency benchmarks">
          <AnalyticsChart
            type="area"
            data={gapData}
            xKey="month"
            series={[
              { key: "required", color: "#6C1D5F", name: "Required Level" },
              { key: "current", color: "#01AC9F", name: "Actual Capability" }
            ]}
          />
        </AnalyticsCard>
        <AnalyticsCard title="Priority Actions" subtitle="Top focus areas to eliminate capability gaps">
          <div className="space-y-4 text-xs font-semibold leading-relaxed text-slate-650">
            <p className="bg-red-50 text-red-700 p-3 rounded-2xl border border-red-100">
              1. Bridge AWS Advanced Architecture skills in Data & AI BU.
            </p>
            <p className="bg-amber-50 text-amber-700 p-3 rounded-2xl border border-amber-100">
              2. Conduct training for Playwright Automation across QA practices.
            </p>
          </div>
        </AnalyticsCard>
      </div>
    </AnalyticsPageLayout>
  );
}
