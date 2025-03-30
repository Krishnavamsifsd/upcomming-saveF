interface StatsCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
  trend: 'up' | 'down';
}

export default function StatsCard({ title, value, change, icon, trend }: StatsCardProps) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-500">{title}</span>
        <span className={`
          ${trend === 'up' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}
          text-xs px-2 py-1 rounded-full
        `}>
          {change}%
        </span>
      </div>
      <div className="mt-3 flex items-end justify-between">
        <h3 className="text-2xl font-bold">{value}</h3>
        {icon}
      </div>
    </div>
  );
} 