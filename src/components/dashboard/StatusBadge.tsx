import { type RiskLevel } from "@/data/sensorData";
import { cn } from "@/lib/utils";

const statusConfig: Record<RiskLevel, { label: string; className: string }> = {
  Normal: { label: "Normal", className: "bg-status-normal/15 text-status-normal border-status-normal/30" },
  Warning: { label: "Warning", className: "bg-status-warning/15 text-status-warning border-status-warning/30" },
  Critical: { label: "Critical", className: "bg-status-critical/15 text-status-critical border-status-critical/30" },
};

export function StatusBadge({ status, className }: { status: RiskLevel; className?: string }) {
  const config = statusConfig[status];
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold", config.className, className)}>
      <span className={cn("h-1.5 w-1.5 rounded-full", {
        "bg-status-normal": status === "Normal",
        "bg-status-warning": status === "Warning",
        "bg-status-critical animate-pulse": status === "Critical",
      })} />
      {config.label}
    </span>
  );
}
