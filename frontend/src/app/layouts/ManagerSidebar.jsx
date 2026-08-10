import { useState, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  BarChart3,
  FolderOpen,
  BookOpen,
  FileText,
  Users,
  UserCheck,
  Calendar,
  Award,
  ShieldCheck,
  GraduationCap,
  Briefcase,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

/* ─── Tooltip on hover (collapsed mode) ─── */
function NavTooltip({ label, children }) {
  const [show, setShow] = useState(false);
  const ref = useRef(null);
  const [top, setTop] = useState(0);

  const handleEnter = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setTop(rect.top + rect.height / 2);
    }
    setShow(true);
  };

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <div
          className="fixed z-[9999] ml-2 -translate-y-1/2 pointer-events-none"
          style={{ left: "60px", top }}
        >
          <div className="bg-slate-900 text-white text-[11px] font-semibold px-2.5 py-1.5 rounded-lg shadow-lg whitespace-nowrap">
            {label}
            <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-slate-900 rotate-45" />
          </div>
        </div>
      )}
    </div>
  );
}

const NAV_GROUPS = [
  {
    label: "Overview",
    items: [
      { title: "Manager Dashboard", path: "/manager", icon: LayoutDashboard },
      { title: "Learning Dashboard", path: "/manager/learning", icon: BookOpen },
    ],
  },
  {
    label: "Content",
    items: [
      { title: "Categories", path: "/manager/categories", icon: FolderOpen },
      { title: "Courses", path: "/manager/courses", icon: FileText },
      { title: "Assessments", path: "/manager/assessments", icon: Award },
    ],
  },
  {
    label: "People",
    items: [
      { title: "Learners", path: "/manager/learners", icon: Users },
      { title: "Trainers", path: "/manager/trainers", icon: UserCheck },
      { title: "Batches", path: "/manager/batches", icon: Calendar },
    ],
  },
  {
    label: "System",
    items: [
      { title: "Reports & Analytics", path: "/manager/analytics", icon: BarChart3 },
      { title: "Approval Center", path: "/manager/approvals", icon: ShieldCheck },
    ],
  },
];

export default function ManagerSidebar({ collapsed, setCollapsed }) {
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/manager") return location.pathname === "/manager";
    return location.pathname === path;
  };

  return (
    <aside
      className={`fixed left-0 top-0 hidden h-screen bg-white border-r border-slate-200/80 flex-col md:flex z-40 transition-all duration-300 ease-in-out shadow-[1px_0_3px_rgba(0,0,0,0.02)] ${
        collapsed ? "w-[60px]" : "w-[240px]"
      }`}
    >
      {/* ── Logo ── */}
      <div
        className={`flex items-center border-b border-slate-200/80 shrink-0 transition-all duration-300 ${
          collapsed ? "justify-center py-3.5" : "gap-3 px-5 py-[18px]"
        }`}
      >
        <div
          className={`rounded-xl bg-gradient-to-br from-[#6C1D5F] to-[#84117C] flex items-center justify-center shrink-0 shadow-sm shadow-[#6C1D5F]/20 transition-all duration-300 ${
            collapsed ? "w-8 h-8" : "w-9 h-9"
          }`}
        >
          <Briefcase size={collapsed ? 16 : 18} className="text-white" />
        </div>
        {!collapsed && (
          <div>
            <div className="text-[14px] font-bold text-slate-900 tracking-tight leading-none whitespace-nowrap">
              Xebia LMS
            </div>
            <div className="text-[9px] text-[#6C1D5F] font-semibold tracking-widest uppercase mt-1 whitespace-nowrap">
              Manager Portal
            </div>
          </div>
        )}
      </div>

      {/* ── Nav Groups (scrollable) ── */}
      <nav className="flex-1 overflow-y-auto py-2">
        {NAV_GROUPS.map((group) => (
          <div key={group.label}>
            {!collapsed && (
              <div className="px-4 pt-3 pb-1.5 text-[10px] font-bold text-slate-400 tracking-widest uppercase">
                {group.label}
              </div>
            )}
            {group.items.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              const linkEl = collapsed ? (
                <NavLink
                  to={item.path}
                  className={`flex items-center justify-center w-9 h-9 mx-auto rounded-xl transition-all duration-200 ${
                    active
                      ? "bg-[#6C1D5F]/10 text-[#6C1D5F] shadow-sm"
                      : "text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                  }`}
                >
                  <Icon size={18} className="shrink-0" />
                </NavLink>
              ) : (
                <NavLink
                  to={item.path}
                  className={`group flex items-center gap-3 mx-2 rounded-xl text-[13px] font-medium transition-all duration-200 relative px-3.5 py-2 ${
                    active
                      ? "bg-[#6C1D5F]/10 text-[#6C1D5F] font-semibold"
                      : "text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                  }`}
                >
                  {active && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-[#6C1D5F] rounded-r-full" />
                  )}
                  <Icon
                    size={16}
                    className={`shrink-0 transition-colors duration-200 ${
                      active
                        ? "text-[#6C1D5F]"
                        : "text-slate-400 group-hover:text-slate-600"
                    }`}
                  />
                  <span className="whitespace-nowrap">{item.title}</span>
                </NavLink>
              );

              return collapsed ? (
                <NavTooltip key={item.title} label={item.title}>
                  <div className="py-0.5">{linkEl}</div>
                </NavTooltip>
              ) : (
                <div key={item.title}>{linkEl}</div>
              );
            })}
            {collapsed && <div className="my-1.5 mx-3 border-t border-slate-100" />}
          </div>
        ))}
      </nav>

      {/* ── Toggle button (pinned bottom) ── */}
      <div
        className={`shrink-0 border-t border-slate-200/80 py-2.5 ${
          collapsed ? "flex justify-center" : "px-2 bg-white"
        }`}
      >
        <button
          onClick={() => setCollapsed((prev) => !prev)}
          className={`flex items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-all cursor-pointer border-none outline-none ${
            collapsed ? "w-9 h-9" : "w-full gap-2 px-3.5 py-2 text-[12px] font-semibold"
          }`}
          title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          aria-label={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {collapsed ? (
            <PanelLeftOpen size={16} />
          ) : (
            <>
              <PanelLeftClose size={16} />
              <span className="whitespace-nowrap">Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
