import { trendData } from "@/data/sensorData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

export function SensorTrendChart() {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        24-Hour Sensor Trends
      </h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 18% 22%)" />
            <XAxis dataKey="timestamp" stroke="hsl(215 15% 55%)" tick={{ fontSize: 11 }} interval={3} />
            <YAxis stroke="hsl(215 15% 55%)" tick={{ fontSize: 11 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(220 22% 14%)",
                border: "1px solid hsl(220 18% 22%)",
                borderRadius: "8px",
                color: "hsl(210 20% 90%)",
                fontSize: 12,
              }}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Line type="monotone" dataKey="vibration" stroke="hsl(190 80% 50%)" strokeWidth={2} dot={false} name="Vibration (mm/s)" />
            <Line type="monotone" dataKey="temperature" stroke="hsl(38 92% 55%)" strokeWidth={2} dot={false} name="Temperature (°F)" />
            <Line type="monotone" dataKey="pressure" stroke="hsl(170 60% 45%)" strokeWidth={2} dot={false} name="Pressure (PSI)" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
