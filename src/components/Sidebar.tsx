"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type NavItem = { id: string; title: string; href: string; icon: React.ReactNode };

const NAV: NavItem[] = [
  { id: "dashboard", title: "Dashboard", href: "/", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 13h8V3H3v10zM13 21h8v-8h-8v8zM13 3v8h8V3h-8zM3 21h8v-6H3v6z" stroke="#2563EB" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  { id: "customers", title: "Customers", href: "/customers", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M16 11c1.657 0 3-1.567 3-3.5S17.657 4 16 4s-3 1.567-3 3.5S14.343 11 16 11zM8 11c1.657 0 3-1.567 3-3.5S9.657 4 8 4 5 5.567 5 7.5 6.343 11 8 11zM8 13c-2.33 0-7 1.17-7 3.5V20h14v-3.5C15 14.17 10.33 13 8 13zM16 13c-.29 0-.62.02-.99.06A4.978 4.978 0 0 1 16 17v3h6v-3.5c0-2.33-4.67-3.5-6-3.5z" stroke="#2563EB" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  { id: "portfolio", title: "Portfolio", href: "/portfolio", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 3h18v18H3V3z" stroke="#2563EB" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  { id: "renewals", title: "Renewals", href: "/renewals", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M21 8V7a2 2 0 0 0-2-2h-1" stroke="#2563EB" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 12a9 9 0 1 0 9-9" stroke="#2563EB" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  { id: "opportunities", title: "Opportunities", href: "/opportunities", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2v20M2 12h20" stroke="#2563EB" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  { id: "tasks", title: "Tasks", href: "/tasks", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 11l3 3L22 4" stroke="#2563EB" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 12v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h11" stroke="#2563EB" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  { id: "ai", title: "AI Copilot", href: "/copilot", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="#2563EB" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  { id: "reports", title: "Reports", href: "/reports", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 3h18v18H3V3z" stroke="#2563EB" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 12h10M7 7h10M7 17h10" stroke="#2563EB" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  { id: "settings", title: "Settings", href: "/settings", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 15.5A3.5 3.5 0 1 0 12 8.5a3.5 3.5 0 0 0 0 7z" stroke="#2563EB" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83l-.67.67a2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2h-1.34A2 2 0 0 1 7 21v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0L.3 19.18a2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 .69 14.5 1.65 1.65 0 0 0 .36 12.68V11.4c0-.58.23-1.14.64-1.55L1.7 8.18a2 2 0 0 1 2.83 0l.06.06c.47.47 1.1.72 1.73.72h.09c.63 0 1.26-.25 1.73-.72l.06-.06a2 2 0 0 1 2.83 0l.67.67a2 2 0 0 1 0 2.83l-.06.06c-.47.47-.72 1.1-.72 1.73v.09c0 .63.25 1.26.72 1.73z" stroke="#2563EB" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg> }
];

export default function Sidebar() {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen((o) => !o);
    window.addEventListener("toggle-sidebar", handler as EventListener);
    return () => window.removeEventListener("toggle-sidebar", handler as EventListener);
  }, []);

  const nav = (
    <nav aria-label="Primary" className="flex h-full flex-col justify-between">
      <div>
        <div className="px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center rounded-md bg-[#2563EB] text-white">P</div>
            <div>
              <div className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Pulse360 AI</div>
              <div className="text-xs" style={{ color: "var(--text-secondary)" }}>AI Customer Success Workspace</div>
            </div>
          </div>
        </div>

        <div className="mt-4 px-3">
          {NAV.map((n) => {
            const active = pathname === n.href || pathname.startsWith(n.href + "/");
            return (
              <Link
                key={n.id}
                href={n.href}
                className={`flex items-center gap-3 w-full rounded-lg px-3 py-2 my-1 text-sm transition-colors ${active ? "bg-[#EFF6FF] text-[#2563EB]" : "text-slate-700 hover:bg-gray-50"}`}
              >
                <div className="w-5 h-5">{n.icon}</div>
                <div>{n.title}</div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="px-4 py-6">
        <div className="flex items-center gap-3 rounded-md px-2 py-2 hover:bg-gray-50">
          <div className="w-10 h-10 rounded-full bg-[#EFF6FF] flex items-center justify-center text-[#2563EB]">S</div>
          <div>
            <div className="font-medium text-sm">Sushree</div>
            <div className="text-xs" style={{ color: "var(--text-secondary)" }}>Senior Customer Success Manager</div>
          </div>
        </div>

        <div className="mt-3 space-y-2">
          <Link href="/settings" className="block text-sm text-slate-700 hover:text-blue-600">Settings</Link>
          <Link href="/logout" className="block text-sm text-slate-700 hover:text-blue-600">Logout</Link>
        </div>
      </div>
    </nav>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:flex-col" style={{ width: 260, position: "fixed", left: 0, top: 64, bottom: 0, borderRight: "1px solid var(--card-border)", background: "white", paddingTop: 12 }}>
        {nav}
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white" style={{ borderRight: "1px solid var(--card-border)" }}>
            {nav}
          </div>
        </div>
      )}
    </>
  );
}
