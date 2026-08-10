import React, { useState } from "react";
import { ChevronLeft, ChevronRight, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

export default function CoverageTable({ employees = [], loading = false }) {
  // Sort state
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" | "desc"

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
    setCurrentPage(1); // Reset to page 1 on sort
  };

  // Sort logic
  const sortedEmployees = [...employees].sort((a, b) => {
    if (!sortField) return 0;
    
    let aVal = a[sortField];
    let bVal = b[sortField];

    // Handle names specifically
    if (sortField === "employee") {
      aVal = a.name.toLowerCase();
      bVal = b.name.toLowerCase();
    }

    if (typeof aVal === "string") {
      return sortOrder === "asc" 
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    } else {
      return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
    }
  });

  // Pagination logic
  const totalItems = sortedEmployees.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEmployees = sortedEmployees.slice(startIndex, startIndex + itemsPerPage);

  const getSortIcon = (field) => {
    if (sortField !== field) return <ArrowUpDown size={12} className="ml-1 text-slate-400 group-hover:text-slate-600 transition-colors" />;
    return sortOrder === "asc" 
      ? <ArrowUp size={12} className="ml-1 text-[#6C1D5F]" />
      : <ArrowDown size={12} className="ml-1 text-[#6C1D5F]" />;
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden transition-all duration-200">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50/50 border-b border-slate-200 select-none">
            <tr>
              <th 
                onClick={() => handleSort("employee")}
                className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider cursor-pointer hover:bg-slate-100/50 transition-colors group"
              >
                <div className="flex items-center">
                  Employee {getSortIcon("employee")}
                </div>
              </th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Department
              </th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Project
              </th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Learning Path
              </th>
              <th 
                onClick={() => handleSort("hours")}
                className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider cursor-pointer hover:bg-slate-100/50 transition-colors group"
              >
                <div className="flex items-center">
                  Hours {getSortIcon("hours")}
                </div>
              </th>
              <th 
                onClick={() => handleSort("completion")}
                className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider cursor-pointer hover:bg-slate-100/50 transition-colors group"
              >
                <div className="flex items-center">
                  Completion % {getSortIcon("completion")}
                </div>
              </th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              [1, 2, 3, 4, 5].map((n) => (
                <tr key={n} className="animate-pulse">
                  <td className="px-6 py-4.5 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-slate-200" />
                    <div className="space-y-1.5 flex-1">
                      <div className="h-3.5 w-24 bg-slate-200 rounded" />
                      <div className="h-3 w-32 bg-slate-200 rounded" />
                    </div>
                  </td>
                  <td className="px-6 py-4.5"><div className="h-3.5 w-16 bg-slate-200 rounded" /></td>
                  <td className="px-6 py-4.5"><div className="h-3.5 w-16 bg-slate-200 rounded" /></td>
                  <td className="px-6 py-4.5"><div className="h-3.5 w-32 bg-slate-200 rounded" /></td>
                  <td className="px-6 py-4.5"><div className="h-3.5 w-8 bg-slate-200 rounded" /></td>
                  <td className="px-6 py-4.5"><div className="h-3.5 w-24 bg-slate-200 rounded" /></td>
                  <td className="px-6 py-4.5"><div className="h-5 w-16 bg-slate-200 rounded-full" /></td>
                </tr>
              ))
            ) : paginatedEmployees.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-12 text-sm text-slate-400">
                  No records found
                </td>
              </tr>
            ) : (
              paginatedEmployees.map((emp) => (
                <tr key={emp.id} className="hover:bg-slate-50/50 transition-colors group/row">
                  {/* Employee Info */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={emp.avatar}
                        alt={emp.name}
                        className="w-9 h-9 rounded-full object-cover border border-slate-200 shadow-sm"
                        onError={(e) => {
                          e.target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${emp.name}`;
                        }}
                      />
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-800 text-sm group-hover/row:text-[#6C1D5F] transition-colors">
                          {emp.name}
                        </span>
                        <span className="text-[11px] text-slate-400 font-medium">
                          {emp.email}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Department */}
                  <td className="px-6 py-4 text-xs font-semibold text-slate-600">
                    {emp.department}
                  </td>

                  {/* Project */}
                  <td className="px-6 py-4 text-xs font-medium text-slate-600">
                    {emp.project}
                  </td>

                  {/* Learning Path */}
                  <td className="px-6 py-4 text-xs font-semibold text-slate-700 max-w-[200px] truncate">
                    {emp.learningPath}
                  </td>

                  {/* Hours */}
                  <td className="px-6 py-4 text-xs font-bold text-slate-800">
                    {emp.hours} hrs
                  </td>

                  {/* Completion % */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3 min-w-[120px]">
                      <span className="text-xs font-bold text-slate-700 min-w-[32px]">
                        {emp.completion}%
                      </span>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${
                            emp.status === "Completed"
                              ? "bg-[#2ebdaf]"
                              : emp.status === "In Progress"
                              ? "bg-[#6C1D5F]"
                              : "bg-slate-300"
                          }`}
                          style={{ width: `${emp.completion}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase ${
                        emp.status === "Completed"
                          ? "bg-[#56dacc]/20 text-[#005049]"
                          : emp.status === "In Progress"
                          ? "bg-[#6C1D5F]/10 text-[#6C1D5F]"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {emp.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {!loading && totalItems > 0 && (
        <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 font-medium">
            Showing{" "}
            <span className="font-bold text-slate-800">
              {startIndex + 1} - {Math.min(startIndex + itemsPerPage, totalItems)}
            </span>{" "}
            of{" "}
            <span className="font-bold text-slate-800">{totalItems}</span>{" "}
            employees
          </p>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-white text-slate-500 hover:text-slate-800 disabled:opacity-40 disabled:cursor-not-allowed hover:border-[#6C1D5F]/50 transition-all shadow-sm"
            >
              <ChevronLeft size={14} />
            </button>
            
            <div className="flex items-center gap-1 text-xs">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-7 h-7 rounded-lg font-bold transition-all shadow-xs ${
                    currentPage === page
                      ? "bg-[#6C1D5F] text-white shadow-md shadow-[#6C1D5F]/20"
                      : "border border-slate-200 hover:bg-white text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-white text-slate-500 hover:text-slate-800 disabled:opacity-40 disabled:cursor-not-allowed hover:border-[#6C1D5F]/50 transition-all shadow-sm"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
