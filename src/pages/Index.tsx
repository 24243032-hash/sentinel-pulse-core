import { OverviewCards } from "@/components/dashboard/OverviewCards";
import { SensorTrendChart } from "@/components/dashboard/SensorTrendChart";
import { ComparisonChart } from "@/components/dashboard/ComparisonChart";
import { HealthStatus } from "@/components/dashboard/HealthStatus";
import { AnomalyDetection } from "@/components/dashboard/AnomalyDetection";
import { MaintenanceSchedule } from "@/components/dashboard/MaintenanceSchedule";
import { MachineTable } from "@/components/dashboard/MachineTable";
import { NotificationPanel } from "@/components/dashboard/NotificationPanel";
import { Activity } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15">
              <Activity className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-foreground">PredictiveMaint</h1>
              <p className="text-xs text-muted-foreground">Industrial Machinery Monitoring</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-full bg-status-normal/15 px-3 py-1.5 text-xs font-medium text-status-normal sm:flex">
              <span className="h-2 w-2 animate-pulse rounded-full bg-status-normal" />
              System Online
            </div>
            <span className="text-xs text-muted-foreground font-mono">
              {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-[1600px] space-y-6 px-6 py-6">
        <OverviewCards />

        {/* Charts Row */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <SensorTrendChart />
          <ComparisonChart />
        </div>

        {/* Notifications + Anomalies */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <NotificationPanel />
          <AnomalyDetection />
        </div>

        {/* Machine Table */}
        <MachineTable />

        {/* Health + Maintenance */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <HealthStatus />
          <MaintenanceSchedule />
        </div>
      </main>
    </div>
  );
};

export default Index;
