import React, { useState, useEffect } from "react";
import {
  Award,
  Download,
  Share2,
  CheckCircle,
  FileText,
  Search,
  SlidersHorizontal,
  ChevronDown,
  Eye,
  ArrowUpDown,
  BookOpen,
  User,
  GraduationCap,
  Calendar,
  Percent,
} from "lucide-react";
import studentService from "@/features/student/services/studentService";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";

const INITIAL_GRADES = [
  { id: 1, course: "UX Design Principles", instructor: "Dr. Alan Turing", grade: "A", percentage: 92, credits: 4, semester: "Semester 3", academicYear: "2022-2023", status: "Completed" },
  { id: 2, course: "Advanced Data Structures", instructor: "Dr. Grace Hopper", grade: "A-", percentage: 89, credits: 4, semester: "Semester 4", academicYear: "2023-2024", status: "Completed" },
  { id: 3, course: "Strategic Management", instructor: "LMS Admin", grade: "A+", percentage: 98, credits: 3, semester: "Semester 5", academicYear: "2023-2024", status: "Completed" },
  { id: 4, course: "AI Ethics & Technology", instructor: "Dr. John McCarthy", grade: "B+", percentage: 87, credits: 3, semester: "Semester 5", academicYear: "2023-2024", status: "In Progress" },
  { id: 5, course: "Database Management Systems", instructor: "Dr. Edgar Codd", grade: "A", percentage: 93, credits: 4, semester: "Semester 2", academicYear: "2022-2023", status: "Completed" },
  { id: 6, course: "Intro to Machine Learning", instructor: "Dr. Yann LeCun", grade: "A-", percentage: 90, credits: 4, semester: "Semester 4", academicYear: "2023-2024", status: "Completed" },
  { id: 7, course: "Computer Networks", instructor: "Dr. Vint Cerf", grade: "B", percentage: 84, credits: 3, semester: "Semester 3", academicYear: "2022-2023", status: "Completed" },
];

const INITIAL_CERTIFICATES = [
  { id: "LL-48291", title: "Advanced Data Structures", date: "October 15, 2023", type: "Specialization", tags: ["Algorithms", "System Design"] },
  { id: "LL-93812", title: "UX/UI Principles Mastery", date: "August 02, 2023", type: "Course Completion", tags: ["Prototyping", "User Research"] },
  { id: "LL-30198", title: "Introduction to Artificial Intelligence", date: "June 24, 2023", type: "External Certification", tags: ["Python", "Machine Learning"] },
  { id: "LL-10492", title: "Cloud Computing Fundamentals", date: "April 11, 2023", type: "Course Completion", tags: ["AWS", "Infrastructure"] },
];

export default function StudentGrades() {
  const [activeTab, setActiveTab] = useState("grades"); // 'grades' or 'certificates'
  const [grades, setGrades] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [stats, setStats] = useState({ completedCourses: 0, creditsEarned: 0, averagePercentage: 0.0, cgpa: 0.0, certificatesCount: 0 });
  const [loading, setLoading] = useState(false);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedCertType, setSelectedCertType] = useState("all");
  const [sortField, setSortField] = useState("course");
  const [sortOrder, setSortOrder] = useState("asc");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
    studentService.getGradeStats({ studentId: "s4" }).then(res => {
      if (res && res.data) {
        setStats(res.data);
      }
    }).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    if (activeTab === "grades") {
      studentService.getGradesPaginated({
        studentId: "s4",
        semester: selectedSemester,
        academicYear: selectedYear,
        q: searchQuery,
        page: currentPage - 1,
        size: itemsPerPage,
        sortBy: sortField,
        sortDir: sortOrder
      }).then(res => {
        if (res && res.data) {
          setGrades(res.data.content || []);
          setTotalPages(res.data.totalPages || 1);
          setTotalElements(res.data.totalElements || 0);
        }
      }).catch(() => {})
        .finally(() => setLoading(false));
    } else {
      studentService.getCertificatesPaginated({
        studentId: "s4",
        type: selectedCertType,
        q: searchQuery,
        page: currentPage - 1,
        size: itemsPerPage,
        sortBy: "title",
        sortDir: "asc"
      }).then(res => {
        if (res && res.data) {
          setCertificates(res.data.content || []);
          setTotalPages(res.data.totalPages || 1);
          setTotalElements(res.data.totalElements || 0);
        }
      }).catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [activeTab, searchQuery, selectedSemester, selectedYear, selectedCertType, sortField, sortOrder, currentPage]);

  const currentGrades = grades;
  const currentCerts = certificates;

  const totalPagesGrades = totalPages;
  const totalPagesCerts = totalPages;
  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const indexOfLastItem = indexOfFirstItem + (activeTab === "grades" ? currentGrades.length : currentCerts.length);
  const filteredGrades = { length: totalElements };
  const filteredCertificates = { length: totalElements };

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
        <h2 className="text-2xl font-black text-slate-800 tracking-tight">Academic Record &amp; Grades</h2>
        <p className="text-[13px] text-slate-400 mt-1">
          Access your comprehensive academic transcript, official grades breakdown, and verify your program certifications.
        </p>
      </div>

      {/* ── Academic Metrics Stats Grid ── */}
      <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Metric 1: CGPA */}
        <div className="bg-white p-4.5 rounded-2xl border border-slate-200/70 shadow-sm flex flex-col justify-between h-[110px]">
          <div className="w-8 h-8 rounded-lg bg-[#6C1D5F]/5 text-[#6C1D5F] flex items-center justify-center border border-[#6C1D5F]/10">
            <GraduationCap size={15} />
          </div>
          <div>
            <p className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">Current CGPA</p>
            <p className="text-xl font-black text-slate-850">{stats.cgpa || "0.0"} <span className="text-[10px] text-slate-400 font-medium">/ 4.0</span></p>
          </div>
        </div>

        {/* Metric 2: Average Grade */}
        <div className="bg-white p-4.5 rounded-2xl border border-slate-200/70 shadow-sm flex flex-col justify-between h-[110px]">
          <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-655 flex items-center justify-center border border-teal-100">
            <Percent size={15} />
          </div>
          <div>
            <p className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">Average Score</p>
            <p className="text-xl font-black text-slate-855">{stats.averagePercentage || "0.0"}%</p>
          </div>
        </div>

        {/* Metric 3: Credits Earned */}
        <div className="bg-white p-4.5 rounded-2xl border border-slate-200/70 shadow-sm flex flex-col justify-between h-[110px]">
          <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center border border-orange-100">
            <BookOpen size={15} />
          </div>
          <div>
            <p className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">Credits Earned</p>
            <p className="text-xl font-black text-slate-850">{stats.creditsEarned} <span className="text-[10px] text-slate-400 font-medium">CR</span></p>
          </div>
        </div>

        {/* Metric 4: Courses Completed */}
        <div className="bg-white p-4.5 rounded-2xl border border-slate-200/70 shadow-sm flex flex-col justify-between h-[110px]">
          <div className="w-8 h-8 rounded-lg bg-[#6C1D5F]/5 text-[#6C1D5F] flex items-center justify-center border border-[#6C1D5F]/10">
            <CheckCircle size={15} />
          </div>
          <div>
            <p className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">Completed</p>
            <p className="text-xl font-black text-slate-850">{stats.completedCourses} Courses</p>
          </div>
        </div>

        {/* Metric 5: Certificates Earned */}
        <div className="bg-white p-4.5 rounded-2xl border border-slate-200/70 shadow-sm flex flex-col justify-between h-[110px] col-span-2 sm:col-span-1">
          <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-650 flex items-center justify-center border border-teal-100">
            <Award size={15} />
          </div>
          <div>
            <p className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">Certificates</p>
            <p className="text-xl font-black text-slate-850">{stats.certificatesCount} Earned</p>
          </div>
        </div>
      </section>

      {/* ── Subpage Navigation Tabs ── */}
      <div className="border-b border-slate-200/60 flex gap-6">
        <button
          onClick={() => {
            setActiveTab("grades");
            setSearchQuery("");
            setCurrentPage(1);
          }}
          className={`pb-3 font-bold text-[13px] transition-all cursor-pointer border-none outline-none relative bg-transparent ${
            activeTab === "grades" ? "text-[#6C1D5F]" : "text-slate-400 hover:text-slate-650"
          }`}
        >
          Course Grades
          {activeTab === "grades" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6C1D5F] rounded-full" />
          )}
        </button>
        <button
          onClick={() => {
            setActiveTab("certificates");
            setSearchQuery("");
            setCurrentPage(1);
          }}
          className={`pb-3 font-bold text-[13px] transition-all cursor-pointer border-none outline-none relative bg-transparent ${
            activeTab === "certificates" ? "text-[#6C1D5F]" : "text-slate-400 hover:text-slate-650"
          }`}
        >
          My Certificates
          {activeTab === "certificates" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6C1D5F] rounded-full" />
          )}
        </button>
      </div>

      {/* ── Search & Filter Controls ── */}
      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/50 flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder={activeTab === "grades" ? "Search course or instructor..." : "Search certificate..."}
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6C1D5F]/15 text-[12.5px] text-slate-700 placeholder:text-slate-450 outline-none"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 w-full md:w-auto justify-end">
          {activeTab === "grades" ? (
            <>
              {/* Semester Filter */}
              <div className="flex items-center gap-1">
                <span className="text-[11px] text-slate-400 font-bold uppercase mr-1">Semester</span>
                <select
                  value={selectedSemester}
                  onChange={(e) => {
                    setSelectedSemester(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-[11.5px] text-slate-650 outline-none focus:ring-1 focus:ring-[#6C1D5F]"
                >
                  <option value="all">All</option>
                  <option value="Semester 2">Semester 2</option>
                  <option value="Semester 3">Semester 3</option>
                  <option value="Semester 4">Semester 4</option>
                  <option value="Semester 5">Semester 5</option>
                </select>
              </div>

              {/* Year Filter */}
              <div className="flex items-center gap-1">
                <span className="text-[11px] text-slate-400 font-bold uppercase mr-1">Year</span>
                <select
                  value={selectedYear}
                  onChange={(e) => {
                    setSelectedYear(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-[11.5px] text-slate-650 outline-none focus:ring-1 focus:ring-[#6C1D5F]"
                >
                  <option value="all">All</option>
                  <option value="2022-2023">2022-2023</option>
                  <option value="2023-2024">2023-2024</option>
                </select>
              </div>
            </>
          ) : (
            /* Certificate Type Filter */
            <div className="flex items-center gap-1">
              <span className="text-[11px] text-slate-400 font-bold uppercase mr-1">Type</span>
              <select
                value={selectedCertType}
                onChange={(e) => {
                  setSelectedCertType(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-[11.5px] text-slate-650 outline-none focus:ring-1 focus:ring-[#6C1D5F]"
              >
                <option value="all">All Types</option>
                <option value="Specialization">Specialization</option>
                <option value="Course Completion">Course Completion</option>
                <option value="External Certification">External Certification</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* ── Main Tab Panel Content ── */}
      {loading ? (
        <div className="h-48 flex items-center justify-center text-[13px] text-slate-400 font-semibold bg-white border border-slate-100 rounded-3xl shadow-sm">
          Loading Academic Records...
        </div>
      ) : activeTab === "grades" ? (
        /* ── COURSE GRADES TABLE PANEL ── */
        <div className="space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200/70 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-black text-slate-450 uppercase tracking-wider select-none">
                    <th className="py-4 px-6 cursor-pointer hover:text-slate-800" onClick={() => handleSort("course")}>
                      <div className="flex items-center gap-1">
                        Course Name <ArrowUpDown size={12} />
                      </div>
                    </th>
                    <th className="py-4 px-6 cursor-pointer hover:text-slate-800" onClick={() => handleSort("semester")}>
                      <div className="flex items-center gap-1">
                        Semester <ArrowUpDown size={12} />
                      </div>
                    </th>
                    <th className="py-4 px-6 cursor-pointer hover:text-slate-800 text-center" onClick={() => handleSort("credits")}>
                      <div className="flex items-center gap-1 justify-center">
                        Credits <ArrowUpDown size={12} />
                      </div>
                    </th>
                    <th className="py-4 px-6 cursor-pointer hover:text-slate-800 text-center" onClick={() => handleSort("percentage")}>
                      <div className="flex items-center gap-1 justify-center">
                        Grade / Percentage <ArrowUpDown size={12} />
                      </div>
                    </th>
                    <th className="py-4 px-6 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-[12.5px] text-slate-700">
                  {currentGrades.length > 0 ? (
                    currentGrades.map((g) => (
                      <tr key={g.id} className="hover:bg-slate-50/20 transition-colors">
                        <td className="py-4 px-6">
                          <div className="font-bold text-slate-800">{g.course}</div>
                          <div className="text-[10.5px] text-slate-400 mt-0.5 font-bold flex items-center gap-1">
                            <User size={10} /> Instructor: {g.instructor}
                          </div>
                        </td>
                        <td className="py-4 px-6 font-semibold text-slate-500">{g.semester}</td>
                        <td className="py-4 px-6 text-center font-bold text-slate-600">{g.credits} CR</td>
                        <td className="py-4 px-6 text-center">
                          <span className="font-black text-slate-800 text-[13.5px]">{g.grade}</span>
                          <span className="text-[10.5px] text-slate-400 font-bold ml-1">({g.percentage}%)</span>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <Badge
                            className={`text-[9.5px] font-black uppercase shadow-none border ${
                              g.status === "Completed"
                                ? "bg-teal-50 border-teal-100 text-teal-700 hover:bg-teal-50"
                                : "bg-amber-50 border-amber-100 text-amber-700 hover:bg-amber-50 animate-pulse"
                            }`}
                            variant="outline"
                          >
                            {g.status}
                          </Badge>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-slate-400 font-semibold">
                        No academic records found matching the filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination for Grades */}
          {totalPagesGrades > 1 && (
            <div className="flex justify-between items-center text-[12.5px] text-slate-450 font-bold px-2">
              <span>Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredGrades.length)} of {filteredGrades.length} courses</span>
              <div className="flex gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  className="px-3.5 py-1.5 rounded-lg border border-slate-200 hover:border-slate-350 disabled:opacity-40 disabled:cursor-not-allowed bg-white cursor-pointer"
                >
                  Prev
                </button>
                <button
                  disabled={currentPage === totalPagesGrades}
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPagesGrades))}
                  className="px-3.5 py-1.5 rounded-lg border border-slate-200 hover:border-slate-350 disabled:opacity-40 disabled:cursor-not-allowed bg-white cursor-pointer"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* ── EARNED CERTIFICATES COMPACT GRID PANEL ── */
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {currentCerts.length > 0 ? (
              currentCerts.map((cert) => (
                <div
                  key={cert.id}
                  className="bg-white border border-slate-200/70 rounded-3xl p-5 hover:shadow-md hover:border-[#6C1D5F]/20 transition-all flex flex-col justify-between h-[180px] group"
                >
                  <div className="flex items-start gap-4">
                    {/* Compact Thumbnail Preview Icon */}
                    <div className="w-12 h-12 bg-[#6C1D5F]/5 border border-[#6C1D5F]/10 rounded-2xl flex items-center justify-center text-[#6C1D5F] shrink-0">
                      <Award size={20} className="group-hover:scale-110 transition-transform" />
                    </div>

                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <Badge className="bg-slate-100 text-slate-500 border border-slate-200/20 truncate hover:bg-slate-100 text-[9px] font-black uppercase shadow-none" variant="outline">
                          {cert.type}
                        </Badge>
                        <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center gap-0.5 shrink-0 hover:bg-emerald-50 text-[9px] font-black uppercase shadow-none" variant="outline">
                          <CheckCircle size={8} /> Verified
                        </Badge>
                      </div>
                      <h3 className="font-extrabold text-[13.5px] text-slate-800 leading-snug truncate group-hover:text-[#6C1D5F] transition-colors" title={cert.title}>
                        {cert.title}
                      </h3>
                      <p className="text-[10.5px] text-slate-400 font-semibold">
                        Issued: {cert.date}
                      </p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">
                        ID: {cert.id}
                      </p>
                    </div>
                  </div>

                  {/* Compact Actions Row */}
                  <div className="flex gap-2.5 pt-3.5 border-t border-slate-50 mt-2 shrink-0">
                    <button className="flex-1 bg-[#6C1D5F]/5 hover:bg-[#6C1D5F]/10 text-[#6C1D5F] font-bold py-2 rounded-xl text-[11px] border border-[#6C1D5F]/10 flex items-center justify-center gap-1.5 cursor-pointer outline-none">
                      <Eye size={12} /> View
                    </button>
                    <button className="flex-1 bg-[#6C1D5F] hover:bg-[#521347] text-white font-bold py-2 rounded-xl text-[11px] shadow-sm shadow-[#6C1D5F]/10 flex items-center justify-center gap-1.5 cursor-pointer border-none outline-none">
                      <Download size={12} /> Download
                    </button>
                    <button className="p-2 text-slate-400 hover:text-slate-650 border border-slate-200 rounded-xl hover:bg-slate-50 cursor-pointer outline-none">
                      <Share2 size={12} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 py-12 text-center text-slate-400 font-semibold bg-white border border-slate-100 rounded-3xl shadow-sm">
                No verified certificates found matching the search.
              </div>
            )}
          </div>

          {/* Pagination for Certificates */}
          {totalPagesCerts > 1 && (
            <div className="flex justify-between items-center text-[12.5px] text-slate-450 font-bold px-2 pt-2">
              <span>Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredCertificates.length)} of {filteredCertificates.length} credentials</span>
              <div className="flex gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  className="px-3.5 py-1.5 rounded-lg border border-slate-200 hover:border-slate-350 disabled:opacity-40 disabled:cursor-not-allowed bg-white cursor-pointer"
                >
                  Prev
                </button>
                <button
                  disabled={currentPage === totalPagesCerts}
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPagesCerts))}
                  className="px-3.5 py-1.5 rounded-lg border border-slate-200 hover:border-slate-350 disabled:opacity-40 disabled:cursor-not-allowed bg-white cursor-pointer"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
