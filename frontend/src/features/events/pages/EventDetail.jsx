import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Calendar, MapPin, Users, Timer, CheckCircle, Info, ChevronRight } from "lucide-react";
import AppLayout from "@/app/layouts/AppLayout";
import eventService from "../services/eventService";

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const isTrainer = location.pathname.startsWith("/trainer");

  const [event, setEvent] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [toast, setToast] = useState(null);

  const studentId = "s4"; // Active student

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    fetchEventDetails();
  }, [id]);

  const fetchEventDetails = async () => {
    setLoading(true);
    try {
      const [eventData, registrations] = await Promise.all([
        eventService.getEventById(id),
        eventService.getRegistrations(id)
      ]);
      setEvent(eventData);
      
      // Check if student 's4' is already in the registrations list
      const registered = registrations.some(reg => reg.studentId === studentId);
      setIsRegistered(registered);
    } catch (err) {
      showToast("Failed to load event details", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (isRegistered || registering || !event) return;
    
    // Client-side quick check (server-side enforces this strictly too)
    const now = new Date();
    const deadline = new Date(event.registrationDeadline);
    if (now > deadline) {
      showToast("Registration deadline has passed", "error");
      return;
    }

    setRegistering(true);
    try {
      await eventService.registerForEvent(id, studentId);
      showToast("Registered successfully!", "success");
      setIsRegistered(true);
    } catch (err) {
      const errMsg = err.response?.data?.message || "Failed to register for event";
      showToast(errMsg, "error");
    } finally {
      setRegistering(false);
    }
  };

  const formatDateLong = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  };

  const formatTimeline = (startStr, endStr) => {
    if (!startStr) return "";
    const start = new Date(startStr);
    const startFormatted = start.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
    if (!endStr) return startFormatted;
    const end = new Date(endStr);
    const endFormatted = end.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
    return `${startFormatted} - ${endFormatted}`;
  };

  const getDaysRemaining = (deadlineStr) => {
    if (!deadlineStr) return 0;
    const now = new Date();
    const deadline = new Date(deadlineStr);
    const diffTime = deadline - now;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const isClosed = () => {
    if (!event) return false;
    const now = new Date();
    const deadline = new Date(event.registrationDeadline);
    return now > deadline;
  };

  const getEventImageUrl = (url) => {
    if (!url) return "";
    if (url.startsWith("/uploads/")) {
      const backendHost = import.meta.env.VITE_API_URL?.replace("/api", "") || "http://localhost:8080";
      return `${backendHost}${url}`;
    }
    return url;
  };

  const content = (
    <div className="max-w-[1100px] w-full mx-auto px-6 md:px-8 py-8 space-y-6 animate-fadeIn">
      {/* Back button */}
      <button
        onClick={() => navigate(isTrainer ? "/trainer/events" : "/student/events")}
        className="flex items-center gap-2 text-slate-500 hover:text-[#6C1D5F] transition-colors text-sm font-medium w-fit border-none bg-transparent cursor-pointer"
      >
        <ArrowLeft size={16} />
        Back to Events
      </button>

      {loading ? (
        <div className="py-12 text-center text-slate-400 text-xs">Loading event details...</div>
      ) : !event ? (
        <div className="py-12 text-center text-slate-400 text-xs">Event not found.</div>
      ) : (
        <div className="space-y-8">
          {/* Hero Section */}
          <div className="relative h-80 rounded-2xl overflow-hidden shadow-md">
            {event.imageUrl ? (
              <img className="absolute inset-0 w-full h-full object-cover" src={getEventImageUrl(event.imageUrl)} alt={event.title} />
            ) : (
              <div className="absolute inset-0 bg-[#510047]" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
            <div className="absolute inset-0 flex flex-col justify-end p-8 space-y-4">
              <div className="flex gap-2">
                <span className="bg-[#6C1D5F] text-white px-3 py-1 rounded-full text-[9px] font-bold tracking-widest uppercase border border-[#6C1D5F]">
                  Professional Workshop
                </span>
                <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-[9px] font-bold tracking-widest uppercase">
                  12 Credits
                </span>
              </div>
              <h2 className="text-white text-3xl font-black tracking-tight max-w-2xl leading-tight">
                {event.title}
              </h2>
              <div className="flex flex-wrap items-center gap-6 text-white/90 text-xs pt-1">
                <div className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-white/70" />
                  <span>{formatTimeline(event.timelineStart, event.timelineEnd)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-white/70" />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Two Column details layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left column: main descriptions */}
            <div className="lg:col-span-8 space-y-8">
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-slate-800">About this Event</h3>
                <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                  {event.description}
                </p>
              </div>

              {/* Event Timeline sessions dynamically rendered */}
              {event.timelineEntries && event.timelineEntries.length > 0 && (
                <div className="space-y-4 pt-4 border-t border-slate-100 animate-fadeIn">
                  <h3 className="text-lg font-bold text-slate-800">Event Timeline</h3>
                  
                  <div className="space-y-3">
                    {event.timelineEntries
                      .slice()
                      .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
                      .map((entry, idx) => {
                        const isPrimaryStyle = idx % 3 === 2;
                        const isAltStyle = idx % 3 === 1;
                        
                        let cardClass = "p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1";
                        let dayClass = "text-[10px] font-bold text-slate-400";
                        let badgeClass = "bg-[#6C1D5F]/10 text-[#6C1D5F] px-2 py-0.5 rounded";
                        
                        if (isPrimaryStyle) {
                          cardClass = "p-4 bg-[#6C1D5F]/5 border border-purple-100 rounded-xl space-y-1";
                          dayClass = "text-[10px] font-bold text-purple-400";
                          badgeClass = "bg-[#6C1D5F] text-white px-2 py-0.5 rounded";
                        } else if (isAltStyle) {
                          cardClass = "p-4 bg-slate-50/50 border border-slate-150 rounded-xl space-y-1";
                        }

                        return (
                          <div key={entry.id || idx} className={cardClass}>
                            <div className="flex justify-between items-center text-[10px] font-bold">
                              <span className={dayClass}>{entry.dayNumber?.toUpperCase() || `DAY ${idx + 1}`}</span>
                              <span className={badgeClass}>{entry.time}</span>
                            </div>
                            <h4 className="text-xs font-bold text-slate-700">{entry.title}</h4>
                            <p className="text-[11px] text-slate-450 leading-relaxed whitespace-pre-line">
                              {entry.description}
                            </p>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}
            </div>

            {/* Right column: Sticky Registration Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden sticky top-6">
                <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Entry Fee</span>
                  <span className="text-xl font-extrabold text-[#6C1D5F]">FREE</span>
                </div>
                
                <div className="p-6 space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-50 text-[#6C1D5F] flex items-center justify-center shrink-0">
                        <Timer size={16} />
                      </div>
                      <div>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Registration Ends</p>
                        <p className="text-slate-700 text-xs font-bold mt-0.5">{formatDateLong(event.registrationDeadline)}</p>
                        {!isClosed() && !isRegistered && (
                          <p className="text-rose-600 text-[10px] font-bold mt-1">
                            {getDaysRemaining(event.registrationDeadline)} days remaining!
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-50 text-[#6C1D5F] flex items-center justify-center shrink-0">
                        <Users size={16} />
                      </div>
                      <div>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Available Spots</p>
                        <p className="text-slate-700 text-xs font-bold mt-0.5">Open Admission</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions registration button states */}
                  {!isTrainer && (
                    <>
                      <div className="pt-2">
                        {isRegistered ? (
                          <button
                            disabled
                            className="w-full py-3.5 bg-emerald-50 border-2 border-emerald-500 text-emerald-700 font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 select-none"
                          >
                            <CheckCircle size={16} />
                            You're Registered!
                          </button>
                        ) : isClosed() ? (
                          <button
                            disabled
                            className="w-full py-3.5 bg-slate-100 border border-slate-200 text-slate-400 font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 cursor-not-allowed"
                          >
                            Registration Closed
                          </button>
                        ) : (
                          <button
                            onClick={handleRegister}
                            disabled={registering}
                            className="w-full py-3.5 bg-[#6C1D5F] hover:bg-[#521347] text-white font-bold text-xs rounded-lg shadow-md shadow-[#6C1D5F]/15 hover:shadow-[#6C1D5F]/20 flex items-center justify-center gap-1.5 transition-all cursor-pointer border-none active:scale-[0.98]"
                          >
                            {registering ? "Registering..." : "Register Now"}
                            <ChevronRight size={16} />
                          </button>
                        )}
                      </div>
                      <p className="text-center text-[10px] text-slate-400 px-2 leading-relaxed">
                        By registering, you agree to our Code of Conduct and Learning Terms.
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
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
