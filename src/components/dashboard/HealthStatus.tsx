import { machines } from "@/data/sensorData";
import { StatusBadge } from "./StatusBadge";
import { cn } from "@/lib/utils";

export function HealthStatus() {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        Machine Health Status
      </h3>
      <div className="space-y-3">
        {machines.map((m) => (
          <div
            key={m.id}
            className={cn(
              "flex items-center justify-between rounded-md border border-border bg-secondary/50 px-4 py-3 transition-all",
              m.status === "Critical" && "glow-status-critical border-status-critical/30",
              m.status === "Warning" && "border-status-warning/20",
            )}
          >
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground">{m.name}</p>
              <p className="text-xs text-muted-foreground">{m.location} · {m.usageHours}h runtime</p>
            </div>
            <StatusBadge status={m.status} />
          </div>
        ))}
      </div>
    </div>
  );
}
