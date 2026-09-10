import { reports } from "@/data/reports";
import type { ReportData, ReportPeriod } from "@/types/reports";

export { formatReportValue, reportComparison, reportMetrics, reportPeriods, sumReportPoints } from "@/data/reports";

export function getReports(period: ReportPeriod): ReportData {
  return reports[period];
}
