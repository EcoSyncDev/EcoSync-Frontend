import { monitoringData } from "@/data/monitoring";
import type { MonitoringData, MonitoringPeriod } from "@/types/monitoring";

export { monitoringPeriods } from "@/data/monitoring";

// Leitura síncrona de mocks; a futura integração HTTP ficará em src/lib/api/.
export function getMonitoringData(period: MonitoringPeriod): MonitoringData {
  return monitoringData[period];
}
