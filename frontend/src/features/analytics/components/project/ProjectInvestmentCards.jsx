import {
  Briefcase,
  DollarSign,
  TrendingUp,
  Target,
} from "lucide-react";

import KPICard from "../executive/KPI/KPICard";

const cards = [
  {
    title: "Total Projects",
    value: "--",
    icon: Briefcase,
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Learning Investment",
    value: "--",
    icon: DollarSign,
    color: "bg-green-50 text-green-600",
  },
  {
    title: "ROI",
    value: "--",
    icon: TrendingUp,
    color: "bg-purple-50 text-purple-600",
  },
  {
    title: "Project Coverage %",
    value: "--",
    icon: Target,
    color: "bg-yellow-50 text-yellow-600",
  },
];

export default function ProjectInvestmentCards() {
  return (
    <div className="space-y-4">

      <h2 className="text-lg font-semibold">
        Project Investment
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