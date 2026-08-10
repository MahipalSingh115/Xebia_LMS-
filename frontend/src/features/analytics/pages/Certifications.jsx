import React, { useState, useEffect } from "react";
import { Award, ShieldCheck, Ticket, Percent } from "lucide-react";
import { useAnalyticsFilters } from "../context/AnalyticsFilterContext";
import analyticsService from "../services/analyticsService";
import AnalyticsPageLayout from "../components/AnalyticsPageLayout";
import AnalyticsSection from "../components/AnalyticsSection";
import AnalyticsKpiCard from "../components/AnalyticsKpiCard";
import AnalyticsCard from "../components/AnalyticsCard";
import AnalyticsChart from "../components/AnalyticsChart";
import AnalyticsTable from "../components/AnalyticsTable";

export default function Certifications() {
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
      const response = await analyticsService.getCertificationsDashboard({ ...filters, search }, page, 5);
      setData(response);
    } catch (err) {
      console.error(err);
      setError("Failed to retrieve certifications metrics.");
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

  const funnelData = [
    { stage: "Exam Registrations", count: Math.round(750 * trendSeed), percent: 100 },
    { stage: "Learning Paths Finished", count: Math.round(590 * trendSeed), percent: 78 },
    { stage: "Internal Mock Exams Passed", count: Math.round(480 * trendSeed), percent: 64 },
    { stage: "Exam Vouchers Issued", count: Math.round(420 * trendSeed), percent: 56 },
    { stage: "Active Certifications", count: Math.round(kpis.activeCertifications || 440), percent: Math.round(((kpis.activeCertifications || 440) / (750 * trendSeed)) * 100) }
  ];

  return (
    <AnalyticsPageLayout
      title="Certifications Analytics"
      description="Verify active certification rates, track upcoming exam completions, monitor voucher utilization, and view technology domain coverage."
      breadcrumbs={[{ label: "Certifications" }]}
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
          title="Vouchers Assigned"
          value={kpis.assignedVouchers}
          icon={Ticket}
          type="primary"
          tooltip="Total exam vouchers assigned to trainees"
        />
        <AnalyticsKpiCard
          title="Exams Scheduled"
          value={kpis.scheduledExams}
          icon={Award}
          type="warning"
          tooltip="Exams scheduled with test providers"
        />
        <AnalyticsKpiCard
          title="Certified Employees"
          value={kpis.certifiedEmployees}
          icon={ShieldCheck}
          type="success"
          tooltip="Unique certified staff headcount"
        />
        <AnalyticsKpiCard
          title="Completion Rate"
          value={kpis.completionRate}
          suffix="%"
          icon={Percent}
          type="info"
          tooltip="Exam pass and certification completion percentage"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AnalyticsCard title="Technology-wise Certifications" subtitle="Distribution of credentials across major cloud providers and frameworks">
            <AnalyticsChart type="bar" data={charts.certTechDistribution} xKey="name" yKey="value" />
          </AnalyticsCard>
        </div>
        <div>
          <AnalyticsCard title="Region-wise Certifications" subtitle="Credential densities across global business offices">
            <AnalyticsChart type="donut" data={charts.certRegionDistribution} xKey="name" yKey="value" />
          </AnalyticsCard>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div>
          <AnalyticsCard title="Business Unit Distribution" subtitle="Certifications breakdown by vertical BU divisions">
            <AnalyticsChart type="pie" data={charts.certBUDistribution} xKey="name" yKey="value" />
          </AnalyticsCard>
        </div>
        <div className="lg:col-span-2">
          <AnalyticsCard title="Department-wise Certifications" subtitle="Credentials achieved by operational department and sectors">
            <AnalyticsChart type="bar" data={charts.certDeptDistribution} xKey="name" yKey="certifications" />
          </AnalyticsCard>
        </div>
      </div>

      {/* Funnel Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsCard title="Certification Enablement Funnel" subtitle="Step-by-step conversion and drop-off analysis of candidate streams">
          <AnalyticsChart type="funnel" data={funnelData} />
        </AnalyticsCard>
        <AnalyticsCard title="Top Projects by Certifications" subtitle="Key client projects showing the highest credentials density">
          <AnalyticsChart type="bar" data={charts.certProjectDistribution} xKey="name" yKey="certifications" layout="vertical" />
        </AnalyticsCard>
      </div>

      {/* Table Section */}
      <AnalyticsSection id="active">
        <div className="space-y-4">
          <div>
            <h3 className="text-base font-extrabold text-[#6C1D5F] tracking-tight">Certifications Registry</h3>
            <p className="text-xs text-slate-400 font-medium">Search, track, and filter historical employee certificate achievements</p>
          </div>
          <AnalyticsTable
            headers={["Certificate Name", "Provider", "Employee", "Department", "Region", "Level", "Expiry Date", "Status"]}
            rows={rows}
            currentPage={page + 1}
            totalPages={table.totalPages || 1}
            onPageChange={(p) => setPage(p - 1)}
            renderRow={(cert) => (
              <tr key={cert.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="py-4 px-6 font-bold text-slate-800">{cert.name}</td>
                <td className="py-4 px-6 font-semibold text-slate-550">{cert.provider}</td>
                <td className="py-4 px-6 font-semibold text-[#6C1D5F]">{cert.employeeName}</td>
                <td className="py-4 px-6 text-slate-500">{cert.department}</td>
                <td className="py-4 px-6 text-slate-450">{cert.region}</td>
                <td className="py-4 px-6 text-slate-500 font-semibold">{cert.level}</td>
                <td className="py-4 px-6 text-slate-450">{cert.expiry}</td>
                <td className="py-4 px-6">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    cert.status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
                  }`}>
                    {cert.status}
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
