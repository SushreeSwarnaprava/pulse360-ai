// Presentational component to render stakeholder cards.
// Accepts a `stakeholders` prop with array of { name, role, responsibility }.
export type Stakeholder = {
  name: string;
  role: string;
  responsibility: string;
};

export default function Stakeholders({ stakeholders }: { stakeholders: Stakeholder[] }) {
  // Helper to create initials from a name (used for avatar)
  const initials = (name: string) =>
    name
      .split(" ")
      .map((p) => p[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

  return (
    <section className="mt-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Key Stakeholders</h3>

        <div className="mt-4 grid gap-4 sm:grid-cols-1 md:grid-cols-3">
          {stakeholders.map((s) => (
            <div key={s.name} className="flex items-center gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white font-semibold">
                {initials(s.name)}
              </div>

              <div className="flex-1">
                <div className="text-sm font-semibold text-slate-900">{s.name}</div>
                <div className="text-sm text-slate-500">{s.role}</div>
              </div>

              <div className="ml-auto">
                <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">{s.responsibility}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
