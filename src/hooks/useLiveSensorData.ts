import { useState, useEffect, useCallback } from "react";
import { type Machine, type SensorReading, machines as initialMachines, type RiskLevel } from "@/data/sensorData";

function jitter(base: number, range: number) {
  return +(base + (Math.random() - 0.5) * range).toFixed(1);
}

function deriveStatus(vibration: number, temperature: number, pressure: number): RiskLevel {
  if (vibration > 7 || temperature > 100 || pressure > 80) return "Critical";
  if (vibration > 4.5 || temperature > 80 || pressure > 65) return "Warning";
  return "Normal";
}

export function useLiveSensorData(intervalMs = 3000) {
  const [machines, setMachines] = useState<Machine[]>(initialMachines);
  const [liveReadings, setLiveReadings] = useState<SensorReading[]>([]);

  const tick = useCallback(() => {
    const now = new Date();
    const ts = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;

    setMachines((prev) =>
      prev.map((m) => {
        const vibration = jitter(m.vibration, 1.2);
        const temperature = jitter(m.temperature, 4);
        const pressure = jitter(m.pressure, 3);
        const status = deriveStatus(vibration, temperature, pressure);
        return { ...m, vibration, temperature, pressure, status };
      })
    );

    setLiveReadings((prev) => {
      const avgV = machines.reduce((s, m) => s + m.vibration, 0) / machines.length;
      const avgT = machines.reduce((s, m) => s + m.temperature, 0) / machines.length;
      const avgP = machines.reduce((s, m) => s + m.pressure, 0) / machines.length;
      const next = [...prev, { timestamp: ts, vibration: +avgV.toFixed(1), temperature: +avgT.toFixed(1), pressure: +avgP.toFixed(1) }];
      return next.slice(-30);
    });
  }, [machines]);

  useEffect(() => {
    const id = setInterval(tick, intervalMs);
    return () => clearInterval(id);
  }, [tick, intervalMs]);

  return { machines, liveReadings };
}
