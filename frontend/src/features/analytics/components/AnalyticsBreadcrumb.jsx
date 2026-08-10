import React from "react";
import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";

export default function AnalyticsBreadcrumb({ items = [] }) {
  return (
    <nav className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 select-none">
      <Link to="/admin" className="hover:text-[#6C1D5F] flex items-center transition-colors">
        <Home size={10} className="mr-1" />
        Admin
      </Link>
      <ChevronRight size={10} className="text-slate-350 shrink-0" />
      <span className="text-slate-400">Analytics</span>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight size={10} className="text-slate-350 shrink-0" />
          {item.path ? (
            <Link to={item.path} className="hover:text-[#6C1D5F] transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-[#6C1D5F] font-extrabold">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
