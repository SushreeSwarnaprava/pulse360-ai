"use client";

import { useMemo, useState } from "react";

type Contact = {
  name: string;
  designation: string;
  department: string;
  email: string;
  phone: string;
  score: number;
  primary: boolean;
};

export default function ContactsTable({ contacts }: { contacts: Contact[] }) {
  const [query, setQuery] = useState("");
  const [sortKey] = useState<keyof Contact | null>(null);
  const [sortDir] = useState<"asc" | "desc">("asc");

  const [rows, setRows] = useState<Contact[]>(contacts);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editRow, setEditRow] = useState<Contact | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = rows.filter((c) => {
      if (!q) return true;
      return (
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.department.toLowerCase().includes(q) ||
        c.designation.toLowerCase().includes(q)
      );
    });

    if (sortKey) {
      list = list.slice().sort((a, b) => {
        const va = a[sortKey];
        const vb = b[sortKey];
        if (typeof va === "number" && typeof vb === "number") {
          return sortDir === "asc" ? va - vb : vb - va;
        }
        const sa = String(va ?? "").toLowerCase();
        const sb = String(vb ?? "").toLowerCase();
        if (sa < sb) return sortDir === "asc" ? -1 : 1;
        if (sa > sb) return sortDir === "asc" ? 1 : -1;
        return 0;
      });
    }

    return list;
  }, [rows, query, sortKey, sortDir]);

  function startEdit(idx: number) {
    setEditingIndex(idx);
    setEditRow({ ...rows[idx] });
  }

  function cancelEdit() {
    setEditingIndex(null);
    setEditRow(null);
  }

  function saveEdit(idx: number) {
    if (!editRow) return;
    const next = rows.slice();
    next[idx] = editRow;
    setRows(next);
    setEditingIndex(null);
    setEditRow(null);
  }

  function updateEdit<K extends keyof Contact>(key: K, value: Contact[K]) {
    if (!editRow) return;
    setEditRow({ ...editRow, [key]: value });
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search contacts..."
          className="w-full max-w-md rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-slate-400"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto text-left text-sm">
          <thead>
            <tr className="text-xs text-slate-500">
              <th className="px-3 py-2">Name</th>
              <th className="px-3 py-2">Designation</th>
              <th className="px-3 py-2">Department</th>
              <th className="px-3 py-2">Email</th>
              <th className="px-3 py-2">Phone</th>
              <th className="px-3 py-2">Relationship Score</th>
              <th className="px-3 py-2">Primary Contact</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="px-3 py-6 text-center text-sm text-slate-500">
                  No contacts found.
                </td>
              </tr>
            )}

            {filtered.map((c, idx) => {
              const editing = editingIndex === idx;
              return (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-3">
                      <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 font-semibold">{c.name.split(" ").map(s=>s[0]).slice(0,2).join("")}</div>
                      <div>
                        {editing ? (
                          <input className="w-48 rounded border border-slate-200 px-2 py-1 text-sm" value={editRow?.name ?? ""} onChange={(e) => updateEdit("name", e.target.value)} />
                        ) : (
                          <>
                            <div className="text-sm font-medium text-slate-900">{c.name}</div>
                            <div className="text-xs text-slate-500">{c.email}</div>
                          </>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="px-3 py-3">{editing ? <input className="w-36 rounded border border-slate-200 px-2 py-1 text-sm" value={editRow?.designation ?? ""} onChange={(e)=>updateEdit("designation", e.target.value)} /> : c.designation}</td>
                  <td className="px-3 py-3">{editing ? <input className="w-28 rounded border border-slate-200 px-2 py-1 text-sm" value={editRow?.department ?? ""} onChange={(e)=>updateEdit("department", e.target.value)} /> : c.department}</td>
                  <td className="px-3 py-3">{editing ? <input className="w-44 rounded border border-slate-200 px-2 py-1 text-sm" value={editRow?.email ?? ""} onChange={(e)=>updateEdit("email", e.target.value)} /> : c.email}</td>
                  <td className="px-3 py-3">{editing ? <input className="w-28 rounded border border-slate-200 px-2 py-1 text-sm" value={editRow?.phone ?? ""} onChange={(e)=>updateEdit("phone", e.target.value)} /> : c.phone}</td>

                  <td className="px-3 py-3">
                    {editing ? (
                      <div className="flex items-center gap-2">
                        <input type="range" min={0} max={100} value={editRow?.score ?? 0} onChange={(e)=>updateEdit("score", Number(e.target.value))} />
                        <div className="text-xs text-slate-600">{editRow?.score}%</div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <div className="w-24 rounded-full bg-slate-100">
                          <div className="h-2 rounded-full bg-emerald-500" style={{ width: `${c.score}%` }} />
                        </div>
                        <div className="text-xs text-slate-600">{c.score}%</div>
                      </div>
                    )}
                  </td>

                  <td className="px-3 py-3">{editing ? <label className="inline-flex items-center gap-2"><input type="checkbox" checked={!!editRow?.primary} onChange={(e)=>updateEdit("primary", e.target.checked)} /> <span className="text-xs">Primary</span></label> : (c.primary ? <span className="inline-flex rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">Primary</span> : <span className="inline-flex rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">Secondary</span>)}</td>

                  <td className="px-3 py-3">
                    {editing ? (
                      <div className="flex gap-2">
                        <button onClick={()=>saveEdit(idx)} className="rounded bg-emerald-600 px-3 py-1 text-xs font-medium text-white">Save</button>
                        <button onClick={cancelEdit} className="rounded border border-slate-200 px-3 py-1 text-xs">Cancel</button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <button onClick={()=>startEdit(idx)} className="rounded border border-slate-200 px-3 py-1 text-xs">Edit</button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
