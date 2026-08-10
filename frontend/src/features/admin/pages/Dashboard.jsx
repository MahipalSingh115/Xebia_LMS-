import { Plus } from "lucide-react";
import AppLayout from "@/app/layouts/AppLayout";
import StatsGrid from "@/features/dashboard/components/StatsGrid";
import EnrollmentChart from "@/features/dashboard/components/EnrollmentChart";
import RecentCoursesTable from "@/features/dashboard/components/RecentCoursesTable";
import RecentActivity from "@/features/dashboard/components/RecentActivity";
import SystemStatus from "@/features/dashboard/components/SystemStatus";
import QuickActions from "@/features/dashboard/components/QuickActions";
import TopCategories from "@/features/dashboard/components/TopCategories";

/* ─── Tab list ────────────────────────────────────────────────────── */
const TABS = ["Overview", "Learners", "Courses", "Revenue", "Reports"];

export default function Dashboard() {
  return (
    <AppLayout>
      <div className="max-w-[1400px] mx-auto w-full space-y-6">

        {/* ── Page header ─────────────────────────────────────────── */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-[21px] font-bold text-slate-900 tracking-tight leading-snug">
              Good morning, Admin 👋
            </h1>
            <p className="text-[13px] text-slate-400 mt-1">
              Here's what's happening with your LMS platform today.
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="flex items-center gap-1.5 text-[12px] text-slate-400 font-medium">
              Last updated: just now
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[13px] font-medium text-white bg-[#6C1D5F] hover:bg-[#4A1E47] transition-colors">
              <Plus size={13} /> Quick Create
            </button>
          </div>
        </div>

        {/* ── Stats ────────────────────────────────────────────────── */}
        <StatsGrid />

        {/* ── Tabs ─────────────────────────────────────────────────── */}
        <div className="flex border-b border-slate-200 -mb-2">
          {TABS.map((tab, i) => (
            <div
              key={tab}
              className={`px-3.5 py-2.5 text-[13px] font-medium cursor-pointer border-b-2 -mb-px whitespace-nowrap transition-colors ${
                i === 0
                  ? "text-[#6C1D5F] border-[#6C1D5F] font-semibold"
                  : "text-slate-400 border-transparent hover:text-slate-600"
              }`}
            >
              {tab}
            </div>
          ))}
        </div>

        {/* ── Main 2-column grid ────────────────────────────────────── */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-4 items-start pt-2">

          {/* Left column */}
          <div className="flex flex-col gap-4">
            <EnrollmentChart />
            <RecentCoursesTable />
            <TopCategories />
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-4">
            <SystemStatus />
            <QuickActions />
            <RecentActivity />
          </div>
        </div>

        {/* ── Footer ────────────────────────────────────────────────── */}
        <footer className="flex flex-col md:flex-row justify-between items-center text-[11px] text-slate-400 font-medium pt-2 pb-1 border-t border-slate-200">
          <p>© 2024 Xebia LMS Enterprise. Admin Dashboard v2.0</p>
          <div className="flex gap-5 mt-3 md:mt-0 uppercase tracking-widest">
            <span className="hover:text-[#6C1D5F] transition-colors cursor-pointer">Security</span>
            <span className="hover:text-[#6C1D5F] transition-colors cursor-pointer">System Status</span>
            <span className="hover:text-[#6C1D5F] transition-colors cursor-pointer">Help Desk</span>
          </div>
        </footer>

      </div>
    </AppLayout>
  );
}