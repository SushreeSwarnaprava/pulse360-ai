type DashboardCardProps = {
  title: string;
  value: string;
  trend?: string;
  icon?: React.ReactNode;
};

export default function DashboardCard({ title, value, trend, icon }: DashboardCardProps) {
  return (
    <div className="card kpi-card">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#EFF6FF] text-[#2563EB]">{icon ?? "📈"}</div>
          <div>
            <div className="kpi-label">{title}</div>
            <div className="kpi-value">{value}</div>
          </div>
        </div>
      </div>

      {trend && <div className="kpi-trend">{trend}</div>}
    </div>
  );
}