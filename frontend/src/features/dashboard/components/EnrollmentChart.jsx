import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import dashboardService from "@/features/dashboard/services/dashboardService";

export default function EnrollmentChart() {
  const [period, setPeriod] = useState("Monthly");
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadAnalytics() {
    try {
      setLoading(true);
      const response = await dashboardService.getEnrollmentAnalytics(period);
      setChartData(response || []);
    } catch (error) {
      console.error("Failed to load enrollment analytics:", error);
      setChartData([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAnalytics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period]);

  return (
    <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 flex flex-col text-left">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-[13px] font-bold text-slate-900 tracking-tight">
            Enrollment Analytics
          </h3>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Tracking growth across all learning sectors
          </p>
        </div>

        {/* Toggle Buttons */}
        <div className="bg-slate-100 p-0.5 rounded-lg flex gap-0.5">
          {["Weekly", "Monthly"].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer border-none outline-none ${
                period === p
                  ? "bg-white text-[#6C1D5F] shadow-sm font-bold"
                  : "text-slate-500 hover:text-slate-800 bg-transparent"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Section */}
      <div className="flex-1 min-h-[200px] pt-5">
        {loading ? (
          <div className="flex items-center justify-center h-[200px]">
            <p className="text-xs text-slate-400 font-medium">
              Loading analytics...
            </p>
          </div>
        ) : chartData.length === 0 ? (
          <div className="flex items-center justify-center h-[200px]">
            <p className="text-xs text-slate-400 font-medium">
              No analytics data available
            </p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              data={chartData}
              margin={{
                top: 10,
                right: 5,
                left: -25,
                bottom: 0,
              }}
            >
              {/* Grid */}
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f1f5f9"
              />

              {/* X Axis */}
              <XAxis
                dataKey="month"
                tick={{
                  fill: "#94a3b8",
                  fontSize: 10,
                  fontWeight: 600,
                }}
                axisLine={false}
                tickLine={false}
              />

              {/* Y Axis */}
              <YAxis
                tick={{
                  fill: "#94a3b8",
                  fontSize: 10,
                }}
                axisLine={false}
                tickLine={false}
              />

              {/* Tooltip */}
              <Tooltip
                cursor={{ fill: "rgba(108,29,95,0.04)" }}
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  fontSize: "11px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.05)",
                }}
              />

              {/* Bars */}
              <Bar
                dataKey="enrollments"
                fill="#6C1D5F"
                radius={[4, 4, 0, 0]}
                barSize={24}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}