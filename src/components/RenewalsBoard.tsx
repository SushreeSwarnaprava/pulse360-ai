import React from "react";

type RenewalStage = {
  customer: string;
  arr: string;
  renewal: string;
  owner: string;
  health: number;
  risk: "Low" | "Medium" | "High" | "Critical";
  priority: "High" | "Medium" | "Low";
  stage: string;
};

interface RenewalCardProps {
  item: RenewalStage;
}

interface ColumnProps {
  title: string;
  count: number;
  children: React.ReactNode;
}

interface SidebarCardProps {
  title: string;
  children: React.ReactNode;
  subtitle?: string;
}

export function RenewalStageCard({ item }: RenewalCardProps) {
  const riskColor = item.risk === "Low" ? "bg-emerald-100 text-emerald-700" : item.risk === "Medium" ? "bg-amber-100 text-amber-700" : item.risk === "High" ? "bg-orange-100 text-orange-700" : "bg-rose-100 text-rose-700";
  const priorityColor = item.priority === "High" ? "bg-rose-500 text-white" : item.priority === "Medium" ? "bg-amber-500 text-white" : "bg-slate-200 text-slate-700";

  return (
    <article className="group mb-4 overflow-hidden rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">{item.customer}</h3>
          <p className="mt-1 text-xs text-slate-500">Renewal {item.renewal}</p>
        </div>
        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${priorityColor}`}>{item.priority}</span>
      </div>

      <div className="mt-4 grid gap-2 text-sm text-slate-600">
        <div className="flex items-center justify-between">
          <span>ARR</span>
          <span className="font-semibold text-slate-900">{item.arr}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Owner</span>
          <span className="font-semibold text-slate-900">{item.owner}</span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 text-sm">
        <div className="rounded-2xl bg-slate-100 px-3 py-2 text-slate-800">Health {item.health}%</div>
        <div className={`rounded-2xl px-3 py-2 text-xs font-semibold ${riskColor}`}>{item.risk}</div>
      </div>

      <div className="mt-4 text-xs text-slate-500">Drag to update stage (mock interaction supported)</div>
    </article>
  );
}

export function RenewalColumn({ title, count, children }: ColumnProps) {
  return (
    <section className="min-w-[300px] rounded-[28px] border border-slate-200 bg-slate-50 p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
          <p className="mt-1 text-xs text-slate-500">{count} items</p>
        </div>
      </div>
      <div className="mt-4 space-y-3" data-dropzone>{children}</div>
    </section>
  );
}

export function SidebarCard({ title, subtitle, children }: SidebarCardProps) {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-slate-900">{title}</h3>
          {subtitle ? <p className="mt-2 text-sm text-slate-500">{subtitle}</p> : null}
        </div>
      </div>
      <div className="mt-5 space-y-4">{children}</div>
    </div>
  );
}

export const renewalPipeline: RenewalStage[] = [
  { customer: "Amazon", arr: "₹85L", renewal: "15 Aug", owner: "Sushree", health: 92, risk: "Low", priority: "High", stage: "Upcoming" },
  { customer: "Curefit", arr: "₹42L", renewal: "28 Jul", owner: "Rohan Mehta", health: 74, risk: "Medium", priority: "Medium", stage: "Negotiation" },
  { customer: "Nanonets", arr: "₹25L", renewal: "10 Aug", owner: "Neha Joshi", health: 48, risk: "High", priority: "High", stage: "Legal Review" },
  { customer: "Delta Health", arr: "₹31L", renewal: "12 Jul", owner: "Priya Singh", health: 88, risk: "Low", priority: "Low", stage: "Ready to Close" },
  { customer: "Luma Labs", arr: "₹18L", renewal: "06 Jul", owner: "Arjun Rao", health: 64, risk: "Medium", priority: "Medium", stage: "At Risk" },
  { customer: "Nova AI", arr: "₹72L", renewal: "03 Aug", owner: "Meera Iyer", health: 79, risk: "High", priority: "High", stage: "Renewed" },
  { customer: "PulseCare", arr: "₹27L", renewal: "21 Jul", owner: "Karan Patel", health: 67, risk: "Medium", priority: "Medium", stage: "Negotiation" },
  { customer: "Verity", arr: "₹53L", renewal: "18 Jul", owner: "Anjali Kapoor", health: 91, risk: "Low", priority: "High", stage: "Ready to Close" },
];
