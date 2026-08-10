import React from "react";
import AnalyticsHeader from "./AnalyticsHeader";
import AnalyticsFilterBar from "./AnalyticsFilterBar";
import AnalyticsLoadingState from "./AnalyticsLoadingState";
import AnalyticsErrorState from "./AnalyticsErrorState";
import AnalyticsEmptyState from "./AnalyticsEmptyState";

export default function AnalyticsPageLayout({
  title,
  description,
  breadcrumbs = [],
  onExport,
  
  // States
  isLoading = false,
  isError = false,
  isEmpty = false,
  errorMessage = "Something went wrong while fetching data.",
  onRetry,
  
  // Developer simulators
  showSandbox = true,
  simulateLoading,
  setSimulateLoading,
  simulateError,
  setSimulateError,
  simulateEmpty,
  setSimulateEmpty,
  
  children
}) {
  return (
    <div className="space-y-6 max-w-[1600px] mx-auto w-full select-text pb-6">
      {/* Page Header */}
      <AnalyticsHeader
        title={title}
        description={description}
        breadcrumbs={breadcrumbs}
        onExport={onExport}
      />

      {/* Shared Filter Bar */}
      <AnalyticsFilterBar
        showSandbox={showSandbox}
        isLoading={simulateLoading}
        setIsLoading={setSimulateLoading}
        isError={simulateError}
        setIsError={setSimulateError}
        isEmpty={simulateEmpty}
        setIsEmpty={setSimulateEmpty}
      />

      {/* Main Panel Content Render */}
      {isError ? (
        <AnalyticsErrorState message={errorMessage} onRetry={onRetry} />
      ) : isLoading ? (
        <AnalyticsLoadingState />
      ) : isEmpty ? (
        <AnalyticsEmptyState onReset={onRetry} />
      ) : (
        <div className="space-y-8 animate-fadeIn">
          {children}
        </div>
      )}
    </div>
  );
}
