import React, { useState, useEffect, useCallback, useRef } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  Bell,
  Search,
  Calendar,
  Mail,
  User,
  Settings,
  BookOpen,
  HelpCircle,
  LogOut,
  ChevronDown,
  ClipboardList,
  Megaphone,
  MessageSquare,
  ExternalLink,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/shared/components/ui/avatar";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Separator } from "@/shared/components/ui/separator";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import api from "@/shared/services/api";

/* ── Route metadata ──────────────────────────────────────────────── */
const PATH_METADATA = {
  "/student": {
    title: "Dashboard",
    breadcrumb: "Dashboard",
    description: "Your academic progress at a glance.",
  },
  "/student/courses": {
    title: "My Courses",
    breadcrumb: "Courses",
    description: "Enrolled classes and modules.",
  },
  "/student/calendar": {
    title: "Calendar",
    breadcrumb: "Calendar",
    description: "Deadlines, sessions, and events.",
  },
  "/student/assessments": {
    title: "Assessments Dashboard",
    breadcrumb: "Assessments",
    description: "Unified dashboard for assignments and quiz tests.",
  },
  "/student/assignments": {
    title: "Assessments Dashboard",
    breadcrumb: "Assessments",
    description: "Unified dashboard for assignments and quiz tests.",
  },
  "/student/quizzes": {
    title: "Assessments Dashboard",
    breadcrumb: "Assessments",
    description: "Unified dashboard for assignments and quiz tests.",
  },
  "/student/grades": {
    title: "Academic Record",
    breadcrumb: "Grades",
    description: "Grades, transcripts, and certificates.",
  },
  "/student/analytics": {
    title: "Analytics",
    breadcrumb: "Analytics",
    description: "Study metrics and performance insights.",
  },
  "/student/downloads": {
    title: "Downloads",
    breadcrumb: "Downloads",
    description: "Study guides, templates, and resources.",
  },
  "/student/assistant": {
    title: "AI Assistant",
    breadcrumb: "AI Assistant",
    description: "Instant academic help from your AI tutor.",
  },
  "/student/notifications": {
    title: "Notifications",
    breadcrumb: "Notifications",
    description: "Grades, deadlines, and announcements.",
  },
  "/student/profile": {
    title: "Profile",
    breadcrumb: "Profile",
    description: "Personal and academic information.",
  },
  "/student/settings": {
    title: "Settings",
    breadcrumb: "Settings",
    description: "Notification, security, and preferences.",
  },
};

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

export default function StudentTopbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const [searchFocused, setSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [scrolled, setScrolled] = useState(false);
  
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotificationsData = useCallback(async () => {
    try {
      const countRes = await api.get("/notifications/unread-count", {
        params: { role: "student", userId: "s4" }
      });
      setUnreadCount(countRes.data?.data || 0);

      const listRes = await api.get("/notifications", {
        params: { role: "student", userId: "s4", page: 0, size: 5 }
      });
      if (listRes.data && listRes.data.data) {
        const content = Array.isArray(listRes.data.data) 
          ? listRes.data.data 
          : (listRes.data.data.content || []);
        setNotifications(content);
      }
    } catch (err) {
      console.error("Failed to fetch student topbar notifications:", err);
    }
  }, []);

  useEffect(() => {
    fetchNotificationsData();
    const interval = setInterval(fetchNotificationsData, 10000);
    return () => clearInterval(interval);
  }, [fetchNotificationsData]);

  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const searchWrapperRef = useRef(null);

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

  // Debounced API search for Student Portal
  useEffect(() => {
    if (searchValue.trim().length < 2) {
      setSearchResults([]);
      setShowSearchDropdown(false);
      return;
    }

    setLoading(true);
    setShowSearchDropdown(true);

    const delayDebounceFn = setTimeout(async () => {
      try {
        const lowercaseQuery = searchValue.toLowerCase();
        const studentId = "s4";
        const getArray = (val) => {
          if (!val) return [];
          if (Array.isArray(val)) return val;
          if (val.content && Array.isArray(val.content)) return val.content;
          if (val.data && Array.isArray(val.data)) return val.data;
          return [];
        };

        const endpoints = [
          api.get("/courses").then(r => ({ category: "Courses", data: getArray(r.data.data), type: "course" })),
          api.get("/assignments/paginated", { params: { studentId, q: searchValue, page: 0, size: 5 } }).then(r => ({ category: "Assignments", data: getArray(r.data.data), type: "assignment" })),
          api.get("/quizzes/paginated", { params: { studentId, q: searchValue, page: 0, size: 5 } }).then(r => ({ category: "Quizzes", data: getArray(r.data.data), type: "quiz" })),
          api.get("/resources", { params: { studentId, q: searchValue, page: 0, size: 5 } }).then(r => ({ category: "Resources", data: getArray(r.data.data), type: "resource" })),
          api.get("/grades", { params: { studentId, q: searchValue, page: 0, size: 5 } }).then(r => ({ category: "Grades", data: getArray(r.data.data), type: "grade" })),
          api.get("/events").then(r => ({ category: "Events", data: getArray(r.data.data), type: "event" })),
        ];

        const responses = await Promise.allSettled(endpoints);
        const resultsGrouped = [];

        responses.forEach(res => {
          if (res.status === "fulfilled") {
            const { category, data, type } = res.value;

            // Courses and Events need client-side filtering since they might not support query param on backend
            const filtered = data.filter(item => {
              if (!item) return false;
              const name = (item.name || item.title || item.courseName || item.subject || "").toLowerCase();
              const desc = (item.description || item.code || item.fileType || "").toLowerCase();
              return name.includes(lowercaseQuery) || desc.includes(lowercaseQuery);
            });

            if (filtered.length > 0) {
              resultsGrouped.push({
                category,
                items: filtered.slice(0, 5).map(item => {
                  let title = item.name || item.title || item.courseName || item.subject || "Unnamed";
                  let description = item.description || item.code || item.fileType || "";
                  let path = "/student";

                  if (type === "course") {
                    path = `/student/courses`;
                  } else if (type === "assignment") {
                    path = `/student/assessments`;
                  } else if (type === "quiz") {
                    path = `/student/assessments`;
                  } else if (type === "resource") {
                    path = `/student/downloads`;
                  } else if (type === "grade") {
                    path = `/student/grades`;
                  } else if (type === "event") {
                    path = `/student/calendar`;
                  }

                  return { title, description, path };
                })
              });
            }
          }
        });

        setSearchResults(resultsGrouped);
      } catch (err) {
        console.error("Student Search error:", err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchValue]);

  /* ── Resolve current page metadata ── */
  const currentPath =
    location.pathname.endsWith("/") && location.pathname !== "/student/"
      ? location.pathname.slice(0, -1)
      : location.pathname;

  const resolveMeta = (path) => {
    // Exact match first
    if (PATH_METADATA[path]) return PATH_METADATA[path];

    // Dynamic route patterns
    if (/^\/student\/courses\/[^/]+\/modules\/[^/]+\/lessons\/[^/]+$/.test(path)) {
      return { title: "Lesson", breadcrumb: "Courses / Lesson", description: "Lesson content and resources." };
    }
    if (/^\/student\/courses\/[^/]+\/modules\/[^/]+$/.test(path)) {
      return { title: "Module", breadcrumb: "Courses / Module", description: "Module details and lessons." };
    }
    if (/^\/student\/courses\/[^/]+\/completed$/.test(path)) {
      return { title: "Course Completed", breadcrumb: "Courses / Completed", description: "Congratulations on finishing!" };
    }
    if (/^\/student\/courses\/[^/]+$/.test(path)) {
      return { title: "Course Overview", breadcrumb: "Courses / Overview", description: "Course details and curriculum." };
    }

    return { title: "Student Portal", breadcrumb: "Home", description: "" };
  };

  const meta = resolveMeta(currentPath);

  /* ── Scroll shadow ── */
  useEffect(() => {
    const main = document.querySelector("main");
    if (!main) return;
    const handler = () => setScrolled(main.scrollTop > 2);
    main.addEventListener("scroll", handler, { passive: true });
    return () => main.removeEventListener("scroll", handler);
  }, []);

  /* ── Keyboard shortcut: Ctrl/Cmd + K → focus search ── */
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

  const isMac =
    typeof navigator !== "undefined" &&
    /Mac|iPhone|iPad/.test(navigator.userAgent);

  return (
    <header
      className={`sticky top-0 z-30 flex h-14 items-center border-b bg-white px-4 md:px-6 flex-shrink-0 transition-shadow duration-200 ${
        scrolled
          ? "border-slate-200 shadow-[0_1px_3px_0_rgba(0,0,0,0.06)]"
          : "border-slate-200/80"
      }`}
    >
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
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => {
              setSearchFocused(true);
              if (searchValue.trim().length >= 2) setShowSearchDropdown(true);
            }}
            placeholder="Search courses, assignments, resources..."
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
                          setSearchValue("");
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

      {/* ── Right: Actions ────────────────────────────────────── */}
      <div className="flex items-center gap-3 ml-auto shrink-0">

        {/* ── Notifications dropdown ── */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon-sm"
              className="text-slate-500 hover:text-slate-700 relative"
              aria-label="Notifications"
            >
              <Bell size={16} />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#6C1D5F]/60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#6C1D5F]" />
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-80 p-0 rounded-xl shadow-lg border border-slate-200"
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
                {notifications.map((n) => {
                  const { icon: Icon, color, bg } = getDropdownIconDetails(n.category);
                  return (
                    <button
                      key={n.id}
                      className={`w-full flex items-start gap-3 px-4 py-2.5 text-left hover:bg-slate-50 transition-colors cursor-pointer ${
                        !n.read ? "bg-[#6C1D5F]/[0.02]" : ""
                      }`}
                      onClick={() => navigate("/student/notifications")}
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
                })}
              </div>
            </ScrollArea>

            {/* Footer */}
            <div className="border-t border-slate-100 px-4 py-2.5">
              <Link
                to="/student/notifications"
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
                <AvatarImage
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsyA0vivV0CljyXSlO3SYa2Gmz4zhiGm-b2jr6sz5y0X9zQ-2QYxVIQhFznZswh2oWy6CWbcilrt8DuhXIY0hoZEOwfoLXSXKJq52lwOp6TKpxMxvu5i3PCQBHmpCcMEo0bLB2uhWCNxh2gzo_NV6W4SMp5KSErR1EIEyk4e4ofvihdR7bax6PuGE-LHAsxwQQukHG1AU3DzIR_ILy3eVATJfuedxBS0V9ieM5lajis6SdRBJVU5kxbTcn5VlGWjqCkr786KglsMs"
                  alt="Alex Johnson"
                />
                <AvatarFallback className="text-xs bg-[#6C1D5F] text-white">
                  AJ
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-52 rounded-xl shadow-lg border border-slate-200 p-1"
          >
            {/* Profile summary in dropdown */}
            <div className="px-3 py-2.5">
              <p className="text-[13px] font-semibold text-slate-800">
                Alex Johnson
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                alex.johnson@university.edu
              </p>
            </div>
            <DropdownMenuSeparator className="bg-slate-100" />

            <DropdownMenuItem
              asChild
              className="focus:bg-[#6C1D5F]/5 focus:text-[#6C1D5F] rounded-lg cursor-pointer"
            >
              <Link
                to="/student/profile"
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
                to="/student/courses"
                className="flex items-center gap-2.5 px-3 py-2 text-[12.5px] font-medium w-full text-slate-700"
              >
                <BookOpen size={14} />
                My Courses
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem
              asChild
              className="focus:bg-[#6C1D5F]/5 focus:text-[#6C1D5F] rounded-lg cursor-pointer"
            >
              <Link
                to="/student/settings"
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
                to="/"
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
