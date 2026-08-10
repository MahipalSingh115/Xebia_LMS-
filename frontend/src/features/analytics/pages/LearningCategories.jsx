import React, { useState, useEffect } from "react";
import { FolderOpen, Target, Percent } from "lucide-react";
import { useAnalyticsFilters } from "../context/AnalyticsFilterContext";
import analyticsService from "../services/analyticsService";
import AnalyticsPageLayout from "../components/AnalyticsPageLayout";
import AnalyticsKpiCard from "../components/AnalyticsKpiCard";
import AnalyticsCard from "../components/AnalyticsCard";
import AnalyticsChart from "../components/AnalyticsChart";

export default function LearningCategories() {
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
      const response = await analyticsService.getLearningCategoriesDashboard({ ...filters, search });
      setData(response);
    } catch (err) {
      console.error(err);
      setError("Failed to retrieve learning categories metrics.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, [filters, search]);

  const kpis = data?.kpis || {};
  const charts = data?.charts || {};
  const categoriesData = charts.categoriesData || [];

  return (
    <AnalyticsPageLayout
      title="Learning Categories Overview"
      description="View course catalog structure, registration trends, and categories representation."
      breadcrumbs={[{ label: "Learning Categories" }]}
      isLoading={loading || simLoading}
      isError={error !== null || simError}
      isEmpty={simEmpty || categoriesData.length === 0}
      onRetry={fetchDashboard}
      simulateLoading={simLoading}
      setSimulateLoading={setSimLoading}
      simulateError={simError}
      setSimulateError={setSimError}
      simulateEmpty={simEmpty}
      setSimulateEmpty={setSimEmpty}
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <AnalyticsKpiCard title="Total Categories" value={kpis.totalCategories} icon={FolderOpen} type="primary" />
        <AnalyticsKpiCard title="Active Courses" value={kpis.activeCourses} icon={Target} type="success" />
        <AnalyticsKpiCard title="Catalog Coverage" value={kpis.catalogCoverage} suffix="%" icon={Percent} type="info" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsCard title="Catalog Weight Distribution" subtitle="Proportion of courses published across active categories">
          <AnalyticsChart type="donut" data={categoriesData} xKey="name" yKey="value" />
        </AnalyticsCard>
        <AnalyticsCard title="Popularity Rankings" subtitle="Active registration volumes by learning sector">
          <div className="h-full flex items-center justify-center text-slate-400 italic text-xs py-12">
            Dynamic course rankings are synced with active platform registration logs.
          </div>
        </AnalyticsCard>
      </div>
    </AnalyticsPageLayout>
  );
}
