import { anomalies } from "@/data/sensorData";
import { StatusBadge } from "./StatusBadge";
import { AlertTriangle } from "lucide-react";

export function AnomalyDetection() {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="mb-4 flex items-center gap-2">
        <AlertTriangle className="h-4 w-4 text-status-warning" />
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Anomaly Detection
        </h3>
      </div>
      <div className="space-y-3">
        {anomalies.map((a) => (
          <div key={a.id} className="rounded-md border border-border bg-secondary/40 p-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-medium text-foreground">{a.machineName}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{a.sensor} reading: <span className="font-mono font-semibold text-foreground">{a.value}</span> (threshold: {a.threshold})</p>
                <p className="mt-1 text-xs text-muted-foreground">{a.detectedAt}</p>
              </div>
              <StatusBadge status={a.severity} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
