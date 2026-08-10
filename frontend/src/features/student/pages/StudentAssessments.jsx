import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Filter,
  ArrowUpDown,
  Award,
  Send,
  Eye,
  HelpCircle,
  FileText,
  Play,
  Search,
  Star
} from "lucide-react";

import assignmentService from "../../assignments/services/assignmentService";
import quizService from "../../quizzes/services/quizService";

import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Card, CardContent } from "@/shared/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";

import api from "@/shared/services/api";

export default function StudentAssessments() {
  const navigate = useNavigate();
  const studentId = "s4"; // Active student: Jane Doe

  const [loading, setLoading] = useState(true);
  const [assignments, setAssignments] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortOrder, setSortOrder] = useState("Newest");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
    setLoading(true);
    if (filterType === "Assignment") {
      api.get("/assignments/paginated", {
        params: {
          studentId,
          q: searchQuery,
          status: filterStatus,
          page: currentPage - 1,
          size: itemsPerPage
        }
      }).then(res => {
        if (res.data && res.data.data) {
          const pageData = res.data.data;
          setAssignments(pageData.content || []);
          setQuizzes([]);
          setTotalPages(pageData.totalPages || 1);
          setTotalElements(pageData.totalElements || 0);
        }
      }).catch(() => {})
        .finally(() => setLoading(false));
    } else if (filterType === "Quiz") {
      api.get("/quizzes/paginated", {
        params: {
          studentId,
          q: searchQuery,
          status: filterStatus,
          page: currentPage - 1,
          size: itemsPerPage
        }
      }).then(res => {
        if (res.data && res.data.data) {
          const pageData = res.data.data;
          setQuizzes(pageData.content || []);
          setAssignments([]);
          setTotalPages(pageData.totalPages || 1);
          setTotalElements(pageData.totalElements || 0);
        }
      }).catch(() => {})
        .finally(() => setLoading(false));
    } else {
      // All - fetch both, merge and simulate pagination
      Promise.all([
        api.get("/assignments/paginated", {
          params: { studentId, q: searchQuery, status: filterStatus, page: 0, size: 100 }
        }),
        api.get("/quizzes/paginated", {
          params: { studentId, q: searchQuery, status: filterStatus, page: 0, size: 100 }
        })
      ]).then(([assRes, quizRes]) => {
        const assList = assRes.data?.data?.content || [];
        const quizList = quizRes.data?.data?.content || [];
        setAssignments(assList);
        setQuizzes(quizList);
        const mergedLen = assList.length + quizList.length;
        setTotalPages(Math.ceil(mergedLen / itemsPerPage) || 1);
        setTotalElements(mergedLen);
      }).catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [searchQuery, filterType, filterStatus, currentPage]);

  // Compute consolidated list of assessments
  const consolidatedList = useMemo(() => {
    const list = [];

    // Map Assignments
    assignments.forEach((a) => {
      list.push({
        id: a.id,
        title: a.title,
        course: a.course,
        type: "Assignment",
        dueDate: a.dueDate || "No Limit",
        status: a.displayStatus,
        score: a.displayStatus === "Reviewed" ? a.score : null,
        maxMarks: a.maxMarks,
        rawItem: a,
      });
    });

    // Map Quizzes
    quizzes.forEach((q) => {
      const isCompleted = q.attemptStatus === "Completed";
      list.push({
        id: q.id,
        title: q.name,
        course: q.course,
        type: "Quiz",
        dueDate: q.dueDate || "No Limit",
        status: isCompleted ? "Completed" : "Pending",
        score: isCompleted ? q.score : null,
        maxMarks: q.questionsCount,
        rawItem: q,
      });
    });

    return list;
  }, [assignments, quizzes]);

  // Compute unified statistics
  const stats = useMemo(() => {
    const total = consolidatedList.length;
    
    const pending = consolidatedList.filter((item) => {
      if (item.type === "Assignment") {
        return item.status === "Pending" || item.status === "Needs Revision";
      } else {
        return item.status === "Pending";
      }
    }).length;

    const completedQuizzes = consolidatedList.filter(
      (item) => item.type === "Quiz" && item.status === "Completed"
    ).length;

    const submittedAssignments = consolidatedList.filter(
      (item) => item.type === "Assignment" && ["Submitted", "Late Submitted", "Reviewed"].includes(item.status)
    ).length;

    // Average Score
    const completedQuizScores = consolidatedList.filter(
      (item) => item.type === "Quiz" && item.status === "Completed" && item.rawItem.percentage !== undefined
    );
    let avgQuizScore = 0;
    if (completedQuizScores.length > 0) {
      const sum = completedQuizScores.reduce((acc, q) => acc + (q.rawItem.percentage || 0), 0);
      avgQuizScore = Math.round(sum / completedQuizScores.length);
    }

    return { total, pending, completedQuizzes, submittedAssignments, avgQuizScore };
  }, [consolidatedList]);

  // Apply filters and search query
  const filteredList = useMemo(() => {
    let result = [...consolidatedList];

    // Sort Order
    result.sort((a, b) => {
      if (sortOrder === "Title") {
        return a.title.localeCompare(b.title);
      }

      // Sort by Due Date
      const dateA = a.dueDate === "No Limit" ? new Date("9999-12-31") : new Date(a.dueDate);
      const dateB = b.dueDate === "No Limit" ? new Date("9999-12-31") : new Date(b.dueDate);

      if (sortOrder === "Newest") {
        return dateB - dateA;
      }
      return dateA - dateB;
    });

    if (filterType === "All") {
      const start = (currentPage - 1) * itemsPerPage;
      return result.slice(start, start + itemsPerPage);
    }

    return result;
  }, [consolidatedList, filterType, currentPage, sortOrder]);

  const handleAction = (item) => {
    if (item.type === "Quiz") {
      if (item.status === "Completed") {
        navigate(`/student/quizzes/${item.id}/result`);
      } else {
        navigate(`/student/quizzes/${item.id}/play`);
      }
    } else {
      if (item.status === "Pending") {
        navigate(`/student/assignments/${item.id}`);
      } else if (item.status === "Needs Revision") {
        navigate(`/student/assignments/${item.id}/submissions`);
      } else if (item.status === "Reviewed") {
        navigate(`/student/assignments/${item.id}/result`);
      } else {
        navigate(`/student/assignments/${item.id}`);
      }
    }
  };

  return (
    <div className="max-w-[1100px] w-full mx-auto px-6 md:px-8 py-8 space-y-6 animate-fadeIn">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">Assessments Dashboard</h1>
          <p className="text-[13px] text-slate-400 mt-1">Unified view of your assignments and quiz tests.</p>
        </div>

        {/* Filters Controls */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {/* Search Input */}
          <div className="relative flex-1 sm:flex-none min-w-[200px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search assessments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-1.5 w-full bg-white border border-slate-200 rounded-lg text-[12px] placeholder:text-slate-400 focus:outline-none focus:border-[#6C1D5F] h-9"
            />
          </div>

          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-[12px] text-slate-650 h-9 font-bold w-32">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Types</SelectItem>
              <SelectItem value="Assignment">Assignments</SelectItem>
              <SelectItem value="Quiz">Quizzes</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-[12px] text-slate-650 h-9 font-bold w-36">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Statuses</SelectItem>
              <SelectItem value="Pending">Pending Action</SelectItem>
              <SelectItem value="Completed">Submitted / Done</SelectItem>
              <SelectItem value="Reviewed">Reviewed / Graded</SelectItem>
              <SelectItem value="Overdue">Overdue</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-[12px] text-slate-650 h-9 font-bold w-32">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Newest">Newest Due</SelectItem>
              <SelectItem value="Oldest">Oldest Due</SelectItem>
              <SelectItem value="Title">Title</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* ── Stats Section ── */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Total */}
        <Card className="bg-white rounded-xl border-l-4 border-l-slate-400 border-y-slate-200 border-r-slate-200 shadow-sm flex flex-col justify-between h-[90px] hover:shadow-md transition-shadow">
          <CardContent className="p-4 flex flex-col justify-between h-full w-full">
            <div className="flex justify-between items-start w-full">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total</span>
              <FileText size={15} className="text-slate-400" />
            </div>
            <div className="text-[24px] font-black text-slate-855 text-slate-800 leading-none">
              {loading ? "..." : stats.total}
            </div>
          </CardContent>
        </Card>
        {/* Pending */}
        <Card className="bg-white rounded-xl border-l-4 border-l-[#FF6200] border-y-slate-200 border-r-slate-200 shadow-sm flex flex-col justify-between h-[90px] hover:shadow-md transition-shadow">
          <CardContent className="p-4 flex flex-col justify-between h-full w-full">
            <div className="flex justify-between items-start w-full">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pending Action</span>
              <Clock size={15} className="text-[#FF6200]" />
            </div>
            <div className="text-[24px] font-black text-slate-800 leading-none">
              {loading ? "..." : stats.pending}
            </div>
          </CardContent>
        </Card>
        {/* Completed Quizzes */}
        <Card className="bg-white rounded-xl border-l-4 border-l-emerald-500 border-y-slate-200 border-r-slate-200 shadow-sm flex flex-col justify-between h-[90px] hover:shadow-md transition-shadow">
          <CardContent className="p-4 flex flex-col justify-between h-full w-full">
            <div className="flex justify-between items-start w-full">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Completed Quizzes</span>
              <CheckCircle size={15} className="text-emerald-500" />
            </div>
            <div className="text-[24px] font-black text-slate-800 leading-none">
              {loading ? "..." : stats.completedQuizzes}
            </div>
          </CardContent>
        </Card>
        {/* Submitted Assignments */}
        <Card className="bg-white rounded-xl border-l-4 border-l-[#6C1D5F] border-y-slate-200 border-r-slate-200 shadow-sm flex flex-col justify-between h-[90px] hover:shadow-md transition-shadow">
          <CardContent className="p-4 flex flex-col justify-between h-full w-full">
            <div className="flex justify-between items-start w-full">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Submitted Work</span>
              <Send size={15} className="text-[#6C1D5F]" />
            </div>
            <div className="text-[24px] font-black text-slate-800 leading-none">
              {loading ? "..." : stats.submittedAssignments}
            </div>
          </CardContent>
        </Card>
        {/* Average Score */}
        <Card className="bg-white rounded-xl border-l-4 border-l-amber-500 border-y-slate-200 border-r-slate-200 shadow-sm flex flex-col justify-between h-[90px] hover:shadow-md transition-shadow">
          <CardContent className="p-4 flex flex-col justify-between h-full w-full">
            <div className="flex justify-between items-start w-full">
              <span className="text-[10px] font-bold text-[#6C1D5F] uppercase tracking-wider">Avg Quiz Score</span>
              <Star size={15} className="text-amber-500 fill-amber-400" />
            </div>
            <div className="text-[24px] font-black text-[#6C1D5F] leading-none">
              {loading ? "..." : `${stats.avgQuizScore}%`}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── Table Container ── */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
              <TableHead className="w-[120px] font-bold text-slate-500 text-[11px] uppercase tracking-wider">Type</TableHead>
              <TableHead className="font-bold text-slate-500 text-[11px] uppercase tracking-wider">Assessment Title</TableHead>
              <TableHead className="font-bold text-slate-500 text-[11px] uppercase tracking-wider">Course</TableHead>
              <TableHead className="font-bold text-slate-500 text-[11px] uppercase tracking-wider">Due Date</TableHead>
              <TableHead className="font-bold text-slate-500 text-[11px] uppercase tracking-wider">Status</TableHead>
              <TableHead className="font-bold text-slate-500 text-[11px] uppercase tracking-wider">Marks / Score</TableHead>
              <TableHead className="w-[160px] text-right font-bold text-slate-500 text-[11px] uppercase tracking-wider pr-6">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10 text-slate-400 text-xs">
                  Loading assessments...
                </TableCell>
              </TableRow>
            ) : filteredList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-12 text-slate-400">
                  <div className="max-w-[320px] mx-auto space-y-2">
                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                      <HelpCircle size={20} />
                    </div>
                    <div className="text-xs font-bold text-slate-700">No assessments found</div>
                    <p className="text-[11px] text-slate-400 leading-normal">
                      Try adjusting your search query or filters.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredList.map((item) => {
                let badgeStyle = "bg-slate-100 text-slate-600 border-slate-200";
                
                if (item.status === "Pending") {
                  badgeStyle = "bg-orange-50 text-orange-700 border-orange-100";
                } else if (item.status === "Needs Revision") {
                  badgeStyle = "bg-rose-50 text-rose-700 border-rose-100";
                } else if (item.status === "Overdue") {
                  badgeStyle = "bg-rose-100 text-rose-800 border-rose-200";
                } else if (item.status === "Submitted") {
                  badgeStyle = "bg-indigo-50 text-indigo-700 border-indigo-100";
                } else if (item.status === "Late Submitted") {
                  badgeStyle = "bg-amber-50 text-amber-700 border-amber-100";
                } else if (item.status === "Reviewed" || item.status === "Completed") {
                  badgeStyle = "bg-emerald-50 text-emerald-700 border-emerald-100";
                }

                const scoreText = item.score !== null ? `${item.score} / ${item.maxMarks}` : `${item.maxMarks} Marks`;

                return (
                  <TableRow key={`${item.type}-${item.id}`} className="hover:bg-slate-50/40 transition-colors">
                    {/* Type Column */}
                    <TableCell className="py-4">
                      <Badge className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9.5px] font-bold uppercase tracking-wider border bg-white ${
                        item.type === "Quiz" ? "text-purple-600 border-purple-200" : "text-blue-600 border-blue-200"
                      }`}>
                        {item.type === "Quiz" ? (
                          <HelpCircle size={10} className="shrink-0" />
                        ) : (
                          <FileText size={10} className="shrink-0" />
                        )}
                        <span>{item.type}</span>
                      </Badge>
                    </TableCell>

                    {/* Title Column */}
                    <TableCell className="font-semibold text-slate-800 text-[12.5px] py-4">
                      {item.title}
                    </TableCell>

                    {/* Course Column */}
                    <TableCell className="text-slate-400 text-xs py-4">
                      {item.course}
                    </TableCell>

                    {/* Due Date Column */}
                    <TableCell className="text-slate-500 text-xs py-4">
                      <span className={`flex items-center gap-1.5 ${item.status === "Overdue" ? "text-rose-500 font-medium" : ""}`}>
                        <Calendar size={13} className="text-slate-400" />
                        {item.dueDate}
                      </span>
                    </TableCell>

                    {/* Status Column */}
                    <TableCell className="py-4">
                      <Badge className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9.5px] font-bold uppercase tracking-wider border hover:bg-transparent ${badgeStyle}`}>
                        {item.status}
                      </Badge>
                    </TableCell>

                    {/* Marks Column */}
                    <TableCell className={`text-xs font-semibold py-4 ${item.score !== null ? "text-emerald-600 font-bold" : "text-slate-700"}`}>
                      {scoreText}
                    </TableCell>

                    {/* Action Button */}
                    <TableCell className="text-right py-4 pr-6">
                      {item.type === "Quiz" ? (
                        item.status === "Completed" ? (
                          <Button
                            onClick={() => handleAction(item)}
                            variant="outline"
                            className="h-8 px-3 bg-emerald-50/50 hover:bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold rounded-lg transition-colors flex items-center gap-1 ml-auto cursor-pointer"
                          >
                            <Eye size={12} /> Review
                          </Button>
                        ) : (
                          <Button
                            onClick={() => handleAction(item)}
                            className="h-8 px-3 bg-[#6C1D5F] hover:bg-[#4A1E47] text-white text-[11px] font-bold rounded-lg transition-colors flex items-center gap-1 ml-auto cursor-pointer"
                          >
                            <Play size={11} className="fill-white" /> Start Quiz
                          </Button>
                        )
                      ) : (
                        item.status === "Pending" ? (
                          <Button
                            onClick={() => handleAction(item)}
                            className="h-8 px-3 bg-[#6C1D5F] hover:bg-[#4A1E47] text-white text-[11px] font-bold rounded-lg transition-colors flex items-center gap-1 ml-auto cursor-pointer"
                          >
                            Start Draft
                          </Button>
                        ) : item.status === "Needs Revision" ? (
                          <Button
                            onClick={() => handleAction(item)}
                            className="h-8 px-3 bg-[#6C1D5F] hover:bg-[#4A1E47] text-white text-[11px] font-bold rounded-lg transition-colors flex items-center gap-1 ml-auto cursor-pointer"
                          >
                            Resubmit
                          </Button>
                        ) : item.status === "Reviewed" ? (
                          <Button
                            onClick={() => handleAction(item)}
                            variant="outline"
                            className="h-8 px-3 bg-white border border-[#6C1D5F] text-[#6C1D5F] hover:bg-[#6C1D5F]/5 text-[11px] font-bold rounded-lg transition-colors flex items-center gap-1 ml-auto cursor-pointer"
                          >
                            Feedback
                          </Button>
                        ) : (
                          <Button
                            onClick={() => handleAction(item)}
                            variant="outline"
                            className="h-8 px-3 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 text-[11px] font-bold rounded-lg transition-colors flex items-center gap-1 ml-auto cursor-pointer"
                          >
                            Details
                          </Button>
                        )
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
      {totalPages > 1 && (
        <div className="flex justify-between items-center text-[12.5px] text-slate-450 font-bold px-2 pt-4 border-t border-slate-100 mt-2">
          <span>Showing {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, totalElements)} of {totalElements} assessments</span>
          <div className="flex gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="px-3 py-1 rounded border border-slate-200 hover:border-slate-350 disabled:opacity-40 disabled:cursor-not-allowed bg-white cursor-pointer"
            >
              Prev
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              className="px-3 py-1 rounded border border-slate-200 hover:border-slate-350 disabled:opacity-40 disabled:cursor-not-allowed bg-white cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
