import { useEffect, useState } from "react";
import dashboardService from "@/features/dashboard/services/dashboardService";

export default function PerformanceFooter() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const result = await dashboardService.getDashboardStats();
        setData(result);
      } catch (error) {
        console.error("Dashboard stats error:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  const totalEntities =
    (data?.categories || 0) +
    (data?.courses || 0) +
    (data?.modules || 0) +
    (data?.subModules || 0) +
    (data?.contents || 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-[#6C1D5F] p-6 rounded-3xl text-white">
        <h4 className="text-2xl font-bold">
          {isLoading ? "Loading..." : "Live Data"}
        </h4>
        <p>Performance Overview</p>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-[#d5c1cc]">
        <h4 className="text-2xl font-bold text-[#6C1D5F]">
          {isLoading ? "Loading..." : totalEntities}
        </h4>
        <p>Total Records</p>
      </div>
    </div>
  );
}