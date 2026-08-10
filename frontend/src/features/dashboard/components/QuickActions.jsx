import { useNavigate } from "react-router-dom";
import { BookOpen, Users, FolderOpen, FileText, ArrowRight } from "lucide-react";

const ACTIONS = [
  { label: "Create Course",    icon: BookOpen,   path: "/courses/create",  iconBg: "bg-[#eef2ff]", iconColor: "text-[#6C1D5F]" },
  { label: "Add Learner",      icon: Users,      path: "/learners",        iconBg: "bg-emerald-50", iconColor: "text-emerald-600" },
  { label: "New Category",     icon: FolderOpen, path: "/categories",      iconBg: "bg-amber-50",   iconColor: "text-amber-600" },
  { label: "Content Library",  icon: FileText,   path: "/content-library",      iconBg: "bg-blue-50",    iconColor: "text-blue-600" },
];

export default function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-[18px] py-3.5 border-b border-slate-200">
        <div className="text-[13px] font-bold text-slate-900">Quick Actions</div>
      </div>

      {/* Actions */}
      <div className="p-2">
        {ACTIONS.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.label}
              onClick={() => navigate(action.path)}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-md hover:bg-slate-50 transition-colors group"
            >
              <div className={`w-7 h-7 rounded-md ${action.iconBg} ${action.iconColor} flex items-center justify-center flex-shrink-0`}>
                <Icon size={13} />
              </div>
              <span className="flex-1 text-left text-[12px] font-semibold text-slate-700">
                {action.label}
              </span>
              <ArrowRight size={12} className="text-slate-300 group-hover:text-slate-400 transition-colors" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
