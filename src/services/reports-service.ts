import { reports } from "@/data/reports";
import type { ReportData, ReportPeriod } from "@/types/reports";

export { formatReportValue, reportComparison, reportMetrics, reportPeriods, sumReportPoints } from "@/data/reports";

// Leitura síncrona de mocks; a futura integração HTTP ficará em src/lib/api/.
export function getReports(period: ReportPeriod): ReportData {
  return reports[period];
}
