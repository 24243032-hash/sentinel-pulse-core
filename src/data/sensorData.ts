export type RiskLevel = "Normal" | "Warning" | "Critical";

export interface Machine {
  id: string;
  name: string;
  type: string;
  location: string;
  status: RiskLevel;
  vibration: number;
  temperature: number;
  pressure: number;
  usageHours: number;
  lastMaintenance: string;
  nextMaintenance: string;
  recommendedAction: string;
}

export interface SensorReading {
  timestamp: string;
  vibration: number;
  temperature: number;
  pressure: number;
}

export interface Anomaly {
  id: string;
  machineId: string;
  machineName: string;
  sensor: string;
  value: number;
  threshold: number;
  detectedAt: string;
  severity: RiskLevel;
}

export interface Notification {
  id: string;
  message: string;
  type: RiskLevel;
  time: string;
  read: boolean;
}

export const machines: Machine[] = [
  { id: "MCH-001", name: "CNC Lathe Alpha", type: "CNC Lathe", location: "Bay A", status: "Normal", vibration: 2.1, temperature: 68, pressure: 45, usageHours: 1240, lastMaintenance: "2026-01-15", nextMaintenance: "2026-03-15", recommendedAction: "Routine inspection" },
  { id: "MCH-002", name: "Hydraulic Press B2", type: "Hydraulic Press", location: "Bay B", status: "Warning", vibration: 5.8, temperature: 89, pressure: 72, usageHours: 3200, lastMaintenance: "2025-12-20", nextMaintenance: "2026-02-25", recommendedAction: "Check bearing alignment" },
  { id: "MCH-003", name: "Turbine Generator C", type: "Turbine", location: "Bay C", status: "Critical", vibration: 9.2, temperature: 112, pressure: 95, usageHours: 5600, lastMaintenance: "2025-11-10", nextMaintenance: "2026-02-22", recommendedAction: "Immediate shutdown & inspection" },
  { id: "MCH-004", name: "Conveyor Belt D1", type: "Conveyor", location: "Bay A", status: "Normal", vibration: 1.4, temperature: 55, pressure: 30, usageHours: 800, lastMaintenance: "2026-02-01", nextMaintenance: "2026-04-01", recommendedAction: "No action required" },
  { id: "MCH-005", name: "Compressor Unit E", type: "Compressor", location: "Bay D", status: "Warning", vibration: 4.5, temperature: 82, pressure: 68, usageHours: 2900, lastMaintenance: "2026-01-05", nextMaintenance: "2026-03-01", recommendedAction: "Replace air filter" },
  { id: "MCH-006", name: "Welding Robot F3", type: "Robotic Welder", location: "Bay B", status: "Normal", vibration: 1.8, temperature: 72, pressure: 40, usageHours: 1500, lastMaintenance: "2026-01-28", nextMaintenance: "2026-03-28", recommendedAction: "Routine inspection" },
  { id: "MCH-007", name: "Pump Station G", type: "Industrial Pump", location: "Bay C", status: "Critical", vibration: 8.1, temperature: 105, pressure: 88, usageHours: 4800, lastMaintenance: "2025-10-15", nextMaintenance: "2026-02-21", recommendedAction: "Urgent seal replacement" },
  { id: "MCH-008", name: "Drill Press H2", type: "Drill Press", location: "Bay A", status: "Normal", vibration: 2.5, temperature: 60, pressure: 35, usageHours: 950, lastMaintenance: "2026-02-10", nextMaintenance: "2026-04-10", recommendedAction: "No action required" },
];

const hours = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, "0")}:00`);

export const trendData: SensorReading[] = hours.map((t, i) => ({
  timestamp: t,
  vibration: 2 + Math.sin(i * 0.5) * 1.5 + Math.random() * 0.8,
  temperature: 65 + Math.sin(i * 0.3) * 15 + Math.random() * 5,
  pressure: 40 + Math.cos(i * 0.4) * 12 + Math.random() * 4,
}));

export const anomalies: Anomaly[] = [
  { id: "AN-001", machineId: "MCH-003", machineName: "Turbine Generator C", sensor: "Vibration", value: 9.2, threshold: 7.0, detectedAt: "2026-02-21 08:45", severity: "Critical" },
  { id: "AN-002", machineId: "MCH-003", machineName: "Turbine Generator C", sensor: "Temperature", value: 112, threshold: 95, detectedAt: "2026-02-21 08:45", severity: "Critical" },
  { id: "AN-003", machineId: "MCH-007", machineName: "Pump Station G", sensor: "Pressure", value: 88, threshold: 75, detectedAt: "2026-02-21 07:30", severity: "Critical" },
  { id: "AN-004", machineId: "MCH-002", machineName: "Hydraulic Press B2", sensor: "Vibration", value: 5.8, threshold: 5.0, detectedAt: "2026-02-21 09:15", severity: "Warning" },
  { id: "AN-005", machineId: "MCH-005", machineName: "Compressor Unit E", sensor: "Temperature", value: 82, threshold: 80, detectedAt: "2026-02-21 10:00", severity: "Warning" },
];

export const notifications: Notification[] = [
  { id: "N-001", message: "CRITICAL: Turbine Generator C vibration exceeds safe threshold", type: "Critical", time: "2 min ago", read: false },
  { id: "N-002", message: "CRITICAL: Pump Station G requires urgent seal replacement", type: "Critical", time: "15 min ago", read: false },
  { id: "N-003", message: "WARNING: Hydraulic Press B2 bearing misalignment detected", type: "Warning", time: "1 hr ago", read: false },
  { id: "N-004", message: "WARNING: Compressor Unit E temperature elevated", type: "Warning", time: "2 hrs ago", read: true },
  { id: "N-005", message: "Maintenance scheduled for Conveyor Belt D1 on Apr 1", type: "Normal", time: "3 hrs ago", read: true },
];

export const comparisonData = machines.map((m) => ({
  name: m.id,
  vibration: m.vibration,
  temperature: m.temperature / 10,
  pressure: m.pressure / 10,
}));
