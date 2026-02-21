import { type Machine } from "@/data/sensorData";
import { StatusBadge } from "./StatusBadge";
import { Calendar } from "lucide-react";

export function MaintenanceSchedule({ machines }: { machines: Machine[] }) {
  const sorted = [...machines].sort((a, b) => new Date(a.nextMaintenance).getTime() - new Date(b.nextMaintenance).getTime());

  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="mb-4 flex items-center gap-2">
        <Calendar className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Maintenance Schedule
        </h3>
      </div>
      <div className="space-y-3">
        {sorted.map((m) => {
          const isOverdue = new Date(m.nextMaintenance) <= new Date();
          return (
            <div key={m.id} className="flex items-center justify-between rounded-md border border-border bg-secondary/40 px-4 py-3">
              <div>
                <p className="text-sm font-medium text-foreground">{m.name}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Next: <span className={isOverdue ? "font-semibold text-status-critical" : "text-foreground"}>{m.nextMaintenance}</span>
                  {isOverdue && " (OVERDUE)"}
                </p>
                <p className="text-xs text-muted-foreground">{m.recommendedAction}</p>
              </div>
              <StatusBadge status={m.status} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
