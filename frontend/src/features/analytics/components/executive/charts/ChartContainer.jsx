export default function ChartContainer({ title, children }) {
  return (
    <div className="bg-white rounded-xl border p-5 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">
        {title}
      </h2>

      <div className="h-80 flex items-center justify-center border rounded-lg bg-slate-50">
        {children}
      </div>
    </div>
  );
}