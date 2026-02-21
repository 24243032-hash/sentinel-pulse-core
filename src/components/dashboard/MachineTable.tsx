import { machines } from "@/data/sensorData";
import { StatusBadge } from "./StatusBadge";

export function MachineTable() {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        Machine Overview
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="whitespace-nowrap px-3 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">ID</th>
              <th className="whitespace-nowrap px-3 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Machine</th>
              <th className="whitespace-nowrap px-3 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Vibration</th>
              <th className="whitespace-nowrap px-3 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Temp (°F)</th>
              <th className="whitespace-nowrap px-3 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Pressure</th>
              <th className="whitespace-nowrap px-3 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Risk</th>
              <th className="whitespace-nowrap px-3 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Action</th>
            </tr>
          </thead>
          <tbody>
            {machines.map((m) => (
              <tr key={m.id} className="border-b border-border/50 transition-colors hover:bg-secondary/30">
                <td className="whitespace-nowrap px-3 py-3 font-mono text-xs text-primary">{m.id}</td>
                <td className="whitespace-nowrap px-3 py-3 font-medium text-foreground">{m.name}</td>
                <td className="whitespace-nowrap px-3 py-3 font-mono">{m.vibration} mm/s</td>
                <td className="whitespace-nowrap px-3 py-3 font-mono">{m.temperature}°F</td>
                <td className="whitespace-nowrap px-3 py-3 font-mono">{m.pressure} PSI</td>
                <td className="whitespace-nowrap px-3 py-3"><StatusBadge status={m.status} /></td>
                <td className="px-3 py-3 text-xs text-muted-foreground">{m.recommendedAction}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
