import React from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ScatterChart,
  Scatter
} from "recharts";

const DEFAULT_COLORS = ["#6C1D5F", "#01AC9F", "#FF6200", "#84117C", "#eef2ff", "#bfdbfe"];

export default function AnalyticsChart({
  type = "bar", // area, bar, line, donut, pie, heatmap, funnel
  data = [],
  xKey = "name",
  yKey = "value",
  series = [], // array of { key, color, name }
  layout = "horizontal", // horizontal, vertical (for bar charts)
  height = 300
}) {
  if (!data || data.length === 0) {
    return (
      <div className="h-full w-full min-h-[200px] bg-slate-50 rounded-2xl flex flex-col items-center justify-center text-slate-400 italic text-xs border border-dashed border-slate-200">
        No chart metrics available for current selections.
      </div>
    );
  }

  const renderAreaChart = () => {
    return (
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          {series.map((s, idx) => (
            <linearGradient key={`grad-${s.key}`} id={`grad-${s.key}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={s.color || DEFAULT_COLORS[idx % DEFAULT_COLORS.length]} stopOpacity={0.4} />
              <stop offset="95%" stopColor={s.color || DEFAULT_COLORS[idx % DEFAULT_COLORS.length]} stopOpacity={0.0} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ece7eb" />
        <XAxis dataKey={xKey} tick={{ fill: "#83727c", fontSize: 11, fontWeight: 500 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: "#83727c", fontSize: 11 }} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{ backgroundColor: "#ffffff", borderColor: "#d5c1cc", borderRadius: "12px", boxShadow: "0 8px 16px -4px rgba(108,29,95,0.08)" }}
          itemStyle={{ fontSize: "12px", fontWeight: 600 }}
          labelStyle={{ fontSize: "11px", color: "#83727c", fontWeight: 700 }}
        />
        {series.length > 0 && <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: "11px", fontWeight: 600, color: "#51434c" }} />}
        {series.map((s, idx) => (
          <Area
            key={s.key}
            type="monotone"
            dataKey={s.key}
            name={s.name || s.key}
            stroke={s.color || DEFAULT_COLORS[idx % DEFAULT_COLORS.length]}
            strokeWidth={3}
            fillOpacity={1}
            fill={`url(#grad-${s.key})`}
          />
        ))}
      </AreaChart>
    );
  };

  const renderBarChart = () => {
    const isVertical = layout === "vertical";
    const finalSeries = series.length > 0 ? series : [{ key: yKey, color: "#6C1D5F" }];

    return (
      <BarChart
        data={data}
        layout={layout}
        margin={{ top: 10, right: 10, left: isVertical ? 20 : -20, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={isVertical} stroke="#ece7eb" />
        {isVertical ? (
          <>
            <XAxis type="number" tick={{ fill: "#83727c", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey={xKey} tick={{ fill: "#83727c", fontSize: 11, fontWeight: 500 }} axisLine={false} tickLine={false} width={80} />
          </>
        ) : (
          <>
            <XAxis dataKey={xKey} tick={{ fill: "#83727c", fontSize: 11, fontWeight: 500 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#83727c", fontSize: 11 }} axisLine={false} tickLine={false} />
          </>
        )}
        <Tooltip
          contentStyle={{ backgroundColor: "#ffffff", borderColor: "#d5c1cc", borderRadius: "12px", boxShadow: "0 8px 16px -4px rgba(108,29,95,0.08)" }}
          itemStyle={{ fontSize: "12px", fontWeight: 600 }}
          labelStyle={{ fontSize: "11px", color: "#83727c", fontWeight: 700 }}
        />
        {series.length > 0 && <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: "11px", fontWeight: 600, color: "#51434c" }} />}
        {finalSeries.map((s, idx) => (
          <Bar
            key={s.key}
            dataKey={s.key}
            name={s.name || s.key}
            fill={s.color || DEFAULT_COLORS[idx % DEFAULT_COLORS.length]}
            radius={isVertical ? [0, 8, 8, 0] : [8, 8, 0, 0]}
            barSize={16}
          />
        ))}
      </BarChart>
    );
  };

  const renderLineChart = () => {
    const finalSeries = series.length > 0 ? series : [{ key: yKey, color: "#6C1D5F" }];
    return (
      <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ece7eb" />
        <XAxis dataKey={xKey} tick={{ fill: "#83727c", fontSize: 11, fontWeight: 500 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: "#83727c", fontSize: 11 }} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{ backgroundColor: "#ffffff", borderColor: "#d5c1cc", borderRadius: "12px", boxShadow: "0 8px 16px -4px rgba(108,29,95,0.08)" }}
          itemStyle={{ fontSize: "12px", fontWeight: 600 }}
          labelStyle={{ fontSize: "11px", color: "#83727c", fontWeight: 700 }}
        />
        {series.length > 0 && <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: "11px", fontWeight: 600, color: "#51434c" }} />}
        {finalSeries.map((s, idx) => (
          <Line
            key={s.key}
            type="monotone"
            dataKey={s.key}
            name={s.name || s.key}
            stroke={s.color || DEFAULT_COLORS[idx % DEFAULT_COLORS.length]}
            strokeWidth={3}
            dot={{ r: 4, strokeWidth: 1 }}
            activeDot={{ r: 6 }}
          />
        ))}
      </LineChart>
    );
  };

  const renderDonutChart = () => {
    return (
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={85}
          paddingAngle={4}
          dataKey={yKey}
          nameKey={xKey}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={DEFAULT_COLORS[index % DEFAULT_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{ backgroundColor: "#ffffff", borderColor: "#d5c1cc", borderRadius: "12px", boxShadow: "0 8px 16px -4px rgba(108,29,95,0.08)" }}
          itemStyle={{ fontSize: "12px", fontWeight: 600 }}
        />
        <Legend
          verticalAlign="bottom"
          height={36}
          iconType="circle"
          layout="horizontal"
          wrapperStyle={{ fontSize: "10px", fontWeight: 600, color: "#51434c" }}
        />
      </PieChart>
    );
  };

  const renderPieChart = () => {
    return (
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={85}
          dataKey={yKey}
          nameKey={xKey}
          labelLine={false}
          label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={DEFAULT_COLORS[index % DEFAULT_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{ backgroundColor: "#ffffff", borderColor: "#d5c1cc", borderRadius: "12px", boxShadow: "0 8px 16px -4px rgba(108,29,95,0.08)" }}
          itemStyle={{ fontSize: "12px", fontWeight: 600 }}
        />
        <Legend
          verticalAlign="bottom"
          height={36}
          iconType="circle"
          layout="horizontal"
          wrapperStyle={{ fontSize: "10px", fontWeight: 600, color: "#51434c" }}
        />
      </PieChart>
    );
  };

  const renderHeatMapChart = () => {
    // Recharts heatmap can be mapped as a ScatterChart
    return (
      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <XAxis type="category" dataKey="department" name="Department" tick={{ fill: "#83727c", fontSize: 10 }} />
        <YAxis type="category" dataKey="capability" name="Capability" tick={{ fill: "#83727c", fontSize: 10 }} width={120} />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter name="Activity Score" data={data} fill="#6C1D5F">
          {data.map((entry, index) => {
            const opacity = entry.score ? entry.score / 100 : 0.5;
            return <Cell key={`cell-${index}`} fill="#6C1D5F" fillOpacity={opacity} />;
          })}
        </Scatter>
      </ScatterChart>
    );
  };

  const renderFunnelChart = () => {
    // Display as horizontal percentage bars (funnel flow)
    return (
      <div className="space-y-4 font-sans select-none">
        {data.map((item, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-700">{item.stage}</span>
              <span className="font-bold text-slate-900">{item.count} ({item.percent}%)</span>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300 bg-[#6C1D5F]"
                style={{ width: `${item.percent}%`, opacity: 1 - idx * 0.15 }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  };

  const getChart = () => {
    switch (type) {
      case "area": return renderAreaChart();
      case "bar": return renderBarChart();
      case "line": return renderLineChart();
      case "donut": return renderDonutChart();
      case "pie": return renderPieChart();
      case "heatmap": return renderHeatMapChart();
      case "funnel": return renderFunnelChart();
      default: return renderBarChart();
    }
  };

  // Funnel chart is custom DOM rendered and doesn't need ResponsiveContainer wrapper
  if (type === "funnel") {
    return <div className="w-full">{getChart()}</div>;
  }

  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        {getChart()}
      </ResponsiveContainer>
    </div>
  );
}
