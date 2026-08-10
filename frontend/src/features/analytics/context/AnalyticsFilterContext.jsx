import React, { createContext, useState, useContext, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";

const AnalyticsFilterContext = createContext(null);

const DEFAULT_FILTERS = {
  year: "2026",
  quarter: "All Quarters",
  region: "All Regions",
  department: "All Departments",
  bu: "All BUs",
  practice: "All Practices",
  dateRange: { startDate: null, endDate: null }
};

export function AnalyticsFilterProvider({ children }) {
  const location = useLocation();
  
  // We keep a registry of page-specific filters to isolate dashboards
  const [pageFiltersRegistry, setPageFiltersRegistry] = useState({});
  const [search, setSearch] = useState("");

  const pageKey = useMemo(() => {
    // Unique key per route path so they don't leak into each other
    return location.pathname;
  }, [location.pathname]);

  const activeFilters = useMemo(() => {
    return pageFiltersRegistry[pageKey] || DEFAULT_FILTERS;
  }, [pageFiltersRegistry, pageKey]);

  const setFilters = (newFiltersOrFn) => {
    setPageFiltersRegistry((prev) => {
      const currentVal = prev[pageKey] || DEFAULT_FILTERS;
      const nextVal = typeof newFiltersOrFn === "function" 
        ? newFiltersOrFn(currentVal) 
        : newFiltersOrFn;
      return {
        ...prev,
        [pageKey]: {
          ...currentVal,
          ...nextVal
        }
      };
    });
  };

  const resetFilters = () => {
    setPageFiltersRegistry((prev) => ({
      ...prev,
      [pageKey]: DEFAULT_FILTERS
    }));
    setSearch("");
  };

  // Reset search on navigation
  useEffect(() => {
    setSearch("");
  }, [location.pathname]);

  return (
    <AnalyticsFilterContext.Provider value={{
      filters: activeFilters,
      setFilters,
      search,
      setSearch,
      resetFilters
    }}>
      {children}
    </AnalyticsFilterContext.Provider>
  );
}

export function useAnalyticsFilters() {
  const ctx = useContext(AnalyticsFilterContext);
  if (!ctx) {
    throw new Error("useAnalyticsFilters must be used within an AnalyticsFilterProvider");
  }
  return ctx;
}
