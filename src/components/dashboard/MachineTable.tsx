import { useState } from "react";
import { type Machine, type RiskLevel } from "@/data/sensorData";
import { StatusBadge } from "./StatusBadge";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const riskFilters: RiskLevel[] = ["Normal", "Warning", "Critical"];

export function MachineTable({ machines }: { machines: Machine[] }) {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<RiskLevel | "All">("All");
  const navigate = useNavigate();

  const filtered = machines.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase()) || m.id.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = activeFilter === "All" || m.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Machine Overview
        </h3>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search machines..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-8 w-full rounded-md border border-border bg-secondary/50 pl-9 pr-3 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary sm:w-48"
            />
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => setActiveFilter("All")}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${activeFilter === "All" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}
            >
              All
            </button>
            {riskFilters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${activeFilter === f ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>
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
            {filtered.map((m) => (
              <tr
                key={m.id}
                onClick={() => navigate(`/machine/${m.id}`)}
                className="cursor-pointer border-b border-border/50 transition-colors hover:bg-secondary/30"
              >
                <td className="whitespace-nowrap px-3 py-3 font-mono text-xs text-primary">{m.id}</td>
                <td className="whitespace-nowrap px-3 py-3 font-medium text-foreground">{m.name}</td>
                <td className="whitespace-nowrap px-3 py-3 font-mono">{m.vibration} mm/s</td>
                <td className="whitespace-nowrap px-3 py-3 font-mono">{m.temperature}°F</td>
                <td className="whitespace-nowrap px-3 py-3 font-mono">{m.pressure} PSI</td>
                <td className="whitespace-nowrap px-3 py-3"><StatusBadge status={m.status} /></td>
                <td className="px-3 py-3 text-xs text-muted-foreground">{m.recommendedAction}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-3 py-8 text-center text-sm text-muted-foreground">No machines match your filters</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
