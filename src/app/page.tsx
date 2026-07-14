import Link from "next/link";
import Image from "next/image";
import { Cormorant_Garamond, Inter } from "next/font/google";
import FeatureCard from "../components/landing/FeatureCard";
import SectionHeading from "../components/landing/SectionHeading";
import TechBadge from "../components/landing/TechBadge";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const features = [
  {
    title: "Strategic Foresight",
    description: "A disciplined view of churn risk, renewal posture, and customer momentum before decisions become urgent.",
    icon: "01",
  },
  {
    title: "Executive Clarity",
    description: "Signals are distilled into concise narratives suited for leadership conversations, board reviews, and portfolio planning.",
    icon: "02",
  },
  {
    title: "Renewal Precision",
    description: "Commercial timing, stakeholder confidence, and customer health stay connected in one considered renewal workflow.",
    icon: "03",
  },
  {
    title: "Portfolio Stewardship",
    description: "Every account is managed with a long-view perspective that balances retention, expansion, and trust.",
    icon: "04",
  },
  {
    title: "Measured Intelligence",
    description: "AI is applied with restraint, surfacing judgment-enhancing context rather than noise or novelty.",
    icon: "05",
  },
  {
    title: "Lasting Relationships",
    description: "The operating philosophy centers on durable customer value, not short-term motion or vanity metrics.",
    icon: "06",
  },
];

const technologies = ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"];

export default function HomePage() {
  return (
    <div className={`${inter.className} min-h-screen bg-[#F8F5F0] text-[#111111]`}>
      <header className="sticky top-0 z-50 border-b border-[#E6DDD0] bg-[#F8F5F0]/95 backdrop-blur-sm">
        <nav className="mx-auto flex h-[72px] w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/pulse360-logo-mark.svg"
              alt="Pulse360 AI"
              width={32}
              height={32}
              className="h-8 w-8 rounded-md"
            />
            <span className={`${cormorant.className} text-2xl font-semibold tracking-[0.06em]`}>Pulse360 AI</span>
          </Link>

          <div className="hidden items-center gap-10 text-sm text-[#5C544A] md:flex">
            <a href="#perspective" className="transition hover:text-[#111111]">Perspective</a>
            <a href="#platform" className="transition hover:text-[#111111]">Platform</a>
            <a href="#focus" className="transition hover:text-[#111111]">Focus</a>
            <a
              href="https://github.com/SushreeSwarnaprava/pulse360-ai"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-[#111111]"
            >
              GitHub
            </a>
          </div>

          <Link href="/dashboard" className="rounded-full border border-[#D8CCBA] bg-[#FFFCF8] px-5 py-2.5 text-sm font-medium text-[#111111] transition hover:border-[#B68C3A] hover:text-[#8E6C2E]">
            Enter Platform
          </Link>
        </nav>
      </header>

      <main>
        <section id="perspective" className="mx-auto max-w-7xl px-4 pb-16 pt-24 sm:px-6 lg:px-8 lg:pb-24 lg:pt-32">
          <div className="grid gap-14 lg:grid-cols-12 lg:items-end">
            <div className="animate-fade-up lg:col-span-8">
              <p className="text-[11px] font-medium uppercase tracking-[0.34em] text-[#B68C3A]">Quiet Confidence</p>
              <h1 className={`${cormorant.className} mt-6 max-w-5xl text-5xl font-medium leading-[0.96] tracking-tight text-[#111111] sm:text-6xl lg:text-7xl`}>
                A refined command center for modern customer stewardship.
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-[#4D473F] sm:text-xl">
                Pulse360 AI brings customer health, renewal posture, expansion signals, and executive judgment into one measured operating environment.
              </p>

              <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <Link href="/dashboard" className="rounded-full border border-[#B68C3A] bg-[#B68C3A] px-6 py-3 text-sm font-medium text-[#FFFCF8] transition hover:opacity-90">
                  Enter the Platform
                </Link>
                <a
                  href="https://github.com/SushreeSwarnaprava/pulse360-ai"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-[#DDD3C6] px-6 py-3 text-sm font-medium text-[#4D473F] transition hover:border-[#B68C3A] hover:text-[#111111]"
                >
                  View GitHub
                </a>
              </div>
            </div>

            <div className="animate-fade-up lg:col-span-4 lg:pl-6">
              <div className="rounded-[28px] border border-[#E4D9CC] bg-[#FFFCF8] p-7 shadow-[0_6px_18px_rgba(17,17,17,0.03)]">
                <p className="text-[11px] uppercase tracking-[0.3em] text-[#B68C3A]">Operating Principle</p>
                <p className={`${cormorant.className} mt-4 text-3xl leading-tight text-[#111111]`}>
                  Clarity before motion. Judgment before noise.
                </p>
                <p className="mt-5 text-sm leading-7 text-[#5E564C]">
                  Built for teams who prefer composure, precision, and enduring customer value over volume, urgency, and excess.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="platform" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="animate-fade-up rounded-[32px] border border-[#E4D9CC] bg-[#FFFCF8] p-5 shadow-[0_10px_24px_rgba(17,17,17,0.03)] sm:p-8">
            <div className="rounded-[28px] border border-[#EBE1D5] bg-[#F8F5F0] p-5 sm:p-7">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[#D7C8B1]" />
                  <div className="h-2 w-2 rounded-full bg-[#C7B293]" />
                  <div className="h-2 w-2 rounded-full bg-[#B68C3A]" />
                </div>
                <div className="rounded-full border border-[#E3D7C9] bg-[#FFFCF8] px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-[#7A7166]">Platform Preview</div>
              </div>

              <div className="grid gap-4 lg:grid-cols-12">
                <div className="lg:col-span-8 rounded-[24px] border border-[#E3D8CB] bg-[#FFFCF8] p-6">
                  <div className="flex items-center justify-between">
                    <h3 className={`${cormorant.className} text-2xl font-medium text-[#111111]`}>Executive Portfolio View</h3>
                    <span className="text-[11px] uppercase tracking-[0.24em] text-[#7A7166]">Current Quarter</span>
                  </div>
                  <div className="mt-6 grid grid-cols-12 gap-4">
                    <div className="col-span-12 rounded-[22px] border border-[#EEE5DA] bg-[#F8F5F0] p-5 lg:col-span-7">
                      <p className="text-[11px] uppercase tracking-[0.24em] text-[#7A7166]">Portfolio Health</p>
                      <p className={`${cormorant.className} mt-3 text-4xl text-[#111111]`}>92%</p>
                      <div className="mt-6 h-px bg-[#E6DDD0]" />
                      <div className="mt-6 flex items-end justify-between gap-2">
                        {[52, 60, 58, 70, 73, 82, 88, 92].map((value, index) => (
                          <div key={index} className="flex flex-1 items-end">
                            <div className="w-full rounded-t-full bg-[#B68C3A]/75" style={{ height: `${value}px` }} />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="col-span-12 space-y-4 lg:col-span-5">
                      <div className="rounded-[22px] border border-[#EEE5DA] bg-[#F8F5F0] p-5">
                        <p className="text-[11px] uppercase tracking-[0.24em] text-[#7A7166]">Renewal Readiness</p>
                        <p className={`${cormorant.className} mt-3 text-3xl text-[#111111]`}>18 Accounts</p>
                        <p className="mt-3 text-sm leading-6 text-[#5E564C]">A concise view of posture, timing, and stakeholder confidence.</p>
                      </div>
                      <div className="rounded-[22px] border border-[#EEE5DA] bg-[#F8F5F0] p-5">
                        <p className="text-[11px] uppercase tracking-[0.24em] text-[#7A7166]">Expansion Signals</p>
                        <p className={`${cormorant.className} mt-3 text-3xl text-[#111111]`}>Measured</p>
                        <p className="mt-3 text-sm leading-6 text-[#5E564C]">Opportunities surfaced through adoption depth, executive alignment, and account momentum.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-4 space-y-4">
                  <div className="rounded-[24px] border border-[#E3D8CB] bg-[#FFFCF8] p-6">
                    <p className="text-[11px] uppercase tracking-[0.24em] text-[#7A7166]">Customer Capital</p>
                    <p className={`${cormorant.className} mt-3 text-4xl text-[#111111]`}>₹4.8 Cr</p>
                    <p className="mt-3 text-sm leading-6 text-[#5E564C]">Portfolio value viewed through continuity, confidence, and growth quality.</p>
                  </div>
                  <div className="rounded-[24px] border border-[#E3D8CB] bg-[#FFFCF8] p-6">
                    <p className="text-[11px] uppercase tracking-[0.24em] text-[#7A7166]">Executive Use</p>
                    <p className={`${cormorant.className} mt-3 text-3xl text-[#111111]`}>Concise by Design</p>
                    <p className="mt-3 text-sm leading-6 text-[#5E564C]">A quiet interface for leadership teams who value legibility over spectacle.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="focus" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <SectionHeading
            eyebrow="Areas of Focus"
            title="A more considered approach to customer leadership"
            description="Structured around the disciplines that matter most when portfolios grow, stakes rise, and leadership needs clarity without excess." 
            align="left"
            headingClassName={cormorant.className}
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="animate-fade-up">
                <FeatureCard title={feature.title} description={feature.description} icon={feature.icon} titleClassName={cormorant.className} />
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-4">
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#B68C3A]">Philosophy</p>
              <h2 className={`${cormorant.className} mt-4 text-4xl leading-tight text-[#111111] sm:text-5xl`}>
                Why Pulse360 AI
              </h2>
            </div>
            <div className="lg:col-span-8">
              <p className={`${cormorant.className} text-3xl leading-[1.3] text-[#1A1A1A] sm:text-[2.5rem]`}>
                Customer Success deserves the same level of composure, visibility, and strategic care expected in every other executive function.
              </p>
              <p className="mt-6 max-w-3xl text-base leading-8 text-[#5E564C] sm:text-lg">
                Rather than layering more dashboards, more alerts, and more operational noise, Pulse360 AI creates a quieter system of record for leadership teams. It connects retention, renewal readiness, customer health, and growth potential into one measured view so action can be timely, coordinated, and appropriately informed.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <SectionHeading
            eyebrow="Foundation"
            title="Built with discretion and permanence in mind"
            description="A restrained product experience supported by a modern, production-ready platform." 
            headingClassName={cormorant.className}
          />
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {technologies.map((tech) => (
              <TechBadge key={tech} label={tech} />
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-24 pt-8 sm:px-6 lg:px-8 lg:pb-28">
          <div className="animate-fade-up rounded-[32px] border border-[#E1D5C7] bg-[#FFFCF8] p-8 sm:p-12">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#B68C3A]">Next Step</p>
            <h2 className={`${cormorant.className} mt-5 text-4xl leading-tight text-[#111111] sm:text-5xl`}>
              Enter a calmer standard for customer intelligence.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[#5E564C] sm:text-lg">Explore the workspace built for executive clarity, deliberate action, and durable customer outcomes.</p>
            <Link href="/dashboard" className="mt-8 inline-flex rounded-full border border-[#B68C3A] bg-[#B68C3A] px-6 py-3 text-sm font-medium text-[#FFFCF8] transition hover:opacity-90">
              Enter the Platform
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#E6DDD0] bg-[#F8F5F0]">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-4 py-8 sm:px-6 lg:flex-row lg:px-8">
          <div>
            <p className={`${cormorant.className} text-2xl text-[#111111]`}>Pulse360 AI</p>
            <p className="mt-1 text-sm text-[#5E564C]">Customer Intelligence Platform</p>
          </div>
          <p className="text-sm text-[#7A7166]">Version 1.0 MVP</p>
        </div>
      </footer>
    </div>
  );
}
