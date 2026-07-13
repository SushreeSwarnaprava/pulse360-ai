// Presentational component for rendering product usage metrics.
// Accepts an array of metric objects and renders them in a responsive grid.
// This is a server component (no "use client") and uses Tailwind for styling.
export type Metric = {
  label: string;
  value: string;
  trend: string;
  trendColor?: string; // optional tailwind color class for trend text
};

export default function ProductMetrics({ metrics }: { metrics: Metric[] }) {
  return (
    <section className="mt-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Product Usage</h3>

        {/* Grid of usage metrics. Each metric is a small card with a label,
            a large value and a compact trend indicator. */}
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="rounded-xl border border-slate-100 bg-slate-50 p-4 hover:shadow-md transition"
            >
              {/* Metric label */}
              <div className="text-sm text-slate-500">{m.label}</div>

              {/* Value and trend */}
              <div className="mt-2 flex items-baseline justify-between">
                <div className="text-2xl font-semibold text-slate-900">{m.value}</div>
                <div className={`text-sm ${m.trendColor ?? "text-slate-500"}`}>{m.trend}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
