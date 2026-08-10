import React, { useState, useEffect } from "react";
import { Briefcase, Coins, Percent } from "lucide-react";
import { useAnalyticsFilters } from "../context/AnalyticsFilterContext";
import analyticsService from "../services/analyticsService";
import AnalyticsPageLayout from "../components/AnalyticsPageLayout";
import AnalyticsCard from "../components/AnalyticsCard";
import AnalyticsKpiCard from "../components/AnalyticsKpiCard";
import AnalyticsChart from "../components/AnalyticsChart";

export default function ProjectLearningInvestment() {
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
      const response = await analyticsService.getProjectLearningInvestmentDashboard({ ...filters, search });
      setData(response);
    } catch (err) {
      console.error(err);
      setError("Failed to retrieve project learning investment metrics.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, [filters, search]);

  const kpis = data?.kpis || {};
  const charts = data?.charts || {};
  const budgetData = charts.budgetData || [];

  return (
    <AnalyticsPageLayout
      title="Project Learning Investment"
      description="Track learning allocation, cost, and estimated return on investment across projects."
      breadcrumbs={[{ label: "Project Learning Investment" }]}
      isLoading={loading || simLoading}
      isError={error !== null || simError}
      isEmpty={simEmpty || budgetData.length === 0}
      onRetry={fetchDashboard}
      simulateLoading={simLoading}
      setSimulateLoading={setSimLoading}
      simulateError={simError}
      setSimulateError={setSimError}
      simulateEmpty={simEmpty}
      setSimulateEmpty={setSimEmpty}
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <AnalyticsKpiCard title="Allocated Budget" value={kpis.allocatedBudget} prefix="$" icon={Coins} type="primary" />
        <AnalyticsKpiCard title="Spent Budget" value={kpis.spentBudget} prefix="$" icon={Briefcase} type="success" />
        <AnalyticsKpiCard title="Estimated ROI" value={kpis.estimatedRoi} suffix="%" icon={Percent} type="info" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsCard title="Budget Allocation by Business Unit" subtitle="Dollar value invested in capability building">
          <AnalyticsChart type="donut" data={budgetData} xKey="name" yKey="value" />
        </AnalyticsCard>
        <AnalyticsCard title="Resource Utilization" subtitle="Percentage of team training budgets utilized">
          <div className="h-full flex items-center justify-center text-slate-400 italic text-xs py-12">
            Resource utilization metrics are synchronized with Spring Boot project allocations.
          </div>
        </AnalyticsCard>
      </div>
    </AnalyticsPageLayout>
  );
}
