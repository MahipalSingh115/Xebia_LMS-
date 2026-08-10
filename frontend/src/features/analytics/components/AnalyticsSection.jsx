import React from "react";

export default function AnalyticsSection({ id, children, className = "" }) {
  return (
    <section id={id} className={`space-y-4 ${className}`}>
      {children}
    </section>
  );
}
