import React, { useState, useEffect } from "react";
import {
  Download,
  Search,
  FileText,
  Code,
  Sliders,
  FileArchive,
  BookOpen,
  Sparkles,
  ExternalLink,
  SlidersHorizontal,
  Bookmark,
  Calendar,
  User,
  Clock,
  MoreVertical,
  PlayCircle,
  Eye,
  FileSpreadsheet,
  Layers,
  ArrowUpDown,
  CheckCircle,
} from "lucide-react";
import studentService from "@/features/student/services/studentService";

export default function StudentDownloads() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([1, 5]); // Store favorited resource IDs
  const [openDropdown, setOpenDropdown] = useState(null); // ID of resource dropdown currently open

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedInstructor, setSelectedInstructor] = useState("all");
  const [sortField, setSortField] = useState("uploadDate");
  const [sortOrder, setSortOrder] = useState("desc");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  const [coursesList, setCoursesList] = useState([]);
  const [instructorsList, setInstructorsList] = useState([]);

  useEffect(() => {
    studentService.getResourceStats().then(res => {
      if (res && res.data) {
        setCoursesList(res.data.uniqueCourses || []);
        setInstructorsList(res.data.uniqueInstructors || []);
      }
    }).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    studentService.getResourcesPaginated({
      fileType: selectedType,
      courseName: selectedCourse,
      instructor: selectedInstructor,
      q: searchQuery,
      page: currentPage - 1,
      size: itemsPerPage,
      sortBy: sortField,
      sortDir: sortOrder
    }).then(res => {
      if (res && res.data) {
        setResources(res.data.content || []);
        setTotalPages(res.data.totalPages || 1);
        setTotalElements(res.data.totalElements || 0);
      }
    }).catch(() => {})
      .finally(() => setLoading(false));
  }, [searchQuery, selectedType, selectedCourse, selectedInstructor, sortField, sortOrder, currentPage]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const getFileIcon = (type) => {
    switch (type.toUpperCase()) {
      case "PDF":
        return { icon: FileText, color: "text-rose-600 bg-rose-50 border-rose-100" };
      case "VIDEO":
        return { icon: PlayCircle, color: "text-emerald-600 bg-emerald-50 border-emerald-100" };
      case "PPT":
        return { icon: Sliders, color: "text-amber-600 bg-amber-50 border-amber-100" };
      case "ZIP":
        return { icon: FileArchive, color: "text-purple-600 bg-purple-50 border-purple-100" };
      case "CODE":
        return { icon: Code, color: "text-blue-600 bg-blue-50 border-blue-100" };
      default:
        return { icon: FileSpreadsheet, color: "text-slate-600 bg-slate-50 border-slate-100" };
    }
  };

  // Unique Courses & Instructors for filters
  const uniqueCourses = coursesList;
  const uniqueInstructors = instructorsList;

  // Pagination helper
  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const currentItems = resources;
  const indexOfLastItem = indexOfFirstItem + currentItems.length;
  const filtered = { length: totalElements };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
    setCurrentPage(1);
  };

  return (
    <div className="max-w-[1000px] w-full mx-auto px-6 md:px-8 py-8 space-y-8 animate-fadeIn">
      {/* ── Page Header ── */}
      <div>
        <h2 className="text-2xl font-black text-slate-800 tracking-tight">Resource &amp; Downloads Library</h2>
        <p className="text-[13px] text-slate-400 mt-1">
          Access supplementary lecture slides, code repositories, cheatsheets, and official files distributed by your program instructors.
        </p>
      </div>

      {/* ── Search & Filters Bento Area ── */}
      <section className="bg-white p-5 rounded-3xl border border-slate-200/70 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search resources, topics, descriptions..."
              className="w-full pl-9.5 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6C1D5F]/15 text-[12.5px] text-slate-700 placeholder:text-slate-400 outline-none"
            />
          </div>

          {/* Sorting */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Sort By</span>
            <button
              onClick={() => handleSort("title")}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-bold border transition-colors cursor-pointer flex items-center gap-1 ${
                sortField === "title" ? "bg-[#6C1D5F]/5 border-[#6C1D5F]/15 text-[#6C1D5F]" : "bg-white border-slate-200 text-slate-500"
              }`}
            >
              Name <ArrowUpDown size={10} />
            </button>
            <button
              onClick={() => handleSort("uploadDate")}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-bold border transition-colors cursor-pointer flex items-center gap-1 ${
                sortField === "uploadDate" ? "bg-[#6C1D5F]/5 border-[#6C1D5F]/15 text-[#6C1D5F]" : "bg-white border-slate-200 text-slate-500"
              }`}
            >
              Date <ArrowUpDown size={10} />
            </button>
            <button
              onClick={() => handleSort("downloads")}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-bold border transition-colors cursor-pointer flex items-center gap-1 ${
                sortField === "downloads" ? "bg-[#6C1D5F]/5 border-[#6C1D5F]/15 text-[#6C1D5F]" : "bg-white border-slate-200 text-slate-500"
              }`}
            >
              Downloads <ArrowUpDown size={10} />
            </button>
          </div>
        </div>

        {/* Filter selectors */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-100">
          {/* File Type Filter */}
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Resource Type</label>
            <select
              value={selectedType}
              onChange={(e) => {
                setSelectedType(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[12px] text-slate-650 focus:outline-none focus:ring-1 focus:ring-[#6C1D5F] outline-none"
            >
              <option value="all">All Formats</option>
              <option value="PDF">PDF Documents</option>
              <option value="ZIP">ZIP Archives</option>
              <option value="PPT">PPT Slide Decks</option>
              <option value="CODE">Python / Code</option>
              <option value="VIDEO">Video Recordings</option>
            </select>
          </div>

          {/* Course Filter */}
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Course Context</label>
            <select
              value={selectedCourse}
              onChange={(e) => {
                setSelectedCourse(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[12px] text-slate-650 focus:outline-none focus:ring-1 focus:ring-[#6C1D5F] outline-none"
            >
              <option value="all">All Courses</option>
              {uniqueCourses.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>

          {/* Instructor Filter */}
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Instructor</label>
            <select
              value={selectedInstructor}
              onChange={(e) => {
                setSelectedInstructor(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[12px] text-slate-650 focus:outline-none focus:ring-1 focus:ring-[#6C1D5F] outline-none"
            >
              <option value="all">All Instructors</option>
              {uniqueInstructors.map((inst) => (
                <option key={inst} value={inst}>
                  {inst}
                </option>
              ))}
            </select>
          </div>

          {/* Results Badge */}
          <div className="flex flex-col justify-end items-end pb-1.5">
            <span className="text-[12px] text-slate-700 font-bold bg-[#6C1D5F]/5 border border-[#6C1D5F]/10 px-3 py-1.5 rounded-xl">
              {filtered.length} files found
            </span>
          </div>
        </div>
      </section>

      {/* ── Resources Grid ── */}
      {loading ? (
        <div className="h-64 flex items-center justify-center text-[13px] text-slate-400 font-semibold bg-white border border-slate-200/70 rounded-3xl shadow-sm">
          Fetching library assets...
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-16 text-center bg-white border border-slate-200/70 rounded-3xl shadow-sm space-y-2">
          <BookOpen className="mx-auto text-slate-300" size={32} />
          <h4 className="font-bold text-slate-700 text-[14px]">No resources found</h4>
          <p className="text-[11.5px] text-slate-400 max-w-sm mx-auto">
            Try adjusting your search keywords or format filters to locate resources.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentItems.map((res) => {
            const { icon: FileIcon, color: iconColors } = getFileIcon(res.fileType);
            const isFav = favorites.includes(res.id);

            return (
              <div
                key={res.id}
                className="bg-white border border-slate-200/70 hover:border-[#6C1D5F]/20 rounded-3xl p-5 hover:shadow-md transition-all flex flex-col justify-between h-[230px] group relative"
              >
                {/* Header Information */}
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center border ${iconColors} shrink-0`}>
                        <FileIcon size={18} className="group-hover:scale-105 transition-transform" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 bg-slate-100 rounded-full text-[9px] font-black uppercase text-slate-450 border border-slate-200/20 truncate">
                            {res.fileType}
                          </span>
                          <span className="text-[10px] text-slate-400 font-bold truncate">
                            {res.fileSize}
                          </span>
                        </div>
                        <h3
                          className="font-extrabold text-[13.5px] text-slate-800 leading-snug truncate mt-1 group-hover:text-[#6C1D5F] transition-colors"
                          title={res.title}
                        >
                          {res.title}
                        </h3>
                      </div>
                    </div>

                    {/* Right side Actions: Favorite & More menu */}
                    <div className="flex items-center gap-1.5 shrink-0 relative">
                      <button
                        onClick={() => toggleFavorite(res.id)}
                        className={`p-1.5 rounded-lg border hover:bg-slate-50 transition-all cursor-pointer outline-none bg-white ${
                          isFav ? "text-[#6C1D5F] border-[#6C1D5F]/20 bg-[#6C1D5F]/5" : "text-slate-400 border-slate-200"
                        }`}
                      >
                        <Bookmark size={12} fill={isFav ? "#6C1D5F" : "none"} />
                      </button>
                      <button
                        onClick={() => setOpenDropdown(openDropdown === res.id ? null : res.id)}
                        className="p-1.5 text-slate-400 hover:text-slate-650 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer outline-none bg-white"
                      >
                        <MoreVertical size={12} />
                      </button>

                      {/* Stateful drop-down list */}
                      {openDropdown === res.id && (
                        <div className="absolute right-0 top-8 w-36 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 z-20 text-[12px] text-slate-600 font-bold">
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(`${window.location.origin}/student/resource/${res.id}`);
                              setOpenDropdown(null);
                            }}
                            className="w-full text-left px-3.5 py-1.5 hover:bg-slate-50 hover:text-[#6C1D5F] cursor-pointer border-none bg-transparent"
                          >
                            Copy Link
                          </button>
                          <button
                            onClick={() => setOpenDropdown(null)}
                            className="w-full text-left px-3.5 py-1.5 hover:bg-slate-50 text-rose-600 cursor-pointer border-none bg-transparent"
                          >
                            Report Issue
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Context Metadata */}
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[10.5px] text-slate-400 font-bold mt-4.5">
                    <div className="flex items-center gap-1.5 truncate">
                      <Layers size={11} className="text-slate-350" />
                      <span className="truncate text-slate-450">{res.courseName}</span>
                    </div>
                    <div className="flex items-center gap-1.5 truncate">
                      <User size={11} className="text-slate-350" />
                      <span className="truncate text-slate-450">{res.instructor}</span>
                    </div>
                    <div className="flex items-center gap-1.5 truncate">
                      <Calendar size={11} className="text-slate-350" />
                      <span>Uploaded: {res.uploadDate}</span>
                    </div>
                    <div className="flex items-center gap-1.5 truncate">
                      <Clock size={11} className="text-slate-350" />
                      <span>Downloads: {res.downloads}</span>
                    </div>
                  </div>

                  <p className="text-[11.5px] text-slate-450 leading-relaxed mt-4 line-clamp-2">
                    {res.description}
                  </p>
                </div>

                {/* Footer action buttons */}
                <div className="flex gap-2.5 pt-3.5 border-t border-slate-100 mt-2 shrink-0">
                  {res.previewSupported && (
                    <button className="flex-1 bg-[#6C1D5F]/5 hover:bg-[#6C1D5F]/10 text-[#6C1D5F] font-bold py-2 rounded-xl text-[11px] border border-[#6C1D5F]/10 flex items-center justify-center gap-1.5 cursor-pointer outline-none">
                      <Eye size={12} /> Live Preview
                    </button>
                  )}
                  <button className="flex-1 bg-[#6C1D5F] hover:bg-[#521347] text-white font-bold py-2 rounded-xl text-[11px] shadow-sm shadow-[#6C1D5F]/10 flex items-center justify-center gap-1.5 cursor-pointer border-none outline-none">
                    <Download size={12} /> Download file
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Pagination controls ── */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center text-[12.5px] text-slate-450 font-bold px-2 pt-2">
          <span>Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filtered.length)} of {filtered.length} resources</span>
          <div className="flex gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="px-3.5 py-1.5 rounded-lg border border-slate-200 hover:border-slate-350 disabled:opacity-40 disabled:cursor-not-allowed bg-white cursor-pointer"
            >
              Prev
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              className="px-3.5 py-1.5 rounded-lg border border-slate-200 hover:border-slate-350 disabled:opacity-40 disabled:cursor-not-allowed bg-white cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
