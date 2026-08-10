import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Filter, Download, Calendar, Users, MapPin, Search, Trash2, ArrowRight } from "lucide-react";
import AppLayout from "@/app/layouts/AppLayout";
import eventService from "../services/eventService";
import DeleteDialog from "@/shared/components/DeleteDialog";
import EmptyState from "@/shared/components/EmptyState";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";

export default function EventsManagement() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalEvents, setTotalEvents] = useState(0);
  const [activeTab, setActiveTab] = useState("All Events");
  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    fetchEvents();
  }, [page, size]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await eventService.getEventsPaginated(page, size);
      setEvents(response.data?.content || []);
      setTotalPages(response.data?.totalPages || 0);
      setTotalEvents(response.data?.totalElements || 0);
    } catch (err) {
      showToast("Failed to load events", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (event, e) => {
    e.stopPropagation();
    setDeleteTarget(event);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await eventService.deleteEvent(deleteTarget.id);
      showToast("Event deleted successfully", "success");
      setDeleteTarget(null);
      fetchEvents();
    } catch (err) {
      showToast("Failed to delete event", "error");
    } finally {
      setDeleting(false);
    }
  };

  const formatDateRange = (startStr, endStr) => {
    if (!startStr) return "";
    const startDate = new Date(startStr);
    const startFormatted = startDate.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    if (!endStr) return startFormatted;
    
    const endDate = new Date(endStr);
    const endFormatted = endDate.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    return `${startFormatted} - ${endFormatted}`;
  };

  const formatDateShort = (dateStr) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const getEventImageUrl = (imageUrl) => {
    if (!imageUrl) return "";
    if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://") || imageUrl.startsWith("data:")) {
      return imageUrl;
    }
    const backendUrl = "http://localhost:8080";
    return `${backendUrl}${imageUrl}`;
  };

  // Filter events locally by active tab and search query
  const filteredEvents = events.filter(event => {
    const matchesSearch = (event.title || "").toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (event.location || "").toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === "All Events") return matchesSearch;
    
    const now = new Date();
    const start = new Date(event.timelineStart);
    const end = new Date(event.timelineEnd);
    
    if (activeTab === "Live") {
      return matchesSearch && now >= start && now <= end;
    }
    if (activeTab === "Draft") {
      // Mock category if we treat future registration deadline as Draft, or just events that haven't started
      return matchesSearch && now < start;
    }
    if (activeTab === "Completed") {
      return matchesSearch && now > end;
    }
    return matchesSearch;
  });

  return (
    <AppLayout>
      <div className="pt-4 pb-12 px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto space-y-8 animate-fadeIn">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">Events Management</h1>
            <p className="text-slate-500 text-sm mt-1">Oversee all scheduled workshops, webinars, and on-site learning sessions.</p>
          </div>
          <Button
            onClick={() => navigate("/admin/events/create")}
            className="flex items-center gap-2 px-5 py-3 bg-[#6C1D5F] hover:bg-[#521347] text-white rounded-xl font-bold text-sm shadow-md shadow-[#6C1D5F]/20 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer border-none"
          >
            <Plus size={16} />
            New Event
          </Button>
        </div>

        {/* Summary Metrics Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <div className="p-2.5 bg-purple-50 text-[#6C1D5F] rounded-lg">
                <Calendar size={20} />
              </div>
              <span className="text-[#6C1D5F] text-xs font-bold bg-purple-50 px-2 py-0.5 rounded-full">+4 this month</span>
            </div>
            <h4 className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">Total Events</h4>
            <p className="text-2xl font-black text-slate-700">{totalEvents}</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-lg">
                <Users size={20} />
              </div>
              <span className="text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-0.5 rounded-full">Active status</span>
            </div>
            <h4 className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">Active Registrations</h4>
            <p className="text-2xl font-black text-slate-700">89% Capacity</p>
          </div>
          <div className="bg-[#510047] text-white p-6 rounded-xl shadow-lg relative overflow-hidden flex flex-col justify-between">
            <div className="relative z-10">
              <h4 className="text-white/60 text-[10px] font-bold uppercase tracking-wider mb-1">Upcoming Highlight</h4>
              <p className="text-md font-bold leading-tight">Advanced Cloud Architecture Summit</p>
            </div>
            <div className="flex items-center gap-4 mt-4 relative z-10">
              <span className="text-[11px] text-white/80 font-medium">350+ Students Enrolled</span>
            </div>
            <div className="absolute -right-10 -bottom-10 w-36 h-36 bg-[#84117C]/20 rounded-full blur-2xl"></div>
          </div>
        </div>

        {/* Search & Table Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex gap-2 bg-slate-100 p-1 rounded-lg">
            {["All Events", "Live", "Draft", "Completed"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-xs font-bold rounded-md cursor-pointer border-none transition-all ${
                  activeTab === tab
                    ? "bg-white text-slate-800 shadow-sm"
                    : "text-slate-500 hover:text-slate-700 bg-transparent"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-9 pr-4 rounded-xl border border-slate-200 bg-white hover:border-slate-350 focus:border-[#6C1D5F] focus:ring-1 focus:ring-[#6C1D5F] outline-none text-xs text-slate-700 focus-visible:ring-0 focus-visible:border-[#6C1D5F]"
                placeholder="Search events..."
                type="text"
              />
            </div>
          </div>
        </div>

        {/* Events Table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-[10px] text-slate-450 uppercase tracking-wider font-bold">Title</th>
                  <th className="px-6 py-4 text-[10px] text-slate-450 uppercase tracking-wider font-bold">Timeline</th>
                  <th className="px-6 py-4 text-[10px] text-slate-450 uppercase tracking-wider font-bold">Deadline</th>
                  <th className="px-6 py-4 text-[10px] text-slate-450 uppercase tracking-wider font-bold">Location</th>
                  <th className="px-6 py-4 text-[10px] text-slate-450 uppercase tracking-wider font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-slate-400 text-xs">
                      Loading events list...
                    </td>
                  </tr>
                ) : filteredEvents.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <EmptyState
                        icon={Calendar}
                        title="No Events Found"
                        description="Try adjusting your filters or search terms."
                        size="sm"
                      />
                    </td>
                  </tr>
                ) : (
                  filteredEvents.map((event) => (
                    <tr key={event.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 overflow-hidden shrink-0 border border-slate-200">
                            {event.imageUrl ? (
                              <img
                                src={getEventImageUrl(event.imageUrl)}
                                alt={event.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.parentNode.innerHTML = '<span class="text-[#6C1D5F] font-bold text-xs">EV</span>';
                                }}
                              />
                            ) : (
                              <span className="text-[#6C1D5F] font-bold text-xs">EV</span>
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-slate-700 text-xs leading-snug">{event.title}</p>
                            <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{event.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-xs font-semibold text-slate-650">{formatDateRange(event.timelineStart, event.timelineEnd)}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-0.5 bg-rose-50 text-rose-600 text-[10px] font-bold rounded-full uppercase border border-rose-100">
                          {formatDateShort(event.registrationDeadline)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-slate-450 text-xs font-medium">
                          <MapPin size={14} />
                          <span className="truncate max-w-[150px]">{event.location}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            onClick={() => navigate(`/admin/events/${event.id}/registrations`)}
                            className="px-3 py-1.5 bg-slate-50 hover:bg-[#6C1D5F]/10 hover:text-[#6C1D5F] text-slate-650 rounded-lg font-bold text-xs border border-slate-200 cursor-pointer transition-all"
                            variant="outline"
                          >
                            View Registrations
                          </Button>
                          <Button
                            onClick={() => navigate(`/admin/events/edit/${event.id}`)}
                            className="px-3 py-1.5 bg-slate-50 hover:bg-[#6C1D5F]/10 hover:text-[#6C1D5F] text-slate-650 rounded-lg font-bold text-xs border border-slate-200 cursor-pointer transition-all"
                            variant="outline"
                          >
                            Edit
                          </Button>
                          <Button
                            onClick={(e) => handleDeleteClick(event, e)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg border-none bg-transparent cursor-pointer transition-all"
                            variant="ghost"
                            size="icon-sm"
                            title="Delete Event"
                          >
                            <Trash2 size={15} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4 bg-slate-50">
              <span className="text-xs text-slate-400 font-medium">
                Showing page {page + 1} of {totalPages}
              </span>
              <div className="flex gap-2">
                <button
                  disabled={page === 0}
                  onClick={() => setPage(p => Math.max(0, p - 1))}
                  className="px-3.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-650 hover:bg-slate-50 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                >
                  Previous
                </button>
                <button
                  disabled={page === totalPages - 1}
                  onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                  className="px-3.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-650 hover:bg-slate-50 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Dialog */}
      <DeleteDialog
        show={!!deleteTarget}
        title="Delete Event"
        message="Are you sure you want to delete this event? This action cannot be undone."
        itemName={deleteTarget?.title}
        deleting={deleting}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
      />

      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-lg shadow-lg border animate-[slideIn_0.3s_ease-out] ${
          toast.type === "error" ? "bg-red-50 border-red-200 text-red-700" : "bg-emerald-50 border-emerald-200 text-emerald-700"
        }`}>
          <span className={`w-2 h-2 rounded-full ${toast.type === "error" ? "bg-red-500" : "bg-emerald-500"} flex-shrink-0 animate-pulse`} />
          <span className="text-[13px] font-semibold">{toast.message}</span>
        </div>
      )}
    </AppLayout>
  );
}
