import React from "react";
import AppLayout from "@/app/layouts/AppLayout";
import NotificationsPage from "@/shared/components/NotificationsPage";

export default function TrainerNotifications() {
  return (
    <AppLayout>
      <NotificationsPage role="trainer" userId="t1" />
    </AppLayout>
  );
}
