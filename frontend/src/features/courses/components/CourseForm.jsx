import React from "react";
import { Info, ArrowRight, Bold, Italic, List, Link as LinkIcon, Image as ImageIcon, Plus, Trash2, CheckCircle, Film, FileText, Award } from "lucide-react";
import { Label } from "@/shared/components/ui/label";
import { Input } from "@/shared/components/ui/input";

export default function CourseForm({
  isEditMode,
  title,
  slug,
  setSlug,
  description,
  setDescription,
  curriculum,
  setCurriculum,
  difficulty,
  setDifficulty,
  durationNum,
  setDurationNum,
  durationUnit,
  setDurationUnit,
  categoryId,
  setCategoryId,
  language,
  setLanguage,
  targetAudience,
  setTargetAudience,
  hasCertificate,
  setHasCertificate,
  currency,
  setCurrency,
  price,
  setPrice,
  courseCode,
  setCourseCode,
  teaserVideoUrl,
  setTeaserVideoUrl,
  takeaways,
  setTakeaways,
  prerequisites,
  setPrerequisites,
  categories,
  submitting,
  handleTitleChange,
  handlePublishCourse,
  handleSaveDraft,
}) {
  
  // Handlers for dynamic Key Takeaways list
  const handleAddTakeaway = () => {
    setTakeaways([...takeaways, ""]);
  };

  const handleRemoveTakeaway = (index) => {
    const updated = takeaways.filter((_, idx) => idx !== index);
    setTakeaways(updated.length > 0 ? updated : [""]);
  };

  const handleTakeawayChange = (index, value) => {
    const updated = [...takeaways];
    updated[index] = value;
    setTakeaways(updated);
  };

  return (
    <form onSubmit={handlePublishCourse} className="col-span-12 lg:col-span-8 space-y-6">
      
      {/* Section 1: General Information */}
      <div className="bg-white rounded-xl border border-slate-200 p-6.5 shadow-sm space-y-5 text-left">
        <h3 className="text-[14.5px] font-bold text-slate-800 flex items-center gap-2 border-b border-slate-50 pb-3">
          <Info size={16} className="text-[#6C1D5F]" /> General Information
        </h3>

        <div className="grid grid-cols-2 gap-5">
          <div className="col-span-2 md:col-span-1 space-y-1.5">
            <Label htmlFor="courseTitle" className="text-[12px] font-semibold text-slate-500">
              Course Title *
            </Label>
            <Input
              id="courseTitle"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="e.g. Advanced Data Science with Python"
              className="text-[13px] px-3.5 py-2.5 h-11"
              required
            />
          </div>

          <div className="col-span-2 md:col-span-1 space-y-1.5">
            <Label htmlFor="courseCode" className="text-[12px] font-semibold text-slate-500">
              Course Code
            </Label>
            <Input
              id="courseCode"
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
              placeholder="e.g. DS-101"
              className="text-[13px] px-3.5 py-2.5 h-11"
            />
          </div>

          <div className="col-span-2 space-y-1.5">
            <Label htmlFor="courseSlug" className="text-[12px] font-semibold text-slate-500">
              Slug
            </Label>
            <div className="flex rounded-lg overflow-hidden border border-slate-200 focus-within:ring-1 focus-within:ring-[#6C1D5F]/40 focus-within:border-[#6C1D5F]">
              <span className="px-3 bg-slate-50 border-r border-slate-200 flex items-center text-[12px] text-slate-400 font-medium whitespace-nowrap select-none">
                xebia-lms.com/courses/
              </span>
              <input
                id="courseSlug"
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="flex-grow px-3 py-2.5 text-[13px] bg-white outline-none border-none animate-none"
                placeholder="advanced-data-science"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="courseCat" className="text-[12px] font-semibold text-slate-500">
              Category *
            </Label>
            <select
              id="courseCat"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-[13px] font-medium rounded-lg px-3 py-2.5 cursor-pointer outline-none h-11"
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="courseDiff" className="text-[12px] font-semibold text-slate-500">
              Difficulty Level
            </Label>
            <select
              id="courseDiff"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-[13px] font-medium rounded-lg px-3 py-2.5 cursor-pointer outline-none h-11"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="courseLang" className="text-[12px] font-semibold text-slate-500">
              Language
            </Label>
            <select
              id="courseLang"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-[13px] font-medium rounded-lg px-3 py-2.5 cursor-pointer outline-none h-11"
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="German">German</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="courseDurNum" className="text-[12px] font-semibold text-slate-500">
              Estimated Completion Time
            </Label>
            <div className="flex border border-slate-200 rounded-lg overflow-hidden focus-within:ring-1 focus-within:ring-[#6C1D5F]/40 focus-within:border-[#6C1D5F]">
              <input
                id="courseDurNum"
                type="number"
                value={durationNum}
                onChange={(e) => setDurationNum(e.target.value)}
                className="flex-grow px-3 py-2.5 text-[13px] bg-white outline-none border-none w-full animate-none"
                placeholder="40"
              />
              <select
                value={durationUnit}
                onChange={(e) => setDurationUnit(e.target.value)}
                className="bg-slate-50 border-l border-slate-200 text-slate-600 text-[12px] font-medium px-2 py-2 cursor-pointer outline-none max-w-[100px]"
              >
                <option value="Hours">Hours</option>
                <option value="Days">Days</option>
                <option value="Weeks">Weeks</option>
              </select>
            </div>
          </div>

          <div className="col-span-2 space-y-1.5">
            <Label htmlFor="courseAudience" className="text-[12px] font-semibold text-slate-500">
              Target Audience
            </Label>
            <Input
              id="courseAudience"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="e.g. Aspiring data scientists, software engineers pivoting to AI..."
              className="text-[13px] px-3.5 py-2.5 h-11"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="coursePrice" className="text-[12px] font-semibold text-slate-500">
              Course Price
            </Label>
            <div className="flex border border-slate-200 rounded-lg overflow-hidden focus-within:ring-1 focus-within:ring-[#6C1D5F]/40 focus-within:border-[#6C1D5F]">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-slate-50 border-r border-slate-200 text-slate-600 text-[12px] font-medium px-2.5 py-2 cursor-pointer outline-none w-28"
              >
                <option value="USD ($)">USD ($)</option>
                <option value="EUR (€)">EUR (€)</option>
                <option value="GBP (£)">GBP (£)</option>
                <option value="INR (₹)">INR (₹)</option>
              </select>
              <input
                id="coursePrice"
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="flex-grow px-3 py-2.5 text-[13px] bg-white outline-none border-none w-full animate-none"
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-6 pl-1">
            <div className="relative inline-block w-10 h-6 transition duration-200 ease-in-out">
              <input
                type="checkbox"
                id="cert_toggle"
                checked={hasCertificate}
                onChange={(e) => setHasCertificate(e.target.checked)}
                className="opacity-0 w-0 h-0 peer cursor-pointer"
              />
              <label
                htmlFor="cert_toggle"
                className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-slate-200 rounded-full transition-all duration-200 peer-checked:bg-[#6C1D5F] before:content-[''] before:absolute before:h-4 before:w-4 before:left-1 before:bottom-1 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-4"
              />
            </div>
            <label htmlFor="cert_toggle" className="text-[12.5px] font-semibold text-slate-600 cursor-pointer flex items-center gap-1">
              <Award size={14} className="text-[#6C1D5F]" /> Certificate of Completion
            </label>
          </div>
        </div>
      </div>

      {/* Section 2: Media Assets (Screen 12 Teaser and Thumbnail link) */}
      <div className="bg-white rounded-xl border border-slate-200 p-6.5 shadow-sm space-y-5 text-left">
        <h3 className="text-[14.5px] font-bold text-slate-800 flex items-center gap-2 border-b border-slate-50 pb-3">
          <Film size={16} className="text-[#6C1D5F]" /> Media Assets
        </h3>

        <div className="grid grid-cols-2 gap-5">
          <div className="col-span-2 space-y-1.5">
            <Label htmlFor="teaserVideoUrl" className="text-[12px] font-semibold text-slate-500">
              Preview Video URL
            </Label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-slate-400 pointer-events-none">
                <LinkIcon size={14} />
              </span>
              <Input
                id="teaserVideoUrl"
                type="url"
                value={teaserVideoUrl}
                onChange={(e) => setTeaserVideoUrl(e.target.value)}
                placeholder="YouTube or Vimeo URL"
                className="text-[13px] pl-9 pr-3.5 py-2.5 h-11"
              />
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">This video will be used as the course teaser.</p>
          </div>
        </div>
      </div>

      {/* Section 3: Course Highlights (Screen 12 dynamic takeaways & prerequisites) */}
      <div className="bg-white rounded-xl border border-slate-200 p-6.5 shadow-sm space-y-5 text-left">
        <h3 className="text-[14.5px] font-bold text-slate-800 flex items-center gap-2 border-b border-slate-50 pb-3">
          <CheckCircle size={16} className="text-[#6C1D5F]" /> Course Highlights
        </h3>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-[12px] font-semibold text-slate-500 flex items-center justify-between">
              <span>Key Takeaways (What students will learn)</span>
              <button
                type="button"
                onClick={handleAddTakeaway}
                className="text-xs text-[#6C1D5F] hover:text-[#521347] font-bold flex items-center gap-1 cursor-pointer"
              >
                <Plus size={14} /> Add Highlight
              </button>
            </Label>
            
            <div className="space-y-2.5">
              {takeaways.map((takeaway, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <Input
                    value={takeaway}
                    onChange={(e) => handleTakeawayChange(idx, e.target.value)}
                    placeholder="e.g. Master React state management and Hooks"
                    className="text-[13px] px-3.5 py-2 h-10 flex-grow"
                  />
                  {takeaways.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveTakeaway(idx)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      title="Remove highlight"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Add at least 3 highlights for better engagement.</p>
          </div>

          <div className="h-px bg-slate-100 my-4" />

          <div className="space-y-1.5">
            <Label htmlFor="prerequisites" className="text-[12px] font-semibold text-slate-500">
              Prerequisites
            </Label>
            <textarea
              id="prerequisites"
              value={prerequisites}
              onChange={(e) => setPrerequisites(e.target.value)}
              placeholder="e.g. Basic knowledge of JavaScript, HTML, and CSS..."
              className="w-full rounded-lg border border-slate-200 focus:border-[#6C1D5F] focus:ring-1 focus:ring-[#6C1D5F]/20 bg-slate-50/50 p-4 text-[13px] outline-none transition-all resize-none min-h-[80px] animate-none"
              rows={2}
            />
          </div>
        </div>
      </div>

      {/* Section 4: Content Description */}
      <div className="bg-white rounded-xl border border-slate-200 p-6.5 shadow-sm space-y-5 text-left">
        <h3 className="text-[14.5px] font-bold text-slate-800 flex items-center gap-2 border-b border-slate-50 pb-3">
          <FileText size={16} className="text-[#6C1D5F]" /> Description
        </h3>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="shortDesc" className="text-[12px] font-semibold text-slate-500">
              Short Description
            </Label>
            <textarea
              id="shortDesc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Briefly explain what students will learn... (appears in course list cards)"
              className="w-full rounded-lg border border-slate-200 focus:border-[#6C1D5F] focus:ring-1 focus:ring-[#6C1D5F]/20 bg-slate-50/50 p-4 text-[13px] outline-none transition-all resize-none min-h-[90px] animate-none"
              rows={3}
            />
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Maximum 160 characters. This appears in listing cards.</p>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="fullDesc" className="text-[12px] font-semibold text-slate-500">
              Full Description (Curriculum)
            </Label>
            <div className="border border-slate-200 rounded-lg overflow-hidden focus-within:ring-1 focus-within:ring-[#6C1D5F]/40 focus-within:border-[#6C1D5F]">
              <div className="bg-slate-50 p-2 border-b border-slate-100 flex gap-1 shadow-inner">
                <button type="button" className="p-1.5 hover:bg-slate-200 rounded text-slate-500"><Bold size={14} /></button>
                <button type="button" className="p-1.5 hover:bg-slate-200 rounded text-slate-500"><Italic size={14} /></button>
                <button type="button" className="p-1.5 hover:bg-slate-200 rounded text-slate-500"><List size={14} /></button>
                <button type="button" className="p-1.5 hover:bg-slate-200 rounded text-slate-500"><LinkIcon size={14} /></button>
                <button type="button" className="p-1.5 hover:bg-slate-200 rounded text-slate-500"><ImageIcon size={14} /></button>
              </div>
              <textarea
                id="fullDesc"
                value={curriculum}
                onChange={(e) => setCurriculum(e.target.value)}
                placeholder="Detailed course description, curriculum modules details, outcomes, and prerequisites..."
                className="w-full px-4 py-4 border-none focus:ring-0 outline-none resize-none min-h-[180px] text-[13px] animate-none"
                rows={6}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Form Action Buttons */}
      <div className="flex items-center justify-between pt-4">
        <button
          type="button"
          onClick={handleSaveDraft}
          disabled={submitting}
          className="px-8 py-3 text-[#6C1D5F] hover:text-[#521347] font-bold text-xs border border-[#6C1D5F] rounded-lg hover:bg-purple-50/50 transition-all disabled:opacity-50 cursor-pointer"
        >
          {submitting ? "Saving..." : "Save Draft"}
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="px-10 py-3 bg-[#6C1D5F] hover:bg-[#521347] text-white font-bold text-xs rounded-lg hover:shadow-md transition-all flex items-center gap-1.5 disabled:opacity-50 cursor-pointer shadow-sm shadow-[#6C1D5F]/10 animate-none"
        >
          <span>{submitting ? (isEditMode ? "Updating..." : "Publishing...") : (isEditMode ? "Update Course" : "Publish Course")}</span>
          <ArrowRight size={13} />
        </button>
      </div>
    </form>
  );
}
