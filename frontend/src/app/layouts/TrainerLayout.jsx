import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import TrainerSidebar from "./TrainerSidebar";
import TrainerTopbar from "./TrainerTopbar";

const STORAGE_KEY = "lms-trainer-sidebar-collapsed";

export default function TrainerLayout() {
  /* Read sidebar collapsed state to sync margin */
  const [collapsed, setCollapsed] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? false;
    } catch {
      return false;
    }
  });

  /* Sync state from localStorage changes (sidebar toggles write there) */
  useEffect(() => {
    const onStorage = () => {
      try {
        setCollapsed(JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? false);
      } catch { /* ignore */ }
    };

    /* Poll localStorage since same-tab writes don't fire 'storage' event */
    const interval = setInterval(onStorage, 150);
    return () => clearInterval(interval);
  }, []);

  const marginLeft = collapsed ? "md:ml-[60px]" : "md:ml-[240px]";

  return (
    <div className="min-h-screen bg-slate-50/80 flex">
      <TrainerSidebar />

      <div
        className={`flex flex-col flex-1 min-w-0 transition-all duration-300 ease-in-out ${marginLeft}`}
      >
        <TrainerTopbar />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
