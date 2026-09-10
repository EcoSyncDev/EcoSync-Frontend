import { EnergyConsumptionCard } from "@/components/dashboard/energy-consumption-card";
import { EnvironmentalImpactCard } from "@/components/dashboard/environmental-impact-card";
import { getDashboardOverview } from "@/services/dashboard-service";

export function DashboardOverview() {
  const { energyConsumption, environmentalImpact } = getDashboardOverview();
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-3">
      <EnergyConsumptionCard data={energyConsumption} />
      <EnvironmentalImpactCard {...environmentalImpact} />
    </div>
  );
}
