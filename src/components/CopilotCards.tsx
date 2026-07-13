import React from "react";

interface CopilotActionCardProps {
  icon: string;
  title: string;
  description: string;
}

interface CopilotHistoryCardProps {
  icon: string;
  title: string;
  time: string;
  description: string;
}

interface PromptChipProps {
  label: string;
}

export function CopilotActionCard({ icon, title, description }: CopilotActionCardProps) {
  return (
    <div className="rounded-[20px] border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-xl">
      <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-2xl text-blue-600">
        {icon}
      </div>
      <h3 className="mt-4 text-base font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-500">{description}</p>
    </div>
  );
}

export function CopilotHistoryCard({ icon, title, time, description }: CopilotHistoryCardProps) {
  return (
    <div className="rounded-[20px] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-lg">{icon}</div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900">{title}</h4>
            <p className="text-xs text-slate-500">{time}</p>
          </div>
        </div>
        <button className="btn-secondary rounded-full px-4 py-2 text-sm">Open</button>
      </div>
      <p className="mt-4 text-sm text-slate-600">{description}</p>
    </div>
  );
}

export function PromptChip({ label }: PromptChipProps) {
  return (
    <button className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700">
      {label}
    </button>
  );
}
