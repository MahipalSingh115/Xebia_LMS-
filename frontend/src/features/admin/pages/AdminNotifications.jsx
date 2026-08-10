import React from "react";
import AppLayout from "@/app/layouts/AppLayout";
import NotificationsPage from "@/shared/components/NotificationsPage";

export default function AdminNotifications() {
  return (
    <AppLayout>
      <NotificationsPage role="admin" userId="a1" />
    </AppLayout>
  );
}
