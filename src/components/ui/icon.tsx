import type { ReactNode } from "react";

const paths = {
  energy: <path d="m13 2-9 12h7l-1 8 10-13h-7l1-7Z" />,
  water: <path d="M12 3S5 10 5 15a7 7 0 0 0 14 0c0-5-7-12-7-12ZM9 15a3 3 0 0 0 3 3" />,
  wallet: <><rect x="3" y="5" width="18" height="15" rx="2" /><path d="M21 10h-6v5h6M17 12.5h1M4 5l13-3v3" /></>,
  trendUp: <path d="m3 17 6-6 4 4 8-8m-6 0h6v6" />,
  trendDown: <path d="m3 7 6 6 4-4 8 8m-6 0h6v-6" />,
  leaf: <><path d="M20 4c-7-1-14 1-14 8a6 6 0 0 0 6 6c7 0 9-7 8-14Z" /><path d="M4 21 15 10M9 16v-5m0 5h5" /></>,
  dashboard: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>,
  monitoring: <path d="M3 12h4l3-7 4 14 3-7h4" />,
  target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></>,
  report: <><path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8Z" /><path d="M14 3v5h5M9 12h6m-6 4h6" /></>,
  settings: <><path d="m9 3-1 3-3 1-2 3 2 2-1 3 2 3 3-1 2 4h3l1-3 3-1 2-3-2-2 1-3-2-3-3 1-2-4Z" /><circle cx="12" cy="12" r="3" /></>,
} satisfies Record<string, ReactNode>;

export type IconName = keyof typeof paths;

export function Icon({ name, className = "size-5" }: { name: IconName; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {paths[name]}
    </svg>
  );
}
