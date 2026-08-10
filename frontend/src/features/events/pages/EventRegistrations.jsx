import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Download, UserPlus, MapPin, Calendar, Check, Info, Users } from "lucide-react";
import AppLayout from "@/app/layouts/AppLayout";
import eventService from "../services/eventService";
import EmptyState from "@/shared/components/EmptyState";

export default function EventRegistrations() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("All Students");
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [eventData, registrationsData] = await Promise.all([
          eventService.getEventById(id),
          eventService.getRegistrations(id)
        ]);
        setEvent(eventData);
        setRegistrations(registrationsData || []);
      } catch (err) {
        showToast("Failed to load registrations details", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const formatDateShort = (dateStr) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const formatTimeline = (startStr, endStr) => {
    if (!startStr) return "";
    const start = new Date(startStr);
    const startFormatted = start.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    const startTime = start.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
    
    if (!endStr) return `${startFormatted} (${startTime})`;
    
    const end = new Date(endStr);
    const endFormatted = end.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    const endTime = end.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
    
    return `${startFormatted} - ${endFormatted} (${startTime} - ${endTime})`;
  };

  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  // Filter registrations by status dropdown
  const filteredRegistrations = registrations.filter((reg) => {
    if (filterStatus === "All Students") return true;
    if (filterStatus === "Confirmed") return true; // Currently all backend registrations are confirmed
    return false;
  });

  return (
    <AppLayout>
      <div className="pt-4 pb-12 px-4 sm:px-6 lg:px-8 max-w-[1000px] mx-auto space-y-6 animate-fadeIn">
        {/* Back navigation */}
        <button
          onClick={() => navigate("/admin/events")}
          className="flex items-center gap-2 text-slate-500 hover:text-[#6C1D5F] transition-colors text-sm font-medium w-fit border-none bg-transparent cursor-pointer"
        >
          <ArrowLeft size={16} />
          Back to Events
        </button>

        {loading ? (
          <div className="py-12 text-center text-slate-400 text-xs">Loading registration details...</div>
        ) : !event ? (
          <div className="py-12 text-center text-slate-400 text-xs">Event not found.</div>
        ) : (
          <>
            {/* Event Header details card */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex gap-4 items-center">
                <div className="w-16 h-16 rounded-xl bg-purple-50 flex items-center justify-center text-[#6C1D5F] font-bold text-lg shrink-0 border border-purple-100">
                  EV
                </div>
                <div>
                  <span className="bg-[#6C1D5F]/10 text-[#6C1D5F] text-[10px] font-bold px-2 py-0.5 rounded border border-[#6C1D5F]/10 uppercase">
                    Workshop
                  </span>
                  <h1 className="text-2xl font-black text-slate-800 mt-1 leading-snug">{event.title}</h1>
                  <div className="flex flex-col sm:flex-row gap-x-4 gap-y-1 mt-2">
                    <div className="flex items-center gap-1.5 text-slate-450 text-xs">
                      <MapPin size={14} />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-450 text-xs">
                      <Calendar size={14} />
                      <span>{formatTimeline(event.timelineStart, event.timelineEnd)}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <button
                  onClick={() => showToast("Exporting registrations is not implemented yet", "error")}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 h-10 px-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-650 rounded-lg font-bold text-xs cursor-pointer transition-colors"
                >
                  <Download size={14} />
                  Export List
                </button>
              </div>
            </div>

            {/* Registration Stats grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col shadow-sm">
                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Total Registered</span>
                <span className="text-2xl font-black text-[#6C1D5F] mt-1">{registrations.length}</span>
                <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
                  <div
                    className="bg-[#6C1D5F] h-full transition-all duration-500"
                    style={{ width: `${Math.min(100, registrations.length * 5)}%` }}
                  />
                </div>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col shadow-sm">
                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Confirmed Seats</span>
                <span className="text-2xl font-black text-slate-700 mt-1">{registrations.length}</span>
                <span className="text-[10px] text-emerald-600 font-bold mt-1">100% of registrations</span>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col shadow-sm">
                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Waitlisted</span>
                <span className="text-2xl font-black text-slate-750 mt-1">0</span>
                <span className="text-[10px] text-slate-400 mt-1">No pending backlog</span>
              </div>
            </div>

            {/* Registered list section */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-6 py-4 border-b border-slate-200 gap-3">
                <h2 className="text-slate-800 text-lg font-bold">Registered Students</h2>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-450 font-medium">Filter by status:</span>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="bg-white border border-slate-200 rounded-lg text-xs px-2.5 py-1.5 focus:border-[#6C1D5F] outline-none text-slate-700 font-medium"
                  >
                    <option>All Students</option>
                    <option>Confirmed</option>
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="px-6 py-4 text-[10px] text-slate-450 uppercase tracking-wider font-bold">Name</th>
                      <th className="px-6 py-4 text-[10px] text-slate-450 uppercase tracking-wider font-bold">Email</th>
                      <th className="px-6 py-4 text-[10px] text-slate-450 uppercase tracking-wider font-bold">Registration Date</th>
                      <th className="px-6 py-4 text-[10px] text-slate-450 uppercase tracking-wider font-bold text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {filteredRegistrations.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="px-6 py-10 text-center">
                          <EmptyState
                            icon={Users}
                            title="No Registrations Found"
                            description="No students have registered matching this query."
                            size="sm"
                          />
                        </td>
                      </tr>
                    ) : (
                      filteredRegistrations.map((reg) => (
                        <tr key={reg.id} className="hover:bg-slate-50/30 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-purple-50 text-[#6C1D5F] border border-purple-100 flex items-center justify-center text-xs font-bold shrink-0">
                                {getInitials(reg.studentName)}
                              </div>
                              <span className="text-slate-750 text-xs font-bold">{reg.studentName}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-slate-500 text-xs font-medium">{reg.studentEmail}</td>
                          <td className="px-6 py-4 text-slate-500 text-xs font-medium">{formatDateShort(reg.registeredAt)}</td>
                          <td className="px-6 py-4 text-right">
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-100">
                              <Check size={10} />
                              Confirmed
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>

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
