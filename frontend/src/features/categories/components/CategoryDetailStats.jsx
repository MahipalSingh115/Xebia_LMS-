import React from "react";
import { BookOpen, Users, CheckCheck, FileEdit, Star } from "lucide-react";
import { Card } from "@/shared/components/ui/card";

export default function CategoryDetailStats({
  coursesCount,
  totalLearners,
  published,
  drafts,
}) {
  return (
    <div className="grid grid-cols-5 gap-3 text-left">
      {[
        { icon: BookOpen,  iconCls: "bg-purple-50 text-purple-600",  val: coursesCount,      lbl: "Total Courses"  },
        { icon: Users,     iconCls: "bg-teal-50 text-teal-600",      val: totalLearners,       lbl: "Total Learners" },
        { icon: CheckCheck,iconCls: "bg-orange-50 text-orange-500",  val: published,           lbl: "Published"      },
        { icon: FileEdit,  iconCls: "bg-indigo-50 text-indigo-500",  val: drafts,              lbl: "Drafts"         },
        { icon: Star,      iconCls: "bg-rose-50 text-rose-500",      val: coursesCount ? "4.5" : "—", lbl: "Avg. Rating"    },
      ].map((s) => (
        <Card key={s.lbl} className="flex flex-row items-center gap-3 p-4 border-slate-200">
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${s.iconCls}`}>
            <s.icon size={16} />
          </div>
          <div>
            <div className="text-[20px] font-bold text-slate-900 tracking-tight leading-none">{s.val}</div>
            <div className="text-[11.5px] text-slate-400 font-medium mt-0.5 whitespace-nowrap">{s.lbl}</div>
          </div>
        </Card>
      ))}
    </div>
  );
}
