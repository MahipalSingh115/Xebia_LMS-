import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import TrainerSidebar from "./TrainerSidebar";
import TrainerTopbar from "./TrainerTopbar";

const TRAINER_STORAGE_KEY = "lms-trainer-sidebar-collapsed";
const ADMIN_STORAGE_KEY = "lms-admin-sidebar-collapsed";

export default function AppLayout({ children }) {
  const location = useLocation();
  const isAnalytics = location.pathname.startsWith("/analytics");
  const isTrainer = location.pathname.startsWith("/trainer");

  const [trainerCollapsed, setTrainerCollapsed] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(TRAINER_STORAGE_KEY)) ?? false;
    } catch {
      return false;
    }
  });

  const [adminCollapsed, setAdminCollapsed] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(ADMIN_STORAGE_KEY)) ?? false;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(TRAINER_STORAGE_KEY, JSON.stringify(trainerCollapsed));
    } catch { /* ignore */ }
  }, [trainerCollapsed]);

  useEffect(() => {
    try {
      localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(adminCollapsed));
    } catch { /* ignore */ }
  }, [adminCollapsed]);

  let marginLeft = "";
  if (!isAnalytics) {
    if (isTrainer) {
      marginLeft = trainerCollapsed ? "md:ml-[60px]" : "md:ml-[240px]";
    } else {
      marginLeft = adminCollapsed ? "md:ml-[60px]" : "md:ml-[240px]";
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {!isAnalytics && !isTrainer && <Sidebar collapsed={adminCollapsed} setCollapsed={setAdminCollapsed} />}
      {isTrainer && <TrainerSidebar collapsed={trainerCollapsed} setCollapsed={setTrainerCollapsed} />}

      <div className={`${marginLeft} flex flex-col flex-1 min-w-0 transition-all duration-300 ease-in-out`}>
        {!isTrainer && <Topbar />}
        {isTrainer && <TrainerTopbar />}

        <main className={isAnalytics ? "flex-1 flex overflow-hidden" : "flex-1 overflow-y-auto p-4 md:p-6 lg:p-8"}>
          {children}
        </main>
      </div>
    </div>
  );
}