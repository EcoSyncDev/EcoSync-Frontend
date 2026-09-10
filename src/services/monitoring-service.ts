import { monitoringData } from "@/data/monitoring";
import type { MonitoringData, MonitoringPeriod } from "@/types/monitoring";

export { monitoringPeriods } from "@/data/monitoring";

export function getMonitoringData(period: MonitoringPeriod): MonitoringData {
  return monitoringData[period];
}
