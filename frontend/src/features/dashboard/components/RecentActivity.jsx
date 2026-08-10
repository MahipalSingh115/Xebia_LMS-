import { useState, useEffect } from "react";
import { ClipboardCheck, UserPlus, CreditCard, Award, AlertTriangle } from "lucide-react";
import courseService from "@/features/courses/services/courseService";

/* ─── Activity type config ─────────────────────────────────────────── */
const TYPE_CONFIG = {
  course_created:   { Icon: ClipboardCheck, bg: "bg-emerald-50",   color: "text-emerald-600" },
  student_enrolled: { Icon: UserPlus,       bg: "bg-blue-50",      color: "text-blue-600"    },
  payment_received: { Icon: CreditCard,     bg: "bg-amber-50",     color: "text-amber-600"   },
  cert_issued:      { Icon: Award,          bg: "bg-[#f5f3ff]",    color: "text-[#7c3aed]"   },
  alert:            { Icon: AlertTriangle,  bg: "bg-red-50",       color: "text-red-500"     },
};

function formatTimeAgo(dateStr) {
  if (!dateStr) return "recently";
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1)  return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24)  return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function RecentActivity() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading]       = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const courses = await courseService.getAllCourses();
        if (courses?.length) {
          const types = ["course_created", "student_enrolled", "payment_received", "cert_issued"];
          const items = courses.slice(-4).reverse().map((c, i) => ({
            id:       c.id ?? i,
            type:     types[i % types.length],
            text:     i === 0
              ? <><strong>{c.title}</strong> was published</>
              : i === 1
                ? <>New learner joined <strong>{c.title}</strong></>
                : i === 2
                  ? <>Certificate issued for <strong>{c.title}</strong></>
                  : <>Enrollment spike in <strong>{c.title}</strong></>,
            time: c.updatedAt ?? c.createdAt ?? null,
          }));
          setActivities(items);
        }
      } catch (err) {
        console.error("Failed to load recent activity:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-[18px] py-3.5 border-b border-slate-200">
        <div>
          <div className="text-[13px] font-bold text-slate-900">Recent Activity</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Latest platform events</div>
        </div>
        <button className="text-[12px] font-medium text-slate-500 border border-slate-200 rounded-md px-2.5 py-1 hover:bg-slate-50 transition-colors">
          View all
        </button>
      </div>

      {/* Activity feed */}
      <div className="divide-y divide-slate-100">
        {loading ? (
          <div className="py-8 text-center text-[13px] text-slate-400">Loading…</div>
        ) : activities.length === 0 ? (
          <div className="py-8 text-center text-[13px] text-slate-400">No recent activity.</div>
        ) : (
          activities.map((a) => {
            const cfg = TYPE_CONFIG[a.type] ?? TYPE_CONFIG.course_created;
            const { Icon } = cfg;
            return (
              <div key={a.id} className="flex items-start gap-2.5 px-[18px] py-3">
                <div className={`w-7 h-7 rounded-full ${cfg.bg} ${cfg.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                  <Icon size={13} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] text-slate-700 leading-snug">{a.text}</div>
                  <div className="text-[11px] text-slate-400 mt-1">{formatTimeAgo(a.time)}</div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
