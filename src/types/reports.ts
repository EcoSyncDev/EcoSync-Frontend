export type ReportMetric = "energy" | "water" | "carbon" | "savings";
export type ReportValues = Record<ReportMetric, number>;
export type ReportPoint = ReportValues & { label: string };

export type ReportPeriod = "month" | "quarter" | "semester" | "year";

export type ReportData = {
  range: string;
  previousLabel: string;
  grouping: string;
  points: readonly ReportPoint[];
  previous: ReportValues;
  highlights: readonly string[];
};
