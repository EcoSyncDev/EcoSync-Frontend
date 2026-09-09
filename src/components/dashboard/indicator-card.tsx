import { Icon, type IconName } from "@/components/ui/icon";

export type IndicatorCardProps = {
  title: string;
  value: string;
  description: string;
  icon: IconName;
  comparison: string;
  trend: "up" | "down";
};

export function IndicatorCard({ title, value, description, icon, comparison, trend }: IndicatorCardProps) {
  return (
    <article className="flex h-full min-w-0 flex-col rounded-2xl border border-outline bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-medium text-muted">{title}</h3>
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-light text-brand">
          <Icon name={icon} />
        </span>
      </div>
      <p className="mt-5 text-3xl font-semibold tracking-tight text-brand-dark tabular-nums">{value}</p>
      <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
      <div className="mt-auto pt-5">
        <p className="flex items-start gap-2 border-t border-outline pt-4 text-xs font-medium leading-5 text-brand">
          <Icon name={trend === "up" ? "trendUp" : "trendDown"} className="mt-0.5 size-4 shrink-0" />
          <span>{comparison}</span>
        </p>
      </div>
    </article>
  );
}
