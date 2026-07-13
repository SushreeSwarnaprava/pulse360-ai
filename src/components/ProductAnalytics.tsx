"use client";

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, LineChart, Line, Cell } from "recharts";

type DayPoint = { day: string; value: number };

const sampleDau: DayPoint[] = Array.from({ length: 30 }).map((_, i) => ({ day: `${i + 1}`, value: 500 + ((i * 13) % 400) }));
const sampleWau: DayPoint[] = Array.from({ length: 12 }).map((_, i) => ({ day: `W${i + 1}`, value: 2000 + ((i * 37) % 800) }));
const sampleMau: DayPoint[] = Array.from({ length: 12 }).map((_, i) => ({ day: `M${i + 1}`, value: 8000 + ((i * 199) % 2000) }));
const sampleApiCalls: DayPoint[] = Array.from({ length: 12 }).map((_, i) => ({ day: `M${i + 1}`, value: 100000 + ((i * 4700) % 50000) }));

export default function ProductAnalytics() {
  const dau = sampleDau;
  const wau = sampleWau;
  const mau = sampleMau;
  const apiCalls = sampleApiCalls;

  const features = [
    { name: "Search", adoption: 85 },
    { name: "AI Insights", adoption: 64 },
    { name: "Dashboards", adoption: 72 },
    { name: "Integrations", adoption: 58 },
  ];

  const licenseUsed = 68; // percent

  const colors = ["#60a5fa", "#7c3aed", "#34d399", "#f59e0b"];

  return (
    <div className="card">
      <h3 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>Product Analytics</h3>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl bg-white p-4" style={{ border: "1px solid var(--card-border)" }}>
          <div className="text-xs" style={{ color: "var(--text-secondary)" }}>Daily Active Users</div>
          <div className="mt-2 flex items-center justify-between">
            <div className="text-2xl font-semibold" style={{ color: "var(--text-primary)" }}>{dau[dau.length - 1].value}</div>
            <div className="w-24 h-10">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dau}>
                  <Area dataKey="value" stroke="#6366f1" fill="#eef2ff" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white p-4" style={{ border: "1px solid var(--card-border)" }}>
          <div className="text-xs" style={{ color: "var(--text-secondary)" }}>Weekly Active Users</div>
          <div className="mt-2 flex items-center justify-between">
            <div className="text-2xl font-semibold" style={{ color: "var(--text-primary)" }}>{wau[wau.length - 1].value}</div>
            <div className="w-24 h-10">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={wau}>
                  <Line dataKey="value" stroke="#10b981" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white p-4" style={{ border: "1px solid var(--card-border)" }}>
          <div className="text-xs" style={{ color: "var(--text-secondary)" }}>Monthly Active Users</div>
          <div className="mt-2 flex items-center justify-between">
            <div className="text-2xl font-semibold" style={{ color: "var(--text-primary)" }}>{mau[mau.length - 1].value}</div>
            <div className="w-24 h-10">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mau}>
                  <Area dataKey="value" stroke="#f43f5e" fill="#fff1f2" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white p-4" style={{ border: "1px solid var(--card-border)" }}>
          <div className="text-xs" style={{ color: "var(--text-secondary)" }}>Session Duration</div>
          <div className="mt-2">
            <div className="text-2xl font-semibold" style={{ color: "var(--text-primary)" }}>6m 24s</div>
            <div className="mt-1 text-xs text-slate-500">Avg per session</div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="col-span-2 rounded-xl bg-white p-4" style={{ border: "1px solid var(--card-border)" }}>
          <div className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>DAU (last 30 days)</div>
          <div className="mt-2 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dau}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip formatter={(v: unknown) => String(v)} />
                <Area type="monotone" dataKey="value" stroke="#6366f1" fill="#eef2ff" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl bg-white p-4" style={{ border: "1px solid var(--card-border)" }}>
          <div className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>Feature Adoption</div>
          <div className="mt-2 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={features} layout="vertical">
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={80} />
                <Tooltip formatter={(v: unknown) => `${String(v)}%`} />
                <Bar dataKey="adoption">
                  {features.map((f, i) => (
                    <Cell key={f.name} fill={colors[i % colors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="col-span-1 rounded-xl bg-white p-4 lg:col-span-3" style={{ border: "1px solid var(--card-border)" }}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-lg bg-white p-3" style={{ border: "1px solid var(--card-border)" }}>
              <div className="text-xs" style={{ color: "var(--text-secondary)" }}>API Calls (monthly)</div>
              <div className="mt-2 text-lg font-semibold" style={{ color: "var(--text-primary)" }}>{apiCalls[apiCalls.length - 1].value.toLocaleString()}</div>
            </div>

            <div className="rounded-lg bg-white p-3" style={{ border: "1px solid var(--card-border)" }}>
              <div className="text-xs" style={{ color: "var(--text-secondary)" }}>License Utilization</div>
              <div className="mt-2 flex items-center gap-3">
                <div className="text-2xl font-semibold" style={{ color: "var(--text-primary)" }}>{licenseUsed}%</div>
                <div className="w-full rounded-full bg-[#F1F5F9]">
                  <div className="h-2 rounded-full" style={{ background: "#2563EB", width: `${licenseUsed}%` }} />
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-white p-3" style={{ border: "1px solid var(--card-border)" }}>
              <div className="text-xs" style={{ color: "var(--text-secondary)" }}>Feature Adoption (avg)</div>
              <div className="mt-2 text-lg font-semibold" style={{ color: "var(--text-primary)" }}>{Math.round(features.reduce((s, f) => s + f.adoption, 0) / features.length)}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
