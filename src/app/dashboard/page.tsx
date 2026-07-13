"use client";

import React from "react";
import { customers } from "../../data/customers";
import DashboardCard from "../../components/DashboardCard";

function SimpleLineChart({ points = [] }: { points: number[] }) {
  const width = 500;
  const height = 140;
  const max = Math.max(...points, 100);
  const step = points.length > 1 ? width / (points.length - 1) : width;
  const path = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${i * step},${height - (p / max) * height}`)
    .join(" ");

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id="g2" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#EEF2FF" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={path} fill="none" stroke="#2563EB" strokeWidth={2} />
      <path d={`${path} L ${width},${height} L 0,${height} Z`} fill="url(#g2)" opacity={0.6} />
    </svg>
  );
}

export default function DashboardPage() {
  const dashboardCards = [
    { title: "Customers", value: String(customers.length), trend: "↑ 3% vs last month", icon: "👥" },
    { title: "ARR", value: "₹4.8 Cr", trend: "↑ 8% vs last month", icon: "💰" },
    { title: "Renewals", value: "18", trend: "↓ 2% vs last month", icon: "📆" },
    { title: "Portfolio Health", value: "92%", trend: "↑ 1.2%", icon: "❤️" },
  ];

  const healthSeries = [80, 82, 84, 88, 90, 92, 92, 91, 92, 92, 93, 92];

  return (
    <div className="max-w-7xl mx-auto px-6">
      <section className="card mt-6" style={{ background: "linear-gradient(90deg,#EEF2FF 0%, #FFFFFF 100%)" }}>
        <div className="flex items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Good Evening, Sushree 👋</h2>
            <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>
              Executive overview for your portfolio.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="btn-secondary">View Renewals</button>
            <button className="btn-primary">AI Insights</button>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-4 gap-6 mt-6">
        {dashboardCards.map((c) => (
          <DashboardCard key={c.title} title={c.title} value={c.value} trend={c.trend} icon={c.icon} />
        ))}
      </section>

      <section className="grid grid-cols-12 gap-6 mt-6">
        <div className="col-span-12 lg:col-span-8 card">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Portfolio Health Trend</h3>
            <div className="text-sm text-slate-500">Last 12 months</div>
          </div>
          <div className="mt-4">
            <SimpleLineChart points={healthSeries} />
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 card">
          <h3 className="text-lg font-semibold">Upcoming Renewals</h3>
          <ul className="mt-4 space-y-3">
            {customers.slice(0, 6).map((c) => (
              <li key={c.name} className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-slate-900">{c.name}</div>
                  <div className="text-xs text-slate-500">Renewal: {c.renewal}</div>
                </div>
                <div className="text-sm" style={{ color: "var(--text-secondary)" }}>{c.owner}</div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="card mt-6">
        <h3 className="text-lg font-semibold">Recent Alerts</h3>
        <ul className="mt-4 space-y-3 text-sm text-slate-600">
          <li>Support ticket escalated for Amazon</li>
          <li>QBR overdue for Nanonets</li>
        </ul>
      </section>
    </div>
  );
}
