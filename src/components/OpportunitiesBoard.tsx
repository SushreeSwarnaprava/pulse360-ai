import React from "react";

type OpportunityStage = {
  customer: string;
  product: string;
  arr: string;
  probability: string;
  closeDate: string;
  owner: string;
  health: number;
  stage: string;
};

interface OpportunityCardProps {
  opportunity: OpportunityStage;
}

interface OpportunityColumnProps {
  title: string;
  count: number;
  children: React.ReactNode;
}

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
}

const probabilityColor = (value: string) => {
  const num = Number(value.replace("%", ""));
  if (num >= 80) return "bg-emerald-100 text-emerald-700";
  if (num >= 60) return "bg-amber-100 text-amber-700";
  return "bg-rose-100 text-rose-700";
};

const healthColor = (value: number) => {
  if (value >= 80) return "bg-emerald-100 text-emerald-700";
  if (value >= 60) return "bg-amber-100 text-amber-700";
  return "bg-rose-100 text-rose-700";
};

export function OpportunityCard({ opportunity }: OpportunityCardProps) {
  return (
    <article className="rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">{opportunity.customer}</h3>
          <p className="mt-1 text-xs text-slate-500">{opportunity.product}</p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${probabilityColor(opportunity.probability)}`}>{opportunity.probability}</span>
      </div>

      <div className="mt-4 grid gap-3 text-sm text-slate-600">
        <div className="flex items-center justify-between">
          <span>Potential ARR</span>
          <span className="font-semibold text-slate-900">{opportunity.arr}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Expected Close</span>
          <span className="font-semibold text-slate-900">{opportunity.closeDate}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Owner</span>
          <span className="font-semibold text-slate-900">{opportunity.owner}</span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 text-sm">
        <span className={`rounded-2xl px-3 py-2 ${healthColor(opportunity.health)}`}>Health {opportunity.health}%</span>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">Priority</span>
      </div>
    </article>
  );
}

export function OpportunityColumn({ title, count, children }: OpportunityColumnProps) {
  return (
    <section className="min-w-[300px] rounded-[28px] border border-slate-200 bg-slate-50 p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
          <p className="mt-1 text-xs text-slate-500">{count} deals</p>
        </div>
      </div>
      <div className="mt-4 space-y-3" data-dropzone>{children}</div>
    </section>
  );
}

export function StatCard({ title, value, subtitle }: StatCardProps) {
  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">{title}</div>
      <div className="mt-4 text-3xl font-semibold text-slate-900">{value}</div>
      <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
    </div>
  );
}

export const opportunitiesPipeline: OpportunityStage[] = [
  { customer: "Amazon", product: "AI Analytics", arr: "₹85L", probability: "88%", closeDate: "15 Aug", owner: "Sushree", health: 92, stage: "Proposal Sent" },
  { customer: "Curefit", product: "Customer Health Suite", arr: "₹42L", probability: "72%", closeDate: "28 Jul", owner: "Rohan Mehta", health: 74, stage: "Negotiation" },
  { customer: "Nanonets", product: "Workflow Automation", arr: "₹25L", probability: "45%", closeDate: "10 Aug", owner: "Neha Joshi", health: 48, stage: "Qualified" },
  { customer: "Luma Labs", product: "Renewal Insights", arr: "₹31L", probability: "65%", closeDate: "06 Jul", owner: "Priya Singh", health: 81, stage: "Identified" },
  { customer: "Delta Health", product: "Retention AI", arr: "₹18L", probability: "55%", closeDate: "03 Aug", owner: "Arjun Rao", health: 68, stage: "Won" },
  { customer: "Verity", product: "Executive Dashboards", arr: "₹53L", probability: "30%", closeDate: "18 Jul", owner: "Anjali Kapoor", health: 91, stage: "Lost" },
  { customer: "Nova AI", product: "Expansion Bundle", arr: "₹72L", probability: "80%", closeDate: "21 Jul", owner: "Meera Iyer", health: 79, stage: "Identified" },
];
