"use client";

import { useMemo, useState } from "react";

type TaskPriority = "High" | "Medium" | "Low";
type TaskStatus = "Not Started" | "In Progress" | "Blocked" | "Completed";

type Task = {
  id: string;
  customer: string;
  priority: TaskPriority;
  dueDate: string;
  status: TaskStatus;
  owner: string;
  description: string;
};

const initialTasks: Task[] = [
  { id: "1", customer: "Amazon", priority: "High", dueDate: "2026-07-14", status: "In Progress", owner: "Sushree", description: "Review the Q3 customer success roadmap." },
  { id: "2", customer: "Curefit", priority: "High", dueDate: "2026-07-16", status: "Not Started", owner: "Rohan Mehta", description: "Prepare renewal health package." },
  { id: "3", customer: "Nanonets", priority: "Medium", dueDate: "2026-07-10", status: "Blocked", owner: "Neha Joshi", description: "Resolve billing integration issue." },
  { id: "4", customer: "Luma Labs", priority: "Low", dueDate: "2026-07-20", status: "Not Started", owner: "Priya Singh", description: "Collect onboarding feedback." },
  { id: "5", customer: "Delta Health", priority: "High", dueDate: "2026-07-12", status: "Completed", owner: "Arjun Rao", description: "Finalize executive review notes." },
  { id: "6", customer: "Verity", priority: "Medium", dueDate: "2026-07-18", status: "In Progress", owner: "Meera Iyer", description: "Update adoption playbook." },
  { id: "7", customer: "Nova AI", priority: "Low", dueDate: "2026-07-14", status: "In Progress", owner: "Anjali Kapoor", description: "Confirm action items from the success workshop." },
  { id: "8", customer: "PulseCare", priority: "High", dueDate: "2026-07-08", status: "Not Started", owner: "Sushree", description: "Follow up on overdue support ticket." },
];

const priorities = ["All", "High", "Medium", "Low"] as const;
const statuses = ["All", "Not Started", "In Progress", "Blocked", "Completed"] as const;
const owners = ["All", "Sushree", "Rohan Mehta", "Neha Joshi", "Priya Singh", "Arjun Rao", "Meera Iyer", "Anjali Kapoor"] as const;
const viewModes = ["List", "Calendar", "Kanban"] as const;

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(new Date(iso));
}

function badgeClass(status: TaskStatus) {
  switch (status) {
    case "Completed":
      return "bg-emerald-100 text-emerald-700";
    case "Blocked":
      return "bg-rose-100 text-rose-700";
    case "In Progress":
      return "bg-sky-100 text-sky-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

function priorityClass(priority: TaskPriority) {
  switch (priority) {
    case "High":
      return "text-rose-600";
    case "Medium":
      return "text-amber-600";
    default:
      return "text-slate-600";
  }
}

function todayKey(date: string) {
  return new Date(date).toISOString().slice(0, 10);
}

export default function TasksPage() {
  const [tasks, setTasks] = useState(initialTasks);
  const [view, setView] = useState<(typeof viewModes)[number]>("List");
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<TaskStatus | "All">("All");
  const [filterPriority, setFilterPriority] = useState<TaskPriority | "All">("All");
  const [filterOwner, setFilterOwner] = useState("All");
  const [newTask, setNewTask] = useState({ customer: "", owner: "Sushree", priority: "Medium", dueDate: "2026-07-21", status: "Not Started", description: "" });

  const normalizedToday = new Date().toISOString().slice(0, 10);
  const todayValue = new Date(normalizedToday).getTime();

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const query = search.trim().toLowerCase();
      const matchesSearch =
        !query ||
        [task.customer, task.owner, task.priority, task.status, task.description]
          .some((field) => field.toLowerCase().includes(query));
      const matchesStatus = filterStatus === "All" || task.status === filterStatus;
      const matchesPriority = filterPriority === "All" || task.priority === filterPriority;
      const matchesOwner = filterOwner === "All" || task.owner === filterOwner;
      return matchesSearch && matchesStatus && matchesPriority && matchesOwner;
    });
  }, [tasks, search, filterStatus, filterPriority, filterOwner]);

  const groups = useMemo(() => {
    const today: Task[] = [];
    const upcoming: Task[] = [];
    const overdue: Task[] = [];
    const completed: Task[] = [];

    filteredTasks.forEach((task) => {
      const dueTime = new Date(task.dueDate).getTime();
      if (task.status === "Completed") {
        completed.push(task);
      } else if (dueTime < todayValue) {
        overdue.push(task);
      } else if (dueTime === todayValue) {
        today.push(task);
      } else {
        upcoming.push(task);
      }
    });

    return { today, upcoming, overdue, completed };
  }, [filteredTasks, todayValue]);

  const calendarDays = useMemo(() => {
    const currentMonth = new Date(normalizedToday).getMonth();
    const currentYear = new Date(normalizedToday).getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    return Array.from({ length: daysInMonth }, (_, index) => {
      const date = new Date(currentYear, currentMonth, index + 1);
      const dayKey = date.toISOString().slice(0, 10);
      return {
        label: date.toLocaleDateString("en-US", { weekday: "short", day: "numeric" }),
        date: dayKey,
        tasks: filteredTasks.filter((task) => todayKey(task.dueDate) === dayKey),
      };
    });
  }, [filteredTasks, normalizedToday]);

  const addTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newTask.customer.trim() || !newTask.dueDate.trim()) return;

    const nextTask: Task = {
      id: String(Date.now()),
      customer: newTask.customer.trim(),
      owner: newTask.owner as string,
      priority: newTask.priority as TaskPriority,
      dueDate: newTask.dueDate,
      status: newTask.status as TaskStatus,
      description: newTask.description.trim() || "Quick follow-up request.",
    };

    setTasks((current) => [nextTask, ...current]);
    setNewTask({ customer: "", owner: "Sushree", priority: "Medium", dueDate: normalizedToday, status: "Not Started", description: "" });
  };

  return (
    <div className="mx-auto max-w-7xl px-6 pb-12">
      <section className="mt-6 rounded-[28px] border border-slate-200 bg-white p-8 shadow-xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">Tasks</h1>
            <p className="mt-2 text-sm text-slate-500">Manage daily work, triage overdue action items, and switch between calendar, list, and Kanban lanes.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {viewModes.map((mode) => (
              <button
                key={mode}
                onClick={() => setView(mode)}
                className={`rounded-full px-5 py-3 text-sm font-medium transition ${view === mode ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
              >
                {mode} View
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
              <div className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">Today’s Tasks</div>
              <div className="mt-4 text-3xl font-semibold text-slate-900">{groups.today.length}</div>
            </div>
            <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
              <div className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">Upcoming</div>
              <div className="mt-4 text-3xl font-semibold text-slate-900">{groups.upcoming.length}</div>
            </div>
            <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
              <div className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">Overdue</div>
              <div className="mt-4 text-3xl font-semibold text-slate-900">{groups.overdue.length}</div>
            </div>
            <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
              <div className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">Completed</div>
              <div className="mt-4 text-3xl font-semibold text-slate-900">{groups.completed.length}</div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            <label className="space-y-2 text-sm text-slate-700">
              <span>Search</span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tasks"
                className="search-input w-full text-sm"
              />
            </label>
            <label className="space-y-2 text-sm text-slate-700">
              <span>Status</span>
              <select className="search-input w-full text-sm" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value as TaskStatus | "All")}
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </label>
            <label className="space-y-2 text-sm text-slate-700">
              <span>Priority</span>
              <select className="search-input w-full text-sm" value={filterPriority} onChange={(e) => setFilterPriority(e.target.value as TaskPriority | "All")}
              >
                {priorities.map((priority) => (
                  <option key={priority} value={priority}>{priority}</option>
                ))}
              </select>
            </label>
            <label className="space-y-2 text-sm text-slate-700">
              <span>Owner</span>
              <select className="search-input w-full text-sm" value={filterOwner} onChange={(e) => setFilterOwner(e.target.value)}>
                {owners.map((owner) => (
                  <option key={owner} value={owner}>{owner}</option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </section>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.8fr_0.9fr]">
        <div className="space-y-6">
          {view === "List" && (
            <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">Task List</h2>
                  <p className="mt-1 text-sm text-slate-500">All tasks grouped by search and filter state.</p>
                </div>
                <div className="text-sm text-slate-500">{filteredTasks.length} tasks</div>
              </div>

              <div className="mt-6 overflow-x-auto">
                <table className="table-card w-full min-w-[900px] text-left text-sm">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-slate-500">Customer</th>
                      <th className="px-4 py-3 text-slate-500">Priority</th>
                      <th className="px-4 py-3 text-slate-500">Due Date</th>
                      <th className="px-4 py-3 text-slate-500">Status</th>
                      <th className="px-4 py-3 text-slate-500">Owner</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTasks.map((task) => (
                      <tr key={task.id} className="hover:bg-slate-50">
                        <td className="px-4 py-4 font-medium text-slate-900">{task.customer}</td>
                        <td className={`px-4 py-4 ${priorityClass(task.priority)} font-semibold`}>{task.priority}</td>
                        <td className="px-4 py-4 text-slate-600">{formatDate(task.dueDate)}</td>
                        <td className="px-4 py-4">
                          <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${badgeClass(task.status)}`}>{task.status}</span>
                        </td>
                        <td className="px-4 py-4 text-slate-700">{task.owner}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {view === "Calendar" && (
            <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Calendar View</h2>
                <p className="mt-1 text-sm text-slate-500">Tasks are shown by due date across the current month.</p>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {calendarDays.slice(0, 8).map((day) => (
                  <div key={day.date} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center justify-between text-sm text-slate-700">
                      <span>{day.label}</span>
                      <span className="rounded-full bg-white px-2 py-1 text-xs font-semibold text-slate-700">{day.tasks.length}</span>
                    </div>
                    <div className="mt-4 space-y-2">
                      {day.tasks.slice(0, 2).map((task) => (
                        <div key={task.id} className="rounded-2xl bg-white p-3 shadow-sm">
                          <div className="text-sm font-medium text-slate-900">{task.customer}</div>
                          <div className="mt-1 text-xs text-slate-500">{task.status}</div>
                        </div>
                      ))}
                      {day.tasks.length === 0 && <div className="text-sm text-slate-500">No tasks</div>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {view === "Kanban" && (
            <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Kanban View</h2>
                <p className="mt-1 text-sm text-slate-500">Drag-and-drop style lanes for task categories.</p>
              </div>

              <div className="mt-6 overflow-x-auto pb-2">
                <div className="min-w-[1200px] flex gap-4">
                  {[
                    { title: "Today’s Tasks", items: groups.today },
                    { title: "Upcoming", items: groups.upcoming },
                    { title: "Overdue", items: groups.overdue },
                    { title: "Completed", items: groups.completed },
                  ].map((column) => (
                    <div key={column.title} className="min-w-[280px] rounded-[28px] border border-slate-200 bg-slate-50 p-4">
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div>
                          <div className="text-sm font-semibold text-slate-900">{column.title}</div>
                          <div className="text-xs text-slate-500">{column.items.length} tasks</div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        {column.items.map((task) => (
                          <div key={task.id} className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                            <div className="flex items-center justify-between gap-3">
                              <div className="font-semibold text-slate-900">{task.customer}</div>
                              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeClass(task.status)}`}>{task.status}</span>
                            </div>
                            <div className="mt-3 flex items-center justify-between text-sm text-slate-500">
                              <span>{formatDate(task.dueDate)}</span>
                              <span className={priorityClass(task.priority)}>{task.priority}</span>
                            </div>
                            <div className="mt-3 text-sm text-slate-600">{task.owner}</div>
                          </div>
                        ))}
                        {column.items.length === 0 && <div className="text-sm text-slate-500">No tasks in this lane</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>

        <aside className="space-y-6">
          <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Quick Add Task</h2>
                <p className="mt-1 text-sm text-slate-500">Create a task fast and keep the team aligned.</p>
              </div>
            </div>

            <form className="mt-6 space-y-4" onSubmit={addTask}>
              <label className="block text-sm text-slate-700">
                Customer
                <input
                  value={newTask.customer}
                  onChange={(e) => setNewTask({ ...newTask, customer: e.target.value })}
                  placeholder="Customer name"
                  className="search-input mt-2 w-full text-sm"
                />
              </label>
              <label className="block text-sm text-slate-700">
                Owner
                <select
                  value={newTask.owner}
                  onChange={(e) => setNewTask({ ...newTask, owner: e.target.value })}
                  className="search-input mt-2 w-full text-sm"
                >
                  {owners.filter((owner) => owner !== "All").map((owner) => (
                    <option key={owner} value={owner}>{owner}</option>
                  ))}
                </select>
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm text-slate-700">
                  Priority
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as TaskPriority })}
                    className="search-input mt-2 w-full text-sm"
                  >
                    {priorities.filter((priority) => priority !== "All").map((priority) => (
                      <option key={priority} value={priority}>{priority}</option>
                    ))}
                  </select>
                </label>
                <label className="block text-sm text-slate-700">
                  Due Date
                  <input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    className="search-input mt-2 w-full text-sm"
                  />
                </label>
              </div>
              <label className="block text-sm text-slate-700">
                Status
                <select
                  value={newTask.status}
                  onChange={(e) => setNewTask({ ...newTask, status: e.target.value as TaskStatus })}
                  className="search-input mt-2 w-full text-sm"
                >
                  {statuses.filter((status) => status !== "All").map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </label>
              <label className="block text-sm text-slate-700">
                Notes
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  placeholder="Add a short task note"
                  className="search-input mt-2 w-full min-h-[90px] resize-none text-sm"
                />
              </label>
              <button type="submit" className="btn-primary w-full rounded-full py-3 text-sm font-semibold">Add Task</button>
            </form>
          </section>

          <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Task Sections</h2>
            <p className="mt-1 text-sm text-slate-500">Keep an eye on the key workstreams in one view.</p>
            <div className="mt-6 space-y-4">
              {[
                { title: "Today’s Tasks", tasks: groups.today },
                { title: "Upcoming", tasks: groups.upcoming },
                { title: "Overdue", tasks: groups.overdue },
                { title: "Completed", tasks: groups.completed },
              ].map((section) => (
                <div key={section.title} className="rounded-3xl bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{section.title}</p>
                      <p className="text-xs text-slate-500">{section.tasks.length} task{section.tasks.length === 1 ? "" : "s"}</p>
                    </div>
                    <div className="rounded-full bg-white px-3 py-1 text-xs text-slate-600">Quick view</div>
                  </div>
                  {section.tasks.slice(0, 2).map((task) => (
                    <div key={task.id} className="mt-4 rounded-2xl border border-slate-200 bg-white p-3">
                      <div className="flex items-center justify-between gap-3 text-sm text-slate-700">
                        <span>{task.customer}</span>
                        <span className="font-semibold text-slate-900">{formatDate(task.dueDate)}</span>
                      </div>
                      <div className="mt-2 flex items-center justify-between gap-3 text-xs text-slate-500">
                        <span>{task.owner}</span>
                        <span className={priorityClass(task.priority)}>{task.priority}</span>
                      </div>
                    </div>
                  ))}
                  {section.tasks.length === 0 && <div className="mt-4 text-sm text-slate-500">No tasks here yet.</div>}
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
