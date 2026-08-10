import React, { useState } from "react";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  BookOpen,
  Video,
  FileText,
  AlertCircle,
  HelpCircle,
  MoreHorizontal,
} from "lucide-react";

export default function StudentCalendar() {
  const [selectedDay, setSelectedDay] = useState(24);
  const [currentMonth, setCurrentMonth] = useState("October 2023");

  const events = {
    24: {
      type: "assignment",
      title: "UX Case Study: Final Submission",
      course: "Advanced Interface Design",
      time: "11:59 PM (EST)",
      badge: "Due Today",
      color: "border-red-500 bg-red-50 text-red-700",
      indicatorColor: "bg-red-500",
      icon: FileText,
    },
    26: {
      type: "quiz",
      title: "React Patterns Quiz",
      course: "Modern Web Development",
      time: "10:00 AM (EST)",
      badge: "Upcoming Quiz",
      color: "border-purple-500 bg-purple-50 text-purple-700",
      indicatorColor: "bg-purple-500",
      icon: HelpCircle,
    },
    28: {
      type: "lecture",
      title: "Guest Lecture: Design Systems",
      course: "Design Systems at Scale",
      time: "2:00 PM (EST)",
      badge: "Live Session",
      color: "border-[#01AC9F] bg-teal-50 text-teal-700",
      indicatorColor: "bg-teal-500",
      icon: Video,
    },
  };

  const getDayClass = (day) => {
    let base = "bg-white p-3 flex flex-col min-h-[90px] border border-slate-100 hover:bg-slate-50/50 transition-colors cursor-pointer relative ";
    if (day === selectedDay) {
      base += "ring-2 ring-[#6C1D5F] ring-inset z-10 ";
    }
    return base;
  };

  // Mock days grid for October 2023 (starts on Sunday, Oct 1)
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const prefixDays = Array.from({ length: 0 }); // starts on Sun, so no prefix days needed
  const suffixDays = Array.from({ length: 4 }); // Nov 1 - 4 to fill 35 grid items

  return (
    <div className="max-w-[1200px] w-full mx-auto px-6 md:px-8 py-8 animate-fadeIn flex flex-col xl:flex-row gap-6">
      {/* ── Calendar Main View ── */}
      <div className="flex-1 min-w-0 space-y-6">
        {/* Header Control */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">{currentMonth}</h2>
            <p className="text-[13px] text-slate-400 mt-1">Fall Semester Schedule</p>
          </div>

          <div className="flex items-center gap-3">
            {/* View selectors */}
            <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200/50">
              <button className="px-4 py-1.5 rounded bg-white text-slate-800 shadow-sm text-[11.5px] font-bold cursor-pointer">
                Month
              </button>
              <button className="px-4 py-1.5 text-slate-500 hover:text-slate-700 text-[11.5px] font-bold cursor-pointer bg-transparent border-none">
                Week
              </button>
              <button className="px-4 py-1.5 text-slate-500 hover:text-slate-700 text-[11.5px] font-bold cursor-pointer bg-transparent border-none">
                Day
              </button>
            </div>

            <button className="bg-[#6C1D5F] text-white hover:bg-[#521347] rounded-xl px-4 py-2 text-[12px] font-bold flex items-center gap-1.5 shadow-sm shadow-[#6C1D5F]/20 cursor-pointer border-none outline-none">
              <Plus size={14} /> Add Event
            </button>
          </div>
        </div>

        {/* Calendar Grid Container */}
        <div className="bg-white rounded-3xl border border-slate-200/70 shadow-sm overflow-hidden flex flex-col">
          {/* Weekday Labels */}
          <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-50/50">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((dayName) => (
              <div key={dayName} className="py-3 text-center text-[11.5px] font-bold text-slate-450 uppercase tracking-wider">
                {dayName}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-[1px] bg-slate-100">
            {days.map((day) => {
              const event = events[day];
              const isSelected = day === selectedDay;

              return (
                <div
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={getDayClass(day)}
                >
                  <span
                    className={`text-[12px] font-bold flex items-center justify-center w-6 h-6 rounded-full mb-1 transition-all ${
                      isSelected
                        ? "bg-[#6C1D5F] text-white"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {day}
                  </span>

                  {event && (
                    <div
                      className={`mt-1 text-[9.5px] font-bold px-2 py-0.5 rounded truncate border flex items-center gap-1 cursor-pointer select-none ${
                        event.type === "assignment"
                          ? "bg-rose-50 text-rose-700 border-rose-100"
                          : event.type === "quiz"
                          ? "bg-purple-50 text-purple-700 border-purple-100"
                          : "bg-teal-50 text-teal-700 border-teal-100"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                          event.type === "assignment"
                            ? "bg-rose-500"
                            : event.type === "quiz"
                            ? "bg-purple-500"
                            : "bg-teal-500"
                        }`}
                      />
                      <span className="truncate">{event.title}</span>
                    </div>
                  )}
                </div>
              );
            })}
            
            {/* Nov Suffix fill-in */}
            {suffixDays.map((_, i) => (
              <div key={`suffix-${i}`} className="bg-white p-3 flex flex-col min-h-[90px] border border-slate-50 opacity-40 select-none">
                <span className="text-[12px] font-bold text-slate-350">{i + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right Panel: Event details & list ── */}
      <aside className="w-full xl:w-[320px] shrink-0 flex flex-col gap-6">
        {/* Selected Day Event Details */}
        <div className="bg-white rounded-3xl border border-slate-200/70 p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-[14.5px] text-slate-800">Oct {selectedDay} Details</h3>
            <button className="text-slate-400 hover:text-slate-600 cursor-pointer bg-transparent border-none outline-none">
              <MoreHorizontal size={16} />
            </button>
          </div>

          {events[selectedDay] ? {
            event: events[selectedDay],
            render() {
              const EventIcon = this.event.icon;
              const accentColor =
                this.event.type === "assignment"
                  ? "bg-rose-500"
                  : this.event.type === "quiz"
                  ? "bg-purple-500"
                  : "bg-teal-500";
              const tagColor =
                this.event.type === "assignment"
                  ? "text-rose-600 bg-rose-50"
                  : this.event.type === "quiz"
                  ? "text-purple-600 bg-purple-50"
                  : "text-teal-600 bg-teal-50";

              return (
                <div className="border border-slate-100 rounded-2xl p-4 flex gap-3.5 hover:shadow-sm transition-all duration-200">
                  <div className={`w-1 rounded-full shrink-0 ${accentColor}`} />
                  <div className="flex-1 min-w-0 space-y-2.5">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${tagColor}`}>
                      <EventIcon size={10} />
                      {this.event.badge}
                    </span>
                    <div>
                      <h4 className="font-bold text-[13.5px] text-slate-800 leading-snug break-words">
                        {this.event.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">{this.event.course}</p>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                      <Clock size={12} />
                      <span>{this.event.time}</span>
                    </div>
                    <button className="w-full mt-2 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-800 text-[11.5px] font-bold transition-colors border border-slate-200/50 cursor-pointer outline-none">
                      View Details
                    </button>
                  </div>
                </div>
              );
            }
          }.render() : (
            <div className="text-center py-8 border border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center space-y-2">
              <CalendarIcon size={24} className="text-slate-300" />
              <p className="text-[12px] text-slate-400 font-medium">No events scheduled today.</p>
            </div>
          )}
        </div>

        {/* Weekly agenda overview */}
        <div className="bg-white rounded-3xl border border-slate-200/70 p-6 shadow-sm flex flex-col justify-between flex-1 space-y-4">
          <h3 className="font-bold text-[14.5px] text-slate-800">Upcoming Events</h3>

          <div className="space-y-3">
            {Object.entries(events).map(([day, ev]) => {
              const EventIcon = ev.icon;
              const iconBg =
                ev.type === "assignment"
                  ? "bg-rose-50 text-rose-500"
                  : ev.type === "quiz"
                  ? "bg-purple-50 text-purple-500"
                  : "bg-teal-50 text-teal-500";

              return (
                <div
                  key={day}
                  onClick={() => setSelectedDay(parseInt(day))}
                  className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all cursor-pointer"
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}>
                    <EventIcon size={16} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-[12.5px] text-slate-800 truncate">{ev.title}</h4>
                    <p className="text-[11px] text-slate-400">Oct {day} • {ev.time.split(" ")[0]} {ev.time.split(" ")[1]}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </aside>
    </div>
  );
}
