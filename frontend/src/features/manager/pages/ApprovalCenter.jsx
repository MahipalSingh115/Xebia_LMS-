import { useState, useEffect } from "react";
import { ShieldCheck, FileCheck, X, Search, Filter, Download, User, Info, ArrowUpRight, Check, AlertTriangle, Clock, Paperclip, ChevronRight } from "lucide-react";
import api from "@/shared/services/api";

export default function ApprovalCenter() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null); // request details for drawer

  const [requests, setRequests] = useState([]);
  const [stats, setStats] = useState({ pendingRequests: 0, approvedCount: 0, rejectedCount: 0, escalatedCount: 0 });
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const itemsPerPage = 5;

  const fetchStats = () => {
    api.get("/approval-requests/stats").then(res => {
      if (res.data && res.data.data) {
        setStats(res.data.data);
      }
    }).catch(() => {});
  };

  const fetchRequests = () => {
    api.get("/approval-requests", {
      params: {
        q: searchQuery,
        page: currentPage,
        size: itemsPerPage
      }
    }).then(res => {
      if (res.data && res.data.data) {
        setRequests(res.data.data.content || []);
        setTotalPages(res.data.data.totalPages || 1);
        setTotalElements(res.data.data.totalElements || 0);
      }
    }).catch(() => {});
  };

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    fetchRequests();
    setCurrentPage(0);
  }, [searchQuery]);

  useEffect(() => {
    fetchRequests();
  }, [currentPage]);

  const handleAction = (id, action) => {
    api.put(`/approval-requests/${id}/status?status=${action}`).then(() => {
      fetchStats();
      fetchRequests();
      setSelectedRequest(null);
    }).catch(() => {});
  };

  const filteredRequests = requests;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-[26px] font-bold text-slate-800 leading-snug">Approval Center</h2>
          <p className="text-[13px] text-slate-500 max-w-[576px]">
            Manage and review all pending training requests and professional certifications.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 hover:bg-slate-50 rounded-lg text-[12px] font-semibold text-slate-600 cursor-pointer">
            <Download size={13} />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Stats Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">Pending Requests</span>
            <h3 className="text-[24px] font-extrabold text-slate-800 mt-1">
              {stats.pendingRequests}
            </h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Clock size={18} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">Approved</span>
            <h3 className="text-[24px] font-extrabold text-slate-800 mt-1">
              {stats.approvedCount}
            </h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <FileCheck size={18} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">Rejected</span>
            <h3 className="text-[24px] font-extrabold text-slate-800 mt-1">
              {stats.rejectedCount}
            </h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center">
            <X size={18} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">Escalated</span>
            <h3 className="text-[24px] font-extrabold text-slate-800 mt-1">
              {stats.escalatedCount}
            </h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
            <AlertTriangle size={18} />
          </div>
        </div>
      </div>

      {/* Filter and controls bar */}
      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search employee or course..."
            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-4 py-1.5 text-[12px] text-slate-700 placeholder-slate-400 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
          />
        </div>
        <div className="flex gap-4 text-[11px] font-semibold text-slate-500">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-primary"></span>
            <span>Course Enrollment</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <span>Certification Claim</span>
          </div>
        </div>
      </div>

      {/* Directory Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="p-3">Request Type</th>
                <th className="p-3">Employee Name</th>
                <th className="p-3">Submitted Date</th>
                <th className="p-3 text-center">Priority</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[12px] text-slate-600">
              {filteredRequests.map((r) => (
                <tr
                  key={r.id}
                  onClick={() => setSelectedRequest(r)}
                  className="hover:bg-slate-50/50 transition-colors cursor-pointer group"
                >
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full shrink-0 ${r.type === "Course Enrollment" ? "bg-primary" : "bg-amber-500"}`}></span>
                      <span className="font-semibold text-slate-800">{r.type}</span>
                    </div>
                  </td>
                  <td className="p-3 font-semibold text-slate-800">{r.name}</td>
                  <td className="p-3 text-slate-400">{r.date}</td>
                  <td className="p-3 text-center">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      r.priority === "High" ? "bg-red-50 text-red-600" :
                      r.priority === "Medium" ? "bg-amber-50 text-amber-600" : "bg-slate-100 text-slate-500"
                    }`}>
                      {r.priority}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <span className={`px-2 py-0.5 rounded-[4px] text-[10px] font-bold uppercase ${
                      r.status === "Approved" ? "bg-emerald-50 text-emerald-600" :
                      r.status === "Rejected" ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-600"
                    }`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <span className="text-primary hover:underline font-semibold flex items-center justify-end gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Review</span>
                      <ChevronRight size={12} />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (
          <div className="flex justify-between items-center text-[12.5px] text-slate-450 font-bold px-2 pt-4 border-t border-slate-100 mt-2">
            <span>Showing {currentPage * itemsPerPage + 1}-{Math.min((currentPage + 1) * itemsPerPage, totalElements)} of {totalElements} requests</span>
            <div className="flex gap-2">
              <button
                disabled={currentPage === 0}
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 0))}
                className="px-3 py-1 rounded border border-slate-200 hover:border-slate-350 disabled:opacity-40 disabled:cursor-not-allowed bg-white cursor-pointer"
              >
                Prev
              </button>
              <button
                disabled={currentPage === totalPages - 1}
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages - 1))}
                className="px-3 py-1 rounded border border-slate-200 hover:border-slate-350 disabled:opacity-40 disabled:cursor-not-allowed bg-white cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Side Drawer: Approval Details */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setSelectedRequest(null)}></div>
          <div className="relative w-full max-w-[448px] bg-white h-full shadow-2xl flex flex-col p-6 overflow-y-auto animate-slide-in">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100 mb-4">
              <div>
                <h3 className="text-[16px] font-bold text-slate-800">Approval Details</h3>
                <p className="text-[10px] text-slate-400 font-semibold uppercase mt-0.5 tracking-wider">Request #RQ-90124</p>
              </div>
              <button onClick={() => setSelectedRequest(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 space-y-6">
              {/* Employee info */}
              <div className="space-y-2">
                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <User size={13} className="text-primary" />
                  <span>Employee Information</span>
                </h4>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center">
                    {selectedRequest.name.split(" ").map(w => w[0]).join("")}
                  </div>
                  <div>
                    <h5 className="text-[13px] font-bold text-slate-800 leading-snug">{selectedRequest.name}</h5>
                    <p className="text-[11px] text-slate-400">Tech Lead • Development</p>
                  </div>
                </div>
              </div>

              {/* Request Details */}
              <div className="space-y-3">
                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Info size={13} className="text-primary" />
                  <span>Request Details</span>
                </h4>
                <div className="space-y-3 text-[12px]">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Subject</label>
                    <p className="font-semibold text-slate-800 text-[13px] mt-0.5">{selectedRequest.course}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Provider</label>
                      <p className="text-slate-800 mt-0.5">{selectedRequest.provider}</p>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Estimated Cost</label>
                      <p className="text-slate-800 mt-0.5">{selectedRequest.cost}</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Business Justification</label>
                    <p className="text-slate-600 bg-slate-50 border border-slate-200 rounded-lg p-2.5 mt-1 leading-relaxed text-[11px]">
                      {selectedRequest.justification}
                    </p>
                  </div>
                </div>
              </div>

              {/* Attachments */}
              <div className="space-y-2">
                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Paperclip size={13} className="text-primary" />
                  <span>Attachments (2)</span>
                </h4>
                <div className="space-y-1.5 text-[11px]">
                  <div className="flex items-center justify-between p-2.5 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                    <span className="font-medium text-slate-700">Course_Syllabus.pdf</span>
                    <span className="text-primary font-bold hover:underline">Download</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                    <span className="font-medium text-slate-700">Quote_Invoice.pdf</span>
                    <span className="text-primary font-bold hover:underline">Download</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            {selectedRequest.status === "Pending" && (
              <div className="border-t border-slate-100 pt-4 mt-6 space-y-2">
                <button
                  onClick={() => handleAction(selectedRequest.id, "Approved")}
                  className="w-full py-2.5 bg-primary hover:bg-[#6c0f66] text-white rounded-lg text-[13px] font-semibold transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Check size={14} />
                  <span>Approve Request</span>
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleAction(selectedRequest.id, "Rejected")}
                    className="py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg text-[12px] font-semibold cursor-pointer text-center"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => setSelectedRequest(null)}
                    className="py-2 border border-primary/20 hover:bg-primary/5 text-primary rounded-lg text-[12px] font-semibold cursor-pointer text-center"
                  >
                    Request Changes
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
