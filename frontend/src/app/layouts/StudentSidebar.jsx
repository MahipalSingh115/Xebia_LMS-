import { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  GraduationCap,
  LayoutDashboard,
  BookOpen,
  Calendar,
  ClipboardList,
  Award,
  BarChart3,
  PanelLeftClose,
  PanelLeftOpen,
  Download,
  Sparkles,
} from "lucide-react";

/* ─── Storage Key ─── */
const STORAGE_KEY = "lms-student-sidebar-collapsed";

/* ─── Menu Configuration ─── */
const MAIN_MENU = [
  { title: "Dashboard",    path: "/student",              icon: LayoutDashboard },
  { title: "Courses",      path: "/student/courses",      icon: BookOpen },
  { title: "Calendar",     path: "/student/calendar",     icon: Calendar },
  { title: "Events",       path: "/student/events",       icon: Calendar },
  { title: "Assessments",  path: "/student/assessments",  icon: ClipboardList },
  { title: "Grades",       path: "/student/grades",       icon: Award },
  { title: "Analytics",    path: "/student/analytics",    icon: BarChart3 },
  { title: "Downloads",    path: "/student/downloads",    icon: Download },
  { title: "AI Assistant", path: "/student/assistant",    icon: Sparkles },
];

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

export default function StudentSidebar() {
  const location = useLocation();

  /* ─── Collapsed State ─── */
  const [collapsed, setCollapsed] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? false;
    } catch {
      return false;
    }
  });

  /* ─── Mobile overlay state ─── */
  const [mobileOpen, setMobileOpen] = useState(false);

  /* ─── Auto-collapse on small screens ─── */
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 1024px)");
    const handler = (e) => {
      if (e.matches) setCollapsed(true);
    };
    handler(mql);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  /* ─── Persist to localStorage ─── */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(collapsed));
  }, [collapsed]);

  /* ─── Close mobile drawer on navigation ─── */
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isActive = (path) => {
    if (path === "/student") return location.pathname === "/student";
    return location.pathname.startsWith(path);
  };

  const sidebarWidth = collapsed ? "w-[60px]" : "w-[240px]";

  /* ─── Shared Link Renderer ─── */
  const renderLink = (item) => {
    const Icon = item.icon;
    const active = isActive(item.path);

    if (collapsed) {
      const link = (
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
      );

      return (
        <NavTooltip key={item.path} label={item.title}>
          <div className="py-0.5">{link}</div>
        </NavTooltip>
      );
    }

    const link = (
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
            active ? "text-[#6C1D5F]" : "text-slate-400 group-hover:text-slate-600"
          }`}
        />
        <span className="whitespace-nowrap">{item.title}</span>
      </NavLink>
    );

    return <div key={item.path}>{link}</div>;
  };

  /* ─── Sidebar Content (shared between desktop and mobile) ─── */
  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* ── Logo / Branding ── */}
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
          <GraduationCap size={collapsed ? 16 : 18} className="text-white" />
        </div>
        {!collapsed && (
          <div>
            <div className="text-[14px] font-bold text-slate-900 tracking-tight leading-none whitespace-nowrap">
              Xebia LMS
            </div>
            <div className="text-[9px] text-[#6C1D5F] font-semibold tracking-widest uppercase mt-1 whitespace-nowrap">
              Student Portal
            </div>
          </div>
        )}
      </div>

      {/* ── Main Navigation (scrollable) ── */}
      <nav className="flex-1 overflow-y-auto py-2 space-y-0.5">
        {MAIN_MENU.map(renderLink)}
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
    </div>
  );

  return (
    <>
      {/* ── Desktop Sidebar ── */}
      <aside
        className={`fixed left-0 top-0 h-screen bg-white border-r border-slate-200/80 flex-col z-40 transition-all duration-300 ease-in-out hidden md:flex shadow-[1px_0_3px_rgba(0,0,0,0.02)] ${sidebarWidth}`}
      >
        {sidebarContent}
      </aside>

      {/* ── Mobile Hamburger Button ── */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-3 left-3 z-50 w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-all cursor-pointer"
        aria-label="Open navigation"
      >
        <PanelLeftOpen size={18} />
      </button>

      {/* ── Mobile Overlay + Drawer ── */}
      {mobileOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="md:hidden fixed left-0 top-0 h-screen w-[240px] bg-white border-r border-slate-200 z-50 shadow-2xl animate-slide-in">
            {sidebarContent}
          </aside>
        </>
      )}
    </>
  );
}
