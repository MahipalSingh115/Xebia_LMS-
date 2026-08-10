import { useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, Save, Send, CheckCircle } from "lucide-react";
import AppLayout from "@/app/layouts/AppLayout";
import useCreateCategory from "@/features/categories/hooks/useCreateCategory";
import CategoryForm from "@/features/categories/components/CategoryForm";
import CategoryPreview from "@/features/categories/components/CategoryPreview";

/* ─── Step config ────────────────────────────────────────────────── */
const STEPS = [
  { num: 1, label: "Basic Info" },
  { num: 2, label: "Branding" },
  { num: 3, label: "Description" },
  { num: 4, label: "Status" },
  { num: 5, label: "SEO" },
];

export default function CreateCategory() {
  const navigate = useNavigate();

  const {
    currentStep,
    setCurrentStep,
    submitting,
    error,
    imagePreview,
    handleImageChange,
    form,
    update,
    removeTag,
    handleSubmit,
    seoBarWidth,
    seoBarColor,
    setImageFile,
    setImagePreview,
  } = useCreateCategory();

  return (
    <AppLayout>
      {/* ─── Two-panel layout ─────────────────────────────────────── */}
      <div className="flex min-h-[calc(100vh-52px)] -m-7 xl:-m-8">

        {/* ─── LEFT: Form area ────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto px-8 py-7 min-w-0">

          {/* Page header */}
          <div className="flex items-start justify-between mb-7">
            <div>
              <div className="flex items-center gap-2.5 mb-1">
                <button
                  onClick={() => navigate("/categories")}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 text-[12px] font-medium text-slate-600 border border-slate-200 rounded-md bg-white hover:bg-slate-50 cursor-pointer"
                >
                  <ArrowLeft size={12} /> Back
                </button>
                <div className="w-px h-4 bg-slate-200" />
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Draft
                </span>
              </div>
              <h1 className="text-[22px] font-bold text-slate-900 tracking-tight">Create New Category</h1>
              <p className="text-[13px] text-slate-400 mt-1">Define your category details, branding, SEO metadata, and publishing settings.</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium text-slate-600 border border-slate-200 rounded-md hover:bg-slate-50 cursor-pointer">
                <Eye size={13} /> Preview
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium text-slate-700 border border-slate-200 rounded-md bg-white hover:bg-slate-50 cursor-pointer">
                <Save size={13} /> Save Draft
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium text-white bg-[#6C1D5F] rounded-md hover:bg-[#4A1E47] disabled:opacity-60 cursor-pointer"
              >
                <Send size={13} /> {submitting ? "Saving…" : "Publish Category"}
              </button>
            </div>
          </div>

          {/* Step nav */}
          <div className="flex items-center gap-0 bg-white border border-slate-200 rounded-xl p-1.5 w-fit mb-6">
            {STEPS.map((step, i) => {
              const isDone = i < currentStep - 1;
              const isActive = i === currentStep - 1;
              return (
                <button
                  key={step.num}
                  onClick={() => setCurrentStep(step.num)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-medium transition-all whitespace-nowrap cursor-pointer ${isActive ? "bg-[#6C1D5F] text-white" :
                    isDone ? "bg-emerald-50 text-emerald-700" :
                      "text-slate-400 hover:text-slate-600"
                    }`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0 ${isActive ? "bg-white/20 text-white" :
                    isDone ? "bg-emerald-505 text-white" :
                      "bg-slate-200 text-slate-500"
                    }`}>
                    {isDone ? <CheckCircle size={10} /> : step.num}
                  </span>
                  {step.label}
                </button>
              );
            })}
          </div>

          {error && (
            <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-[13px] text-red-700">{error}</div>
          )}

          <CategoryForm
            form={form}
            update={update}
            removeTag={removeTag}
            imagePreview={imagePreview}
            handleImageChange={handleImageChange}
            setImageFile={setImageFile}
            setImagePreview={setImagePreview}
            seoBarWidth={seoBarWidth}
            seoBarColor={seoBarColor}
          />

          {/* Sticky save bar */}
          <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-8 py-3.5 -mx-8 mt-8 flex items-center justify-between">
            <div className="flex items-center gap-2 text-[12px] text-slate-400">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Draft saved automatically
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => navigate("/categories")} className="px-3 py-1.5 text-[13px] font-medium text-slate-600 border border-slate-200 rounded-md hover:bg-slate-50 cursor-pointer">
                Cancel
              </button>
              <button className="px-3 py-1.5 text-[13px] font-medium text-slate-700 border border-slate-200 rounded-md bg-white hover:bg-slate-50 cursor-pointer">
                <Save size={13} className="inline mr-1" /> Save Draft
              </button>
              <button onClick={handleSubmit} disabled={submitting} className="px-3 py-1.5 text-[13px] font-medium text-white bg-[#6C1D5F] rounded-md hover:bg-[#4A1E47] disabled:opacity-60 cursor-pointer animate-none">
                <Send size={13} className="inline mr-1" /> {submitting ? "Saving…" : "Publish Category"}
              </button>
            </div>
          </div>
        </div>

        <CategoryPreview form={form} />
      </div>
    </AppLayout>
  );
}
