
import {
  Star,
  Smile,
  ThumbsUp,
} from "lucide-react";

import KPICard from "../KPI/KPICard";

const cards = [
  {
    title: "Average Feedback Rating",
    value: "--",
    icon: Star,
    color: "bg-yellow-50 text-yellow-600",
  },
  {
    title: "Training Satisfaction",
    value: "--",
    icon: Smile,
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Recommendation %",
    value: "--",
    icon: ThumbsUp,
    color: "bg-green-50 text-green-600",
  },
];

export default function TrainingEffectivenessCards() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-slate-800">
        Training Effectiveness
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