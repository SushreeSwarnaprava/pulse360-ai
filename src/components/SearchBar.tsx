"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { customers } from "../data/customers";

function highlight(text: string, query: string) {
  if (!query) return [text];
  const q = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${q})`, "gi"));
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <span key={i} className="rounded bg-yellow-200 px-0.5 dark:bg-yellow-600/70">
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if ((e.ctrlKey || e.metaKey) && key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setOpen(true);
      }
      if (key === "escape") {
        setOpen(false);
        inputRef.current?.blur();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return customers.filter((c) => {
      return [c.name, c.owner, String(c.arr), String(c.health), String(c.risk)]
        .map((v) => (v ?? "").toLowerCase())
        .some((v) => v.includes(q));
    });
  }, [query]);

  return (
    <div className="relative w-full max-w-lg">
      <label className="sr-only">Search customers</label>
      <div className="flex items-center gap-2">
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          placeholder="Search customers, owner, ARR, health, risk... (Ctrl/Cmd+K)"
          aria-label="Search customers"
          className="search-input w-full text-sm"
        />
      </div>

      {open && (
        <div className="absolute z-50 mt-2 w-full rounded-md border bg-white p-2 shadow-lg">
          {results.length === 0 ? (
            <div className="px-3 py-2 text-sm text-slate-500">No results</div>
          ) : (
            <ul role="listbox" className="max-h-64 overflow-auto">
              {results.map((c) => (
                <li key={c.name} className="group">
                  <Link
                    href={`/customers/${encodeURIComponent(c.name)}`}
                    onClick={() => setOpen(false)}
                    className="flex w-full items-center justify-between gap-3 px-3 py-2 hover:bg-gray-50"
                    role="option"
                  >
                    <div>
                      <div className="text-sm font-medium text-slate-900">
                        {highlight(c.name, query)}
                      </div>
                      <div className="text-xs text-slate-500">
                        Owner: {highlight(c.owner, query)} • ARR: {highlight(c.arr, query)} • Health: {highlight(String(c.health), query)} • Risk: {highlight(String(c.risk), query)}
                      </div>
                    </div>
                    <div className="text-xs text-slate-400 group-hover:text-slate-600">View</div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
