import Link from "next/link";
import { customers } from "../../../data/customers";
import ProductMetrics from "../../../components/ProductMetrics";
import Stakeholders from "../../../components/Stakeholders";
import ContactsTable from "../../../components/ContactsTable";
import ARRTrend from "../../../components/ARRTrend";
import ProductAnalytics from "../../../components/ProductAnalytics";

type Stakeholder = {
  name?: string;
  role?: string;
  title?: string;
  designation?: string;
  department?: string;
  email?: string;
  phone?: string;
  score?: number;
  primary?: boolean;
};

// Infer the customer item type from the customers array.
// This gives us strong typing without creating a separate type file.
type Customer = (typeof customers)[number];

interface CustomerPageProps {
  params: Promise<{ id: string }>;
}

export default async function CustomerDetailsPage({ params }: CustomerPageProps) {
  const { id } = await params;

  // Normalize the URL id and customer names in the same way so that
  // /customers/amazon and /customers/Amazon both work.
  const normalize = (value: string) => value.toLowerCase().replace(/\s+/g, "-");
  const normalizedId = normalize(id);

  const customer = customers.find((customerItem: Customer) => {
    const matched = normalize(customerItem.name) === normalizedId;
    return matched;
  });

  // Prepare product usage metrics (kept static for now). We extract these
  // into a small array and pass them to the reusable `ProductMetrics`
  // component so the UI remains consistent and easy to reuse.
  const metrics = [
    { label: "Daily Active Users", value: "143", trend: "↑ 12% this month", trendColor: "text-green-600" },
    { label: "Weekly Logins", value: "2,483", trend: "↑ 3% this month", trendColor: "text-green-600" },
    { label: "API Calls", value: "3.2M", trend: "↑ 8% this month", trendColor: "text-green-600" },
    { label: "Feature Adoption", value: "85%", trend: "↑ 2% this month", trendColor: "text-green-600" },
    { label: "Storage Used", value: "68%", trend: "↓ 1% this month", trendColor: "text-red-600" },
  ];

  // Show a friendly message when the customer does not exist.
  if (!customer) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-10">
        <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-lg">
          <h1 className="text-2xl font-semibold text-slate-900">Customer not found.</h1>
          <p className="mt-4 text-slate-600">
            The customer ID in the URL does not match any known customer.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Back to dashboard
          </Link>
        </div>
      </main>
    );
  }

  // Build a contacts array for the ContactsTable. We augment stakeholder data
  // with reasonable defaults for email/phone/score/primary.
  const contacts = (customer.stakeholders ?? []).map((s: Stakeholder, i) => {
    const name = String(s.name || "");
    const role = String(s.role || s.title || s.designation || "");
    const department = String(s.department || (s.role ? String(s.role).split(" ")[1] || "" : ""));

    return {
      name,
      designation: role,
      department,
      email: s.email || `${name.toLowerCase().replace(/\s+/g, ".")}@example.com`,
      phone: s.phone || "+91 99999 0000",
      score: s.score ?? (80 - i * 5),
      primary: !!(s.primary || i === 0),
    };
  });

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-5xl rounded-3xl bg-white p-8 shadow-lg">
        <header className="mb-8 border-b border-slate-200 pb-6">
          <h1 className="text-3xl font-semibold text-slate-900">{customer.name}</h1>
          <p className="mt-2 text-sm text-slate-500">
            Details for the selected customer account.
          </p>
        </header>

        {/* AI Account Summary: premium-looking card with subtle gradient background.
            This section provides a concise, AI-generated overview and recommended actions.
        */}
        <section className="mt-6">
          <div className="rounded-3xl bg-gradient-to-r from-indigo-50 via-white to-amber-50 p-6 shadow-xl ring-1 ring-slate-100">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="md:flex-1">
                <h3 className="flex items-center gap-3 text-xl font-semibold text-slate-900">✨ AI Account Summary</h3>
                <p className="mt-3 text-sm text-slate-700">
                  Amazon remains a healthy enterprise customer with a Health Score of 92%. Product adoption is strong at 85%, executive engagement is consistent, and no critical support escalations are open. Renewal is due on 15 Aug, and the recommended next step is conducting a Quarterly Business Review to identify expansion opportunities.
                </p>
              </div>

              {/* Strengths & Recommendations shown compactly on the right for larger screens */}
              <div className="mt-4 flex w-full flex-col gap-4 md:mt-0 md:w-80">
                <div className="rounded-lg bg-white/60 p-3 backdrop-blur-sm">
                  <div className="text-xs font-medium text-slate-600">Strengths</div>
                  <ul className="mt-2 space-y-1 text-sm text-slate-700">
                    <li>• High adoption</li>
                    <li>• Strong executive engagement</li>
                    <li>• Low support risk</li>
                  </ul>
                </div>

                <div className="rounded-lg bg-white/60 p-3 backdrop-blur-sm">
                  <div className="text-xs font-medium text-slate-600">Recommendations</div>
                  <ul className="mt-2 space-y-1 text-sm text-slate-700">
                    <li>• Conduct QBR</li>
                    <li>• Introduce AI Analytics module</li>
                    <li>• Confirm renewal stakeholders</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Executive Snapshot: concise executive-facing summary with icons and badges */}
        <section className="mt-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Executive Snapshot</h3>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex items-center gap-4 rounded-lg border border-slate-100 bg-slate-50 p-4">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-700">💚</div>
                <div>
                  <div className="text-xs text-slate-500">Account Health</div>
                  <div className="text-sm font-semibold text-slate-900">92% <span className="ml-2 inline-flex rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">Healthy</span></div>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-lg border border-slate-100 bg-slate-50 p-4">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-700">🔁</div>
                <div>
                  <div className="text-xs text-slate-500">Renewal Probability</div>
                  <div className="text-sm font-semibold text-slate-900">88% <span className="ml-2 inline-flex rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">Likely</span></div>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-lg border border-slate-100 bg-slate-50 p-4">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-700">📈</div>
                <div>
                  <div className="text-xs text-slate-500">Expansion Opportunity</div>
                  <div className="text-sm font-semibold text-slate-900">₹34L <span className="ml-2 inline-flex rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-700">Projected</span></div>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-lg border border-slate-100 bg-slate-50 p-4">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700">👤</div>
                <div>
                  <div className="text-xs text-slate-500">Executive Sponsor</div>
                  <div className="text-sm font-semibold text-slate-900">Sarah Lee <span className="ml-2 inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">VP Eng</span></div>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-lg border border-slate-100 bg-slate-50 p-4">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 text-teal-700">📅</div>
                <div>
                  <div className="text-xs text-slate-500">Last Executive Meeting</div>
                  <div className="text-sm font-semibold text-slate-900">5 Jul 2026</div>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-lg border border-slate-100 bg-slate-50 p-4">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 text-rose-700">🏷️</div>
                <div>
                  <div className="text-xs text-slate-500">Customer Tier</div>
                  <div className="text-sm font-semibold text-slate-900">Enterprise <span className="ml-2 inline-flex rounded-full bg-rose-100 px-2 py-0.5 text-xs font-medium text-rose-700">Tier 1</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Top KPI cards section for a modern SaaS dashboard feel. */}
        <section className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <h2 className="text-sm font-medium text-slate-500">Health Score</h2>
            <p className="mt-3 text-3xl font-semibold text-slate-900">{customer.health}%</p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <h2 className="text-sm font-medium text-slate-500">ARR</h2>
            <p className="mt-3 text-3xl font-semibold text-slate-900">{customer.arr}</p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <h2 className="text-sm font-medium text-slate-500">Adoption</h2>
            <p className="mt-3 text-3xl font-semibold text-slate-900">{customer.adoption}</p>
          </div>
        </section>

        {/* Secondary detail cards for owner, risk, renewal, meetings, and actions. */}
        <section className="mt-6 grid gap-4 lg:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <h2 className="text-sm font-medium text-slate-500">Owner</h2>
            <p className="mt-3 text-xl font-semibold text-slate-900">{customer.owner}</p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <h2 className="text-sm font-medium text-slate-500">Risk</h2>
            <p className="mt-3 text-xl font-semibold text-slate-900">{customer.risk}</p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <h2 className="text-sm font-medium text-slate-500">Renewal Date</h2>
            <p className="mt-3 text-xl font-semibold text-slate-900">{customer.renewal}</p>
          </div>
        </section>

        <section className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <h2 className="text-sm font-medium text-slate-500">Last Meeting</h2>
            <p className="mt-3 text-xl font-semibold text-slate-900">{customer.lastMeeting}</p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <h2 className="text-sm font-medium text-slate-500">Next Action</h2>
            <p className="mt-3 text-xl font-semibold text-slate-900">{customer.nextAction}</p>
          </div>
        </section>

        {/* Recent Activity: vertical timeline with subtle styling */}
        <section className="mt-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Recent Activity</h3>

            {/* Use a vertical list to represent timeline events. Each item has
                a small colored icon and a content card with subtle border and
                hover elevation to match modern SaaS dashboards. */}
            <div className="mt-4 flow-root">
              <ul className="-mb-8">
                <li className="mb-8 flex items-start">
                  <span className="mr-4 mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">✓</span>
                  <div className="flex-1 border border-slate-100 rounded-xl bg-slate-50 p-4 hover:shadow-md transition">
                    <div className="text-sm text-slate-500">5 Jul</div>
                    <div className="mt-1 text-sm text-slate-700">Quarterly Business Review completed</div>
                  </div>
                </li>

                <li className="mb-8 flex items-start">
                  <span className="mr-4 mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">🔧</span>
                  <div className="flex-1 border border-slate-100 rounded-xl bg-slate-50 p-4 hover:shadow-md transition">
                    <div className="text-sm text-slate-500">28 Jun</div>
                    <div className="mt-1 text-sm text-slate-700">Support ticket resolved (P1)</div>
                  </div>
                </li>

                <li className="mb-8 flex items-start">
                  <span className="mr-4 mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-teal-100 text-teal-600">🎓</span>
                  <div className="flex-1 border border-slate-100 rounded-xl bg-slate-50 p-4 hover:shadow-md transition">
                    <div className="text-sm text-slate-500">20 Jun</div>
                    <div className="mt-1 text-sm text-slate-700">Product training completed</div>
                  </div>
                </li>

                <li className="mb-8 flex items-start">
                  <span className="mr-4 mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100 text-yellow-600">⚙️</span>
                  <div className="flex-1 border border-slate-100 rounded-xl bg-slate-50 p-4 hover:shadow-md transition">
                    <div className="text-sm text-slate-500">12 Jun</div>
                    <div className="mt-1 text-sm text-slate-700">New feature enabled</div>
                  </div>
                </li>

                <li className="flex items-start">
                  <span className="mr-4 mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600">💼</span>
                  <div className="flex-1 border border-slate-100 rounded-xl bg-slate-50 p-4 hover:shadow-md transition">
                    <div className="text-sm text-slate-500">2 Jun</div>
                    <div className="mt-1 text-sm text-slate-700">Executive stakeholder meeting</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Product Usage rendered via reusable component */}
        <ProductMetrics metrics={metrics} />

        {/* ARR Trend chart for last 12 months */}
        <section className="mt-6">
          <ARRTrend />
        </section>

        {/* Product Analytics dashboard: KPIs + charts */}
        <section className="mt-6">
          <ProductAnalytics />
        </section>

        {/* Open Tasks: actionable checklist with due dates, priority and status badges */}
        <section className="mt-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Open Tasks</h3>

            <div className="mt-4 space-y-3">
              {/* Task 1 */}
              <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-100 p-4">
                <div className="flex items-start gap-4">
                  <input aria-label="Schedule QBR" type="checkbox" className="mt-1 h-5 w-5 shrink-0 rounded border-slate-200 text-blue-600" />
                  <div>
                    <div className="text-sm font-medium text-slate-900">Schedule QBR</div>
                    <div className="mt-0.5 text-xs text-slate-500">Due in 5 days</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700">High</span>
                  <span className="inline-flex rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">Open</span>
                </div>
              </div>

              {/* Task 2 */}
              <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-100 p-4">
                <div className="flex items-start gap-4">
                  <input aria-label="Review adoption report" type="checkbox" className="mt-1 h-5 w-5 shrink-0 rounded border-slate-200 text-blue-600" />
                  <div>
                    <div className="text-sm font-medium text-slate-900">Review adoption report</div>
                    <div className="mt-0.5 text-xs text-slate-500">Due in 3 days</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700">Medium</span>
                  <span className="inline-flex rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">Open</span>
                </div>
              </div>

              {/* Task 3 */}
              <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-100 p-4">
                <div className="flex items-start gap-4">
                  <input aria-label="Share executive dashboard" type="checkbox" className="mt-1 h-5 w-5 shrink-0 rounded border-slate-200 text-blue-600" />
                  <div>
                    <div className="text-sm font-medium text-slate-900">Share executive dashboard</div>
                    <div className="mt-0.5 text-xs text-slate-500">Due in 7 days</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700">Low</span>
                  <span className="inline-flex rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">Open</span>
                </div>
              </div>

              {/* Task 4 */}
              <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-100 p-4">
                <div className="flex items-start gap-4">
                  <input aria-label="Renewal pricing discussion" type="checkbox" className="mt-1 h-5 w-5 shrink-0 rounded border-slate-200 text-blue-600" />
                  <div>
                    <div className="text-sm font-medium text-slate-900">Renewal pricing discussion</div>
                    <div className="mt-0.5 text-xs text-slate-500">Due in 14 days</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700">High</span>
                  <span className="inline-flex rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">Open</span>
                </div>
              </div>

              {/* Task 5 */}
              <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-100 p-4">
                <div className="flex items-start gap-4">
                  <input aria-label="Upsell AI Analytics module" type="checkbox" className="mt-1 h-5 w-5 shrink-0 rounded border-slate-200 text-blue-600" />
                  <div>
                    <div className="text-sm font-medium text-slate-900">Upsell AI Analytics module</div>
                    <div className="mt-0.5 text-xs text-slate-500">Due in 21 days</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700">High</span>
                  <span className="inline-flex rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">Open</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Stakeholders rendered from customer data via reusable component */}
        {customer.stakeholders && <Stakeholders stakeholders={customer.stakeholders} />}

        {/* Customer Contacts: searchable, sortable contacts table */}
        <section className="mt-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Customer Contacts</h3>
            <div className="mt-4">
              <ContactsTable contacts={contacts} />
            </div>
          </div>
        </section>

        {/* Expansion Opportunities: list potential upsell/cross-sell with ARR, probability, and expected close date */}
        <section className="mt-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold text-slate-900">Expansion Opportunities</h3>
              <div className="text-sm text-slate-500">Total Potential</div>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-4">
              <div className="md:col-span-3 space-y-3">
                {/* Opportunity rows */}
                <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-100 p-4">
                  <div>
                    <div className="text-sm font-medium text-slate-900">AI Analytics</div>
                    <div className="mt-0.5 text-xs text-slate-500">Potential ARR • ₹18L</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-sm font-semibold text-slate-900">₹18L</div>
                    <div className="text-xs text-slate-500">Probability: <span className="font-medium text-slate-800">65%</span></div>
                    <div className="text-xs text-slate-500">Close: <span className="font-medium text-slate-800">30 Sep 2026</span></div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-100 p-4">
                  <div>
                    <div className="text-sm font-medium text-slate-900">Workflow Automation</div>
                    <div className="mt-0.5 text-xs text-slate-500">Potential ARR • ₹10L</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-sm font-semibold text-slate-900">₹10L</div>
                    <div className="text-xs text-slate-500">Probability: <span className="font-medium text-slate-800">50%</span></div>
                    <div className="text-xs text-slate-500">Close: <span className="font-medium text-slate-800">15 Oct 2026</span></div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-100 p-4">
                  <div>
                    <div className="text-sm font-medium text-slate-900">Premium Support</div>
                    <div className="mt-0.5 text-xs text-slate-500">Potential ARR • ₹6L</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-sm font-semibold text-slate-900">₹6L</div>
                    <div className="text-xs text-slate-500">Probability: <span className="font-medium text-slate-800">40%</span></div>
                    <div className="text-xs text-slate-500">Close: <span className="font-medium text-slate-800">01 Dec 2026</span></div>
                  </div>
                </div>
              </div>

              {/* Total card */}
              <div className="md:col-span-1">
                <div className="rounded-2xl bg-gradient-to-b from-amber-50 to-white p-4 text-center ring-1 ring-slate-100">
                  <div className="text-sm font-medium text-slate-500">Total Expansion Value</div>
                  <div className="mt-3 text-2xl font-semibold text-slate-900">₹34L</div>
                  <div className="mt-2 text-xs text-slate-500">Aggregated potential ARR</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Support Overview: key support metrics and recent tickets table */}
        <section className="mt-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Support Overview</h3>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <div className="text-xs font-medium text-slate-500">Open Tickets</div>
                <div className="mt-2 text-2xl font-semibold text-slate-900">1</div>
              </div>

              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <div className="text-xs font-medium text-slate-500">Closed This Month</div>
                <div className="mt-2 text-2xl font-semibold text-slate-900">14</div>
              </div>

              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <div className="text-xs font-medium text-slate-500">Average Response Time</div>
                <div className="mt-2 text-2xl font-semibold text-slate-900">1.8 hrs</div>
              </div>

              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <div className="text-xs font-medium text-slate-500">CSAT</div>
                <div className="mt-2 flex items-baseline justify-center gap-2">
                  <div className="text-2xl font-semibold text-slate-900">4.8</div>
                  <div className="text-sm text-slate-500">/ 5</div>
                </div>
              </div>
            </div>

            {/* Recent tickets table */}
            <div className="mt-6 overflow-x-auto">
              <table className="w-full table-auto text-left text-sm">
                <thead>
                  <tr className="text-xs text-slate-500">
                    <th className="px-3 py-2">Ticket</th>
                    <th className="px-3 py-2">Subject</th>
                    <th className="px-3 py-2">Priority</th>
                    <th className="px-3 py-2">Status</th>
                    <th className="px-3 py-2">Assigned</th>
                    <th className="px-3 py-2">Age</th>
                  </tr>
                </thead>
                <tbody className="mt-2 divide-y divide-slate-100">
                  <tr className="border-t">
                    <td className="px-3 py-3 font-medium text-slate-900">TKT-1001</td>
                    <td className="px-3 py-3 text-slate-700">Provisioning delay affecting onboarding</td>
                    <td className="px-3 py-3"><span className="inline-flex rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700">High</span></td>
                    <td className="px-3 py-3"><span className="inline-flex rounded-full bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700">Open</span></td>
                    <td className="px-3 py-3 text-slate-700">Rahul Mehta</td>
                    <td className="px-3 py-3 text-slate-500">3h</td>
                  </tr>

                  <tr>
                    <td className="px-3 py-3 font-medium text-slate-900">TKT-0998</td>
                    <td className="px-3 py-3 text-slate-700">Login failures for multiple users</td>
                    <td className="px-3 py-3"><span className="inline-flex rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700">P1</span></td>
                    <td className="px-3 py-3"><span className="inline-flex rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700">Resolved</span></td>
                    <td className="px-3 py-3 text-slate-700">Support Team</td>
                    <td className="px-3 py-3 text-slate-500">2 Jul</td>
                  </tr>

                  <tr>
                    <td className="px-3 py-3 font-medium text-slate-900">TKT-1012</td>
                    <td className="px-3 py-3 text-slate-700">Request to enable advanced reporting</td>
                    <td className="px-3 py-3"><span className="inline-flex rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700">Medium</span></td>
                    <td className="px-3 py-3"><span className="inline-flex rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">In Progress</span></td>
                    <td className="px-3 py-3 text-slate-700">Sarah Lee</td>
                    <td className="px-3 py-3 text-slate-500">1d</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Customer Success Plan: milestones shown in chronological order with a modern progress tracker */}
        <section className="mt-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Customer Success Plan</h3>

            <div className="mt-6">
              <div className="flex items-center gap-4">
                <div className="flex w-full items-center">
                  {/* Connector line */}
                  <div className="relative flex w-full items-center">
                    <div className="absolute left-4 right-4 top-4 h-0.5 bg-slate-100" />

                    {/* Steps */}
                    <ol className="relative z-10 flex w-full justify-between">
                      {/* Onboarding ✔ */}
                      <li className="flex w-1/6 flex-col items-center text-center">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-white">✔</div>
                        <div className="mt-2 text-xs font-medium text-slate-700">Onboarding</div>
                      </li>

                      {/* User Training ✔ */}
                      <li className="flex w-1/6 flex-col items-center text-center">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-white">✔</div>
                        <div className="mt-2 text-xs font-medium text-slate-700">User Training</div>
                      </li>

                      {/* Product Adoption ✔ */}
                      <li className="flex w-1/6 flex-col items-center text-center">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-white">✔</div>
                        <div className="mt-2 text-xs font-medium text-slate-700">Product Adoption</div>
                      </li>

                      {/* Executive Review 🔄 */}
                      <li className="flex w-1/6 flex-col items-center text-center">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-700 animate-pulse">🔄</div>
                        <div className="mt-2 text-xs font-medium text-slate-700">Executive Review</div>
                      </li>

                      {/* Renewal Planning 🔄 */}
                      <li className="flex w-1/6 flex-col items-center text-center">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-700 animate-pulse">🔄</div>
                        <div className="mt-2 text-xs font-medium text-slate-700">Renewal Planning</div>
                      </li>

                      {/* Expansion 🚀 */}
                      <li className="flex w-1/6 flex-col items-center text-center">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-white">🚀</div>
                        <div className="mt-2 text-xs font-medium text-slate-700">Expansion</div>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>

              {/* Compact progress bar indicator below for visual progress */}
              <div className="mt-6">
                <div className="relative h-3 w-full rounded-full bg-slate-100">
                  <div className="absolute left-0 top-0 h-3 rounded-full bg-green-500" style={{ width: '50%' }} />
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
                  <div>Completed: 3</div>
                  <div>In Progress: 2</div>
                  <div>Planned: 1</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Customer Journey: stages from lead to renewal with current stage highlighted */}
        <section className="mt-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Customer Journey</h3>

            <div className="mt-6 flex items-center">
              <div className="relative w-full">
                <div className="absolute left-6 right-6 top-5 h-0.5 bg-slate-100" />
                <ul className="relative z-10 flex w-full justify-between">
                  {/** Lead */}
                  <li className="flex w-1/7 flex-col items-center text-center">
                    <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700">🔎</div>
                    <div className="text-xs text-slate-600">Lead</div>
                  </li>

                  {/** Closed Won */}
                  <li className="flex w-1/7 flex-col items-center text-center">
                    <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-700">🤝</div>
                    <div className="text-xs text-slate-600">Closed Won</div>
                  </li>

                  {/** Implementation */}
                  <li className="flex w-1/7 flex-col items-center text-center">
                    <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-700">🛠️</div>
                    <div className="text-xs text-slate-600">Implementation</div>
                  </li>

                  {/** Go Live */}
                  <li className="flex w-1/7 flex-col items-center text-center">
                    <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-700">🚀</div>
                    <div className="text-xs text-slate-600">Go Live</div>
                  </li>

                  {/** Adoption - current stage (highlight) */}
                  <li className="flex w-1/7 flex-col items-center text-center">
                    <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-white ring-2 ring-indigo-200">📈</div>
                    <div className="text-xs font-medium text-slate-900">Adoption</div>
                  </li>

                  {/** Expansion */}
                  <li className="flex w-1/7 flex-col items-center text-center">
                    <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700">✨</div>
                    <div className="text-xs text-slate-600">Expansion</div>
                  </li>

                  {/** Renewal */}
                  <li className="flex w-1/7 flex-col items-center text-center">
                    <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700">🔄</div>
                    <div className="text-xs text-slate-600">Renewal</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Health Drivers: status indicators resembling CS tools (Gainsight/Totango) */}
        <section className="mt-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Health Drivers</h3>

            {/* Compact grid of driver badges with concise descriptions */}
            <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {/* Product Adoption */}
              <div className="flex flex-col gap-2 rounded-xl border border-slate-100 bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">✓</span>
                    <div className="text-sm font-medium text-slate-900">Product Adoption</div>
                  </div>
                  <span className="text-sm text-green-600 font-semibold">Healthy</span>
                </div>
                <div className="text-xs text-slate-600">Customers actively using core features.</div>
              </div>

              {/* Executive Engagement */}
              <div className="flex flex-col gap-2 rounded-xl border border-slate-100 bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">✓</span>
                    <div className="text-sm font-medium text-slate-900">Executive Engagement</div>
                  </div>
                  <span className="text-sm text-green-600 font-semibold">Healthy</span>
                </div>
                <div className="text-xs text-slate-600">Quarterly exec sponsorship in place.</div>
              </div>

              {/* Support Experience */}
              <div className="flex flex-col gap-2 rounded-xl border border-slate-100 bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">✓</span>
                    <div className="text-sm font-medium text-slate-900">Support Experience</div>
                  </div>
                  <span className="text-sm text-green-600 font-semibold">Healthy</span>
                </div>
                <div className="text-xs text-slate-600">P1s resolved quickly; CSAT high.</div>
              </div>

              {/* Login Frequency */}
              <div className="flex flex-col gap-2 rounded-xl border border-slate-100 bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100 text-yellow-600">⚠</span>
                    <div className="text-sm font-medium text-slate-900">Login Frequency</div>
                  </div>
                  <span className="text-sm text-amber-600 font-semibold">At Risk</span>
                </div>
                <div className="text-xs text-slate-600">Logins below expected threshold.</div>
              </div>

              {/* Renewal Readiness */}
              <div className="flex flex-col gap-2 rounded-xl border border-slate-100 bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">✓</span>
                    <div className="text-sm font-medium text-slate-900">Renewal Readiness</div>
                  </div>
                  <span className="text-sm text-green-600 font-semibold">Healthy</span>
                </div>
                <div className="text-xs text-slate-600">Contract and renewal plan agreed.</div>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-10">
          {/* Documents: downloadable cards for important customer documents */}
          <section className="mb-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">Documents</h3>

              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {/* Doc 1 */}
                <div className="flex flex-col items-start gap-3 rounded-lg border border-slate-100 bg-slate-50 p-4">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-indigo-100 text-indigo-700">📄</div>
                  <div className="w-full">
                    <div className="text-sm font-medium text-slate-900">QBR Presentation.pdf</div>
                    <div className="mt-1 text-xs text-slate-500">Uploaded 02 Jul 2026</div>
                  </div>
                  <div className="mt-2 w-full">
                    <a href="#" className="inline-flex w-full items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700">Download</a>
                  </div>
                </div>

                {/* Doc 2 */}
                <div className="flex flex-col items-start gap-3 rounded-lg border border-slate-100 bg-slate-50 p-4">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-rose-100 text-rose-700">🔒</div>
                  <div className="w-full">
                    <div className="text-sm font-medium text-slate-900">Renewal Proposal.pdf</div>
                    <div className="mt-1 text-xs text-slate-500">Uploaded 15 Jun 2026</div>
                  </div>
                  <div className="mt-2 w-full">
                    <a href="#" className="inline-flex w-full items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700">Download</a>
                  </div>
                </div>

                {/* Doc 3 */}
                <div className="flex flex-col items-start gap-3 rounded-lg border border-slate-100 bg-slate-50 p-4">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-amber-100 text-amber-700">🛠️</div>
                  <div className="w-full">
                    <div className="text-sm font-medium text-slate-900">Implementation Guide.pdf</div>
                    <div className="mt-1 text-xs text-slate-500">Uploaded 01 Jun 2026</div>
                  </div>
                  <div className="mt-2 w-full">
                    <a href="#" className="inline-flex w-full items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700">Download</a>
                  </div>
                </div>

                {/* Doc 4 */}
                <div className="flex flex-col items-start gap-3 rounded-lg border border-slate-100 bg-slate-50 p-4">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-emerald-100 text-emerald-700">✅</div>
                  <div className="w-full">
                    <div className="text-sm font-medium text-slate-900">Security Compliance.pdf</div>
                    <div className="mt-1 text-xs text-slate-500">Uploaded 20 May 2026</div>
                  </div>
                  <div className="mt-2 w-full">
                    <a href="#" className="inline-flex w-full items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700">Download</a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Notes panel: timestamped CSM notes styled like CRM notes */}
          <section className="mb-8">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">Notes</h3>

              <div className="mt-4 space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 text-sm font-medium text-slate-500">5 Jul</div>
                  <div className="flex-1 rounded-lg border border-slate-100 bg-slate-50 p-3">
                    <div className="text-sm text-slate-700">Customer interested in AI Analytics.</div>
                    <div className="mt-2 text-xs text-slate-500">— CSM</div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 text-sm font-medium text-slate-500">28 Jun</div>
                  <div className="flex-1 rounded-lg border border-slate-100 bg-slate-50 p-3">
                    <div className="text-sm text-slate-700">CTO appreciated faster response time.</div>
                    <div className="mt-2 text-xs text-slate-500">— CSM</div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 text-sm font-medium text-slate-500">20 Jun</div>
                  <div className="flex-1 rounded-lg border border-slate-100 bg-slate-50 p-3">
                    <div className="text-sm text-slate-700">Completed admin training.</div>
                    <div className="mt-2 text-xs text-slate-500">— CSM</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <Link
            href="/"
            className="inline-flex rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Back to dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
