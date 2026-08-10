import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Search, Filter, Calendar, MapPin, ArrowRight } from "lucide-react";
import AppLayout from "@/app/layouts/AppLayout";
import eventService from "../services/eventService";
import EmptyState from "@/shared/components/EmptyState";

export default function EventsCatalog() {
  const navigate = useNavigate();
  const location = useLocation();
  const isTrainer = location.pathname.startsWith("/trainer");
  
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Events");
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      // Get all events by specifying a large size
      const response = await eventService.getEventsPaginated(0, 100);
      setEvents(response.data?.content || []);
    } catch (err) {
      showToast("Failed to load events catalog", "error");
    } finally {
      setLoading(false);
    }
  };

  const formatDateShort = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const formatTimeline = (startStr, endStr) => {
    if (!startStr) return "";
    const start = new Date(startStr);
    const startFormatted = start.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    if (!endStr) return startFormatted;
    const end = new Date(endStr);
    const endFormatted = end.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    return `${startFormatted} - ${endFormatted}`;
  };

  const getStatusBadge = (event) => {
    const now = new Date();
    const deadline = new Date(event.registrationDeadline);
    const start = new Date(event.timelineStart);

    if (now > start) {
      return { text: "Ongoing", classes: "bg-slate-100 text-slate-600" };
    }
    
    const diffTime = Math.abs(deadline - now);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (now > deadline) {
      return { text: "Closed", classes: "bg-rose-50 text-rose-600 border border-rose-100" };
    }
    if (diffDays <= 2) {
      return { text: `Ends in ${diffDays} days`, classes: "bg-amber-50 text-amber-600 border border-amber-100" };
    }
    return { text: "Open", classes: "bg-emerald-50 text-emerald-600 border border-emerald-100" };
  };

  const getEventImageUrl = (url) => {
    if (!url) return "";
    if (url.startsWith("/uploads/")) {
      const backendHost = import.meta.env.VITE_API_URL?.replace("/api", "") || "http://localhost:8080";
      return `${backendHost}${url}`;
    }
    return url;
  };

  // Filter events locally by category and search
  const filteredEvents = events.filter(event => {
    const matchesSearch = (event.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (event.location || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (event.description || "").toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeCategory === "All Events") return matchesSearch;

    // Categorization logic based on text matches
    const titleLower = event.title?.toLowerCase() || "";
    if (activeCategory === "Workshops" && titleLower.includes("workshop")) return matchesSearch;
    if (activeCategory === "Webinars" && (titleLower.includes("webinar") || titleLower.includes("virtual"))) return matchesSearch;
    if (activeCategory === "Certification" && titleLower.includes("cert")) return matchesSearch;
    if (activeCategory === "Hackathons" && titleLower.includes("hack")) return matchesSearch;

    // Fallback if no specific match but search matches
    return false;
  });

  const content = (
    <div className="max-w-[1100px] w-full mx-auto px-6 md:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Catalog Title Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-slate-100 pb-4">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">Upcoming Events</h1>
          <p className="text-slate-500 text-sm mt-1">Discover workshops, certification bootcamps, and live seminars curated for your learning path.</p>
        </div>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1 rounded-lg">
          {["All Events", "Workshops", "Certification", "Webinars", "Hackathons"].map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-3 py-1.5 text-xs font-bold rounded-md cursor-pointer border-none transition-all ${
                activeCategory === category
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-500 hover:text-slate-700 bg-transparent"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-9 pr-4 rounded-xl border border-slate-200 bg-white hover:border-slate-350 focus:border-[#6C1D5F] focus:ring-1 focus:ring-[#6C1D5F] outline-none text-xs text-slate-750"
            placeholder="Search events, topics..."
            type="text"
          />
        </div>
      </div>

      {/* Event Grid list */}
      {loading ? (
        <div className="py-12 text-center text-slate-400 text-xs">Loading events catalog...</div>
      ) : filteredEvents.length === 0 ? (
        <EmptyState
          icon={Calendar}
          title="No Events Found"
          description="There are currently no events matching your search or filters in the catalog."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => {
            const badge = getStatusBadge(event);
            return (
              <div key={event.id} className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="relative h-44 bg-slate-50 border-b border-slate-100 flex items-center justify-center overflow-hidden">
                    {event.imageUrl ? (
                      <img className="w-full h-full object-cover" src={getEventImageUrl(event.imageUrl)} alt={event.title} />
                    ) : (
                      <div className="text-slate-300 font-black text-xl uppercase">Xebia LMS</div>
                    )}
                    <div className="absolute top-3 right-3">
                      <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full uppercase tracking-wider ${badge.classes}`}>
                        {badge.text}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 space-y-3">
                    <h3 className="font-bold text-slate-750 text-sm leading-tight line-clamp-1">{event.title}</h3>
                    <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">{event.description}</p>
                    
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <div className="flex items-center gap-2 text-slate-450 text-[11px] font-medium">
                        <Calendar size={14} className="shrink-0 text-[#6C1D5F]" />
                        <span>{formatTimeline(event.timelineStart, event.timelineEnd)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-450 text-[11px] font-medium">
                        <MapPin size={14} className="shrink-0 text-[#6C1D5F]" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="px-5 py-4 border-t border-slate-150 bg-slate-50/50 flex justify-end">
                  <button
                    onClick={() => navigate(isTrainer ? `/trainer/events/${event.id}` : `/student/events/${event.id}`)}
                    className="flex items-center gap-1 text-[#6C1D5F] hover:text-[#4A1E47] font-bold text-xs bg-transparent border-none cursor-pointer transition-colors"
                  >
                    View Details
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-lg shadow-lg border animate-[slideIn_0.3s_ease-out] ${
          toast.type === "error" ? "bg-red-50 border-red-200 text-red-700" : "bg-emerald-50 border-emerald-200 text-emerald-700"
        }`}>
          <span className={`w-2 h-2 rounded-full ${toast.type === "error" ? "bg-red-500" : "bg-emerald-500"} flex-shrink-0 animate-pulse`} />
          <span className="text-[13px] font-semibold">{toast.message}</span>
        </div>
      )}
    </div>
  );

  if (isTrainer) {
    return <AppLayout>{content}</AppLayout>;
  }

  return content;
}
