import { reports, type ReportPeriod } from "@/data/reports";

export { formatReportValue, reportComparison, reportMetrics, reportPeriods, sumReportPoints } from "@/data/reports";
export type { ReportMetric, ReportPeriod, ReportPoint, ReportValues } from "@/data/reports";

export function getReports(period: ReportPeriod): (typeof reports)[ReportPeriod] {
  return reports[period];
}
