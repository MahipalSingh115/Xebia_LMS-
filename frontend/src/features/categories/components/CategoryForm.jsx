import React, { useState } from "react";
import {
  Info, Palette, AlignLeft, ToggleRight, Search as SearchIcon, CheckCircle, X, TrendingUp, Link, List, Code,
  Upload, Image as ImageIcon
} from "lucide-react";
import EmojiPicker from "@/shared/components/EmojiPicker";

/* ─── Preset colors ──────────────────────────────────────────────── */
const PRESET_COLORS = ["#6366f1", "#22c55e", "#7c3aed", "#f59e0b", "#2563eb", "#0891b2", "#e11d48", "#059669", "#d97706"];

/* ─── Quick-pick emojis ──────────────────────────────────────────── */
const EMOJIS = ["⚛️", "☁️", "🤖", "🔐", "📐", "🛠️", "📊", "📱", "🧪", "🏗️"];

export default function CategoryForm({
  form,
  update,
  removeTag,
  imagePreview,
  handleImageChange,
  setImageFile,
  setImagePreview,
  seoBarWidth,
  seoBarColor,
}) {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div className="space-y-6">
      {/* ── CARD 1: Basic Information ─────────────────────────── */}
      <FormCard
        icon={<Info size={15} />}
        iconCls="bg-[#eef2ff] text-[#6C1D5F]"
        title="Basic Information"
        subtitle="Core identity fields for this category"
        badge={
          form.name.trim() && form.slug.trim() ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">
              <CheckCircle size={10} />Complete
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full">
              Incomplete
            </span>
          )
        }
      >
        <div className="grid grid-cols-2 gap-x-12 gap-y-0 divide-x divide-slate-100 text-left">
          <div className="pr-8 space-y-4">
            <FieldRow label="Category Name" required hint={`${form.name.length} / 60`}>
              <input
                className="field-input w-full"
                value={form.name}
                onChange={e => { update("name", e.target.value); update("slug", e.target.value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")); }}
                placeholder="e.g. Cloud & DevOps"
              />
            </FieldRow>
            <FieldRow label="URL Slug" required hint="Auto-generated from category name. Click pencil to edit.">
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-[13px]">
                <span className="text-slate-400">xebia.com/categories/</span>
                <span className="text-[#6C1D5F] font-semibold">{form.slug}</span>
              </div>
            </FieldRow>
          </div>
          <div className="pl-8 space-y-4">
            <FieldRow label="Parent Category" hint="Leave empty to create a root-level category.">
              <select className="field-select w-full" value={form.parentCat} onChange={e => update("parentCat", e.target.value)}>
                <option value="">— None (Top-level) —</option>
                <option>Engineering</option><option>Design</option><option>Business</option><option>Data Science</option>
              </select>
            </FieldRow>
          </div>
        </div>
      </FormCard>

      {/* ── CARD 2: Branding ─────────────────────────────────── */}
      <FormCard
        icon={<Palette size={15} />}
        iconCls="bg-purple-50 text-purple-600"
        title="Branding"
        subtitle="Visual identity — icon, color, and cover image"
        badge={
          form.emoji && form.accentColor ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">
              <CheckCircle size={10} />Complete
            </span>
          ) : (
            <span className="inline-flex items-center text-[11px] font-semibold bg-[#eef2ff] text-[#6C1D5F] border border-[#c7d2fe] px-2 py-0.5 rounded-full">
              In Progress
            </span>
          )
        }
      >
        <div className="space-y-4 text-left">
          {/* Emoji picker */}
          <FieldRow label="Category Icon / Emoji">
            <div className="flex items-center gap-3 relative">
              <button
                type="button"
                onClick={() => setShowPicker(!showPicker)}
                className="w-16 h-16 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 flex items-center justify-center text-3xl cursor-pointer hover:border-[#6C1D5F] hover:bg-slate-100 transition-colors flex-shrink-0"
              >
                {form.emoji || "📁"}
              </button>
              <div>
                <div className="text-[12px] font-semibold text-slate-700 mb-2">Quick pick</div>
                <div className="flex gap-2 flex-wrap items-center">
                  {EMOJIS.map(e => (
                    <button
                      key={e}
                      type="button"
                      onClick={() => update("emoji", e)}
                      className={`w-9 h-9 rounded-md border flex items-center justify-center text-lg transition-all cursor-pointer ${form.emoji === e
                        ? "border-[#6C1D5F] bg-[#eef2ff]"
                        : "border-slate-200 bg-slate-50 hover:border-slate-300"
                        }`}
                    >
                      {e}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setShowPicker(!showPicker)}
                    className="px-2 py-1 text-[12px] font-medium text-slate-500 border border-slate-200 rounded-md bg-white hover:bg-slate-50 cursor-pointer"
                  >
                    Browse all…
                  </button>
                </div>
              </div>

              {showPicker && (
                <div className="absolute z-50 top-18 left-0 shadow-2xl">
                  <EmojiPicker
                    onSelect={(val) => {
                      update("emoji", val);
                      setShowPicker(false);
                    }}
                    onClose={() => setShowPicker(false)}
                  />
                </div>
              )}
            </div>
          </FieldRow>

          {/* Accent color */}
          <FieldRow label="Accent Color" required hint="Used for the top accent bar and background tint on the category card.">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex gap-2 flex-wrap">
                {PRESET_COLORS.map(c => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => { update("accentColor", c); update("hexInput", c); }}
                    className={`w-7 h-7 rounded-md cursor-pointer border-2 transition-all flex-shrink-0 ${form.accentColor === c ? "border-slate-800" : "border-transparent"}`}
                    style={{ background: c }}
                  />
                ))}
              </div>
              <div className="w-px h-7 bg-slate-200" />
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-md border border-slate-200 flex-shrink-0" style={{ background: form.accentColor }} />
                <input
                  value={form.hexInput}
                  onChange={e => { update("hexInput", e.target.value); if (/^#[0-9a-fA-F]{6}$/.test(e.target.value)) update("accentColor", e.target.value); }}
                  className="w-24 bg-white border border-slate-200 rounded-md px-2.5 py-1.5 text-[12px] font-mono text-slate-700 outline-none focus:border-[#6C1D5F]"
                  placeholder="#000000"
                />
              </div>
            </div>
          </FieldRow>

          {/* Cover image upload */}
          <FieldRow label="Cover Image">
            <input
              type="file"
              id="category-image-upload"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            <div
              onClick={() => document.getElementById("category-image-upload").click()}
              className="border-2 border-dashed border-slate-200 rounded-lg p-6 text-center cursor-pointer hover:border-[#6C1D5F] transition-colors bg-slate-50 relative overflow-hidden"
            >
              {imagePreview ? (
                <div className="flex flex-col items-center">
                  <img src={imagePreview} className="max-h-32 object-contain rounded mb-2" alt="Preview" />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setImageFile(null);
                      setImagePreview("");
                    }}
                    className="px-2.5 py-1 text-[11px] font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded border border-red-200"
                  >
                    Remove File
                  </button>
                </div>
              ) : (
                <>
                  <ImageIcon size={28} className="text-slate-300 mx-auto mb-2" />
                  <div className="text-[13px] font-semibold text-slate-700 mb-1">Drop an image here, or click to browse</div>
                  <div className="text-[11px] text-slate-400 mb-3">PNG, JPG, WebP — recommended 1200 × 630px, max 2 MB</div>
                  <button
                    type="button"
                    className="flex items-center gap-1.5 px-2.5 py-1.5 text-[12px] font-medium text-slate-600 border border-slate-200 rounded-md bg-white hover:bg-slate-50 mx-auto"
                  >
                    <Upload size={12} /> Choose File
                  </button>
                </>
              )}
            </div>
          </FieldRow>
        </div>
      </FormCard>

      {/* ── CARD 3: Description ───────────────────────────────── */}
      <FormCard
        icon={<AlignLeft size={15} />}
        iconCls="bg-amber-50 text-amber-600"
        title="Description"
        subtitle="Short and detailed descriptions shown to learners"
      >
        <div className="space-y-4 text-left">
          <FieldRow label="Short Description" required hint="Used on category cards and listing pages. Keep it under 160 chars.">
            <textarea
              className="field-input w-full min-h-[72px] resize-none leading-relaxed"
              value={form.shortDesc}
              onChange={e => update("shortDesc", e.target.value)}
              placeholder="Briefly describe what this category covers..."
              maxLength={160}
            />
            <div className="flex items-center justify-between mt-1">
              <div className="h-1.5 flex-1 bg-slate-100 rounded-full overflow-hidden mr-4">
                <div className={`h-full rounded-full ${seoBarColor(seoBarWidth(form.shortDesc.length, 160))}`} style={{ width: `${seoBarWidth(form.shortDesc.length, 160)}%` }} />
              </div>
              <span className="text-[11px] text-slate-400 flex-shrink-0">{form.shortDesc.length} / 160</span>
            </div>
          </FieldRow>

          <FieldRow label="Long Description">
            <div className="border border-slate-200 rounded-md overflow-hidden">
              {/* Mini toolbar */}
              <div className="flex items-center gap-1 px-2 py-1.5 bg-slate-50 border-b border-slate-200">
                {[["B", "font-bold"], ["I", "italic"], ["U", "underline"]].map(([t, s]) => (
                  <button key={t} type="button" className="w-7 h-7 flex items-center justify-center rounded hover:bg-slate-200 text-slate-600">
                    <span className={`text-[13px] ${s}`}>{t}</span>
                  </button>
                ))}
                <div className="w-px h-4 bg-slate-200 mx-1" />
                <button type="button" className="w-7 h-7 flex items-center justify-center rounded hover:bg-slate-200 text-slate-500"><Link size={13} /></button>
                <button type="button" className="w-7 h-7 flex items-center justify-center rounded hover:bg-slate-200 text-slate-500"><List size={13} /></button>
                <button type="button" className="w-7 h-7 flex items-center justify-center rounded hover:bg-slate-200 text-slate-500"><Code size={13} /></button>
                <div className="w-px h-4 bg-slate-200 mx-1" />
                <select className="text-[12px] bg-transparent border-none outline-none text-slate-500 cursor-pointer">
                  <option>Paragraph</option><option>Heading 2</option><option>Heading 3</option>
                </select>
              </div>
              <textarea
                className="w-full px-3 py-2.5 text-[13px] text-slate-700 leading-relaxed outline-none min-h-[120px] resize-none border-none animate-none"
                value={form.longDesc}
                onChange={e => update("longDesc", e.target.value)}
                placeholder="Write a detailed description for learners browsing this category…"
              />
            </div>
            <div className="text-right text-[11px] text-slate-400 mt-1">{form.longDesc.length} chars</div>
          </FieldRow>
        </div>
      </FormCard>

      {/* ── CARD 4: Status & Visibility ───────────────────────── */}
      <FormCard
        icon={<ToggleRight size={15} />}
        iconCls="bg-emerald-50 text-emerald-600"
        title="Status & Visibility"
        subtitle="Control how and when this category is visible"
      >
        <div className="space-y-4 text-left">
          <FieldRow label="Publication Status">
            <select className="field-select max-w-[260px]" value={form.status} onChange={e => update("status", e.target.value)}>
              <option>Draft</option><option>Published</option><option>Archived</option><option>Scheduled</option>
            </select>
          </FieldRow>

          <div className="h-px bg-slate-100 my-4" />

          {[
            { field: "visibleCatalog", label: "Visible in Catalog", desc: "Show this category on the public course catalog page" },
            { field: "featured", label: "Featured Category", desc: "Pin to the homepage featured categories section" },
            { field: "allowEnroll", label: "Allow Enrollment", desc: "Learners can directly enroll in courses under this category" },
            { field: "showNav", label: "Show in Navigation", desc: "Appear in the top navigation menu for learners" },
          ].map((sw) => (
            <div key={sw.field} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
              <div>
                <div className="text-[13px] font-semibold text-slate-800">{sw.label}</div>
                <div className="text-[12px] text-slate-400 mt-0.5">{sw.desc}</div>
              </div>
              <div
                className={`w-10 h-[22px] rounded-full relative cursor-pointer flex-shrink-0 transition-colors ${form[sw.field] ? "bg-[#6C1D5F]" : "bg-slate-200"}`}
                onClick={() => update(sw.field, !form[sw.field])}
              >
                <div className={`w-[18px] h-[18px] rounded-full bg-white absolute top-[2px] shadow-sm transition-all ${form[sw.field] ? "left-[20px]" : "left-[2px]"}`} />
              </div>
            </div>
          ))}
        </div>
      </FormCard>

      {/* ── CARD 5: SEO ───────────────────────────────────────── */}
      <FormCard
        icon={<SearchIcon size={15} />}
        iconCls="bg-blue-50 text-blue-600"
        title="SEO & Metadata"
        subtitle="Optimize search engine visibility for this category"
        badge={<div className="flex items-center gap-1.5 text-[12px] font-semibold text-emerald-600"><TrendingUp size={13} />SEO Score: 78/100</div>}
      >
        <div className="space-y-4 text-left">
          <FieldRow label="Meta Title" required hint="Ideal length: 50–60 characters">
            <input className="field-input w-full" value={form.metaTitle} onChange={e => update("metaTitle", e.target.value)} placeholder="Page title shown in search results" />
            <div className="mt-1.5">
              <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${seoBarColor(seoBarWidth(form.metaTitle.length, 60))}`} style={{ width: `${seoBarWidth(form.metaTitle.length, 60)}%` }} />
              </div>
              <div className="text-right text-[11px] text-slate-400 mt-0.5">{form.metaTitle.length} / 60</div>
            </div>
          </FieldRow>

          <FieldRow label="Meta Description" required hint="Ideal length: 120–160 characters">
            <textarea className="field-input w-full min-h-[72px] resize-none leading-relaxed animate-none" value={form.metaDesc} onChange={e => update("metaDesc", e.target.value)} placeholder="Brief description for search engine result snippets" />
            <div className="mt-1.5">
              <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${seoBarColor(seoBarWidth(form.metaDesc.length, 160))}`} style={{ width: `${seoBarWidth(form.metaDesc.length, 160)}%` }} />
              </div>
              <div className="text-right text-[11px] text-slate-400 mt-0.5">{form.metaDesc.length} / 160</div>
            </div>
          </FieldRow>

          <FieldRow label="Focus Keyword">
            <input className="field-input w-full" value={form.focusKeyword} onChange={e => update("focusKeyword", e.target.value)} placeholder="Primary keyword to optimize for" />
          </FieldRow>

          <FieldRow label="Tags & Keywords">
            <div className="flex flex-wrap gap-1.5 items-center bg-white border border-slate-200 rounded-md px-3 py-2 min-h-[40px]">
              {form.tags.map(tag => (
                <span key={tag} className="flex items-center gap-1 bg-[#eef2ff] text-[#4338ca] border border-[#c7d2fe] rounded-full px-2.5 py-0.5 text-[12px] font-medium">
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)} className="text-[#6366f1] ml-0.5 hover:text-[#4338ca]"><X size={10} /></button>
                </span>
              ))}
              <input className="border-none outline-none text-[12px] text-slate-700 bg-transparent min-w-[80px] flex-1" placeholder="Add tag…" />
            </div>
          </FieldRow>
        </div>
      </FormCard>
    </div>
  );
}

/* ─── Local Components ────────────────────────────────────────────── */

function FormCard({ icon, iconCls, title, subtitle, badge, children }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 ${iconCls}`}>{icon}</div>
          <div>
            <div className="text-[14px] font-bold text-slate-900">{title}</div>
            {subtitle && <div className="text-[12px] text-slate-400 mt-px">{subtitle}</div>}
          </div>
        </div>
        {badge}
      </div>
      <div className="px-6 py-5">{children}</div>
    </div>
  );
}

function FieldRow({ label, required, hint, children }) {
  return (
    <div className="mb-4 last:mb-0">
      {label && (
        <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      {children}
      {hint && <div className="text-[11px] text-slate-400 mt-1">{hint}</div>}
    </div>
  );
}
