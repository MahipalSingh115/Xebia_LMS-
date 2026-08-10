import {
  Calendar,
  Users,
  ClipboardList,
  Clock,
  Timer,
} from "lucide-react";

import KPICard from "../KPI/KPICard";

const cards = [
  {
    title: "Total Sessions Conducted",
    value: "--",
    icon: Calendar,
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Total Attendees",
    value: "--",
    icon: Users,
    color: "bg-green-50 text-green-600",
  },
  {
    title: "Total Nominations",
    value: "--",
    icon: ClipboardList,
    color: "bg-yellow-50 text-yellow-600",
  },
  {
    title: "Total Learning Hours",
    value: "--",
    icon: Clock,
    color: "bg-purple-50 text-purple-600",
  },
  {
    title: "Average Hours / Session",
    value: "--",
    icon: Timer,
    color: "bg-pink-50 text-pink-600",
  },
];

export default function LearningDeliveryCards() {
  return (
    <div className="space-y-4">

      <h2 className="text-lg font-semibold text-slate-800">
        Learning Delivery
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">

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