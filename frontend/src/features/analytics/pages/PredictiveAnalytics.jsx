import React, { useState, useEffect } from "react";
import { Brain, Sparkles, TrendingUp } from "lucide-react";
import { useAnalyticsFilters } from "../context/AnalyticsFilterContext";
import analyticsService from "../services/analyticsService";
import AnalyticsPageLayout from "../components/AnalyticsPageLayout";
import AnalyticsKpiCard from "../components/AnalyticsKpiCard";
import AnalyticsCard from "../components/AnalyticsCard";
import AnalyticsChart from "../components/AnalyticsChart";

export default function PredictiveAnalytics() {
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
      const response = await analyticsService.getPredictiveAnalyticsDashboard({ ...filters, search });
      setData(response);
    } catch (err) {
      console.error(err);
      setError("Failed to retrieve predictive analytics metrics.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, [filters, search]);

  const kpis = data?.kpis || {};
  const charts = data?.charts || {};
  const forecastData = charts.forecastData || [];

  return (
    <AnalyticsPageLayout
      title="Predictive Analytics"
      description="Forecast course demand, certification completions, and learner graduation paths."
      breadcrumbs={[{ label: "Predictive Analytics" }]}
      isLoading={loading || simLoading}
      isError={error !== null || simError}
      isEmpty={simEmpty || forecastData.length === 0}
      onRetry={fetchDashboard}
      simulateLoading={simLoading}
      setSimulateLoading={setSimLoading}
      simulateError={simError}
      setSimulateError={setSimError}
      simulateEmpty={simEmpty}
      setSimulateEmpty={setSimEmpty}
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <AnalyticsKpiCard title="Predictive Accuracy" value={kpis.predictiveAccuracy} suffix="%" icon={Brain} type="primary" />
        <AnalyticsKpiCard title="Forecast Demand" value={kpis.forecastDemand} icon={TrendingUp} type="success" />
        <AnalyticsKpiCard title="Calculated Lift" value={kpis.calculatedLift} suffix="%" icon={Sparkles} type="warning" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsCard title="Course Completion Forecast" subtitle="Comparing actual achievements against predictive AI models">
          <AnalyticsChart
            type="line"
            data={forecastData}
            xKey="month"
            series={[
              { key: "actual", color: "#6C1D5F", name: "Actual Completions" },
              { key: "forecast", color: "#01AC9F", name: "AI Forecasted Completions" }
            ]}
          />
        </AnalyticsCard>
        <AnalyticsCard title="Model Parameters" subtitle="Information regarding dynamic machine learning forecasts">
          <div className="h-full flex items-center justify-center text-slate-400 italic text-xs py-12">
            Model parameters are calculated using Spring Boot data aggregation engines.
          </div>
        </AnalyticsCard>
      </div>
    </AnalyticsPageLayout>
  );
}
