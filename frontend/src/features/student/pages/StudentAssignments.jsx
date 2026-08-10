import React, { useState } from "react";
import {
  FileText,
  Clock,
  AlertTriangle,
  ChevronRight,
  Download,
  UploadCloud,
  FileCode,
  Trash2,
  Send,
  History,
  CheckCircle,
  MessageSquare,
} from "lucide-react";

export default function StudentAssignments() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionHistory, setSubmissionHistory] = useState([
    {
      attempt: 1,
      filename: "Draft_Review.pdf",
      date: "Oct 15, 2:30 PM",
      status: "Draft",
      statusColor: "bg-slate-100 text-slate-700 border-slate-200",
    },
  ]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
      });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
      });
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  const handleSubmit = () => {
    if (!selectedFile) return;

    const newAttempt = {
      attempt: submissionHistory.length + 1,
      filename: selectedFile.name,
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }),
      status: "Submitted",
      statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    };

    setSubmissionHistory([newAttempt, ...submissionHistory]);
    setIsSubmitted(true);
    setSelectedFile(null);
  };

  return (
    <div className="max-w-[1000px] w-full mx-auto px-6 md:px-8 py-8 space-y-6 animate-fadeIn">
      {/* ── Breadcrumbs & Header ── */}
      <div className="space-y-3">
        <div className="flex items-center gap-1.5 text-slate-400 text-[11.5px] font-semibold">
          <span className="hover:text-[#6C1D5F] cursor-pointer">My Courses</span>
          <ChevronRight size={12} className="text-slate-350" />
          <span className="hover:text-[#6C1D5F] cursor-pointer">Strategic Leadership</span>
          <ChevronRight size={12} className="text-slate-350" />
          <span className="text-slate-800 font-bold">Final Project Submission</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-2">
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">Final Project: Capstone Analysis</h1>
            <p className="text-[13px] text-slate-400 mt-1">Upload your comprehensive strategic analysis report.</p>
          </div>
          <div className="flex items-center gap-1.5 bg-rose-50 text-rose-700 px-4 py-2 rounded-xl text-[12px] font-black border border-rose-100 shrink-0">
            <AlertTriangle size={14} className="animate-pulse" />
            <span>Due in 2 days (Oct 24, 11:59 PM)</span>
          </div>
        </div>
      </div>

      {/* ── Grid Layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Instructions and File Upload (Span 2) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Instructions Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/70 shadow-sm space-y-5">
            <h2 className="text-[15px] font-bold text-slate-800 flex items-center gap-2">
              <FileText size={18} className="text-[#84117C]" /> Instructions
            </h2>
            <div className="text-[13px] text-slate-500 leading-relaxed space-y-3.5">
              <p>
                Please review the detailed grading rubric attached below before submitting your final report. Your submission must include a thorough analysis of the corporate case study provided in Module 4, focusing on long-term strategic implications, leadership styles, and operational outcomes.
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Format requirement: PDF or DOCX format only.</li>
                <li>Maximum file size limit: 50MB.</li>
                <li>Ensure all charts, models, and financials are clearly labeled and cited.</li>
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-50 space-y-3">
              <h3 className="text-[11px] font-black uppercase text-slate-450 tracking-wider">Attachments</h3>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#"
                  className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-[#6C1D5F]/30 hover:bg-slate-50/50 transition-all group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center transition-colors group-hover:bg-rose-500 group-hover:text-white">
                    <FileText size={16} />
                  </div>
                  <div>
                    <p className="text-[12.5px] font-bold text-slate-700 transition-colors group-hover:text-[#6C1D5F]">
                      Grading_Rubric_V2.pdf
                    </p>
                    <p className="text-[10px] text-slate-400 font-semibold mt-0.5">245 KB</p>
                  </div>
                  <Download size={14} className="ml-2 text-slate-400 group-hover:text-[#6C1D5F]" />
                </a>

                <a
                  href="#"
                  className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-[#6C1D5F]/30 hover:bg-slate-50/50 transition-all group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center transition-colors group-hover:bg-teal-500 group-hover:text-white">
                    <FileCode size={16} />
                  </div>
                  <div>
                    <p className="text-[12.5px] font-bold text-slate-700 transition-colors group-hover:text-[#6C1D5F]">
                      Case_Study_Data.xlsx
                    </p>
                    <p className="text-[10px] text-slate-400 font-semibold mt-0.5">1.2 MB</p>
                  </div>
                  <Download size={14} className="ml-2 text-slate-400 group-hover:text-[#6C1D5F]" />
                </a>
              </div>
            </div>
          </div>

          {/* Submission / Upload Area */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/70 shadow-sm relative overflow-hidden space-y-4">
            <h2 className="text-[15px] font-bold text-slate-800 flex items-center gap-2">
              <UploadCloud size={18} className="text-[#6C1D5F]" /> Submission Area
            </h2>

            {/* Drag and Drop Zone */}
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className="border-2 border-dashed border-slate-200 hover:border-[#6C1D5F]/60 rounded-2xl p-8 flex flex-col items-center justify-center text-center bg-slate-50/30 hover:bg-slate-50/70 transition-colors cursor-pointer relative"
            >
              <input
                type="file"
                id="assignment-file"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept=".pdf,.docx"
              />
              <div className="w-14 h-14 rounded-full bg-[#6C1D5F]/5 text-[#6C1D5F] flex items-center justify-center mb-4 transition-transform hover:scale-105 duration-300">
                <UploadCloud size={24} />
              </div>
              <h3 className="text-[13.5px] font-bold text-slate-700 mb-1">Drag and drop file here</h3>
              <p className="text-[11.5px] text-slate-400 mb-5">or click to browse from your computer (PDF or DOCX)</p>
              <label
                htmlFor="assignment-file"
                className="bg-[#6C1D5F] hover:bg-[#521347] text-white px-5 py-2 rounded-xl text-[12px] font-bold shadow-sm shadow-[#6C1D5F]/10 cursor-pointer transition-colors"
              >
                Select File
              </label>
            </div>

            {/* Uploaded File Row */}
            {selectedFile && (
              <div className="p-3.5 rounded-xl border border-[#84117C]/20 bg-[#84117C]/5 flex items-center justify-between animate-fadeIn">
                <div className="flex items-center gap-3 min-w-0">
                  <FileText className="text-[#84117C] shrink-0" size={18} />
                  <div className="min-w-0">
                    <p className="text-[13px] font-bold text-slate-700 truncate">{selectedFile.name}</p>
                    <p className="text-[10.5px] text-slate-400 font-semibold">{selectedFile.size} • Ready to submit</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handleRemoveFile}
                    className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer border-none bg-transparent"
                    title="Remove file"
                  >
                    <Trash2 size={15} />
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="bg-[#84117C] hover:bg-[#6c0e66] text-white px-4 py-2 rounded-xl text-[11.5px] font-bold shadow-sm flex items-center gap-1.5 transition-colors cursor-pointer border-none outline-none"
                  >
                    Submit <Send size={12} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Status & History */}
        <div className="space-y-6">
          {/* Current Status Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/70 shadow-sm space-y-4">
            <h2 className="text-[15px] font-bold text-slate-800 flex items-center gap-2">
              <CheckCircle size={18} className="text-[#84117C]" /> Current Status
            </h2>
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-full border-4 flex items-center justify-center shrink-0 ${
                isSubmitted ? "border-emerald-100 bg-emerald-50 text-emerald-600" : "border-slate-100 bg-slate-50 text-slate-400"
              }`}>
                <span className="text-[13.5px] font-black uppercase">
                  {isSubmitted ? "SUB" : "--"}
                </span>
              </div>
              <div>
                <p className="text-[10.5px] text-slate-400 font-bold uppercase tracking-wider">Status</p>
                <p className={`text-[14px] font-extrabold ${isSubmitted ? "text-emerald-600" : "text-slate-650"}`}>
                  {isSubmitted ? "Submitted (Pending Review)" : "Not Submitted"}
                </p>
              </div>
            </div>
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${isSubmitted ? "bg-emerald-500 w-full" : "w-0"}`}
              />
            </div>
          </div>

          {/* Submission History Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/70 shadow-sm space-y-4">
            <h2 className="text-[15px] font-bold text-slate-800 flex items-center gap-2">
              <History size={18} className="text-[#6C1D5F]" /> Submission History
            </h2>
            <div className="relative pl-3 border-l-2 border-slate-100 ml-1.5 space-y-5 py-1">
              {submissionHistory.map((sub, idx) => (
                <div key={idx} className="relative space-y-1">
                  <div className="absolute -left-[20px] top-1 w-2.5 h-2.5 rounded-full bg-white border-2 border-slate-300" />
                  <span className="text-[9.5px] font-black uppercase text-slate-400 tracking-wider">Attempt {sub.attempt}</span>
                  <p className="text-[12.5px] font-bold text-slate-700 truncate">{sub.filename}</p>
                  <p className="text-[10.5px] text-slate-450">{sub.date}</p>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded border text-[9.5px] font-black uppercase tracking-wider ${sub.statusColor}`}>
                    {sub.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Feedback Card */}
          <div className={`bg-white rounded-3xl p-6 border border-slate-200/70 shadow-sm space-y-4 transition-all ${
            isSubmitted ? "opacity-100" : "opacity-60"
          }`}>
            <h2 className="text-[15px] font-bold text-slate-850 flex items-center gap-2">
              <MessageSquare size={18} className="text-slate-450" /> Instructor Feedback
            </h2>
            <div className="text-center py-6 flex flex-col items-center justify-center space-y-1.5">
              <MessageSquare size={24} className="text-slate-300" />
              <p className="text-[12px] text-slate-400 font-medium px-4">
                {isSubmitted
                  ? "Your assignment is submitted. Feedback will appear here once graded."
                  : "Feedback will appear here once your assignment is graded."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
