import { useParams, useNavigate } from "react-router-dom";
import { machines as initialMachines, trendData } from "@/data/sensorData";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { ArrowLeft, Activity, Thermometer, Gauge, Clock } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const MachineDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const machine = initialMachines.find((m) => m.id === id);

  if (!machine) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">Machine not found</p>
          <button onClick={() => navigate("/")} className="mt-4 text-sm text-primary hover:underline">Back to Dashboard</button>
        </div>
      </div>
    );
  }

  const stats = [
    { label: "Vibration", value: `${machine.vibration} mm/s`, icon: Activity, color: "text-primary" },
    { label: "Temperature", value: `${machine.temperature}°F`, icon: Thermometer, color: "text-chart-amber" },
    { label: "Pressure", value: `${machine.pressure} PSI`, icon: Gauge, color: "text-chart-teal" },
    { label: "Runtime", value: `${machine.usageHours}h`, icon: Clock, color: "text-muted-foreground" },
  ];

  // Generate machine-specific trend data
  const machineTrend = trendData.map((d) => ({
    ...d,
    vibration: +(d.vibration * (machine.vibration / 3)).toFixed(1),
    temperature: +(d.temperature * (machine.temperature / 70)).toFixed(1),
    pressure: +(d.pressure * (machine.pressure / 45)).toFixed(1),
  }));

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1200px] items-center gap-4 px-6 py-4">
          <button onClick={() => navigate("/")} className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Dashboard
          </button>
          <div className="h-5 w-px bg-border" />
          <div className="flex-1">
            <h1 className="text-lg font-bold text-foreground">{machine.name}</h1>
            <p className="text-xs text-muted-foreground">{machine.type} · {machine.location} · {machine.id}</p>
          </div>
          <StatusBadge status={machine.status} />
        </div>
      </header>

      <main className="mx-auto max-w-[1200px] space-y-6 px-6 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-lg border border-border bg-card p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-muted-foreground">{s.label}</p>
                <s.icon className={`h-4 w-4 ${s.color}`} />
              </div>
              <p className="mt-2 text-2xl font-bold text-foreground">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Sensor History Chart */}
        <div className="rounded-lg border border-border bg-card p-5">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Sensor History</h3>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={machineTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 18% 22%)" />
                <XAxis dataKey="timestamp" stroke="hsl(215 15% 55%)" tick={{ fontSize: 11 }} interval={3} />
                <YAxis stroke="hsl(215 15% 55%)" tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: "hsl(220 22% 14%)", border: "1px solid hsl(220 18% 22%)", borderRadius: "8px", color: "hsl(210 20% 90%)", fontSize: 12 }} />
                <Line type="monotone" dataKey="vibration" stroke="hsl(190 80% 50%)" strokeWidth={2} dot={false} name="Vibration" />
                <Line type="monotone" dataKey="temperature" stroke="hsl(38 92% 55%)" strokeWidth={2} dot={false} name="Temperature" />
                <Line type="monotone" dataKey="pressure" stroke="hsl(170 60% 45%)" strokeWidth={2} dot={false} name="Pressure" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Maintenance Info */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-border bg-card p-5">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Maintenance Info</h3>
            <div className="space-y-3">
              <div className="flex justify-between rounded-md bg-secondary/40 px-4 py-3">
                <span className="text-sm text-muted-foreground">Last Maintenance</span>
                <span className="text-sm font-medium text-foreground">{machine.lastMaintenance}</span>
              </div>
              <div className="flex justify-between rounded-md bg-secondary/40 px-4 py-3">
                <span className="text-sm text-muted-foreground">Next Scheduled</span>
                <span className="text-sm font-medium text-foreground">{machine.nextMaintenance}</span>
              </div>
              <div className="flex justify-between rounded-md bg-secondary/40 px-4 py-3">
                <span className="text-sm text-muted-foreground">Recommended Action</span>
                <span className="text-sm font-medium text-foreground">{machine.recommendedAction}</span>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-border bg-card p-5">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Machine Specifications</h3>
            <div className="space-y-3">
              <div className="flex justify-between rounded-md bg-secondary/40 px-4 py-3">
                <span className="text-sm text-muted-foreground">Type</span>
                <span className="text-sm font-medium text-foreground">{machine.type}</span>
              </div>
              <div className="flex justify-between rounded-md bg-secondary/40 px-4 py-3">
                <span className="text-sm text-muted-foreground">Location</span>
                <span className="text-sm font-medium text-foreground">{machine.location}</span>
              </div>
              <div className="flex justify-between rounded-md bg-secondary/40 px-4 py-3">
                <span className="text-sm text-muted-foreground">Total Runtime</span>
                <span className="text-sm font-medium text-foreground">{machine.usageHours} hours</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MachineDetail;
