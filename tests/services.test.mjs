import assert from "node:assert/strict";
import test from "node:test";
import { createModuleLoader } from "./load-typescript.mjs";

const load = createModuleLoader();
const dashboard = load("@/services/dashboard-service");
const monitoring = load("@/services/monitoring-service");
const goals = load("@/services/goals-service");
const reports = load("@/services/reports-service");

test("dashboard returns the four expected indicators and their displayed values", () => {
  const indicators = dashboard.getDashboardIndicators();
  assert.deepEqual(indicators.map(({ id }) => id), ["energy", "water", "carbon", "savings"]);
  assert.deepEqual(indicators.map(({ value }) => value), ["248 kWh", "6.420 L", "32,8 kg", "R$ 184,20"]);
  for (const indicator of indicators) {
    assert.ok(indicator.title.length > 0);
    assert.ok(indicator.description.length > 0);
    assert.ok(["up", "down"].includes(indicator.trend));
  }
});

test("dashboard overview includes the weekly consumption and environmental impact", () => {
  const overview = dashboard.getDashboardOverview();
  const mock = load("@/data/dashboard-overview");
  assert.equal(overview.energyConsumption.length, 7);
  assert.deepEqual(overview.energyConsumption[0], { day: "Seg", kwh: 32 });
  assert.equal(overview.energyConsumption.reduce((sum, point) => sum + point.kwh, 0), 254);
  assert.equal(overview.environmentalImpact.progress, mock.environmentalImpact.progress);
  assert.equal(overview.environmentalImpact.carbonAvoided, "32,8 kg");
  assert.equal(overview.environmentalImpact.waterSaved, "580 L");
});

test("dashboard activity returns existing goals and recent actions", () => {
  const activity = dashboard.getDashboardActivity();
  const mock = load("@/data/dashboard-activity");
  assert.equal(activity.sustainableGoals.length, 3);
  assert.equal(activity.recentActions.length, 4);
  assert.deepEqual(activity.sustainableGoals.map(({ id }) => id), mock.sustainableGoals.map(({ id }) => id));
  assert.deepEqual(activity.recentActions.map(({ id }) => id), mock.recentActions.map(({ id }) => id));
  assert.equal(activity.sustainableGoals.find(({ id }) => id === "carbon").progress, 84);
  assert.equal(activity.recentActions[0].id, "energy-goal-updated");
});

for (const [period, days, count] of [["7d", 7, 7], ["30d", 30, 6], ["3m", 90, 3], ["12m", 365, 6]]) {
  test(`monitoring returns the mock consumption for ${period}`, () => {
    assert.ok(monitoring.monitoringPeriods.some(({ id }) => id === period));
    const data = monitoring.getMonitoringData(period);
    const mock = load("@/data/monitoring").monitoringData[period];
    assert.equal(data.days, days);
    assert.equal(data.points.length, count);
    assert.equal(data.grouping, mock.grouping);
    assert.equal(data.carbonAvoided, mock.carbonAvoided);
    assert.equal(data.savings, mock.savings);
    for (const [index, point] of data.points.entries()) {
      assert.equal(point.label, mock.points[index].label);
      assert.equal(point.energy, mock.points[index].energy);
      assert.equal(point.water, mock.points[index].water);
    }
  });
}

test("goals returns all mock goals by default", () => {
  const result = goals.getGoals();
  assert.equal(result.length, 4);
  assert.deepEqual(result.map(({ id }) => id), load("@/data/goals").goals.map(({ id }) => id));
  assert.deepEqual(result.map(({ id }) => id), goals.getGoals("all").map(({ id }) => id));
  assert.equal(result.find(({ id }) => id === "previous-energy").progress, 100);
});

test("goal filters partition active and completed goals without changing the list", () => {
  const active = goals.getGoals("active");
  const completed = goals.getGoals("completed");
  assert.equal(active.length, 3);
  assert.equal(completed.length, 1);
  assert.ok(active.every((goal) => !goal.completed));
  assert.ok(completed.every((goal) => goal.completed));
  assert.equal(completed[0].id, "previous-energy");
  const ids = [...active, ...completed].map(({ id }) => id).sort();
  assert.deepEqual(ids, goals.getGoals().map(({ id }) => id).sort());
  assert.equal(new Set(ids).size, ids.length);
});

test("goal summary matches both the mock summary and the current goals", () => {
  const summary = goals.getGoalsSummary();
  assert.deepEqual(summary, load("@/data/goals").goalsSummary);
  assert.equal(summary.active, goals.getGoals("active").length);
  assert.equal(summary.completed, goals.getGoals("completed").length);
  assert.equal(summary.average, 71);
  assert.equal(summary.best, "CO₂");
});

for (const [period, count] of [["month", 4], ["quarter", 3], ["semester", 6], ["year", 9]]) {
  test(`reports returns the expected series and metrics for ${period}`, () => {
    assert.ok(reports.reportPeriods.some(({ id }) => id === period));
    const data = reports.getReports(period);
    const mock = load("@/data/reports").reports[period];
    assert.equal(data.range, mock.range);
    assert.equal(data.previousLabel, mock.previousLabel);
    assert.equal(data.points.length, count);
    assert.equal(data.highlights.length, 3);
    assert.equal(data.highlights[0], mock.highlights[0]);
    assert.deepEqual(reports.reportMetrics.map(({ id }) => id), ["energy", "water", "carbon", "savings"]);
    for (const [index, point] of data.points.entries()) {
      assert.equal(point.label, mock.points[index].label);
      for (const { id } of reports.reportMetrics) {
        assert.ok(Number.isFinite(point[id]));
        assert.equal(point[id], mock.points[index][id]);
        assert.equal(data.previous[id], mock.previous[id]);
      }
    }
  });
}

test("report totals sum metrics and handle an empty series", () => {
  assert.deepEqual(reports.sumReportPoints([]), { energy: 0, water: 0, carbon: 0, savings: 0 });
  const totals = reports.sumReportPoints(reports.getReports("month").points);
  assert.equal(totals.energy, 248);
  assert.equal(totals.water, 6420);
  assert.ok(Math.abs(totals.carbon - 32.8) < 1e-9);
  assert.ok(Math.abs(totals.savings - 184.2) < 1e-9);
});

test("report comparisons handle improvement, worsening, equality and zero baseline", () => {
  for (const [current, previous, lowerIsBetter, percent, status] of [
    [80, 100, true, -20, "Melhora"],
    [120, 100, true, 20, "Piora"],
    [120, 100, false, 20, "Melhora"],
    [80, 100, false, -20, "Piora"],
    [100, 100, true, 0, "Sem variação"],
    [10, 0, false, null, "Melhora"],
    [0, 0, true, null, "Sem variação"],
  ]) {
    assert.deepEqual(reports.reportComparison(current, previous, lowerIsBetter), { percent, status });
  }
});

test("report values use Brazilian numeric and currency formatting", () => {
  assert.equal(reports.formatReportValue(1234.5, "energy"), "1.234,5");
  assert.equal(reports.formatReportValue(32.84, "carbon"), "32,8");
  assert.equal(reports.formatReportValue(184.2, "savings").replace(/\s/g, " "), "R$ 184,20");
});
