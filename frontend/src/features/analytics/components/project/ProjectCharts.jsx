export default function ProjectCharts() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

      <div className="bg-white border rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">
          Investment Trend
        </h2>

        <div className="h-80 border rounded-lg flex items-center justify-center text-slate-400">
          Chart Coming Soon...
        </div>
      </div>

      <div className="bg-white border rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">
          ROI by Project
        </h2>

        <div className="h-80 border rounded-lg flex items-center justify-center text-slate-400">
          Chart Coming Soon...
        </div>
      </div>

    </div>
  );
}