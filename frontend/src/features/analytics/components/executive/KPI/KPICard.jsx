export default function KPICard({
  title,
  value,
  icon: Icon,
  color,
}) {
  return (
    <div className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition">

      <div className="flex justify-between items-center">

        <div>
          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {value}
          </h2>
        </div>

        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}
        >
          <Icon size={22} />
        </div>

      </div>

    </div>
  );
}