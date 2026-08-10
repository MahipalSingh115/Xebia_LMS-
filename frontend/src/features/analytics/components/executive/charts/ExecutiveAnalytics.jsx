export default function ExecutiveAnalytics() {
  return (
    <div className="bg-white rounded-xl border p-6">

      <h2 className="text-lg font-semibold mb-6">
        Executive Analytics
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="h-72 rounded-lg border flex items-center justify-center">
          Learning Coverage Chart
        </div>

        <div className="h-72 rounded-lg border flex items-center justify-center">
          Certification Growth
        </div>

        <div className="h-72 rounded-lg border flex items-center justify-center">
          AI Readiness
        </div>

      </div>

    </div>
  );
}