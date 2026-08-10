import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AppLayout from "@/app/layouts/AppLayout";
import AnalyticsSidebar from "./AnalyticsSidebar";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { AnalyticsFilterProvider } from "@/features/analytics/context/AnalyticsFilterContext";

export default function AnalyticsExplorerLayout() {
  const [reloadTrigger, setReloadTrigger] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newReportTitle, setNewReportTitle] = useState("");
  const [newReportCategory, setNewReportCategory] = useState("executive-summary");
  const [newReportDesc, setNewReportDesc] = useState("");
  
  // Custom toast notification state
  const [toastMessage, setToastMessage] = useState(null);

  const handleRefresh = () => {
    setLoading(true);
    setReloadTrigger((prev) => prev + 1);
    
    // Simulate loading completion for the sidebar spinner
    setTimeout(() => {
      setLoading(false);
      showToast("Dashboard data reloaded successfully");
    }, 600);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleCreateReport = (e) => {
    e.preventDefault();
    if (!newReportTitle.trim()) return;

    // Simulate creation
    setIsAddDialogOpen(false);
    showToast(`Custom report "${newReportTitle}" successfully added!`);
    
    // Reset fields
    setNewReportTitle("");
    setNewReportCategory("executive-summary");
    setNewReportDesc("");
  };

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    return localStorage.getItem("lms_analytics_sidebar_collapsed") === "true";
  });

  const handleToggleCollapse = () => {
    setIsSidebarCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem("lms_analytics_sidebar_collapsed", String(next));
      return next;
    });
  };

  return (
    <AnalyticsFilterProvider>
      <AppLayout>
        <div className="flex-1 flex overflow-hidden bg-slate-50 h-[calc(100vh-52px)] relative">
          {/* Left Tree Explorer Sidebar */}
          <AnalyticsSidebar
            loading={loading}
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={handleToggleCollapse}
            onRefresh={handleRefresh}
            onAddCustomReport={() => setIsAddDialogOpen(true)}
          />

          {/* Right Dashboard Container with independent scrollbar */}
          <div className="flex-1 overflow-y-auto p-7 xl:p-8 custom-scrollbar">
            <Outlet context={{ reloadTrigger }} />
          </div>

          {/* Custom Slide-In Toast Notification */}
          {toastMessage && (
            <div className="fixed bottom-6 right-6 z-50 bg-[#6C1D5F] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-[#84117C]/20 animate-slide-in font-medium text-xs">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
              <span>{toastMessage}</span>
            </div>
          )}

          {/* Shadcn/ui Add Custom Report Modal Dialog */}
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogContent className="sm:max-w-[425px] bg-white rounded-3xl p-6 border border-[#d5c1cc]/80">
              <DialogHeader className="space-y-1.5">
                <DialogTitle className="text-[#6C1D5F] font-extrabold text-base">
                  Create Custom Report
                </DialogTitle>
                <p className="text-xs text-slate-500 font-medium">
                  Add a new metric analysis node to the Analytics Explorer workspace.
                </p>
              </DialogHeader>

              <form onSubmit={handleCreateReport} className="space-y-4 py-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-[#83727c]">
                    Report Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Talent Retention Forecast"
                    value={newReportTitle}
                    onChange={(e) => setNewReportTitle(e.target.value)}
                    className="w-full bg-slate-50 border border-[#d5c1cc] rounded-xl px-3 py-2 text-xs font-bold text-[#51434c] focus:outline-none focus:ring-2 focus:ring-[#6C1D5F]/20"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-[#83727c]">
                    Parent Category
                  </label>
                  <select
                    value={newReportCategory}
                    onChange={(e) => setNewReportCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-[#d5c1cc] rounded-xl px-3 py-2 text-xs font-bold text-[#51434c] focus:outline-none focus:ring-2 focus:ring-[#6C1D5F]/20 cursor-pointer"
                  >
                    <option value="executive-summary">Executive Summary</option>
                    <option value="training-effectiveness">Training Effectiveness</option>
                    <option value="project-learning-investment">Project Learning Investment</option>
                    <option value="fresher-journey">Fresher Journey</option>
                    <option value="skill-gap">Skill Gap Analysis</option>
                    <option value="predictive-analytics">Predictive Analytics</option>
                    <option value="learning-coverage">Learning Coverage</option>
                    <option value="learning-hours">Learning Hours</option>
                    <option value="learning-categories">Learning Categories</option>
                    <option value="learning-trends">Learning Trends</option>
                    <option value="ai-transformation">AI Transformation</option>
                    <option value="certifications">Certifications</option>
                    <option value="flagship-programs">Flagship Programs</option>
                    <option value="learning-champions">Learning Champions</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-[#83727c]">
                    Description
                  </label>
                  <textarea
                    placeholder="Describe the scope or source data of this report..."
                    value={newReportDesc}
                    onChange={(e) => setNewReportDesc(e.target.value)}
                    rows={3}
                    className="w-full bg-slate-50 border border-[#d5c1cc] rounded-xl px-3 py-2 text-xs font-medium text-[#51434c] focus:outline-none focus:ring-2 focus:ring-[#6C1D5F]/20 resize-none"
                  />
                </div>

                <DialogFooter className="flex justify-end gap-2 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsAddDialogOpen(false)}
                    className="px-4 py-2 border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl cursor-pointer"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="px-4 py-2 bg-[#6C1D5F] hover:bg-[#521347] text-white text-xs font-bold rounded-xl cursor-pointer"
                  >
                    Save Report
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </AppLayout>
    </AnalyticsFilterProvider>
  );
}
