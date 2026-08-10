import React, { useState } from "react";
import { Upload, ImageOff, ChevronDown, FolderOpen, Trash2, Info, Palette, Search } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import EmojiPicker from "@/shared/components/EmojiPicker";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/shared/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/shared/components/ui/dialog";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { Label } from "@/shared/components/ui/label";

export default function CategoryDialog({
  show,
  mode, // "add" | "edit" | "view"
  name,
  desc,
  imagePreview,   // base64 or object-URL string for display
  status,
  errorMsg,
  submitting,
  onNameChange,
  onDescChange,
  onImageFileChange, // receives a File object
  onStatusChange,
  onClose,
  onSubmit,
  emoji,
  onEmojiChange,
  accentColor,
  onAccentColorChange,
  tags,
  onTagsChange,
  featured,
  onFeaturedChange,
  metaTitle,
  onMetaTitleChange,
  metaDesc,
  onMetaDescChange,
  focusKeyword,
  onFocusKeywordChange,
  longDesc,
  onLongDescChange,
  publishState,
  onPublishStateChange,
  slug,
  onSlugChange,
  parentCat,
  onParentCatChange,
}) {
  const [activeTab, setActiveTab] = useState("basic");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const title =
    mode === "view"
      ? "Category Details"
      : mode === "edit"
        ? "Edit Category"
        : "Add New Category";

  const isView = mode === "view";

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageFileChange(file);
    }
  };

  const tabs = [
    { id: "basic", label: "Basic Info", icon: Info },
    { id: "branding", label: "Branding", icon: Palette },
    { id: "seo", label: "SEO & Publish", icon: Search },
  ];

  return (
    <Dialog open={show} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[520px] rounded-xl shadow-xl bg-white border border-slate-200 p-6">

        {/* Header */}
        <DialogHeader className="border-b border-slate-50 pb-4">
          <DialogTitle className="text-base font-bold text-slate-800 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#6C1D5F]/5 text-[#6C1D5F] flex items-center justify-center shrink-0">
              <FolderOpen size={16} />
            </div>
            <div className="flex flex-col text-left">
              <span className="leading-tight">{title}</span>
              <span className="text-[11px] text-slate-400 font-medium mt-0.5 normal-case">
                {mode === "add" ? "Create a new category container for curriculum classification." : "Manage details, images, branding, and catalog visibility status."}
              </span>
            </div>
          </DialogTitle>
        </DialogHeader>

        {/* Error message */}
        {errorMsg && (
          <div className="bg-red-50 text-red-600 border border-red-100 rounded-lg p-3 text-xs font-semibold animate-pulse">
            {errorMsg}
          </div>
        )}

        {/* Tabs Bar */}
        <div className="flex border-b border-slate-100 my-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-2 border-b-2 text-[12.5px] font-medium transition-all cursor-pointer ${
                  isActive
                    ? "border-[#6C1D5F] text-[#6C1D5F] font-bold"
                    : "border-transparent text-slate-400 hover:text-slate-600"
                }`}
              >
                <Icon size={14} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Form Body */}
        <form onSubmit={onSubmit} className="space-y-4 py-1">

          {activeTab === "basic" && (
            <div className="space-y-4 animate-[fadeIn_0.2s_ease-out]">
              {/* Name */}
              <div className="space-y-1.5 text-left">
                <Label htmlFor="catName" className="text-[12px] font-semibold text-slate-500">
                  Category Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="catName"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    onNameChange(e.target.value);
                    if (mode !== "view") {
                      onSlugChange(e.target.value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""));
                    }
                  }}
                  placeholder="e.g. Frontend Development"
                  disabled={isView}
                  required
                  className="text-[13px] px-3.5 py-2.5 h-10 outline-none focus:ring-1 focus:ring-[#6C1D5F]/40 focus:border-[#6C1D5F] disabled:bg-slate-50 disabled:text-slate-500"
                />
              </div>

              {/* Slug */}
              <div className="space-y-1.5 text-left">
                <Label htmlFor="catSlug" className="text-[12px] font-semibold text-slate-500">
                  URL Slug
                </Label>
                <Input
                  id="catSlug"
                  type="text"
                  value={slug}
                  onChange={(e) => onSlugChange(e.target.value)}
                  placeholder="e.g. frontend-development"
                  disabled={isView}
                  className="text-[13px] px-3.5 py-2.5 h-10 outline-none focus:ring-1 focus:ring-[#6C1D5F]/40 focus:border-[#6C1D5F] disabled:bg-slate-50 disabled:text-slate-500 font-mono"
                />
              </div>

              {/* Parent Category */}
              <div className="space-y-1.5 text-left">
                <Label htmlFor="catParent" className="text-[12px] font-semibold text-slate-500">
                  Parent Category
                </Label>
                <select
                  id="catParent"
                  value={parentCat}
                  onChange={(e) => onParentCatChange(e.target.value)}
                  disabled={isView}
                  className="w-full text-[13px] px-3 h-10 border border-slate-200 rounded-lg bg-white outline-none focus:ring-1 focus:ring-[#6C1D5F]/40 focus:border-[#6C1D5F] disabled:bg-slate-50 disabled:text-slate-500 cursor-pointer"
                >
                  <option value="">— None (Top-level) —</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Design">Design</option>
                  <option value="Business">Business</option>
                  <option value="Data Science">Data Science</option>
                </select>
              </div>

              {/* Description */}
              <div className="space-y-1.5 text-left">
                <Label htmlFor="catDesc" className="text-[12px] font-semibold text-slate-500">
                  Short Description
                </Label>
                <Textarea
                  id="catDesc"
                  value={desc}
                  onChange={(e) => onDescChange(e.target.value)}
                  placeholder="Brief summary explaining what this topic covers..."
                  rows={2}
                  disabled={isView}
                  className="text-[13px] px-3.5 py-2.5 min-h-[60px] outline-none focus:ring-1 focus:ring-[#6C1D5F]/40 focus:border-[#6C1D5F] disabled:bg-slate-50 disabled:text-slate-500"
                />
              </div>

              {/* Long Description */}
              <div className="space-y-1.5 text-left">
                <Label htmlFor="catLongDesc" className="text-[12px] font-semibold text-slate-500">
                  Long Description
                </Label>
                <Textarea
                  id="catLongDesc"
                  value={longDesc}
                  onChange={(e) => onLongDescChange(e.target.value)}
                  placeholder="Detailed description, prerequisites, and learning path..."
                  rows={3}
                  disabled={isView}
                  className="text-[13px] px-3.5 py-2.5 min-h-[80px] outline-none focus:ring-1 focus:ring-[#6C1D5F]/40 focus:border-[#6C1D5F] disabled:bg-slate-50 disabled:text-slate-500"
                />
              </div>
            </div>
          )}

          {activeTab === "branding" && (
            <div className="space-y-4 animate-[fadeIn_0.2s_ease-out]">
              <div className="grid grid-cols-2 gap-4">
                {/* Cover Photo */}
                <div className="space-y-1.5 text-left">
                  <Label className="text-[12px] font-semibold text-slate-500">
                    Cover Photo
                  </Label>
                  <div className="relative w-full h-24 rounded-lg border border-dashed border-slate-200 bg-slate-50 overflow-hidden flex flex-col items-center justify-center">
                    {imagePreview ? (
                      <>
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="h-full w-full object-cover"
                        />
                        {!isView && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              onImageFileChange(null);
                            }}
                            className="absolute top-1.5 right-1.5 p-1 bg-red-500 hover:bg-red-600 text-white rounded shadow-md"
                            title="Remove cover"
                          >
                            <Trash2 size={11} />
                          </button>
                        )}
                      </>
                    ) : (
                      <div className="flex flex-col items-center text-slate-400">
                        <ImageOff size={16} />
                        <span className="text-[9px] mt-0.5 uppercase tracking-wider">No Image</span>
                      </div>
                    )}
                  </div>

                  {!isView && (
                    <label className="flex items-center gap-1.5 mt-1.5 cursor-pointer w-fit px-3 py-1.5 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 text-[11.5px] text-slate-600 font-bold transition-all shadow-sm">
                      <Upload size={12} />
                      <span>Upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </label>
                  )}
                </div>

                {/* Accent Color */}
                <div className="space-y-1.5 text-left">
                  <Label htmlFor="catAccent" className="text-[12px] font-semibold text-slate-500">
                    Accent Color
                  </Label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      id="catAccentPicker"
                      value={accentColor || "#6C1D5F"}
                      onChange={(e) => onAccentColorChange(e.target.value)}
                      disabled={isView}
                      className="w-10 h-10 border border-slate-200 rounded-lg cursor-pointer flex-shrink-0"
                    />
                    <Input
                      id="catAccent"
                      type="text"
                      value={accentColor}
                      onChange={(e) => onAccentColorChange(e.target.value)}
                      placeholder="#6C1D5F"
                      disabled={isView}
                      className="text-[13px] px-3 py-2.5 h-10 outline-none focus:ring-1 focus:ring-[#6C1D5F]/40 focus:border-[#6C1D5F] disabled:bg-slate-50 disabled:text-slate-500 font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Emoji Box */}
                <div className="space-y-1.5 text-left relative">
                  <Label htmlFor="catEmoji" className="text-[12px] font-semibold text-slate-500">
                    Category Emoji
                  </Label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => !isView && setShowEmojiPicker(!showEmojiPicker)}
                      disabled={isView}
                      className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-xl select-none cursor-pointer hover:bg-slate-100 hover:border-[#6C1D5F] transition-colors shrink-0 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {emoji || "📁"}
                    </button>
                    <Input
                      id="catEmoji"
                      type="text"
                      value={emoji}
                      onChange={(e) => onEmojiChange(e.target.value)}
                      placeholder="e.g. ⚙️"
                      disabled={isView}
                      className="text-[13px] px-3.5 py-2.5 h-10 outline-none focus:ring-1 focus:ring-[#6C1D5F]/40 focus:border-[#6C1D5F] disabled:bg-slate-50 disabled:text-slate-500"
                    />
                  </div>
                  {showEmojiPicker && (
                    <div className="absolute z-50 bottom-12 left-0 shadow-2xl">
                      <EmojiPicker
                        onSelect={(val) => {
                          onEmojiChange(val);
                          setShowEmojiPicker(false);
                        }}
                        onClose={() => setShowEmojiPicker(false)}
                      />
                    </div>
                  )}
                </div>

                {/* Featured Switch/Checkbox */}
                <div className="space-y-1.5 flex flex-col justify-end pb-2.5 text-left">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={featured}
                      onChange={(e) => onFeaturedChange(e.target.checked)}
                      disabled={isView}
                      className="w-4.5 h-4.5 rounded border-slate-300 text-[#6C1D5F] focus:ring-[#6C1D5F]/40 accent-[#6C1D5F] cursor-pointer disabled:opacity-50"
                    />
                    <div>
                      <div className="text-[13px] font-semibold text-slate-700">Featured Category</div>
                      <div className="text-[10px] text-slate-400">Promote this category</div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === "seo" && (
            <div className="space-y-4 animate-[fadeIn_0.2s_ease-out]">
              <div className="grid grid-cols-2 gap-4 text-left">
                {/* Visibility Status */}
                <div className="space-y-1.5">
                  <Label className="text-[12px] font-semibold text-slate-500">
                    Visibility Status
                  </Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        disabled={isView}
                        className="w-full justify-between h-10 px-3 border border-slate-200 font-normal text-slate-700 text-[13px] bg-white hover:bg-slate-50 disabled:bg-slate-50 disabled:text-slate-500 rounded-lg transition-all text-left"
                      >
                        {status}
                        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white border border-slate-200 shadow-md rounded-lg z-50">
                      <DropdownMenuRadioGroup value={status} onValueChange={(val) => onStatusChange(val)}>
                        <DropdownMenuRadioItem
                          value="Active"
                          className="text-slate-700 text-xs hover:bg-slate-50 py-1.5 px-3 rounded-md cursor-pointer"
                        >
                          Active
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem
                          value="Inactive"
                          className="text-slate-700 text-xs hover:bg-slate-50 py-1.5 px-3 rounded-md cursor-pointer"
                        >
                          Inactive
                        </DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Publish State */}
                <div className="space-y-1.5">
                  <Label className="text-[12px] font-semibold text-slate-500">
                    Publish State
                  </Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        disabled={isView}
                        className="w-full justify-between h-10 px-3 border border-slate-200 font-normal text-slate-700 text-[13px] bg-white hover:bg-slate-50 disabled:bg-slate-50 disabled:text-slate-500 rounded-lg transition-all text-left"
                      >
                        {publishState}
                        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white border border-slate-200 shadow-md rounded-lg z-50">
                      <DropdownMenuRadioGroup value={publishState} onValueChange={(val) => onPublishStateChange(val)}>
                        <DropdownMenuRadioItem
                          value="Published"
                          className="text-slate-700 text-xs hover:bg-slate-50 py-1.5 px-3 rounded-md cursor-pointer"
                        >
                          Published
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem
                          value="Draft"
                          className="text-slate-700 text-xs hover:bg-slate-50 py-1.5 px-3 rounded-md cursor-pointer"
                        >
                          Draft
                        </DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Meta Title */}
              <div className="space-y-1.5 text-left">
                <Label htmlFor="catMetaTitle" className="text-[12px] font-semibold text-slate-500">
                  Meta Title
                </Label>
                <Input
                  id="catMetaTitle"
                  type="text"
                  value={metaTitle}
                  onChange={(e) => onMetaTitleChange(e.target.value)}
                  placeholder="SEO Page Title"
                  disabled={isView}
                  className="text-[13px] px-3.5 py-2.5 h-10 outline-none focus:ring-1 focus:ring-[#6C1D5F]/40 focus:border-[#6C1D5F] disabled:bg-slate-50 disabled:text-slate-500"
                />
              </div>

              {/* Meta Description */}
              <div className="space-y-1.5 text-left">
                <Label htmlFor="catMetaDesc" className="text-[12px] font-semibold text-slate-500">
                  Meta Description
                </Label>
                <Textarea
                  id="catMetaDesc"
                  value={metaDesc}
                  onChange={(e) => onMetaDescChange(e.target.value)}
                  placeholder="SEO Search result snippet..."
                  rows={2}
                  disabled={isView}
                  className="text-[13px] px-3.5 py-2.5 min-h-[50px] outline-none focus:ring-1 focus:ring-[#6C1D5F]/40 focus:border-[#6C1D5F] disabled:bg-slate-50 disabled:text-slate-500"
                />
              </div>

              {/* Focus Keyword */}
              <div className="space-y-1.5 text-left">
                <Label htmlFor="catFocusKeyword" className="text-[12px] font-semibold text-slate-500">
                  Focus Keyword
                </Label>
                <Input
                  id="catFocusKeyword"
                  type="text"
                  value={focusKeyword}
                  onChange={(e) => onFocusKeywordChange(e.target.value)}
                  placeholder="e.g. react, engineering"
                  disabled={isView}
                  className="text-[13px] px-3.5 py-2.5 h-10 outline-none focus:ring-1 focus:ring-[#6C1D5F]/40 focus:border-[#6C1D5F] disabled:bg-slate-50 disabled:text-slate-500"
                />
              </div>

              {/* Tags */}
              <div className="space-y-1.5 text-left">
                <Label htmlFor="catTags" className="text-[12px] font-semibold text-slate-500">
                  Tags (Comma-separated)
                </Label>
                <Input
                  id="catTags"
                  type="text"
                  value={Array.isArray(tags) ? tags.join(", ") : tags || ""}
                  onChange={(e) => {
                    const tList = e.target.value.split(",").map(t => t.trim()).filter(Boolean);
                    onTagsChange(tList);
                  }}
                  placeholder="e.g. frontend, ui, react"
                  disabled={isView}
                  className="text-[13px] px-3.5 py-2.5 h-10 outline-none focus:ring-1 focus:ring-[#6C1D5F]/40 focus:border-[#6C1D5F] disabled:bg-slate-50 disabled:text-slate-500"
                />
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <DialogFooter className="pt-4 border-t border-slate-50 flex items-center justify-end gap-2.5">
            {isView ? (
              <Button
                type="button"
                onClick={onClose}
                className="bg-[#6C1D5F] hover:bg-[#521347] text-white text-[12.5px] font-semibold px-6 cursor-pointer"
              >
                Close
              </Button>
            ) : (
              <>
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="text-[12.5px] font-semibold cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="bg-[#6C1D5F] hover:bg-[#521347] text-white text-[12.5px] font-semibold px-6 shadow-sm shadow-[#6C1D5F]/10 cursor-pointer"
                >
                  {submitting
                    ? "Saving..."
                    : mode === "edit"
                      ? "Save Changes"
                      : "Save Category"}
                </Button>
              </>
            )}
          </DialogFooter>

        </form>
      </DialogContent>
    </Dialog>
  );
}