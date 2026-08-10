import { Brain, Award, Clock } from "lucide-react";
import KPICard from "../KPI/KPICard";

const cards = [
  {
    title: "Employees Trained in AI",
    value: "--",
    icon: Brain,
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    title: "AI Certifications Achieved",
    value: "--",
    icon: Award,
    color: "bg-green-50 text-green-600",
  },
  {
    title: "AI Learning Hours",
    value: "--",
    icon: Clock,
    color: "bg-purple-50 text-purple-600",
  },
];

export default function AIReadinessCards() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-slate-800">
        AI Readiness Summary
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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