"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type NotificationCommand = {
  id: string;
  name: string;
  detail: string;
  category: string;
  type: "link" | "toggle-theme";
  href?: string;
};

const commandTemplates: NotificationCommand[] = [
  {
    id: "open-dashboard",
    name: "Open Dashboard",
    detail: "Go to your main customer success workspace.",
    category: "Navigation",
    type: "link",
    href: "/dashboard",
  },
  {
    id: "open-customers",
    name: "Open Customers",
    detail: "Browse customer accounts and health signals.",
    category: "Navigation",
    type: "link",
    href: "/customers",
  },
  {
    id: "open-amazon",
    name: "Open Amazon",
    detail: "Jump directly to the Amazon customer profile.",
    category: "Navigation",
    type: "link",
    href: "/customers/Amazon",
  },
  {
    id: "open-renewals",
    name: "Open Renewals",
    detail: "View renewal activity and pipeline stages.",
    category: "Navigation",
    type: "link",
    href: "/renewals",
  },
  {
    id: "generate-ai-summary",
    name: "Generate AI Summary",
    detail: "Open the AI copilot workspace for summaries.",
    category: "Actions",
    type: "link",
    href: "/copilot",
  },
  {
    id: "create-task",
    name: "Create Task",
    detail: "Open the task manager to create a new task.",
    category: "Actions",
    type: "link",
    href: "/tasks",
  },
  {
    id: "create-opportunity",
    name: "Create Opportunity",
    detail: "Open the opportunity workspace.",
    category: "Actions",
    type: "link",
    href: "/opportunities",
  },
  {
    id: "search-customer",
    name: "Search Customer",
    detail: "Search accounts from the customer directory.",
    category: "Actions",
    type: "link",
    href: "/customers",
  },
  {
    id: "dark-mode",
    name: "Dark Mode",
    detail: "Toggle dark mode for the workspace.",
    category: "Theme",
    type: "toggle-theme",
  },
];

function getCommandGroups(commands: NotificationCommand[]) {
  return commands.reduce<Record<string, NotificationCommand[]>>((groups, command) => {
    if (!groups[command.category]) groups[command.category] = [];
    groups[command.category].push(command);
    return groups;
  }, {});
}

export default function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem("theme") === "dark";
  });
  const inputRef = useRef<HTMLInputElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
    }
  }, [darkMode]);

  const filteredCommands = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return commandTemplates;
    return commandTemplates.filter((command) => {
      return (
        command.name.toLowerCase().includes(normalized) ||
        command.detail.toLowerCase().includes(normalized) ||
        command.category.toLowerCase().includes(normalized)
      );
    });
  }, [query]);

  const commandGroups = useMemo(() => getCommandGroups(filteredCommands), [filteredCommands]);

  const closePalette = useCallback(() => {
    setOpen(false);
    setQuery("");
    setSelectedIndex(0);
  }, []);

  const executeCommand = useCallback(
    (command: NotificationCommand) => {
      closePalette();
      if (command.type === "toggle-theme") {
        setDarkMode((current) => {
          const nextDarkMode = !current;
          window.localStorage.setItem("theme", nextDarkMode ? "dark" : "light");
          return nextDarkMode;
        });
        return;
      }

      if (command.href) {
        router.push(command.href);
      }
    },
    [closePalette, router]
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const isPaletteKey = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k";
      if (isPaletteKey) {
        event.preventDefault();
        setOpen((current) => {
          const next = !current;
          if (next) {
            window.requestAnimationFrame(() => inputRef.current?.focus());
          } else {
            setQuery("");
            setSelectedIndex(0);
          }
          return next;
        });
        return;
      }

      if (!open) return;

      if (event.key === "Escape") {
        event.preventDefault();
        closePalette();
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setSelectedIndex((current) => Math.min(current + 1, filteredCommands.length - 1));
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setSelectedIndex((current) => Math.max(current - 1, 0));
      }

      if (event.key === "Enter") {
        event.preventDefault();
        const command = filteredCommands[selectedIndex];
        if (command) executeCommand(command);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closePalette, executeCommand, filteredCommands, open, selectedIndex]);

  useEffect(() => {
    function onClickOutside(event: MouseEvent) {
      if (!panelRef.current) return;
      if (!panelRef.current.contains(event.target as Node)) {
        closePalette();
      }
    }

    if (open) {
      document.addEventListener("mousedown", onClickOutside);
    }
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [closePalette, open]);

  const onQueryChange = (value: string) => {
    setQuery(value);
    setSelectedIndex(0);
  };

  return (
    <div className="relative w-full max-w-3xl">
      <button
        onClick={() => {
          setOpen(true);
          window.requestAnimationFrame(() => inputRef.current?.focus());
        }}
        className="flex w-full items-center gap-3 rounded-full border border-slate-200 bg-white/90 px-4 py-3 text-left text-sm text-slate-500 shadow-sm shadow-slate-200 transition hover:border-slate-300 hover:text-slate-900"
      >
        <span className="text-slate-400">Ctrl + K</span>
        <span className="text-slate-900">Search or run a command</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-24">
          <div className="absolute inset-0 bg-slate-950/30 backdrop-blur-sm" />
          <div ref={panelRef} className="relative z-10 w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
            <div className="p-4">
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => onQueryChange(event.target.value)}
                placeholder="Search commands..."
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              />
            </div>
            <div className="max-h-[560px] overflow-y-auto border-t border-slate-200">
              {filteredCommands.length === 0 ? (
                <div className="p-8 text-center text-sm text-slate-500">No commands match your search.</div>
              ) : (
                Object.keys(commandGroups).map((category) => (
                  <div key={category} className="border-b border-slate-200 last:border-b-0">
                    <div className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">{category}</div>
                    <div className="space-y-1 px-2 pb-4">
                      {commandGroups[category].map((command) => {
                        const globalIndex = filteredCommands.findIndex((cmd) => cmd.id === command.id);
                        const isSelected = selectedIndex === globalIndex;

                        return (
                          <button
                            key={command.id}
                            onClick={() => executeCommand(command)}
                            className={`flex w-full items-start justify-between gap-4 rounded-3xl px-4 py-3 text-left transition ${
                              isSelected ? "bg-slate-900 text-white" : "bg-white text-slate-900 hover:bg-slate-50"
                            }`}
                            onMouseEnter={() => setSelectedIndex(globalIndex)}
                          >
                            <div>
                              <div className="text-sm font-semibold">{command.name}</div>
                              <div className={`mt-1 text-sm ${isSelected ? "text-slate-300" : "text-slate-500"}`}>{command.detail}</div>
                            </div>
                            <div className="text-xs uppercase tracking-[0.24em] text-slate-500">{command.category}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
