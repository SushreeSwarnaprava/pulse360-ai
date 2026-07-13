const reportCategories = [
  "Executive Reports",
  "Health Reports",
  "Renewal Reports",
  "Adoption Reports",
  "ARR Reports",
  "Expansion Reports",
] as const;

type ReportCategory = (typeof reportCategories)[number];

type ReportCard = {
  title: string;
  category: ReportCategory;
  description: string;
  lastGenerated: string;
};

const reports: ReportCard[] = [
  {
    title: "Executive Summary",
    category: "Executive Reports",
    description: "High-level performance snapshot across revenue, renewals, and adoption.",
    lastGenerated: "Jul 12, 2026",
  },
  {
    title: "Board Review Pack",
    category: "Executive Reports",
    description: "Board-ready slide summary for leadership meetings.",
    lastGenerated: "Jul 10, 2026",
  },
  {
    title: "Customer Health Scorecard",
    category: "Health Reports",
    description: "Aggregate health signals for top accounts and risk trends.",
    lastGenerated: "Jul 13, 2026",
  },
  {
    title: "Health Trend Analysis",
    category: "Health Reports",
    description: "Identify account health changes and at-risk cohorts.",
    lastGenerated: "Jul 11, 2026",
  },
  {
    title: "Renewal Forecast",
    category: "Renewal Reports",
    description: "Forecast renewal ARR and coverage for the upcoming quarter.",
    lastGenerated: "Jul 13, 2026",
  },
  {
    title: "Renewal Risk Register",
    category: "Renewal Reports",
    description: "Track risk status for all customer renewals due soon.",
    lastGenerated: "Jul 9, 2026",
  },
  {
    title: "Adoption Velocity",
    category: "Adoption Reports",
    description: "Measure product adoption across customer segments.",
    lastGenerated: "Jul 14, 2026",
  },
  {
    title: "Feature Engagement",
    category: "Adoption Reports",
    description: "Report on usage and activation trends for key features.",
    lastGenerated: "Jul 8, 2026",
  },
  {
    title: "ARR Growth Summary",
    category: "ARR Reports",
    description: "Monthly and quarterly ARR growth comparison by segment.",
    lastGenerated: "Jul 12, 2026",
  },
  {
    title: "ARR Retention Metrics",
    category: "ARR Reports",
    description: "Analyze churn, expansion, and net revenue retention.",
    lastGenerated: "Jul 7, 2026",
  },
  {
    title: "Expansion Opportunity Report",
    category: "Expansion Reports",
    description: "Opportunity scoring for expansion deals and cross-sell motion.",
    lastGenerated: "Jul 13, 2026",
  },
  {
    title: "Upsell Performance",
    category: "Expansion Reports",
    description: "Review team performance and deal velocity for expansions.",
    lastGenerated: "Jul 10, 2026",
  },
];

export default function ReportsPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 pb-12">
      <section className="mt-6 rounded-[28px] border border-slate-200 bg-white p-8 shadow-xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">Reports</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-500">Generate executive, renewal, adoption, ARR, and expansion insights with one-click exports.</p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">
            Last refreshed: <span className="font-semibold text-slate-900">Jul 14, 2026</span>
          </div>
        </div>
      </section>

      <div className="mt-8 space-y-10">
        {reportCategories.map((category) => (
          <section key={category} className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">{category}</h2>
                <p className="mt-1 text-sm text-slate-500">Curated reports for {category.toLowerCase()}.</p>
              </div>
              <button className="btn-secondary rounded-full px-5 py-3">View all</button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {reports.filter((report) => report.category === category).map((report) => (
                <article key={report.title} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900">{report.title}</h3>
                      <p className="mt-2 text-sm text-slate-500">{report.description}</p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">{category.split(" ")[0]}</div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2 text-sm text-slate-500">
                    <div className="rounded-2xl bg-slate-50 px-3 py-2">Last generated: {report.lastGenerated}</div>
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <button className="btn-secondary w-full rounded-full px-4 py-3 text-sm">Export PDF</button>
                    <button className="btn-secondary w-full rounded-full px-4 py-3 text-sm">Export CSV</button>
                  </div>

                  <button className="btn-primary mt-5 w-full rounded-full px-4 py-3 text-sm font-semibold">Generate Report</button>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
