import React, { useState, useEffect } from "react";
import { TrendingUp, Target, Zap, Users, Clock, Activity } from "lucide-react";
import { useAnalyticsFilters } from "../context/AnalyticsFilterContext";
import analyticsService from "../services/analyticsService";
import AnalyticsPageLayout from "../components/AnalyticsPageLayout";
import AnalyticsSection from "../components/AnalyticsSection";
import AnalyticsKpiCard from "../components/AnalyticsKpiCard";
import AnalyticsCard from "../components/AnalyticsCard";
import AnalyticsChart from "../components/AnalyticsChart";
import AnalyticsTable from "../components/AnalyticsTable";

export default function LearningTrends() {
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
      const response = await analyticsService.getTrendsDashboard({ ...filters, search }, page, 5);
      setData(response);
    } catch (err) {
      console.error(err);
      setError("Failed to retrieve trends metrics.");
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

  const heatmapData = [
    { department: "Engineering", capability: "GenAI Foundations", score: Math.round(94 * trendSeed) },
    { department: "Engineering", capability: "Advanced ML/DL", score: Math.round(86 * trendSeed) },
    { department: "Engineering", capability: "Cloud AI", score: Math.round(90 * trendSeed) },
    { department: "Engineering", capability: "Responsible AI", score: Math.round(80 * trendSeed) },
    { department: "Consulting", capability: "GenAI Foundations", score: Math.round(88 * trendSeed) },
    { department: "Consulting", capability: "Advanced ML/DL", score: Math.round(72 * trendSeed) },
    { department: "Consulting", capability: "Cloud AI", score: Math.round(82 * trendSeed) },
    { department: "Consulting", capability: "Responsible AI", score: Math.round(84 * trendSeed) }
  ];

  const dropoffTrend = [
    { month: "Jan", rate: 3.4 },
    { month: "Feb", rate: 3.8 },
    { month: "Mar", rate: 3.1 },
    { month: "Apr", rate: 2.9 },
    { month: "May", rate: 2.4 },
    { month: "Jun", rate: 2.1 }
  ];

  return (
    <AnalyticsPageLayout
      title="Learning Trends & Insights"
      description="Visualize learning momentum, adoption patterns, engagement scores, user growth, and seasonal learning activity across the organization."
      breadcrumbs={[{ label: "Learning Trends" }]}
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
        <AnalyticsKpiCard
          title="YTD Enrollments"
          value={kpis.totalEnrollments}
          icon={Users}
          trend="+24%"
          type="primary"
          tooltip="Total year-to-date enrollments across all learning paths"
        />
        <AnalyticsKpiCard
          title="Completion Rate"
          value={kpis.completionRate}
          suffix="%"
          icon={Target}
          trend="+6.3%"
          type="info"
          tooltip="Overall enrollment to completion conversion rate"
        />
        <AnalyticsKpiCard
          title="Learning Velocity"
          value={kpis.learningVelocity}
          suffix="/mo"
          icon={Zap}
          trend="+180"
          type="success"
          tooltip="Average enrollments per month — measures learning momentum"
        />
        <AnalyticsKpiCard
          title="Active Growth"
          value={kpis.activeGrowth}
          icon={TrendingUp}
          type="warning"
          tooltip="Growth in monthly active learners since period start"
        />
        <AnalyticsKpiCard
          title="Avg Session"
          value={kpis.avgSessionDuration}
          suffix=" min"
          icon={Clock}
          trend="+8 min"
          type="default"
          tooltip="Average time per learning session across all users"
        />
        <AnalyticsKpiCard
          title="Engagement"
          value={kpis.engagementScore}
          suffix="/100"
          icon={Activity}
          trend="+12"
          type="primary"
          tooltip="Composite score: completion × retention × session depth"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AnalyticsCard title="Enrollment vs Completion Trend" subtitle="Side-by-side comparison of monthly learning registrations and graduations">
            <AnalyticsChart
              type="area"
              data={charts.enrollmentVsCompletion}
              xKey="month"
              series={[
                { key: "enrollments", color: "#84117C", name: "Enrollments" },
                { key: "completions", color: "#01AC9F", name: "Completions" }
              ]}
            />
          </AnalyticsCard>
        </div>
        <div>
          <AnalyticsCard title="Engagement Distribution" subtitle="Workforce segmentation by learning engagement levels">
            <AnalyticsChart type="donut" data={charts.engagementDistribution} xKey="name" yKey="value" />
          </AnalyticsCard>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsCard title="Active Users Growth" subtitle="Monthly active and newly onboarded learner counts">
          <AnalyticsChart
            type="line"
            data={charts.activeUsersGrowth}
            xKey="month"
            series={[
              { key: "activeUsers", color: "#6C1D5F", name: "Active Users" },
              { key: "newUsers", color: "#01AC9F", name: "New Users" }
            ]}
          />
        </AnalyticsCard>
        <AnalyticsCard title="Monthly Learning Hours" subtitle="Total cumulative learning hours across the organization">
          <AnalyticsChart type="bar" data={charts.monthlyLearningHours} xKey="month" series={[{ key: "hours", color: "#6C1D5F", name: "Learning Hours" }]} />
        </AnalyticsCard>
      </div>

      {/* Heatmap Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AnalyticsCard title="Department Activity Heatmap" subtitle="Monthly engagement intensity across operational departments">
            <AnalyticsChart type="heatmap" data={heatmapData} />
          </AnalyticsCard>
        </div>
        <div>
          <AnalyticsCard title="Drop-off Rate Trend" subtitle="Month-over-month learner attrition percentage">
            <AnalyticsChart type="line" data={dropoffTrend} xKey="month" series={[{ key: "rate", color: "#ba1a1a", name: "Drop-off Rate (%)" }]} />
          </AnalyticsCard>
        </div>
      </div>

      {/* Table Section */}
      <AnalyticsSection id="monthly">
        <div className="space-y-4">
          <div>
            <h3 className="text-base font-extrabold text-[#6C1D5F] tracking-tight">Monthly Trends Registry</h3>
            <p className="text-xs text-slate-400 font-medium">Detailed monthly breakdowns of learning platform activity metrics</p>
          </div>
          <AnalyticsTable
            headers={["Month", "New Enrollments", "Completions", "Active Users", "New Users", "Learning Hours", "Drop-off Rate"]}
            rows={rows}
            currentPage={page + 1}
            totalPages={table.totalPages || 1}
            onPageChange={(p) => setPage(p - 1)}
            renderRow={(trend) => (
              <tr key={trend.month} className="hover:bg-slate-50/50 transition-colors">
                <td className="py-4 px-6 font-bold text-slate-800">{trend.month}</td>
                <td className="py-4 px-6 font-bold text-slate-700">{trend.enrollments}</td>
                <td className="py-4 px-6 font-bold text-slate-700">{trend.completions}</td>
                <td className="py-4 px-6 font-bold text-slate-650">{trend.activeUsers}</td>
                <td className="py-4 px-6 text-slate-500">{trend.newUsers}</td>
                <td className="py-4 px-6 font-bold text-[#6C1D5F]">{trend.hours} hrs</td>
                <td className="py-4 px-6 font-bold text-red-600">{trend.rate}%</td>
              </tr>
            )}
          />
        </div>
      </AnalyticsSection>
    </AnalyticsPageLayout>
  );
}
