import { type SensorReading, trendData } from "@/data/sensorData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

export function SensorTrendChart({ liveReadings }: { liveReadings?: SensorReading[] }) {
  const data = liveReadings && liveReadings.length > 5 ? liveReadings : trendData;
  const title = liveReadings && liveReadings.length > 5 ? "Live Sensor Trends" : "24-Hour Sensor Trends";

  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="mb-4 flex items-center gap-2">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{title}</h3>
        {liveReadings && liveReadings.length > 5 && (
          <span className="h-2 w-2 animate-pulse rounded-full bg-status-normal" />
        )}
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 18% 22%)" />
            <XAxis dataKey="timestamp" stroke="hsl(215 15% 55%)" tick={{ fontSize: 11 }} interval={liveReadings && liveReadings.length > 5 ? 4 : 3} />
            <YAxis stroke="hsl(215 15% 55%)" tick={{ fontSize: 11 }} />
            <Tooltip contentStyle={{ backgroundColor: "hsl(220 22% 14%)", border: "1px solid hsl(220 18% 22%)", borderRadius: "8px", color: "hsl(210 20% 90%)", fontSize: 12 }} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Line type="monotone" dataKey="vibration" stroke="hsl(190 80% 50%)" strokeWidth={2} dot={false} name="Vibration (mm/s)" isAnimationActive={false} />
            <Line type="monotone" dataKey="temperature" stroke="hsl(38 92% 55%)" strokeWidth={2} dot={false} name="Temperature (°F)" isAnimationActive={false} />
            <Line type="monotone" dataKey="pressure" stroke="hsl(170 60% 45%)" strokeWidth={2} dot={false} name="Pressure (PSI)" isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
