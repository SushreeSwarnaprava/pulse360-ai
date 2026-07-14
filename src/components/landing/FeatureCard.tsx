type FeatureCardProps = {
  title: string;
  description: string;
  icon: string;
  titleClassName?: string;
};

export default function FeatureCard({ title, description, icon, titleClassName = "" }: FeatureCardProps) {
  return (
    <article className="group rounded-[26px] border border-[#E4D9CC] bg-[#FFFCF8] p-7 shadow-[0_8px_20px_rgba(17,17,17,0.025)] transition duration-300 hover:-translate-y-0.5 hover:border-[#D2BE95]">
      <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D9CBB7] bg-[#F8F5F0] text-sm font-medium tracking-[0.14em] text-[#B68C3A] transition group-hover:border-[#B68C3A]">
        {icon}
      </div>
      <h3 className={`${titleClassName} mt-5 text-xl font-medium text-[#111111]`}>{title}</h3>
      <p className="mt-3 text-sm leading-7 text-[#5E564C]">{description}</p>
    </article>
  );
}
