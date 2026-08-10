/* System Status card — from Banani LMS Admin Dashboard */
const SERVICES = [
  { name: "API Services",    status: "operational", value: "100% uptime" },
  { name: "Video Streaming", status: "operational", value: "99.98% uptime" },
  { name: "CDN",             status: "operational", value: "100% uptime" },
  { name: "Database",        status: "operational", value: "100% uptime" },
  { name: "Auth Service",    status: "operational", value: "100% uptime" },
];

const STATUS_DOT = {
  operational: "bg-emerald-500",
  degraded:    "bg-amber-500",
  outage:      "bg-red-500",
};

export default function SystemStatus() {
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-[18px] py-3.5 border-b border-slate-200">
        <div className="text-[13px] font-bold text-slate-900">System Status</div>
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
          All Systems OK
        </span>
      </div>

      {/* Service list */}
      <div className="px-[18px] py-1">
        {SERVICES.map((svc, i) => (
          <div
            key={svc.name}
            className={`flex items-center justify-between py-2 ${i < SERVICES.length - 1 ? "border-b border-slate-100" : ""}`}
          >
            <div className="flex items-center gap-2 text-[12px] font-medium text-slate-700">
              <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${STATUS_DOT[svc.status]}`} />
              {svc.name}
            </div>
            <span
              className={`text-[11px] font-medium ${
                svc.status === "degraded" ? "text-amber-600 font-semibold" : "text-slate-400"
              }`}
            >
              {svc.value}
            </span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-[18px] py-2.5 border-t border-slate-100 bg-slate-50">
        <span className="text-[11px] text-slate-400">Last checked 2 min ago</span>
        <button className="text-[11px] font-medium text-slate-500 border border-slate-200 rounded px-2 py-0.5 hover:bg-white transition-colors">
          View details
        </button>
      </div>
    </div>
  );
}
