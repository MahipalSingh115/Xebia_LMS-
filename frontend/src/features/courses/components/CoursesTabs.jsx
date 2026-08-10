import { TABS } from "./courseConstants";

export default function CoursesTabs({ activeTab, setActiveTab }) {
  return (
    <div className="flex border-b border-slate-200 -mb-1">
      {TABS.map((tab, i) => (
        <button
          key={tab.label}
          onClick={() => setActiveTab(i)}
          className={`flex items-center gap-2 px-3.5 py-2.5 text-[13px] font-medium border-b-2 -mb-px transition-colors whitespace-nowrap ${
            activeTab === i
              ? "text-[#6C1D5F] border-[#6C1D5F] font-semibold"
              : "text-slate-400 border-transparent hover:text-slate-600"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
