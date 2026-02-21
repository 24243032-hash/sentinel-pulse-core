import { comparisonData } from "@/data/sensorData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

export function ComparisonChart() {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        Machine Comparison
      </h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={comparisonData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 18% 22%)" />
            <XAxis dataKey="name" stroke="hsl(215 15% 55%)" tick={{ fontSize: 11 }} />
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
            <Bar dataKey="vibration" fill="hsl(190 80% 50%)" radius={[3, 3, 0, 0]} name="Vibration" />
            <Bar dataKey="temperature" fill="hsl(38 92% 55%)" radius={[3, 3, 0, 0]} name="Temp (÷10)" />
            <Bar dataKey="pressure" fill="hsl(170 60% 45%)" radius={[3, 3, 0, 0]} name="Pressure (÷10)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
