export default function ExecutiveFilters() {
  return (
    <div className="bg-white border rounded-xl p-4 flex flex-wrap gap-4 items-center justify-between">

      <div className="flex flex-wrap gap-3">

        <select className="border rounded-lg px-3 py-2 text-sm">
          <option>Year</option>
          <option>2026</option>
          <option>2025</option>
        </select>

        <select className="border rounded-lg px-3 py-2 text-sm">
          <option>Quarter</option>
          <option>Q1</option>
          <option>Q2</option>
          <option>Q3</option>
          <option>Q4</option>
        </select>

        <select className="border rounded-lg px-3 py-2 text-sm">
          <option>Region</option>
        </select>

        <select className="border rounded-lg px-3 py-2 text-sm">
          <option>Business Unit</option>
        </select>

      </div>

      <button className="bg-[#6C1D5F] text-white px-4 py-2 rounded-lg hover:bg-[#54154a]">
        Apply
      </button>

    </div>
  );
}