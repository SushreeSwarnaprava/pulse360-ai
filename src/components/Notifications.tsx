"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type NotificationType = "renewals" | "ai" | "tasks" | "support" | "expansion";
type NotificationPriority = "Critical" | "High" | "Medium" | "Low";

type Notification = {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  href: string;
  type: NotificationType;
  priority: NotificationPriority;
};

const typeOptions = ["All", "Renewals", "AI Alerts", "Tasks", "Support", "Expansion"] as const;
const typeMap: Record<NotificationType, string> = {
  renewals: "Renewals",
  ai: "AI Alerts",
  tasks: "Tasks",
  support: "Support",
  expansion: "Expansion",
};

const seed: Notification[] = [
  {
    id: "1",
    title: "Renewal engagement due",
    description: "Amazon renewal check-in due in 2 days.",
    time: "2h",
    href: "/customers/Amazon",
    type: "renewals",
    priority: "High",
    read: false,
  },
  {
    id: "2",
    title: "AI alert: usage drop detected",
    description: "PulseCare adoption dipped 18% this week.",
    time: "30m",
    href: "/customers/PulseCare",
    type: "ai",
    priority: "Critical",
    read: false,
  },
  {
    id: "3",
    title: "New task assigned",
    description: "Review product adoption plan for Nanonets.",
    time: "1h",
    href: "/tasks",
    type: "tasks",
    priority: "Medium",
    read: false,
  },
  {
    id: "4",
    title: "Support ticket update",
    description: "Curefit ticket #5321 requires a follow-up.",
    time: "3h",
    href: "/customers/Curefit",
    type: "support",
    priority: "High",
    read: false,
  },
  {
    id: "5",
    title: "Expansion motion recommended",
    description: "Verity has a strong cross-sell signal.",
    time: "5h",
    href: "/customers/Verity",
    type: "expansion",
    priority: "Medium",
    read: true,
  },
  {
    id: "6",
    title: "AI alert: renewal risk rising",
    description: "Delta Health health score dropped below 70%.",
    time: "8h",
    href: "/customers/Delta Health",
    type: "ai",
    priority: "High",
    read: true,
  },
];

function priorityStyles(priority: NotificationPriority) {
  switch (priority) {
    case "Critical":
      return "bg-rose-100 text-rose-700";
    case "High":
      return "bg-amber-100 text-amber-800";
    case "Medium":
      return "bg-sky-100 text-sky-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

export default function Notifications() {
  const [items, setItems] = useState<Notification[]>(() => seed);
  const [open, setOpen] = useState(false);
  const [filterType, setFilterType] = useState<(typeof typeOptions)[number]>("All");
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const unread = items.filter((item) => !item.read).length;

  const markAllRead = () => setItems((current) => current.map((item) => ({ ...item, read: true })));
  const markRead = (id: string) => setItems((current) => current.map((item) => (item.id === id ? { ...item, read: true } : item)));

  const filteredItems = items.filter((item) => filterType === "All" || typeMap[item.type] === filterType);

  return (
    <div className="relative" ref={ref}>
      <button
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label="Open notifications"
        onClick={() => setOpen((o) => !o)}
        className="relative inline-flex items-center rounded-md border border-white/20 bg-white/10 px-3 py-1 text-sm text-white transition hover:bg-white/20 focus:outline-none"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5" />
        </svg>
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-600 text-[10px] font-semibold text-white">{unread}</span>
        )}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex">
          <button
            aria-label="Close notification center"
            className="absolute inset-0 bg-slate-950/40"
            onClick={() => setOpen(false)}
          />

          <aside className="relative ml-auto flex h-full w-full max-w-[440px] flex-col overflow-hidden bg-white shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-5">
              <div>
                <p className="text-sm font-semibold text-slate-900">Notification Center</p>
                <p className="mt-1 text-xs text-slate-500">Filter by category or priority, then review unread alerts.</p>
              </div>
              <button className="text-sm text-slate-500 hover:text-slate-900" onClick={() => setOpen(false)}>
                Close
              </button>
            </div>

            <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-6 py-4 bg-slate-50">
              <div className="flex items-center gap-2 rounded-full bg-white px-3 py-2 text-sm text-slate-600 shadow-sm">
                <span className="text-slate-900 font-semibold">{unread}</span>
                unread
              </div>
              <button onClick={markAllRead} className="text-sm font-medium text-slate-700 hover:text-slate-900">
                Mark all read
              </button>
            </div>

            <div className="flex flex-wrap gap-2 border-b border-slate-200 px-6 py-4">
              {typeOptions.map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`rounded-full px-4 py-2 text-sm ${filterType === type ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {filteredItems.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-sm text-slate-500">
                  No notifications match this filter.
                </div>
              ) : (
                <ul className="space-y-3">
                  {filteredItems.map((item) => (
                    <li
                      key={item.id}
                      className={`rounded-[24px] border p-4 ${item.read ? "border-slate-200 bg-white" : "border-slate-300 bg-slate-50"}`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className={`inline-flex h-2.5 w-2.5 rounded-full ${priorityStyles(item.priority)}`} />
                            <span className="text-sm font-semibold text-slate-900">{item.title}</span>
                          </div>
                          <p className="text-sm text-slate-500">{item.description}</p>
                        </div>
                        <span className="text-xs text-slate-400">{item.time}</span>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
                        <div className="flex flex-wrap gap-2">
                          <span className="rounded-full bg-slate-100 px-3 py-1">{typeMap[item.type]}</span>
                          <span className={`rounded-full px-3 py-1 text-slate-700 ${priorityStyles(item.priority)}`}>{item.priority}</span>
                        </div>
                        <Link
                          href={item.href}
                          onClick={() => markRead(item.id)}
                          className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white hover:bg-slate-700"
                        >
                          View
                        </Link>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="border-t border-slate-200 px-6 py-4 text-xs text-slate-500">
              Showing {filteredItems.length} of {items.length} notifications
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
