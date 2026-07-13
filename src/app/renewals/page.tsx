import { RenewalColumn, RenewalStageCard, SidebarCard, renewalPipeline } from "../../components/RenewalsBoard";

const summaryItems = [
  { label: "Upcoming Renewals", value: "18" },
  { label: "Renewal ARR", value: "₹2.4 Cr" },
  { label: "Renewal Health", value: "92%" },
  { label: "Revenue at Risk", value: "₹32L" },
];

const stages = [
  "Upcoming",
  "Negotiation",
  "Legal Review",
  "Ready to Close",
  "Renewed",
  "At Risk",
] as const;

export default function RenewalsPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 pb-12">
      <section className="mt-6 rounded-[28px] border border-slate-200 bg-white p-8 shadow-xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">Renewals</h1>
            <p className="mt-2 text-sm text-slate-500">Track and manage upcoming customer renewals.</p>
          </div>
          <button className="btn-primary rounded-full px-5 py-3">+ New Renewal</button>
        </div>
      </section>

      <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryItems.map((item) => (
          <div key={item.label} className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">{item.label}</div>
            <div className="mt-4 text-3xl font-semibold text-slate-900">{item.value}</div>
          </div>
        ))}
      </section>

      <section className="mt-8 grid gap-6 xl:grid-cols-[1.7fr_0.9fr]">
        <div>
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Renewal Pipeline</h2>
              <p className="mt-1 text-sm text-slate-500">Move deals through the stages with drag-and-drop-ready cards.</p>
            </div>
            <span className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">6 stages</span>
          </div>

          <div className="mt-6 flex flex-col gap-4 overflow-x-auto pb-2">
            <div className="min-w-[1200px] flex gap-4">
              {stages.map((stage) => {
                const items = renewalPipeline.filter((item) => item.stage === stage);
                return (
                  <RenewalColumn key={stage} title={stage} count={items.length}>
                    {items.map((item) => (
                      <RenewalStageCard key={item.customer} item={item} />
                    ))}
                  </RenewalColumn>
                );
              })}
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <SidebarCard title="Today's Renewal Tasks" subtitle="Focus on the highest-priority items for the day.">
            <div className="rounded-[20px] bg-slate-50 p-4">
              <div className="flex items-center justify-between gap-3 text-sm text-slate-700">
                <span>Follow up with Curefit</span>
                <span className="font-semibold text-slate-900">Due today</span>
              </div>
              <div className="mt-4 flex items-center justify-between gap-3 text-sm text-slate-700">
                <span>Review Amazon contract</span>
                <span className="font-semibold text-slate-900">2d</span>
              </div>
              <div className="mt-4 flex items-center justify-between gap-3 text-sm text-slate-700">
                <span>Prepare Nanonets legal packet</span>
                <span className="font-semibold text-slate-900">4d</span>
              </div>
            </div>
          </SidebarCard>

          <SidebarCard title="Recent Renewal Activity" subtitle="Latest updates from your renewal pipeline.">
            <div className="space-y-3 text-sm text-slate-700">
              <div className="rounded-2xl bg-slate-50 p-3">
                <div className="font-medium text-slate-900">Curefit moved to Negotiation</div>
                <div className="mt-1 text-xs text-slate-500">11:24 AM</div>
              </div>
              <div className="rounded-2xl bg-slate-50 p-3">
                <div className="font-medium text-slate-900">Amazon renewal score unchanged</div>
                <div className="mt-1 text-xs text-slate-500">09:17 AM</div>
              </div>
              <div className="rounded-2xl bg-slate-50 p-3">
                <div className="font-medium text-slate-900">Legal review started for Nanonets</div>
                <div className="mt-1 text-xs text-slate-500">Yesterday</div>
              </div>
            </div>
          </SidebarCard>

          <SidebarCard title="AI Suggestions" subtitle="Intelligent next steps for renewals.">
            <div className="space-y-4 text-sm text-slate-700">
              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="font-medium text-slate-900">Prioritize Luma Labs</div>
                <p className="mt-1 text-xs text-slate-500">High risk and high ARR potential.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="font-medium text-slate-900">Send renewal email to Delta Health</div>
                <p className="mt-1 text-xs text-slate-500">Health is strong, move to close.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="font-medium text-slate-900">Book legal review for Nanonets</div>
                <p className="mt-1 text-xs text-slate-500">Contract details need alignment.</p>
              </div>
            </div>
          </SidebarCard>
        </aside>
      </section>
    </div>
  );
}
