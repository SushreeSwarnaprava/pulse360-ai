import { OpportunityCard, OpportunityColumn, StatCard, opportunitiesPipeline } from "../../components/OpportunitiesBoard";

const stats = [
  { title: "Pipeline Value", value: "₹3.9 Cr", subtitle: "Total value across all active opportunities." },
  { title: "Expected ARR", value: "₹2.5 Cr", subtitle: "ARR expected from weighted opportunities." },
  { title: "Win Rate", value: "64%", subtitle: "Average deal win probability." },
  { title: "Opportunities Closing This Month", value: "7", subtitle: "Deals expected to close in the next 30 days." },
];

const stages = ["Identified", "Qualified", "Proposal Sent", "Negotiation", "Won", "Lost"] as const;

export default function OpportunitiesPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 pb-12">
      <section className="mt-6 rounded-[28px] border border-slate-200 bg-white p-8 shadow-xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">Opportunities</h1>
            <p className="mt-2 text-sm text-slate-500">Display opportunities in CRM pipeline format and track every expansion deal.</p>
          </div>
          <button className="btn-primary rounded-full px-5 py-3">+ New Opportunity</button>
        </div>
      </section>

      <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </section>

      <section className="mt-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">CRM Pipeline</h2>
            <p className="mt-1 text-sm text-slate-500">Move opportunities through stages with a clear pipeline view.</p>
          </div>
          <div className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">{opportunitiesPipeline.length} active opportunities</div>
        </div>

        <div className="mt-6 overflow-x-auto pb-4">
          <div className="min-w-[1300px] flex gap-4">
            {stages.map((stage) => {
              const items = opportunitiesPipeline.filter((opportunity) => opportunity.stage === stage);
              return (
                <OpportunityColumn key={stage} title={stage} count={items.length}>
                  {items.map((opportunity) => (
                    <OpportunityCard key={`${opportunity.customer}-${opportunity.product}`} opportunity={opportunity} />
                  ))}
                </OpportunityColumn>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
