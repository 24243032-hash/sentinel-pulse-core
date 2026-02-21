import { notifications } from "@/data/sensorData";
import { Bell } from "lucide-react";
import { cn } from "@/lib/utils";

export function NotificationPanel() {
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Notifications</h3>
        </div>
        {unread > 0 && (
          <span className="rounded-full bg-status-critical/20 px-2 py-0.5 text-xs font-semibold text-status-critical">
            {unread} new
          </span>
        )}
      </div>
      <div className="space-y-2">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={cn(
              "rounded-md border px-4 py-3 transition-all",
              !n.read ? "border-primary/30 bg-primary/5" : "border-border bg-secondary/30",
            )}
          >
            <div className="flex items-start justify-between gap-2">
              <p className={cn("text-sm", !n.read ? "font-medium text-foreground" : "text-muted-foreground")}>
                {n.message}
              </p>
              <span className={cn("mt-0.5 h-2 w-2 shrink-0 rounded-full", !n.read ? "bg-primary" : "bg-transparent")} />
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{n.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
