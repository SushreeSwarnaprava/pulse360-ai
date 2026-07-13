import { CopilotActionCard, CopilotHistoryCard, PromptChip } from "../../components/CopilotCards";

const actions = [
  { icon: "📊", title: "Portfolio Health", description: "Review the current portfolio health and trends." },
  { icon: "📅", title: "Customers Renewing This Month", description: "See which accounts need renewal focus." },
  { icon: "⚠", title: "High Risk Accounts", description: "Identify at-risk customers before renewal." },
  { icon: "📈", title: "Expansion Opportunities", description: "Find potential upsell targets in your book." },
  { icon: "📧", title: "Draft Renewal Email", description: "Create a renewal outreach email in seconds." },
  { icon: "📋", title: "Generate QBR Agenda", description: "Build a strong meeting agenda for your QBR." },
];

const history = [
  { icon: "📝", title: "Amazon Executive Summary", time: "Today, 09:14 AM", description: "A concise executive summary for Amazon with health and expansion guidance." },
  { icon: "✉️", title: "Renewal Email Draft", time: "Yesterday, 04:23 PM", description: "Personalized renewal outreach copy for Curefit ready to send." },
  { icon: "📌", title: "QBR Meeting Notes", time: "Yesterday, 11:02 AM", description: "Key talking points for the upcoming Nanonets QBR." },
  { icon: "🚀", title: "Expansion Strategy", time: "2 days ago", description: "Recommended next steps to grow ARR with Amazon." },
  { icon: "⚡", title: "Risk Assessment", time: "2 days ago", description: "A quick risk summary for your top 5 customers." },
];

const prompts = [
  "Summarize Amazon",
  "Show high-risk customers",
  "Generate QBR agenda",
  "Draft follow-up email",
  "Which customers need attention?",
];

export default function CopilotPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 pb-12">
      <section className="mt-6 rounded-[28px] border border-slate-200 bg-white p-8 shadow-xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-700">AI Copilot</p>
            <h1 className="mt-3 text-4xl font-semibold text-slate-900">Your intelligent Customer Success assistant.</h1>
            <p className="mt-4 max-w-2xl text-sm text-slate-600">Pulse360 AI helps you stay ahead of renewals, health risks, expansion opportunities, and customer growth with intelligent recommendations.</p>
          </div>
          <div className="rounded-[24px] bg-blue-50 p-6 text-slate-900 shadow-sm">
            <div className="text-sm text-slate-500">Welcome back</div>
            <div className="mt-2 text-3xl font-semibold">Hi Sushree 👋</div>
            <div className="mt-4 rounded-3xl bg-white p-4 shadow-sm">
              <input
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-900 outline-none transition focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
                placeholder="Ask about customers, renewals, churn risk, adoption, ARR..."
                disabled
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">What would you like to accomplish today?</h2>
            <p className="mt-2 text-sm text-slate-500">Choose a task and let the AI help you take action fast.</p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {actions.map((action) => (
            <CopilotActionCard key={action.title} {...action} />
          ))}
        </div>
      </section>

      <section className="mt-10 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Recent AI Conversations</h2>
                <p className="mt-2 text-sm text-slate-500">Review your latest AI-generated summaries and drafts.</p>
              </div>
              <button className="btn-secondary">View all</button>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {history.slice(0, 4).map((item) => (
                <CopilotHistoryCard key={item.title} {...item} />
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Future Ready</h2>
            <p className="mt-3 text-sm text-slate-600">This page is built with reusable cards and components so a real LLM can be integrated later without design changes.</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm text-slate-500">LLM-ready sections</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Mock response placeholders</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Actionable AI suggestions</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Enterprise-friendly layout</p>
              </div>
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Suggested Prompts</h3>
            <div className="mt-4 flex flex-wrap gap-3">
              {prompts.map((prompt) => (
                <PromptChip key={prompt} label={prompt} />
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Mock AI Response</h3>
            <div className="mt-4 rounded-[24px] bg-slate-50 p-5">
              <p className="text-sm text-slate-700">
                “Amazon retains strong executive engagement with a 92% health score. Recommend scheduling a QBR in the next 2 weeks and prioritizing renewal outreach for Curefit with a personalized email draft.”
              </p>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
