import { machines } from "@/data/sensorData";
import { Activity, Thermometer, Gauge, AlertTriangle } from "lucide-react";

export function OverviewCards() {
  const cards = [
    {
      title: "Total Machines",
      value: machines.length,
      icon: Activity,
      subtitle: "Monitored in real-time",
      accent: "text-primary",
    },
    {
      title: "Avg Temperature",
      value: `${Math.round(machines.reduce((s, m) => s + m.temperature, 0) / machines.length)}°F`,
      icon: Thermometer,
      subtitle: "Across all sensors",
      accent: "text-chart-amber",
    },
    {
      title: "Avg Pressure",
      value: `${Math.round(machines.reduce((s, m) => s + m.pressure, 0) / machines.length)} PSI`,
      icon: Gauge,
      subtitle: "System-wide average",
      accent: "text-chart-teal",
    },
    {
      title: "Active Alerts",
      value: machines.filter((m) => m.status !== "Normal").length,
      icon: AlertTriangle,
      subtitle: "Require attention",
      accent: "text-status-critical",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <div key={card.title} className="rounded-lg border border-border bg-card p-5 glow-cyan">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">{card.title}</p>
            <card.icon className={`h-5 w-5 ${card.accent}`} />
          </div>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground">{card.value}</p>
          <p className="mt-1 text-xs text-muted-foreground">{card.subtitle}</p>
        </div>
      ))}
    </div>
  );
}
