"use client";

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

type Point = { month: string; arr: number };

export default function ARRTrend({ data }: { data?: Point[] }) {
  const defaultData: Point[] = [
    { month: "Aug", arr: 1200000 },
    { month: "Sep", arr: 1250000 },
    { month: "Oct", arr: 1280000 },
    { month: "Nov", arr: 1300000 },
    { month: "Dec", arr: 1320000 },
    { month: "Jan", arr: 1350000 },
    { month: "Feb", arr: 1380000 },
    { month: "Mar", arr: 1420000 },
    { month: "Apr", arr: 1500000 },
    { month: "May", arr: 1550000 },
    { month: "Jun", arr: 1600000 },
    { month: "Jul", arr: 1680000 },
  ];

  const points = data ?? defaultData;

  const first = points[0].arr;
  const last = points[points.length - 1].arr;
  const growth = (((last - first) / first) * 100).toFixed(1);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-medium text-slate-700">ARR Trend (12 months)</h4>
          <div className="mt-1 text-lg font-semibold text-slate-900">₹{(last/10000).toFixed(0)}L <span className="ml-2 text-sm text-slate-500">Growth {growth}%</span></div>
        </div>
      </div>

      <div className="mt-4 h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={points} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} />
            <Tooltip formatter={(value: number | string) => `₹${Number(value).toLocaleString()}`} />
            <Line type="monotone" dataKey="arr" stroke="#6366f1" strokeWidth={3} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
