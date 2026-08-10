import React, { useState, useEffect } from "react";
import { Users, ShieldCheck, Percent, Clock } from "lucide-react";
import { useAnalyticsFilters } from "../context/AnalyticsFilterContext";
import analyticsService from "../services/analyticsService";
import AnalyticsPageLayout from "../components/AnalyticsPageLayout";
import AnalyticsSection from "../components/AnalyticsSection";
import AnalyticsKpiCard from "../components/AnalyticsKpiCard";
import AnalyticsCard from "../components/AnalyticsCard";
import AnalyticsChart from "../components/AnalyticsChart";
import AnalyticsTable from "../components/AnalyticsTable";

export default function LearningCoverage() {
  const { filters, search } = useAnalyticsFilters();
  const [data, setData] = useState(null);
  const [page, setPage] = useState(0);
  
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
      const response = await analyticsService.getCoverageDashboard({ ...filters, search }, page, 5);
      setData(response);
    } catch (err) {
      console.error(err);
      setError("Failed to retrieve coverage metrics.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, [filters, search, page]);

  const kpis = data?.kpis || {};
  const charts = data?.charts || {};
  const table = data?.tables || {};
  const rows = table.content || [];

  return (
    <AnalyticsPageLayout
      title="Learning Coverage Dashboard"
      description="Real-time tracking of employee enrollment, course completions, and capability metrics."
      breadcrumbs={[{ label: "Learning Coverage" }]}
      isLoading={loading || simLoading}
      isError={error !== null || simError}
      isEmpty={simEmpty || rows.length === 0}
      onRetry={fetchDashboard}
      simulateLoading={simLoading}
      setSimulateLoading={setSimLoading}
      simulateError={simError}
      setSimulateError={setSimError}
      simulateEmpty={simEmpty}
      setSimulateEmpty={setSimEmpty}
    >
      {/* KPIs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <AnalyticsKpiCard
          title="Total Employees"
          value={kpis.totalEmployees}
          icon={Users}
          type="primary"
          tooltip="Total employee directory size matching selections"
        />
        <AnalyticsKpiCard
          title="Covered Employees"
          value={kpis.employeesCovered}
          icon={ShieldCheck}
          type="success"
          tooltip="Staff who completed or are currently in learning paths"
        />
        <AnalyticsKpiCard
          title="Coverage Rate"
          value={kpis.coveragePercentage}
          suffix="%"
          icon={Percent}
          type="info"
          tooltip="Ratio of covered staff to total headcount"
        />
        <AnalyticsKpiCard
          title="Pending Headcount"
          value={kpis.pendingEmployees}
          icon={Clock}
          type="warning"
          tooltip="Trainees who have not started any modules"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsCard title="Regional Distribution" subtitle="Headcount metrics grouped by geographic corporate sites">
          <AnalyticsChart type="bar" data={charts.regionData} xKey="name" yKey="value" />
        </AnalyticsCard>
        <AnalyticsCard title="Departmental Distribution" subtitle="Learning engagements by administrative departments">
          <AnalyticsChart type="donut" data={charts.departmentData} xKey="name" yKey="value" />
        </AnalyticsCard>
      </div>

      {/* Table Section */}
      <AnalyticsSection id="batch-coverage">
        <div className="space-y-4">
          <div>
            <h3 className="text-base font-extrabold text-[#6C1D5F] tracking-tight">Coverage Directory</h3>
            <p className="text-xs text-slate-400 font-medium">Granular learning path completion records</p>
          </div>
          <AnalyticsTable
            headers={["Employee", "Department", "Project", "Learning Path", "Hours", "Progress", "Status"]}
            rows={rows}
            currentPage={page + 1}
            totalPages={table.totalPages || 1}
            onPageChange={(p) => setPage(p - 1)}
            renderRow={(emp) => (
              <tr key={emp.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <img
                      src={emp.avatar}
                      alt={emp.name}
                      className="w-9 h-9 rounded-full object-cover border border-slate-200"
                      onError={(e) => {
                        e.target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${emp.name}`;
                      }}
                    />
                    <div>
                      <p className="font-bold text-slate-800">{emp.name}</p>
                      <p className="text-[10px] text-slate-400 font-medium">{emp.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6 font-semibold text-slate-500">{emp.department}</td>
                <td className="py-4 px-6 text-slate-500">{emp.project}</td>
                <td className="py-4 px-6 font-semibold text-slate-700 max-w-[200px] truncate">{emp.learningPath}</td>
                <td className="py-4 px-6 font-bold text-slate-800">{emp.hours} hrs</td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3 min-w-[120px]">
                    <span className="font-bold text-slate-700 min-w-[32px]">{emp.completion}%</span>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          emp.status === "Completed" ? "bg-emerald-500" : emp.status === "In Progress" ? "bg-[#6C1D5F]" : "bg-slate-350"
                        }`}
                        style={{ width: `${emp.completion}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    emp.status === "Completed" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" :
                    emp.status === "In Progress" ? "bg-purple-50 text-purple-700 border border-purple-100" : "bg-slate-50 text-slate-500"
                  }`}>
                    {emp.status}
                  </span>
                </td>
              </tr>
            )}
          />
        </div>
      </AnalyticsSection>
    </AnalyticsPageLayout>
  );
}
