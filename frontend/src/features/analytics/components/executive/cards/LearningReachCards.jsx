import { Users, UserCheck, GraduationCap, Target } from "lucide-react";
import KPICard from "../KPI/KPICard";

const cards = [
  {
    title: "Total Employees",
    value: "--",
    icon: Users,
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Employees Nominated",
    value: "--",
    icon: UserCheck,
    color: "bg-yellow-50 text-yellow-600",
  },
  {
    title: "Employees Trained",
    value: "--",
    icon: GraduationCap,
    color: "bg-green-50 text-green-600",
  },
  {
    title: "Learning Coverage %",
    value: "--",
    icon: Target,
    color: "bg-purple-50 text-purple-600",
  },
];

export default function LearningReachCards() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-slate-800">
        Learning Reach
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {cards.map((card) => (
          <KPICard
            key={card.title}
            title={card.title}
            value={card.value}
            icon={card.icon}
            color={card.color}
          />
        ))}
      </div>
    </div>
  );
}