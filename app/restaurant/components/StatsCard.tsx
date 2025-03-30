interface StatsCardProps {
  title: string;
  value: string | number;
  trend?: number;
  icon: React.ReactNode;
  colorClass: string;
}

export function StatsCard({ title, value, trend, icon, colorClass }: StatsCardProps) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-500">{title}</span>
        {trend && (
          <span className={`${trend > 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'} text-xs px-2 py-1 rounded-full flex items-center gap-1`}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
        )}
      </div>
      <div className="mt-3 flex items-end justify-between">
        <h3 className="text-2xl font-bold">{value}</h3>
        <div className={`h-10 w-10 rounded-xl ${colorClass} flex items-center justify-center`}>
          {icon}
        </div>
      </div>
    </div>
  );
} 