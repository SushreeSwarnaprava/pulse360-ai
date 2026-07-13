"use client";

import { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
  ZAxis,
  Legend,
} from "recharts";

const regions = ["All", "Americas", "EMEA", "APAC"];
const csms = ["All", "Sushree", "Rohan Mehta", "Neha Joshi", "Priya Singh", "Arjun Rao", "Meera Iyer", "Anjali Kapoor"];
const industries = ["All", "Healthcare", "Retail", "SaaS", "Finance", "Manufacturing"];
const tiers = ["All", "Tier 1", "Tier 2", "Tier 3"];

const defaultDateRange = { from: "2026-06-01", to: "2026-08-31" };

const opportunityData = [
  { customer: "Amazon", product: "AI Analytics", arr: 85, probability: 88, closeDate: "2026-08-15", owner: "Sushree", health: 92, region: "Americas", industry: "Retail", tier: "Tier 1", adoption: 88, status: "Proposal Sent", month: "Aug" },
  { customer: "Curefit", product: "Customer Health Suite", arr: 42, probability: 72, closeDate: "2026-07-28", owner: "Rohan Mehta", health: 74, region: "APAC", industry: "Healthcare", tier: "Tier 2", adoption: 67, status: "Negotiation", month: "Jul" },
  { customer: "Nanonets", product: "Workflow Automation", arr: 25, probability: 45, closeDate: "2026-08-10", owner: "Neha Joshi", health: 48, region: "EMEA", industry: "SaaS", tier: "Tier 2", adoption: 52, status: "Qualified", month: "Aug" },
  { customer: "Luma Labs", product: "Renewal Insights", arr: 31, probability: 65, closeDate: "2026-07-06", owner: "Priya Singh", health: 81, region: "Americas", industry: "Healthcare", tier: "Tier 1", adoption: 76, status: "Identified", month: "Jul" },
  { customer: "Delta Health", product: "Retention AI", arr: 18, probability: 55, closeDate: "2026-08-03", owner: "Arjun Rao", health: 68, region: "EMEA", industry: "Healthcare", tier: "Tier 3", adoption: 61, status: "Won", month: "Aug" },
  { customer: "Verity", product: "Executive Dashboards", arr: 53, probability: 30, closeDate: "2026-07-18", owner: "Anjali Kapoor", health: 91, region: "APAC", industry: "Finance", tier: "Tier 1", adoption: 84, status: "Lost", month: "Jul" },
  { customer: "Nova AI", product: "Expansion Bundle", arr: 72, probability: 80, closeDate: "2026-07-21", owner: "Meera Iyer", health: 79, region: "Americas", industry: "SaaS", tier: "Tier 2", adoption: 69, status: "Identified", month: "Jul" },
  { customer: "PulseCare", product: "Customer Growth", arr: 27, probability: 62, closeDate: "2026-08-25", owner: "Sushree", health: 70, region: "EMEA", industry: "Healthcare", tier: "Tier 3", adoption: 58, status: "Proposal Sent", month: "Aug" },
];

const chartColors = ["#2563EB", "#0EA5E9", "#22C55E", "#F59E0B", "#EF4444", "#A855F7"];

function formatCurrency(value: number) {
  if (value >= 100) return `₹${(value / 100).toFixed(1)} Cr`;
  return `₹${value}L`;
}

function StatCard({ label, value, description }: { label: string; value: string; description: string }) {
  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">{label}</div>
      <div className="mt-4 text-3xl font-semibold text-slate-900">{value}</div>
      <p className="mt-2 text-sm text-slate-500">{description}</p>
    </div>
  );
}

function FilterSelect({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return (
    <label className="space-y-2 text-sm text-slate-700">
      <span>{label}</span>
      <select className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm" value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

export default function PortfolioAnalytics() {
  const [region, setRegion] = useState("All");
  const [csm, setCsm] = useState("All");
  const [industry, setIndustry] = useState("All");
  const [tier, setTier] = useState("All");
  const dateRange = defaultDateRange;

  const filteredOpportunities = useMemo(() => {
    return opportunityData.filter((item) => {
      const matchesRegion = region === "All" || item.region === region;
      const matchesCsm = csm === "All" || item.owner === csm;
      const matchesIndustry = industry === "All" || item.industry === industry;
      const matchesTier = tier === "All" || item.tier === tier;
      const date = new Date(item.closeDate);
      const from = new Date(dateRange.from);
      const to = new Date(dateRange.to);
      return matchesRegion && matchesCsm && matchesIndustry && matchesTier && date >= from && date <= to;
    });
  }, [region, csm, industry, tier, dateRange]);

  const pipelineValue = filteredOpportunities.reduce((sum, item) => sum + item.arr, 0);
  const expectedArr = Math.round(filteredOpportunities.reduce((sum, item) => sum + item.arr * (item.probability / 100), 0) * 10) / 10;
  const winRate = filteredOpportunities.length ? Math.round(filteredOpportunities.reduce((sum, item) => sum + item.probability, 0) / filteredOpportunities.length) : 0;
  const closingThisMonth = filteredOpportunities.filter((item) => item.month === new Date().toLocaleString("default", { month: "short" })).length;

  const healthDistribution = [
    { name: "Healthy", value: filteredOpportunities.filter((item) => item.health >= 80).length },
    { name: "At Risk", value: filteredOpportunities.filter((item) => item.health >= 60 && item.health < 80).length },
    { name: "Churn Risk", value: filteredOpportunities.filter((item) => item.health < 60).length },
  ];

  const arrBySegment = useMemo(() => {
    const groups: Record<string, number> = {};
    filteredOpportunities.forEach((item) => {
      groups[item.industry] = (groups[item.industry] ?? 0) + item.arr;
    });
    return Object.entries(groups).map(([name, value]) => ({ name, value }));
  }, [filteredOpportunities]);

  const renewalsByMonth = useMemo(() => {
    const groups: Record<string, number> = {};
    filteredOpportunities.forEach((item) => {
      groups[item.month] = (groups[item.month] ?? 0) + item.arr;
    });
    return ["Jun", "Jul", "Aug", "Sep"].map((month) => ({ month, value: groups[month] ?? 0 }));
  }, [filteredOpportunities]);

  const pipelineStages = useMemo(() => {
    const groups: Record<string, number> = {};
    filteredOpportunities.forEach((item) => {
      groups[item.status] = (groups[item.status] ?? 0) + item.arr;
    });
    return ["Identified", "Qualified", "Proposal Sent", "Negotiation", "Won", "Lost"].map((stage) => ({ stage, value: groups[stage] ?? 0 }));
  }, [filteredOpportunities]);

  const riskHeatmap = filteredOpportunities.map((item) => ({ name: item.customer, health: item.health, probability: item.probability, arr: item.arr }));

  const productAdoption = useMemo(() => {
    const groups: Record<string, number[]> = {};
    filteredOpportunities.forEach((item) => {
      groups[item.product] = [...(groups[item.product] ?? []), item.adoption];
    });
    return Object.entries(groups).map(([name, values]) => ({ name, value: Math.round(values.reduce((a, b) => a + b, 0) / values.length) }));
  }, [filteredOpportunities]);

  const tierDistribution = useMemo(() => {
    const groups: Record<string, number> = {};
    filteredOpportunities.forEach((item) => {
      groups[item.tier] = (groups[item.tier] ?? 0) + 1;
    });
    return Object.entries(groups).map(([name, value]) => ({ name, value }));
  }, [filteredOpportunities]);

  return (
    <div className="space-y-8 pb-12">
      <section className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">Portfolio Analytics</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-500">Explore portfolio health, ARR segmentation, adoption, risk, and renewal trends in one central analytics workspace.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <FilterSelect label="Region" value={region} options={regions} onChange={setRegion} />
            <FilterSelect label="CSM" value={csm} options={csms} onChange={setCsm} />
            <FilterSelect label="Industry" value={industry} options={industries} onChange={setIndustry} />
            <FilterSelect label="Customer Tier" value={tier} options={tiers} onChange={setTier} />
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-4">
          <StatCard label="Pipeline Value" value={formatCurrency(pipelineValue)} description="Total active opportunity value." />
          <StatCard label="Expected ARR" value={formatCurrency(expectedArr)} description="Weighted ARR based on probability." />
          <StatCard label="Win Rate" value={`${winRate}%`} description="Average probability across deals." />
          <StatCard label="Closing This Month" value={`${closingThisMonth}`} description="Opportunities expected to close this month." />
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-3 xl:grid-rows-[360px_260px]">
        <div className="xl:col-span-2 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Portfolio Health Distribution</h2>
              <p className="mt-1 text-sm text-slate-500">Segment health across active opportunities.</p>
            </div>
          </div>
          <div className="mt-8 h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={healthDistribution} innerRadius={68} outerRadius={110} dataKey="value" nameKey="name" paddingAngle={4}>
                  {healthDistribution.map((entry, index) => (
                    <Cell key={entry.name} fill={chartColors[index]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `${value} deals`} />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">ARR by Customer Segment</h2>
          <p className="mt-1 text-sm text-slate-500">ARR concentration by industry.</p>
          <div className="mt-6 h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={arrBySegment} margin={{ top: 0, right: 0, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="name" tick={{ fill: "#475569", fontSize: 12 }} />
                <YAxis tick={{ fill: "#475569", fontSize: 12 }} />
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
                <Bar dataKey="value" fill="#2563EB" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Renewals by Month</h2>
          <p className="mt-1 text-sm text-slate-500">Monthly renewal ARR cadence.</p>
          <div className="mt-6 h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={renewalsByMonth} margin={{ top: 0, right: 0, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradientArr" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="month" tick={{ fill: "#475569", fontSize: 12 }} />
                <YAxis tick={{ fill: "#475569", fontSize: 12 }} />
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
                <Area type="monotone" dataKey="value" stroke="#2563EB" fill="url(#gradientArr)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Expansion Pipeline</h2>
          <p className="mt-1 text-sm text-slate-500">Pipeline value by stage.</p>
          <div className="mt-6 h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pipelineStages} margin={{ top: 0, right: 0, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="stage" tick={{ fill: "#475569", fontSize: 12 }} />
                <YAxis tick={{ fill: "#475569", fontSize: 12 }} />
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
                <Bar dataKey="value" fill="#0EA5E9" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Risk Heatmap</h2>
          <p className="mt-1 text-sm text-slate-500">Deal risk by health and probability.</p>
          <div className="mt-6 h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 0, right: 0, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis type="number" dataKey="health" name="Health" tick={{ fill: "#475569", fontSize: 12 }} />
                <YAxis type="number" dataKey="probability" name="Probability" tick={{ fill: "#475569", fontSize: 12 }} />
                <ZAxis dataKey="arr" range={[60, 250]} />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} formatter={(value: number) => value.toString()} />
                <Scatter data={riskHeatmap} fill="#2563EB" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Product Adoption</h2>
          <p className="mt-1 text-sm text-slate-500">Adoption rates across solutions.</p>
          <div className="mt-6 h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={productAdoption} margin={{ top: 0, right: 0, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="name" tick={{ fill: "#475569", fontSize: 12 }} />
                <YAxis tick={{ fill: "#475569", fontSize: 12 }} />
                <Tooltip formatter={(value: number) => `${value}%`} />
                <Bar dataKey="value" fill="#22C55E" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Customer Tier Distribution</h2>
        <p className="mt-1 text-sm text-slate-500">Tier mix across the current portfolio.</p>
        <div className="mt-6 h-[360px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={tierDistribution} dataKey="value" nameKey="name" outerRadius={120} innerRadius={60} paddingAngle={4}>
                {tierDistribution.map((entry, index) => (
                  <Cell key={entry.name} fill={chartColors[index % chartColors.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `${value} accounts`} />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}
