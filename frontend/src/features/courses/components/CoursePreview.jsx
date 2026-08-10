import React from "react";
import { Trash2, CloudUpload, Lightbulb, CheckCircle, Star, Clock, Image as ImageIcon } from "lucide-react";
import { Label } from "@/shared/components/ui/label";

export default function CoursePreview({
  thumbnail,
  setThumbnail,
  handleThumbnailFileChange,
  activeCategoryName,
  title,
  description,
  getCombinedDuration,
  price,
  currency,
}) {
  return (
    <div className="col-span-12 lg:col-span-4 space-y-6 lg:sticky lg:top-24 text-left">
      {/* Media Uploader Section */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Course Media</h4>
        
        <div>
          <Label className="text-[11px] font-bold text-slate-500 mb-2 block">Thumbnail Image</Label>
          <label
            htmlFor="courseThumbUpload"
            className="relative w-full h-40 rounded-xl overflow-hidden border border-dashed border-slate-200 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100/50 transition-all cursor-pointer group block"
          >
            {thumbnail ? (
              <>
                <img src={thumbnail} className="absolute inset-0 w-full h-full object-cover" alt="thumbnail" />
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setThumbnail("");
                  }}
                  className="absolute top-2.5 right-2.5 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all z-20 shadow-md cursor-pointer"
                  title="Remove Image"
                >
                  <Trash2 size={13} />
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center text-center p-3">
                <CloudUpload size={24} className="text-[#6C1D5F] mb-1.5" />
                <span className="text-[11.5px] font-bold text-slate-600">Click to upload image</span>
                <span className="text-[9.5px] text-slate-400 mt-0.5 uppercase tracking-wider">Recommended: 16:9</span>
              </div>
            )}
          </label>
          <input
            type="file"
            id="courseThumbUpload"
            accept="image/*"
            className="hidden"
            onChange={handleThumbnailFileChange}
          />
          <input
            type="text"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
            placeholder="Or paste direct image URL..."
            className="w-full mt-2.5 rounded-lg border border-slate-200 focus:border-[#6C1D5F] focus:ring-1 focus:ring-[#6C1D5F]/20 bg-slate-50/50 h-9 px-3 text-xs outline-none transition-all"
          />
        </div>
      </div>

      {/* Live Preview Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live Preview</h4>
          <span className="px-2 py-0.5 bg-indigo-50 border border-indigo-100 text-indigo-700 rounded text-[9.5px] font-bold uppercase tracking-wider">
            Card View
          </span>
        </div>

        <div className="rounded-xl border border-slate-150 overflow-hidden shadow-sm bg-white">
          <div className="aspect-video bg-slate-100 relative">
            {thumbnail ? (
              <img src={thumbnail} className="w-full h-full object-cover" alt="Mock Thumbnail" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-300">
                <ImageIcon size={32} />
              </div>
            )}
            <div className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-white/90 backdrop-blur-sm rounded text-[9px] font-bold text-[#6C1D5F] shadow-sm uppercase tracking-wider">
              Bestseller
            </div>
          </div>

          <div className="p-4 space-y-2.5">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-purple-50 border border-purple-100 text-[#6C1D5F] rounded text-[9px] font-bold uppercase tracking-wider">
                {activeCategoryName}
              </span>
              <span className="text-[10px] text-amber-500 flex items-center gap-0.5 font-bold">
                <Star size={11} className="fill-amber-500 text-amber-500" /> 4.8
              </span>
            </div>

            <h5 className="font-bold text-[13.5px] text-slate-800 leading-snug line-clamp-1">
              {title || "Course Title Preview"}
            </h5>

            <p className="text-[11px] text-slate-400 leading-normal line-clamp-2">
              {description || "The short description you enter on the left will appear here to engage potential students."}
            </p>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <div className="flex items-center gap-1 text-slate-500">
                <Clock size={12} />
                <span className="text-[10.5px] font-bold uppercase tracking-wider">{getCombinedDuration()}</span>
              </div>
              <div className="text-[13.5px] font-extrabold text-[#6C1D5F]">
                {price && Number(price) > 0 ? `${currency.split(" ")[1].slice(1, -1)}${Number(price).toFixed(2)}` : "Free"}
              </div>
            </div>
          </div>
        </div>

        <div className="p-3 bg-purple-50/40 rounded-lg border border-dashed border-purple-100 text-center">
          <p className="text-[11px] text-slate-500 italic">
            "Preview updates in real-time as you type"
          </p>
        </div>
      </div>

      {/* Quick Tips */}
      <div className="bg-[#6C1D5F]/5 p-5 rounded-xl border border-[#6C1D5F]/10 shadow-sm space-y-3.5">
        <h4 className="text-[12.5px] font-bold text-[#6C1D5F] flex items-center gap-1.5">
          <Lightbulb size={16} /> Pro Tips
        </h4>
        <ul className="space-y-2.5 text-[11.5px] text-slate-600 leading-relaxed font-medium">
          <li className="flex gap-2 items-start">
            <CheckCircle size={14} className="text-[#6C1D5F] mt-0.5 shrink-0" />
            <span>Use keywords in your title for better search visibility.</span>
          </li>
          <li className="flex gap-2 items-start">
            <CheckCircle size={14} className="text-[#6C1D5F] mt-0.5 shrink-0" />
            <span>Slug should be concise, matching URL paths.</span>
          </li>
          <li className="flex gap-2 items-start">
            <CheckCircle size={14} className="text-[#6C1D5F] mt-0.5 shrink-0" />
            <span>High-quality thumbnail images increase course clicks by 40%.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
