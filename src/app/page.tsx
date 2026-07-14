import Link from "next/link";
import Image from "next/image";
import FeatureCard from "../components/landing/FeatureCard";
import SectionHeading from "../components/landing/SectionHeading";
import TechBadge from "../components/landing/TechBadge";

const features = [
  {
    title: "AI Copilot",
    description: "Ask natural-language questions and get priority actions, risk summaries, and account-level recommendations instantly.",
    icon: "AI",
  },
  {
    title: "Customer Health",
    description: "Track account health signals in one place with early warnings that help CSMs act before churn risk escalates.",
    icon: "CH",
  },
  {
    title: "Portfolio Analytics",
    description: "Monitor growth, risk, segment trends, and pipeline confidence with a leadership-ready analytics view.",
    icon: "PA",
  },
  {
    title: "Renewals",
    description: "Coordinate upcoming renewals with clear owners, timelines, and health context to improve forecast confidence.",
    icon: "RN",
  },
  {
    title: "Opportunities",
    description: "Identify expansion plays using adoption, stakeholder influence, and account momentum across the portfolio.",
    icon: "OP",
  },
  {
    title: "Reports",
    description: "Generate concise executive reporting across customer outcomes, product engagement, and commercial impact.",
    icon: "RP",
  },
];

const technologies = ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"];

export default function HomePage() {
  return (
    <div className="bg-white text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-[#0F172A] text-white backdrop-blur">
        <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/pulse360-logo-mark.svg"
              alt="Pulse360 AI"
              width={32}
              height={32}
              className="h-8 w-8 rounded-md"
            />
            <span className="text-sm font-semibold tracking-wide">Pulse360 AI</span>
          </Link>

          <div className="hidden items-center gap-8 text-sm text-slate-200 md:flex">
            <a href="#features" className="transition hover:text-white">Features</a>
            <a href="#product" className="transition hover:text-white">Product</a>
            <a
              href="https://github.com/SushreeSwarnaprava/pulse360-ai"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-white"
            >
              GitHub
            </a>
          </div>

          <Link href="/dashboard" className="rounded-lg bg-[#2563EB] px-4 py-2 text-sm font-medium shadow-sm transition hover:bg-blue-500">
            Launch Dashboard
          </Link>
        </nav>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(37,99,235,0.16),_transparent_45%)]" />
          <div className="mx-auto max-w-7xl px-4 pb-18 pt-20 sm:px-6 lg:px-8 lg:pb-24 lg:pt-24">
            <div className="mx-auto max-w-4xl text-center animate-fade-up">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-700">Customer Intelligence Platform</p>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Customer Intelligence for Modern Customer Success Teams
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
                Monitor customer health, manage renewals, identify growth opportunities and use AI-powered insights from one unified workspace.
              </p>

              <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/dashboard" className="w-full rounded-xl bg-[#2563EB] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(37,99,235,0.35)] transition hover:-translate-y-0.5 hover:bg-blue-500 sm:w-auto">
                  Launch Dashboard
                </Link>
                <a
                  href="https://github.com/SushreeSwarnaprava/pulse360-ai"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:text-blue-700 sm:w-auto"
                >
                  View GitHub
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="product" className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8 lg:pb-20">
          <div className="animate-fade-up rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_20px_50px_rgba(15,23,42,0.08)] sm:p-8">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                  <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </div>
                <div className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-500">Pulse360 Dashboard Preview</div>
              </div>

              <div className="grid gap-4 lg:grid-cols-12">
                <div className="lg:col-span-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-slate-900">Portfolio Health Trend</h3>
                    <span className="text-xs text-slate-500">Last 12 months</span>
                  </div>
                  <div className="mt-4 h-40 rounded-xl bg-gradient-to-b from-blue-100 to-white" />
                </div>
                <div className="lg:col-span-4 space-y-4">
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <p className="text-xs uppercase tracking-[0.14em] text-slate-500">ARR</p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900">₹4.8 Cr</p>
                    <p className="mt-1 text-xs text-emerald-600">+8% vs last month</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Renewals</p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900">18</p>
                    <p className="mt-1 text-xs text-slate-500">Upcoming this quarter</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <SectionHeading
            eyebrow="Features"
            title="Built for high-performing CS teams"
            description="Everything needed to operate customer outcomes at scale across health, renewals, adoption, and expansion."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="animate-fade-up">
                <FeatureCard title={feature.title} description={feature.description} icon={feature.icon} />
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <SectionHeading
            eyebrow="Vision"
            title="Why Pulse360 AI?"
            description="Customer Success teams operate across fragmented tools, delayed signals, and disconnected workflows. Pulse360 AI unifies account health, renewal execution, and growth opportunity intelligence in a single command center so teams can act earlier, collaborate faster, and deliver measurable customer outcomes with confidence."
          />
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <SectionHeading
            eyebrow="Technology"
            title="Modern stack for speed and reliability"
            description="Engineered with a production-grade stack optimized for fast iteration and scalable deployment."
          />
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {technologies.map((tech) => (
              <TechBadge key={tech} label={tech} />
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6 lg:px-8 lg:pb-24">
          <div className="animate-fade-up rounded-3xl border border-blue-200 bg-[linear-gradient(135deg,#eff6ff_0%,#ffffff_65%)] p-8 shadow-[0_18px_48px_rgba(37,99,235,0.14)] sm:p-12">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Ready to transform Customer Success?</h2>
            <p className="mt-4 max-w-2xl text-base text-slate-600">Bring your teams, customer data, and workflows into one intelligent operating system.</p>
            <Link href="/dashboard" className="mt-8 inline-flex rounded-xl bg-[#2563EB] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(37,99,235,0.32)] transition hover:-translate-y-0.5 hover:bg-blue-500">
              Launch Dashboard
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-4 py-8 sm:px-6 lg:flex-row lg:px-8">
          <div>
            <p className="text-sm font-semibold text-slate-900">Pulse360 AI</p>
            <p className="mt-1 text-sm text-slate-600">Customer Intelligence Platform</p>
          </div>
          <p className="text-sm text-slate-500">Version 1.0 MVP</p>
        </div>
      </footer>
    </div>
  );
}
