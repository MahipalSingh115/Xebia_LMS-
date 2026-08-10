import React, { useState, useEffect } from "react";
import { BookOpen, Percent, Users, Star } from "lucide-react";
import { useAnalyticsFilters } from "../context/AnalyticsFilterContext";
import analyticsService from "../services/analyticsService";
import AnalyticsPageLayout from "../components/AnalyticsPageLayout";
import AnalyticsSection from "../components/AnalyticsSection";
import AnalyticsKpiCard from "../components/AnalyticsKpiCard";
import AnalyticsCard from "../components/AnalyticsCard";
import AnalyticsChart from "../components/AnalyticsChart";
import AnalyticsTable from "../components/AnalyticsTable";

export default function FlagshipPrograms() {
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
      const response = await analyticsService.getFlagshipDashboard({ ...filters, search }, page, 5);
      setData(response);
    } catch (err) {
      console.error(err);
      setError("Failed to retrieve flagship program metrics.");
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

  const trendSeed = (filters.year === "2026" ? 1.2 : filters.year === "2024" ? 0.8 : 1.0) *
                    (filters.quarter === "Q1" ? 0.95 : filters.quarter === "Q2" ? 1.05 : 1.0);

  const learningHoursTrend = [
    { month: "Jan", selfGuidedHours: Math.round(2400 * trendSeed), workshopHours: Math.round(1200 * trendSeed) },
    { month: "Feb", selfGuidedHours: Math.round(3100 * trendSeed), workshopHours: Math.round(1500 * trendSeed) },
    { month: "Mar", selfGuidedHours: Math.round(4500 * trendSeed), workshopHours: Math.round(2200 * trendSeed) },
    { month: "Apr", selfGuidedHours: Math.round(5800 * trendSeed), workshopHours: Math.round(3100 * trendSeed) },
    { month: "May", selfGuidedHours: Math.round(7200 * trendSeed), workshopHours: Math.round(4000 * trendSeed) },
    { month: "Jun", selfGuidedHours: Math.round(9500 * trendSeed), workshopHours: Math.round(5500 * trendSeed) }
  ];

  return (
    <AnalyticsPageLayout
      title="Flagship Learning Programs"
      description="Analyze corporate learning academies, cohort completion rates, participant sizes, and feedback score trends."
      breadcrumbs={[{ label: "Flagship Programs" }]}
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
      {/* KPIs Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <AnalyticsKpiCard
          title="Active Academies"
          value={kpis.activePrograms}
          icon={BookOpen}
          type="primary"
          tooltip="Total flagship courses and academies running"
        />
        <AnalyticsKpiCard
          title="Avg Graduation Rate"
          value={kpis.completionRate}
          suffix="%"
          icon={Percent}
          type="info"
          tooltip="Average completion percentage rate of flagship cohorts"
        />
        <AnalyticsKpiCard
          title="Total Participants"
          value={kpis.participants}
          icon={Users}
          type="success"
          tooltip="Sum of all employees enrolled in flagship tracks"
        />
        <AnalyticsKpiCard
          title="Feedback Score"
          value={kpis.feedbackRating}
          suffix=" / 5.0"
          icon={Star}
          type="warning"
          tooltip="Average NPS evaluation rating"
        />
      </div>

      {/* Charts Grid 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AnalyticsCard title="Learning Hours Trend" subtitle="Breakdown of self-guided pathway hours vs interactive workshops">
            <AnalyticsChart
              type="area"
              data={learningHoursTrend}
              xKey="month"
              series={[
                { key: "selfGuidedHours", color: "#84117C", name: "Self-Guided Hours" },
                { key: "workshopHours", color: "#6C1D5F", name: "Workshop Hours" }
              ]}
            />
          </AnalyticsCard>
        </div>
        <div>
          <AnalyticsCard title="Program Domain Distribution" subtitle="Share of programs running in cloud, AI, and architecture domains">
            <AnalyticsChart type="donut" data={charts.flagshipDistribution} xKey="name" yKey="value" />
          </AnalyticsCard>
        </div>
      </div>

      {/* Charts Grid 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsCard title="Participation Trend" subtitle="Active participants registered across flagship academies">
          <AnalyticsChart type="line" data={charts.flagshipParticipationTrend} xKey="month" series={[{ key: "activeParticipants", color: "#6C1D5F", name: "Participants Count" }]} />
        </AnalyticsCard>
        <AnalyticsCard title="Cohort Completion Trend" subtitle="Average percentage graduation rate of course enrollments">
          <AnalyticsChart type="line" data={charts.flagshipCompletionTrend} xKey="month" series={[{ key: "rate", color: "#01AC9F", name: "Completion Rate (%)" }]} />
        </AnalyticsCard>
      </div>

      {/* Table Section */}
      <AnalyticsSection id="leadership">
        <div className="space-y-4">
          <div>
            <h3 className="text-base font-extrabold text-[#6C1D5F] tracking-tight">Academy Programs</h3>
            <p className="text-xs text-slate-400 font-medium">Detailed index of training cohorts and user engagement scores</p>
          </div>
          <AnalyticsTable
            headers={["Program Name", "Category", "Participants", "Graduation Rate", "Learning Hours", "Rating", "Status"]}
            rows={rows}
            currentPage={page + 1}
            totalPages={table.totalPages || 1}
            onPageChange={(p) => setPage(p - 1)}
            renderRow={(prog) => (
              <tr key={prog.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="py-4 px-6 font-bold text-slate-800">{prog.name}</td>
                <td className="py-4 px-6 text-slate-500 font-semibold">{prog.category}</td>
                <td className="py-4 px-6 font-bold text-[#6C1D5F]">{prog.participantsCount} staff</td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-700">{prog.completionRate}%</span>
                    <div className="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${prog.completionRate}%` }} />
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6 text-slate-650 font-bold">{prog.learningHours} hrs</td>
                <td className="py-4 px-6">
                  <span className="inline-flex items-center gap-1 font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                    <Star size={10} className="fill-amber-600" />
                    {prog.feedbackRating}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    prog.status === "Active" ? "bg-purple-50 text-purple-700" : "bg-slate-50 text-slate-500"
                  }`}>
                    {prog.status}
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
