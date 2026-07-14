"use client";

import React from "react";
import { usePathname } from "next/navigation";
import SearchBar from "../SearchBar";
import CommandPalette from "../CommandPalette";
import Notifications from "../Notifications";
import Sidebar from "../Sidebar";
import SidebarToggle from "../SidebarToggle";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/") {
    return <div className="min-h-full">{children}</div>;
  }

  return (
    <div className="min-h-full flex flex-col">
      <header style={{ background: "#0F172A" }} className="shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-3">
            <SidebarToggle />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 flex items-center justify-center rounded-md bg-[#2563EB] text-white">P</div>
              <h1 className="text-lg font-semibold text-white">Pulse360 AI</h1>
            </div>
            <div className="hidden md:block text-sm text-white">AI Customer Success Workspace</div>
          </div>

          <div className="flex flex-1 items-center justify-center px-4">
            <SearchBar />
          </div>

          <div className="flex items-center gap-3 text-white">
            <CommandPalette />
            <Notifications />
            <div className="rounded-full bg-white/10 px-2 py-1 text-sm">Sushree</div>
          </div>
        </div>
      </header>

      <Sidebar />

      <main className="flex-1 md:pl-[260px] py-8">{children}</main>
    </div>
  );
}
