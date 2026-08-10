import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  Bell,
  Search,
  HelpCircle,
  ChevronDown,
  User,
  Settings,
  LogOut,
  X,
  ClipboardList,
  Megaphone,
  MessageSquare,
  ExternalLink,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/shared/components/ui/avatar";
import { Separator } from "@/shared/components/ui/separator";
import { Badge } from "@/shared/components/ui/badge";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import api from "@/shared/services/api";
import adminProfileIcon from "../../assets/admin_profile_icon.svg";

const getDropdownIconDetails = (category) => {
  switch (category) {
    case "reminder":
      return { icon: ClipboardList, color: "text-[#6C1D5F]", bg: "bg-[#6C1D5F]/10" };
    case "system":
      return { icon: Megaphone, color: "text-amber-600", bg: "bg-amber-50" };
    case "community":
      return { icon: MessageSquare, color: "text-teal-600", bg: "bg-teal-50" };
    default:
      return { icon: ClipboardList, color: "text-slate-500", bg: "bg-slate-50" };
  }
};

const formatRelativeTime = (dateString) => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    
    if (diffMins < 60) {
      return diffMins <= 0 ? "Just now" : `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else if (diffHours < 48) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
    }
  } catch (e) {
    return "";
  }
};

const PATH_LABELS = {
  "/admin": "Dashboard",
  "/analytics/executive-summary": "Executive Summary",
  "/analytics/training-effectiveness": "Training Effectiveness",
  "/analytics/project-learning-investment": "Project Learning Investment",
  "/analytics/fresher-journey": "Fresher Journey",
  "/analytics/skill-gap": "Skill Gap",
  "/analytics/predictive-analytics": "Predictive Analytics",
  "/analytics/learning/coverage": "Learning Coverage",
  "/analytics/learning/hours": "Learning Hours",
  "/analytics/learning/categories": "Learning Categories",
  "/analytics/learning/trends": "Learning Trends",
  "/analytics/ai-transformation": "AI Transformation",
  "/analytics/certifications": "Certifications",
  "/analytics/flagship-programs": "Flagship Programs",
  "/analytics/learning-champions": "Learning Champions",
  "/analytics": "Analytics",
  "/categories": "Categories",
  "/courses": "Courses",
  "/module-management": "Module Management",
  "/content-library": "Content Library",
  "/learners": "Learners",
  "/certifications": "Certifications",
  "/assessments": "Assessments",
  "/schedule": "Schedule",
  "/settings": "Settings",
  "/manager": "Dashboard",
  "/manager/learning": "Learning Dashboard",
  "/manager/categories": "Categories",
  "/manager/courses": "Courses",
  "/manager/assessments": "Assessments",
  "/manager/learners": "Learners",
  "/manager/trainers": "Trainers",
  "/manager/batches": "Batches",
  "/manager/analytics": "Reports & Analytics",
  "/manager/approvals": "Approval Center",
  "/manager/settings": "Settings",
};

function getBreadcrumb(pathname) {
  // Match exact or prefix
  const label = Object.entries(PATH_LABELS).find(([key]) =>
    key !== "/admin" && key !== "/manager" ? pathname.startsWith(key) : pathname === key
  );
  return label ? label[1] : "Page";
}

export default function Topbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isManager = location.pathname.startsWith("/manager");
  const profileLink = isManager ? "/manager/profile" : "/admin/profile";
  const pageLabel = getBreadcrumb(location.pathname);

  const userName = isManager ? "Manager" : "Admin";
  const userRole = isManager ? "Manager Console" : "Super Admin";
  const userEmail = isManager ? "manager@xebia.com" : "admin@xebia.com";
  const settingsLink = isManager ? "/manager/settings" : "/settings";

  // Search states
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  const searchRef = useRef(null);
  const searchWrapperRef = useRef(null);

  const isMac =
    typeof navigator !== "undefined" &&
    /Mac|iPhone|iPad/.test(navigator.userAgent);

  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotificationsData = useCallback(async () => {
    try {
      const activeRole = isManager ? "manager" : "admin";
      const activeId = isManager ? "m1" : "a1";

      const countRes = await api.get("/notifications/unread-count", {
        params: { role: activeRole, userId: activeId }
      });
      setUnreadCount(countRes.data?.data || 0);

      const listRes = await api.get("/notifications", {
        params: { role: activeRole, userId: activeId, page: 0, size: 5 }
      });
      if (listRes.data && listRes.data.data) {
        const content = Array.isArray(listRes.data.data) 
          ? listRes.data.data 
          : (listRes.data.data.content || []);
        setNotifications(content);
      }
    } catch (err) {
      console.error("Failed to fetch topbar notifications:", err);
    }
  }, [isManager]);

  useEffect(() => {
    fetchNotificationsData();
    const interval = setInterval(fetchNotificationsData, 10000);
    return () => clearInterval(interval);
  }, [fetchNotificationsData]);

  // Keyboard focus Ctrl+K
  const handleKeyDown = useCallback((e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      searchRef.current?.focus();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Click outside listener for search dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchWrapperRef.current && !searchWrapperRef.current.contains(event.target)) {
        setShowSearchDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced API search
  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setSearchResults([]);
      setShowSearchDropdown(false);
      return;
    }

    setLoading(true);
    setShowSearchDropdown(true);

    const delayDebounceFn = setTimeout(async () => {
      try {
        const lowercaseQuery = searchQuery.toLowerCase();
        const getArray = (val) => {
          if (!val) return [];
          if (Array.isArray(val)) return val;
          if (val.content && Array.isArray(val.content)) return val.content;
          if (val.data && Array.isArray(val.data)) return val.data;
          return [];
        };

        // Build list of endpoints based on role
        const endpoints = isManager
          ? [
              api.get("/courses").then(r => ({ category: "Courses", data: getArray(r.data.data), type: "course" })),
              api.get("/categories").then(r => ({ category: "Categories", data: getArray(r.data.data), type: "category" })),
              api.get("/students?all=true").then(r => ({ category: "Learners", data: getArray(r.data.data), type: "student" })),
              api.get("/trainers?all=true").then(r => ({ category: "Trainers", data: getArray(r.data.data), type: "trainer" })),
              api.get("/batches?all=true").then(r => ({ category: "Batches", data: getArray(r.data.data), type: "batch" })),
              api.get("/approval-requests").then(r => ({ category: "Approvals", data: getArray(r.data.data), type: "approval" })),
              api.get("/assignments").then(r => ({ category: "Assessments", data: getArray(r.data.data), type: "assessment" })),
            ]
          : [
              api.get("/courses").then(r => ({ category: "Courses", data: getArray(r.data.data), type: "course" })),
              api.get("/categories").then(r => ({ category: "Categories", data: getArray(r.data.data), type: "category" })),
              api.get("/students?all=true").then(r => ({ category: "Learners", data: getArray(r.data.data), type: "student" })),
              api.get("/trainers?all=true").then(r => ({ category: "Trainers", data: getArray(r.data.data), type: "trainer" })),
              api.get("/batches?all=true").then(r => ({ category: "Batches", data: getArray(r.data.data), type: "batch" })),
              api.get("/events").then(r => ({ category: "Events", data: getArray(r.data.data), type: "event" })),
            ];

        const responses = await Promise.allSettled(endpoints);
        const resultsGrouped = [];

        responses.forEach(res => {
          if (res.status === "fulfilled") {
            const { category, data, type } = res.value;

            const filtered = data.filter(item => {
              if (!item) return false;
              const name = (item.name || item.title || item.courseName || item.requesterName || "").toLowerCase();
              const desc = (item.description || item.code || item.email || item.type || "").toLowerCase();
              return name.includes(lowercaseQuery) || desc.includes(lowercaseQuery);
            });

            if (filtered.length > 0) {
              resultsGrouped.push({
                category,
                items: filtered.slice(0, 5).map(item => {
                  let title = item.name || item.title || item.courseName || item.requesterName || "Unnamed";
                  let description = item.description || item.code || item.email || item.type || "";
                  let path = "/";

                  if (type === "course") {
                    path = isManager ? `/manager/courses` : `/courses`;
                  } else if (type === "category") {
                    path = isManager ? `/manager/categories` : `/categories`;
                  } else if (type === "student") {
                    path = isManager ? `/manager/learners` : `/learners`;
                  } else if (type === "trainer") {
                    path = isManager ? `/manager/trainers` : `/learners`;
                  } else if (type === "batch") {
                    path = isManager ? `/manager/batches` : `/learners`;
                  } else if (type === "approval") {
                    path = `/manager/approvals`;
                  } else if (type === "assessment") {
                    path = `/manager/assessments`;
                  } else if (type === "event") {
                    path = `/admin/events`;
                  }

                  return { title, description, path };
                })
              });
            }
          }
        });

        setSearchResults(resultsGrouped);
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, isManager]);

  return (
    <header className="sticky top-0 z-30 flex h-[52px] items-center justify-between border-b border-slate-200 bg-white px-8 flex-shrink-0">

      {/* ── Left: Empty ────────────────────────── */}
      <div className="flex-1 max-w-[200px]" />

      {/* ── Center: Global Search ─────────────────────────────── */}
      <div ref={searchWrapperRef} className="hidden md:flex flex-1 max-w-md mx-auto relative">
        <div
          className={`w-full flex items-center gap-2 rounded-lg border px-3 h-8 transition-all duration-150 ${
            searchFocused
              ? "border-[#6C1D5F]/40 ring-2 ring-[#6C1D5F]/8 bg-white"
              : "border-slate-200 bg-slate-50/80 hover:bg-slate-100/60 hover:border-slate-300"
          }`}
        >
          <Search size={14} className="text-slate-400 shrink-0" />
          <input
            ref={searchRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => {
              setSearchFocused(true);
              if (searchQuery.trim().length >= 2) setShowSearchDropdown(true);
            }}
            placeholder={
              isManager
                ? "Search courses, learners, trainers, batches..."
                : "Search courses, categories, learners, events..."
            }
            className="flex-1 bg-transparent border-none outline-none text-[13px] text-slate-700 placeholder:text-slate-400 p-0"
          />
          {!searchFocused && (
            <kbd className="hidden lg:inline-flex items-center gap-0.5 rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-slate-400 leading-none">
              {isMac ? "⌘" : "Ctrl"}
              <span className="text-[9px]">K</span>
            </kbd>
          )}
        </div>

        {/* ── Search Dropdown ── */}
        {showSearchDropdown && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-2xl z-[9999] max-h-80 overflow-y-auto p-1">
            {loading ? (
              <div className="px-4 py-6 text-center text-[13px] text-slate-500 flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                Searching...
              </div>
            ) : searchResults.length === 0 ? (
              <div className="px-4 py-6 text-center text-[13px] text-slate-400">
                No results found.
              </div>
            ) : (
              <div className="py-1">
                {searchResults.map((group) => (
                  <div key={group.category} className="mb-2 last:mb-0">
                    <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {group.category}
                    </div>
                    {group.items.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          navigate(item.path);
                          setShowSearchDropdown(false);
                          setSearchQuery("");
                        }}
                        className="w-full flex flex-col items-start px-3 py-2 hover:bg-slate-50 transition-colors text-left rounded-lg cursor-pointer border-none bg-transparent"
                      >
                        <span className="text-[12.5px] font-semibold text-slate-700 truncate w-full">
                          {item.title}
                        </span>
                        {item.description && (
                          <span className="text-[11px] text-slate-400 truncate w-full mt-0.5">
                            {item.description}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Right: Actions ───────────────────────── */}
      <div className="flex items-center gap-3 shrink-0 ml-auto">

        {/* ── Notifications dropdown ── */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition-colors relative border-none bg-transparent cursor-pointer outline-none"
              aria-label="Notifications"
            >
              <Bell size={16} />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#6C1D5F]/60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#6C1D5F]" />
                </span>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-80 p-0 rounded-xl shadow-lg border border-slate-200 bg-white"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
              <span className="text-[13px] font-semibold text-slate-800">
                Notifications
              </span>
              {unreadCount > 0 && (
                <Badge
                  variant="secondary"
                  className="text-[10px] h-5 bg-[#6C1D5F]/10 text-[#6C1D5F] font-semibold"
                >
                  {unreadCount} new
                </Badge>
              )}
            </div>

            {/* Notification list */}
            <ScrollArea className="max-h-72">
              <div className="py-1">
                {notifications.length > 0 ? (
                  notifications.map((n) => {
                    const { icon: Icon, color, bg } = getDropdownIconDetails(n.category);
                    return (
                      <button
                        key={n.id}
                        className={`w-full flex items-start gap-3 px-4 py-2.5 text-left hover:bg-slate-50 transition-colors cursor-pointer border-none bg-transparent ${
                          !n.read ? "bg-[#6C1D5F]/[0.02]" : ""
                        }`}
                        onClick={() => navigate(isManager ? "/manager/notifications" : "/admin/notifications")}
                      >
                        <div
                          className={`shrink-0 w-8 h-8 rounded-lg ${bg} flex items-center justify-center mt-0.5`}
                        >
                          <Icon size={14} className={color} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            {!n.read && (
                              <span className="w-1.5 h-1.5 rounded-full bg-[#6C1D5F] shrink-0" />
                            )}
                            <span className="text-[12.5px] font-semibold text-slate-700 truncate">
                              {n.title}
                            </span>
                          </div>
                          <p className="text-[11.5px] text-slate-500 mt-0.5 line-clamp-1">
                            {n.description}
                          </p>
                          <span className="text-[10.5px] text-slate-400 mt-0.5 block">
                            {formatRelativeTime(n.createdAt)}
                          </span>
                        </div>
                      </button>
                    );
                  })
                ) : (
                  <div className="px-4 py-6 text-center text-[12.5px] text-slate-400">
                    No new notifications.
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Footer */}
            <div className="border-t border-slate-100 px-4 py-2.5">
              <Link
                to={isManager ? "/manager/notifications" : "/admin/notifications"}
                className="flex items-center justify-center gap-1.5 text-[12px] font-semibold text-[#6C1D5F] hover:text-[#84117C] transition-colors"
              >
                View All Notifications
                <ExternalLink size={11} />
              </Link>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* ── Profile dropdown ── */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center justify-center rounded-full w-8 h-8 hover:bg-slate-50 transition-colors cursor-pointer outline-none select-none border-none bg-transparent">
              <Avatar className="h-7 w-7">
                <AvatarImage src={adminProfileIcon} alt={userName} />
                <AvatarFallback className="text-xs bg-[#6C1D5F] text-white">
                  {isManager ? "M" : "A"}
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-52 rounded-xl shadow-lg border border-slate-200 p-1 bg-white"
          >
            <div className="px-3 py-2.5">
              <p className="text-[13px] font-bold text-slate-800">
                {userName}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {userEmail}
              </p>
            </div>
            <DropdownMenuSeparator className="bg-slate-100" />

            <DropdownMenuItem
              asChild
              className="focus:bg-[#6C1D5F]/5 focus:text-[#6C1D5F] rounded-lg cursor-pointer"
            >
              <Link
                to={profileLink}
                className="flex items-center gap-2.5 px-3 py-2 text-[12.5px] font-medium w-full text-slate-700"
              >
                <User size={14} />
                My Profile
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem
              asChild
              className="focus:bg-[#6C1D5F]/5 focus:text-[#6C1D5F] rounded-lg cursor-pointer"
            >
              <Link
                to={settingsLink}
                className="flex items-center gap-2.5 px-3 py-2 text-[12.5px] font-medium w-full text-slate-700"
              >
                <Settings size={14} />
                Settings
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem
              className="focus:bg-[#6C1D5F]/5 focus:text-[#6C1D5F] rounded-lg cursor-pointer flex items-center gap-2.5 px-3 py-2 text-[12.5px] font-medium text-slate-700"
            >
              <HelpCircle size={14} />
              Help & Support
            </DropdownMenuItem>

            <DropdownMenuSeparator className="bg-slate-100" />

            <DropdownMenuItem
              asChild
              className="focus:bg-rose-50 focus:text-rose-600 rounded-lg cursor-pointer"
            >
              <Link
                to="/login"
                className="flex items-center gap-2.5 px-3 py-2 text-[12.5px] font-medium w-full text-slate-700 hover:text-rose-600"
              >
                <LogOut size={14} className="text-rose-500" />
                Logout
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
