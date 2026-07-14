type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  headingClassName?: string;
};

export default function SectionHeading({ eyebrow, title, description, align = "center", headingClassName = "" }: SectionHeadingProps) {
  const alignmentClassName = align === "left" ? "max-w-3xl text-left" : "mx-auto max-w-3xl text-center";

  return (
    <div className={alignmentClassName}>
      {eyebrow ? (
        <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#B68C3A]">{eyebrow}</p>
      ) : null}
      <h2 className={`${headingClassName} mt-4 text-4xl font-medium leading-tight tracking-tight text-[#111111] sm:text-5xl`}>{title}</h2>
      {description ? <p className="mt-5 text-base leading-8 text-[#5E564C] sm:text-lg">{description}</p> : null}
    </div>
  );
}
