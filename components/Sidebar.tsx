"use client";

import { NotificationsList } from "./NotificationsList";

export function Sidebar() {
  return (
    <div className="space-y-6">
      <NotificationsList />
      {/* Autres composants de la sidebar */}
    </div>
  );
}
