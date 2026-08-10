import { Award, TrendingUp } from "lucide-react";
import KPICard from "../KPI/KPICard";

const cards = [
  {
    title: "Total Certifications Completed",
    value: "--",
    icon: Award,
    color: "bg-orange-50 text-orange-600",
  },
  {
    title: "Certification Growth %",
    value: "--",
    icon: TrendingUp,
    color: "bg-green-50 text-green-600",
  },
];

export default function CertificationCards() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-slate-800">
        Certification Summary
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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