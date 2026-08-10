import {
  Users,
  BookOpen,
  Award,
  Brain,
} from "lucide-react";

const cards = [
  {
    title: "Total Learners",
    value: "--",
    icon: Users,
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Learning Hours",
    value: "--",
    icon: BookOpen,
    color: "bg-green-50 text-green-600",
  },
  {
    title: "Certifications",
    value: "--",
    icon: Award,
    color: "bg-yellow-50 text-yellow-600",
  },
  {
    title: "AI Readiness",
    value: "--",
    icon: Brain,
    color: "bg-purple-50 text-purple-600",
  },
];

export default function ExecutiveStatsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="bg-white border rounded-xl p-5 shadow-sm"
          >
            <div className="flex justify-between items-center">

              <div>
                <p className="text-sm text-slate-500">
                  {card.title}
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {card.value}
                </h2>
              </div>

              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.color}`}
              >
                <Icon size={22} />
              </div>

            </div>
          </div>
        );
      })}
    </div>
  );
}