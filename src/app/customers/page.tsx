"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { customers } from "../../data/customers";

type Customer = (typeof customers)[number];

function HealthDot({ value }: { value: number }) {
  const cls = value >= 80 ? "health-green" : value >= 60 ? "health-yellow" : "health-red";
  return <span className={`${cls} inline-block w-3 h-3 rounded-full mr-2`} />;
}

export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<keyof Customer | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const toCustomerUrl = (name: string) => encodeURIComponent(name.toLowerCase().replace(/\s+/g, "-"));

  const filteredCustomers = useMemo(() => {
    const q = search.trim().toLowerCase();

    // If no query, return all customers (preserve original order).
    let out = q
      ? customers.filter((c) => c.name.toLowerCase().includes(q) || c.owner.toLowerCase().includes(q))
      : [...customers];

    if (sortBy) {
      const key = sortBy as keyof Customer;
      out = out.slice().sort((a, b) => {
        const A = a[key];
        const B = b[key];
        if (typeof A === "number" && typeof B === "number") {
          return sortDir === "asc" ? A - B : B - A;
        }
        return sortDir === "asc"
          ? String(A).localeCompare(String(B))
          : String(B).localeCompare(String(A));
      });
    }

    return out;
  }, [search, sortBy, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filteredCustomers.length / pageSize));
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const pageItems = filteredCustomers.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="max-w-7xl mx-auto px-6">
      <section className="card table-card mt-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Customer Accounts</h3>
          <div className="flex items-center gap-3">
            <input
              placeholder="Filter by name or owner"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="search-input"
            />
            <select
              value={sortBy ?? ""}
              onChange={(e) => {
                const v = e.target.value;
                setSortBy(v === "" ? null : (v as keyof Customer));
              }}
              className="search-input"
            >
              <option value="">Sort</option>
              <option value="name">Name</option>
              <option value="health">Health</option>
              <option value="arr">ARR</option>
            </select>
            <button
              onClick={() => setSortDir((s) => (s === "asc" ? "desc" : "asc"))}
              className="btn-secondary"
            >
              {sortDir === "asc" ? "Asc" : "Desc"}
            </button>
          </div>
        </div>

        <div className="mt-4 overflow-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="py-3 text-left">Customer</th>
                <th className="py-3">Health</th>
                <th className="py-3">ARR</th>
                <th className="py-3">Renewal</th>
                <th className="py-3">Owner</th>
                <th className="py-3">Risk</th>
                <th className="py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.map((c, idx) => (
                <tr key={c.name} className={idx % 2 === 0 ? "" : "bg-[#FBFDFF] hover:bg-[#F1F5F9]"}>
                  <td className="py-4">
                    <Link href={`/customers/${toCustomerUrl(c.name)}`} className="text-slate-900 hover:text-blue-600">{c.name}</Link>
                  </td>
                  <td>
                    <div className="flex items-center">
                      <HealthDot value={c.health} />
                      <span style={{ color: "var(--text-primary)" }}>{c.health}</span>
                    </div>
                  </td>
                  <td>{c.arr}</td>
                  <td>{c.renewal}</td>
                  <td>{c.owner}</td>
                  <td>{c.risk}</td>
                  <td>Active</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-slate-500">Showing {pageItems.length} of {filteredCustomers.length} customers</div>
          <div className="flex items-center gap-2">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} className="btn-secondary">Prev</button>
            <div className="px-3">{page} / {totalPages}</div>
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} className="btn-secondary">Next</button>
          </div>
        </div>
      </section>
    </div>
  );
}
