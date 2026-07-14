type TechBadgeProps = {
  label: string;
};

export default function TechBadge({ label }: TechBadgeProps) {
  return (
    <div className="rounded-full border border-[#E2D7CA] bg-[#FFFCF8] px-5 py-2.5 text-sm font-medium text-[#4F483F] transition hover:border-[#B68C3A] hover:text-[#111111]">
      {label}
    </div>
  );
}
