import React from "react";
import {
  ResponsiveContainer,
  BarChart, Bar,
  PieChart, Pie, Cell,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from "recharts";
import { BarChart3, PieChart as PieIcon, Activity, Layers } from "lucide-react";

const COLORS = ["#6C1D5F", "#2ebdaf", "#FF6200", "#01AC9F", "#84117C", "#5C4F61"];

export default function CoverageCharts({ chartsData = {}, loading = false }) {
  const {
    regionData = [],
    departmentData = [],
    projectData = [],
    practiceData = [],
  } = chartsData;

  const isAllEmpty =
    regionData.length === 0 &&
    departmentData.length === 0 &&
    projectData.length === 0 &&
    practiceData.length === 0;

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="bg-white p-6 rounded-3xl border border-[#d5c1cc] min-h-[350px] flex flex-col justify-between animate-pulse">
            <div className="h-6 w-1/3 bg-slate-200 rounded mb-4" />
            <div className="flex-1 bg-slate-100 rounded-2xl flex items-center justify-center">
              <span className="text-xs text-slate-400">Loading chart analytics...</span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isAllEmpty) {
    return (
      <div className="bg-white p-12 rounded-3xl border border-[#d5c1cc] text-center max-w-[600px] mx-auto my-8">
        <Layers size={48} className="mx-auto text-slate-300 mb-4" />
        <h3 className="text-lg font-bold text-[#6C1D5F] mb-1">No Chart Data</h3>
        <p className="text-sm text-slate-500">
          Try expanding or resetting your filter criteria to see aggregated chart statistics.
        </p>
      </div>
    );
  }

  const renderTooltip = (props) => {
    const { active, payload } = props;
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900/95 text-white text-xs font-semibold px-3 py-2 rounded-xl shadow-xl border border-slate-800">
          <p className="font-bold border-b border-white/10 pb-1 mb-1">{payload[0].name}</p>
          <p className="flex justify-between items-center gap-4">
            <span>Employees:</span>
            <span className="font-bold text-[#ffd7f0]">{payload[0].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* 1. Coverage by Region */}
      <div className="bg-white p-6 rounded-3xl border border-[#d5c1cc] flex flex-col hover:shadow-sm transition-all duration-200">
        <div className="flex items-center gap-2 mb-6">
          <PieIcon size={18} className="text-[#6C1D5F]" />
          <div>
            <h4 className="text-base font-bold text-[#6C1D5F]">Coverage by Region</h4>
            <p className="text-[11px] text-[#83727c]">Regional employee distribution</p>
          </div>
        </div>
        <div className="flex-1 min-h-[250px] flex items-center justify-center">
          {regionData.length === 0 ? (
            <p className="text-xs text-slate-400">No region records match filters.</p>
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={regionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  labelLine={false}
                >
                  {regionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={renderTooltip} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* 2. Coverage by Department */}
      <div id="department-coverage" className="bg-white p-6 rounded-3xl border border-[#d5c1cc] flex flex-col hover:shadow-sm transition-all duration-200">
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 size={18} className="text-[#2ebdaf]" />
          <div>
            <h4 className="text-base font-bold text-[#6C1D5F]">Coverage by Department</h4>
            <p className="text-[11px] text-[#83727c]">Training distribution by organizational department</p>
          </div>
        </div>
        <div className="flex-1 min-h-[250px]">
          {departmentData.length === 0 ? (
            <p className="text-xs text-slate-400 flex items-center justify-center h-full">No department records match filters.</p>
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={departmentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0e9ed" />
                <XAxis dataKey="name" tick={{ fill: "#83727c", fontSize: 10, fontWeight: 600 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#83727c", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip content={renderTooltip} cursor={{ fill: "rgba(108,29,95,0.04)" }} />
                <Bar dataKey="value" fill="#6C1D5F" radius={[6, 6, 0, 0]} barSize={28}>
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell department-${index}`} fill={COLORS[(index + 1) % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* 3. Coverage by Project */}
      <div id="course-coverage" className="bg-white p-6 rounded-3xl border border-[#d5c1cc] flex flex-col hover:shadow-sm transition-all duration-200">
        <div className="flex items-center gap-2 mb-6">
          <Layers size={18} className="text-[#FF6200]" />
          <div>
            <h4 className="text-base font-bold text-[#6C1D5F]">Coverage by Project</h4>
            <p className="text-[11px] text-[#83727c]">Active project alignments</p>
          </div>
        </div>
        <div className="flex-1 min-h-[250px]">
          {projectData.length === 0 ? (
            <p className="text-xs text-slate-400 flex items-center justify-center h-full">No project records match filters.</p>
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={projectData} layout="vertical" margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0e9ed" />
                <XAxis type="number" tick={{ fill: "#83727c", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fill: "#83727c", fontSize: 10, fontWeight: 600 }} axisLine={false} tickLine={false} />
                <Tooltip content={renderTooltip} cursor={{ fill: "rgba(255,98,0,0.04)" }} />
                <Bar dataKey="value" fill="#FF6200" radius={[0, 6, 6, 0]} barSize={16}>
                  {projectData.map((entry, index) => (
                    <Cell key={`cell project-${index}`} fill={COLORS[(index + 2) % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* 4. Coverage by Practice */}
      <div className="bg-white p-6 rounded-3xl border border-[#d5c1cc] flex flex-col hover:shadow-sm transition-all duration-200">
        <div className="flex items-center gap-2 mb-6">
          <Activity size={18} className="text-[#84117C]" />
          <div>
            <h4 className="text-base font-bold text-[#6C1D5F]">Coverage by Practice</h4>
            <p className="text-[11px] text-[#83727c]">Competency practice engagement</p>
          </div>
        </div>
        <div className="flex-1 min-h-[250px] flex items-center justify-center">
          {practiceData.length === 0 ? (
            <p className="text-xs text-slate-400">No practice records match filters.</p>
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={practiceData}>
                <PolarGrid stroke="#e4e2e2" />
                <PolarAngleAxis dataKey="name" tick={{ fill: "#83727c", fontSize: 9, fontWeight: 600 }} />
                <PolarRadiusAxis angle={30} domain={[0, "auto"]} tick={{ fill: "#83727c", fontSize: 8 }} />
                <Radar name="Practice" dataKey="value" stroke="#84117C" fill="#84117C" fillOpacity={0.25} />
                <Tooltip content={renderTooltip} />
              </RadarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}
