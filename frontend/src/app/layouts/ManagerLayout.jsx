import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import ManagerSidebar from "./ManagerSidebar";
import Topbar from "./Topbar";
import { AlertTriangle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";

const STORAGE_KEY = "lms-manager-sidebar-collapsed";
const DEMO_WARN_KEY = "lms-manager-demo-warned";

export default function ManagerLayout() {
  const [collapsed, setCollapsed] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? false;
    } catch {
      return false;
    }
  });

  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(collapsed));
    } catch { /* ignore */ }
  }, [collapsed]);

  useEffect(() => {
    try {
      const warned = sessionStorage.getItem(DEMO_WARN_KEY);
      if (!warned) {
        setShowWarning(true);
      }
    } catch {
      setShowWarning(true);
    }
  }, []);

  const handleDismissWarning = () => {
    try {
      sessionStorage.setItem(DEMO_WARN_KEY, "true");
    } catch { /* ignore */ }
    setShowWarning(false);
  };

  const marginLeft = collapsed ? "md:ml-[60px]" : "md:ml-[240px]";

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <ManagerSidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className={`${marginLeft} flex flex-col flex-1 min-w-0 transition-all duration-300 ease-in-out`}>
        <Topbar />
        <main className="flex-1 overflow-y-auto p-7 xl:p-8">
          <Outlet />
        </main>
      </div>

      <Dialog open={showWarning} onOpenChange={(open) => !open && handleDismissWarning()}>
        <DialogContent className="max-w-[440px] rounded-xl shadow-xl bg-white border border-slate-200 p-6">
          <DialogHeader className="pb-3 border-b-0 bg-transparent p-0">
            <DialogTitle className="text-base font-bold text-slate-800 flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100/50">
                <AlertTriangle size={20} />
              </div>
              <div className="flex flex-col text-left">
                <span className="leading-tight text-lg text-slate-900">Manager Portal — Demo Only</span>
                <span className="text-[13px] text-slate-500 font-normal mt-2 normal-case leading-relaxed">
                  This portal is a conceptual, unintegrated demo/proof-of-concept built on personal initiative. It is not part of the active client requirements.
                </span>
                <span className="text-[13px] text-slate-500 font-normal mt-2 normal-case leading-relaxed">
                  Please note that the data, metrics, and features presented here are mock/simulated and may not be fully integrated with the backend services.
                </span>
              </div>
            </DialogTitle>
          </DialogHeader>

          <DialogFooter className="pt-4 border-t border-slate-100/70 bg-transparent p-0 flex items-center justify-end gap-2 mt-4">
            <Button
              onClick={handleDismissWarning}
              className="bg-amber-600 hover:bg-amber-700 text-white text-[12.5px] font-semibold px-5 py-1.5 h-auto rounded-lg shadow-sm shadow-amber-600/10 border-0 transition-colors cursor-pointer"
            >
              Continue to Demo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

