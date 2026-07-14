type FeatureCardProps = {
  title: string;
  description: string;
  icon: string;
};

export default function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(37,99,235,0.16)]">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-lg text-blue-700 transition group-hover:bg-blue-600 group-hover:text-white">
        {icon}
      </div>
      <h3 className="mt-4 text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
    </article>
  );
}
