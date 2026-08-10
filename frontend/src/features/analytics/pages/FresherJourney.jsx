import React, { useState, useEffect } from "react";
import { Users, TrendingUp, Timer, Heart, Eye } from "lucide-react";
import { useAnalyticsFilters } from "../context/AnalyticsFilterContext";
import analyticsService from "../services/analyticsService";
import AnalyticsPageLayout from "../components/AnalyticsPageLayout";
import AnalyticsKpiCard from "../components/AnalyticsKpiCard";
import AnalyticsCard from "../components/AnalyticsCard";
import AnalyticsChart from "../components/AnalyticsChart";
import AnalyticsTable from "../components/AnalyticsTable";

export default function FresherJourney() {
  const { filters, search } = useAnalyticsFilters();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Dev Simulators
  const [simLoading, setSimLoading] = useState(false);
  const [simError, setSimError] = useState(false);
  const [simEmpty, setSimEmpty] = useState(false);
  const [page, setPage] = useState(1);

  const fetchDashboard = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await analyticsService.getFresherJourneyDashboard({ ...filters, search });
      setData(response);
    } catch (err) {
      console.error(err);
      setError("Failed to retrieve fresher journey metrics.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, [filters, search]);

  const kpis = data?.kpis || {};
  const charts = data?.charts || {};
  const funnelData = charts.journeyFunnel || [];
  const rows = data?.tables?.content || [];

  return (
    <AnalyticsPageLayout
      title="Fresher Journey Dashboard"
      description="Monitor onboarding performance and trainee milestones across the institution."
      breadcrumbs={[{ label: "Fresher Journey" }]}
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
      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <AnalyticsKpiCard title="Total Freshers" value={kpis.totalFreshers} icon={Users} type="primary" />
        <AnalyticsKpiCard title="Onboarding Progress" value={kpis.onboardingProgress} suffix="%" icon={TrendingUp} type="success" />
        <AnalyticsKpiCard title="Avg. Time to Competency" value={kpis.timeToCompetency} icon={Timer} type="info" />
        <AnalyticsKpiCard title="Retention Rate" value={kpis.retentionRate} suffix="%" icon={Heart} type="danger" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AnalyticsCard title="Journey Funnel" subtitle="Visualizing progression stages of new freshers">
            <AnalyticsChart type="funnel" data={funnelData} />
          </AnalyticsCard>
        </div>
        <div className="bg-[#6C1D5F] text-white rounded-3xl p-6 shadow-sm flex flex-col justify-between select-none">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-lg">✨</span>
            <h3 className="text-sm font-bold">Journey Insights</h3>
          </div>
          <div className="space-y-4 text-xs font-semibold leading-relaxed">
            <p>Processing recent trainee records reveals a 12% speed increase in Phase 1 modules.</p>
            <p>AI readiness index is scaling in alignment with expectations for this year's campus cohort.</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-extrabold text-[#6C1D5F] tracking-tight">Recent Onboarded Trainees</h4>
          <p className="text-[10px] text-slate-400 font-semibold">Trainee path registry and verification records</p>
        </div>
        <AnalyticsTable
          headers={["Trainee Name", "Department", "Start Date", "Progress", "Status", "Actions"]}
          rows={rows}
          currentPage={page}
          totalPages={1}
          onPageChange={setPage}
          renderRow={(row) => (
            <tr key={row.id} className="hover:bg-slate-50/50 transition-colors">
              <td className="py-4 px-6">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-full bg-[#6C1D5F]/10 text-[#6C1D5F] flex items-center justify-center font-bold text-xs">
                    {row.name ? row.name.charAt(0) : ""}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">{row.name}</p>
                    <p className="text-[9px] text-slate-400 font-medium">ID: {row.id}</p>
                  </div>
                </div>
              </td>
              <td className="py-4 px-6 font-semibold text-slate-500">{row.dept}</td>
              <td className="py-4 px-6 text-slate-450">{row.date}</td>
              <td className="py-4 px-6">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-700">{row.progress}%</span>
                  <div className="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#6C1D5F] h-full rounded-full" style={{ width: `${row.progress}%` }} />
                  </div>
                </div>
              </td>
              <td className="py-4 px-6">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold uppercase bg-purple-50 text-[#6C1D5F] border border-purple-100">
                  {row.status}
                </span>
              </td>
              <td className="py-4 px-6 text-right">
                <button className="p-1 hover:bg-slate-100 rounded text-slate-400 cursor-pointer">
                  <Eye size={12} />
                </button>
              </td>
            </tr>
          )}
        />
      </div>
    </AnalyticsPageLayout>
  );
}
