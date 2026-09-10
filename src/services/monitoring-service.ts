import { monitoringData, type MonitoringPeriod } from "@/data/monitoring";

export { monitoringPeriods } from "@/data/monitoring";
export type { ConsumptionPoint, MonitoringPeriod } from "@/data/monitoring";

export function getMonitoringData(period: MonitoringPeriod): (typeof monitoringData)[MonitoringPeriod] {
  return monitoringData[period];
}
