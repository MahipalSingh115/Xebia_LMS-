export default function TrainingFilters() {
  return (
    <div className="bg-white border rounded-xl p-4 flex flex-wrap gap-4">

      <select className="border rounded-md px-3 py-2">
        <option>Year</option>
      </select>

      <select className="border rounded-md px-3 py-2">
        <option>Quarter</option>
      </select>

      <select className="border rounded-md px-3 py-2">
        <option>Business Unit</option>
      </select>

      <select className="border rounded-md px-3 py-2">
        <option>Department</option>
      </select>

    </div>
  );
}