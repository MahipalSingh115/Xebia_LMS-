import React, { useState, useEffect } from "react";
import {
  Bell,
  CheckCheck,
  ClipboardList,
  Megaphone,
  MessageSquare,
  BellOff,
  Trash2,
  ExternalLink,
} from "lucide-react";
import api from "@/shared/services/api";

const getIconComponent = (iconName) => {
  switch (iconName) {
    case "ClipboardList": return ClipboardList;
    case "Megaphone": return Megaphone;
    case "MessageSquare": return MessageSquare;
    default: return ClipboardList;
  }
};

const getIconStyles = (category) => {
  switch (category) {
    case "reminder":
      return {
        label: "Reminder",
        colorClass: "text-[#6C1D5F] bg-[#6C1D5F]/5 border-[#6C1D5F]/15"
      };
    case "system":
      return {
        label: "System Announcement",
        colorClass: "text-amber-600 bg-amber-50 border-amber-100"
      };
    case "community":
      return {
        label: "Community Update",
        colorClass: "text-teal-600 bg-teal-50 border-teal-100"
      };
    default:
      return {
        label: "Notification",
        colorClass: "text-slate-600 bg-slate-50 border-slate-100"
      };
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

export default function NotificationsPage({ role, userId }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await api.get("/notifications", {
        params: {
          role,
          userId,
          category: activeFilter,
          page: 0,
          size: 50
        }
      });
      if (res.data && res.data.data) {
        const content = Array.isArray(res.data.data) 
          ? res.data.data 
          : (res.data.data.content || []);
        setNotifications(content);
      }
    } catch (err) {
      console.error("Failed to load notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [role, userId, activeFilter]);

  const handleMarkAllRead = async () => {
    try {
      await api.put(`/notifications/mark-all-read?role=${role}&userId=${userId}`);
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    } catch (err) {
      console.error("Failed to mark all as read:", err);
    }
  };

  const toggleReadStatus = async (id, currentRead) => {
    try {
      if (!currentRead) {
        await api.put(`/notifications/${id}/read`);
        setNotifications(prev =>
          prev.map(n => (n.id === id ? { ...n, read: true } : n))
        );
      }
    } catch (err) {
      console.error("Failed to mark notification as read:", err);
    }
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    try {
      await api.delete(`/notifications/${id}`);
      setNotifications(prev => prev.filter(n => n.id !== id));
    } catch (err) {
      console.error("Failed to delete notification:", err);
    }
  };

  return (
    <div className="max-w-[1000px] w-full mx-auto px-6 md:px-8 py-8 space-y-8 animate-fadeIn">
      {/* ── Page Header ── */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Notifications</h2>
          <p className="text-[13px] text-slate-400 mt-1">Stay updated on your learning journey.</p>
        </div>
        {notifications.some((n) => !n.read) && (
          <button
            onClick={handleMarkAllRead}
            className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-[#6C1D5F] font-bold rounded-xl text-[12px] border border-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer outline-none shrink-0"
          >
            <CheckCheck size={14} /> Mark all as read
          </button>
        )}
      </header>

      {/* ── Filters ── */}
      <div className="flex overflow-x-auto gap-2.5 pb-2 border-b border-slate-100 whitespace-nowrap hide-scrollbar">
        {[
          { id: "all", label: "All" },
          { id: "reminder", label: "Reminders" },
          { id: "system", label: "System Announcements" },
          { id: "community", label: "Community Updates" }
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id)}
            className={`px-4 py-1.5 rounded-full text-[11.5px] font-bold border transition-all cursor-pointer outline-none ${
              activeFilter === f.id
                ? "bg-[#6C1D5F] text-white border-[#6C1D5F]"
                : "bg-white text-slate-500 border-slate-200 hover:border-slate-350"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* ── Notifications List ── */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6C1D5F]" />
        </div>
      ) : notifications.length > 0 ? (
        <div className="space-y-4">
          {notifications.map((n) => {
            const IconComponent = getIconComponent(n.icon);
            const { label, colorClass } = getIconStyles(n.category);

            return (
              <div
                key={n.id}
                onClick={() => toggleReadStatus(n.id, n.read)}
                className={`group relative border rounded-2xl p-5 flex gap-4 transition-all duration-200 cursor-pointer shadow-sm ${
                  !n.read
                    ? "bg-white border-[#6C1D5F]/20 hover:bg-[#6C1D5F]/5"
                    : "bg-white/80 border-slate-200 hover:bg-slate-50/50 opacity-80"
                }`}
              >
                {/* Highlight line on the left side of unread items */}
                {!n.read && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-[#6C1D5F] rounded-r-full" />
                )}

                {/* Circle Icon */}
                <div className={`flex-shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center border ${colorClass}`}>
                  <IconComponent size={18} />
                </div>

                {/* Content details */}
                <div className="flex-1 min-w-0 pr-6">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[10px] font-black uppercase text-[#84117C] tracking-wider">
                      {label}
                    </span>
                    <span className="text-[10.5px] text-slate-400 font-semibold">{formatRelativeTime(n.createdAt)}</span>
                  </div>
                  <h3 className={`text-[13.5px] text-slate-800 tracking-tight leading-snug ${!n.read ? "font-extrabold" : "font-semibold"}`}>
                    {n.title}
                  </h3>
                  <p className="text-[12px] text-slate-450 mt-1 leading-relaxed">{n.description}</p>
                </div>

                {/* Delete button (visible on hover) */}
                <button
                  onClick={(e) => handleDelete(n.id, e)}
                  className="absolute right-5 bottom-5 p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-slate-100 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer border-none bg-transparent outline-none"
                  title="Delete Notification"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        /* ── Empty State ── */
        <div className="flex flex-col items-center justify-center py-20 text-center bg-white border border-slate-250/20 rounded-3xl shadow-sm space-y-4.5">
          <div className="w-16 h-16 bg-slate-50 border border-slate-200/60 rounded-2xl flex items-center justify-center text-slate-350 shadow-sm">
            <BellOff size={24} />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-slate-700 text-[14px]">You're all caught up!</h3>
            <p className="text-[11.5px] text-slate-400 max-w-xs mx-auto">
              There are no updates or system notifications in this category.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
