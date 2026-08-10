import React from "react";
import {
  Type,
  AlignLeft,
  Bold,
  Italic,
  List,
  Link2,
  Image,
  Maximize2,
  Video,
  FileText,
  ExternalLink,
  Heading,
  Quote,
  Minus,
  Code2,
  Download,
  Volume2,
  AlertCircle as CalloutIcon,
  LayoutTemplate,
  BookOpen,
  Plus,
  Save,
  Clock,
  Layers,
  GripVertical,
  Edit,
  Trash2,
  HelpCircle,
  CheckSquare,
} from "lucide-react";
import { getContentIcon, getContentLabel, getContentType } from "@/features/courses/utils/curriculumHelpers";
import EmptyState from "@/shared/components/EmptyState";
import SafeMediaEmbed from "./SafeMediaEmbed";

export default function CurriculumEditor({
  activeSubModule,
  parentModuleLabel,
  modules,
  editorRef,
  setBlockPickerOpen,
  setBlockSearch,
  openEditSubModuleDrawer,
  openEditBlockDialog,
  requestDelete,
  handlePublishCourse,
  course,
  openAddModuleModal,
  openCourseDialog,
}) {
  return (
    <main className="flex-1 flex flex-col overflow-hidden bg-[#f8f7fc]">
      {/* Editor Sub-header */}
      {activeSubModule ? (
        <div className="h-[50px] bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
              getContentType(activeSubModule) ? "bg-[#6C1D5F]/10 text-[#6C1D5F]" : "bg-slate-100 text-slate-400"
            }`}>
              {getContentIcon(activeSubModule, 14)}
            </div>
            <div className="min-w-0">
              <h2 className="text-[14px] font-bold text-slate-800 truncate leading-tight">{activeSubModule.title}</h2>
              <p className="text-[10.5px] text-slate-400 font-medium leading-tight truncate">
                {parentModuleLabel} · {getContentLabel(activeSubModule)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => openEditSubModuleDrawer(activeSubModule)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg text-[11.5px] font-semibold transition-colors cursor-pointer"
            >
              <PenLine size={12} /> Edit Block
            </button>
          </div>
        </div>
      ) : (
        <div className="h-[50px] bg-white border-b border-slate-200 px-6 flex items-center shrink-0">
          <p className="text-[12.5px] text-slate-400 font-medium">Select a block from the curriculum to start editing</p>
        </div>
      )}

      {/* Canvas */}
      <div ref={editorRef} className="flex-1 overflow-y-auto">
        {activeSubModule ? (
          <div className="max-w-[760px] mx-auto px-6 py-8 space-y-3">
            {/* ── Block Title Block ─────────────────── */}
            <div className="group/block relative">
              <div className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all">
                <div className="flex items-center gap-2 mb-4">
                  <Type size={14} className="text-[#6C1D5F]/60 shrink-0" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Block Title</span>
                </div>
                <h1 className="text-[26px] font-bold text-slate-800 leading-tight">
                  {activeSubModule.title}
                </h1>
                {activeSubModule.description && (
                  <p className="mt-2 text-[14px] text-slate-500 leading-relaxed">
                    {activeSubModule.description}
                  </p>
                )}
              </div>
              <AddBlockDivider onClick={() => openEditBlockDialog(activeSubModule, null)} />
            </div>

            {/* ── Dynamic Block Rendering ─────────── */}
            {activeSubModule.blocks && activeSubModule.blocks.length > 0 ? (
              activeSubModule.blocks.map((c) => {
                const bt = c.blockType || "";

                // Heading block
                if (bt === "heading") {
                  return (
                    <div key={c.id} className="group/block relative">
                      <ContentBlock
                        icon={<Heading size={14} />}
                        label="Section Heading"
                        badge="heading"
                        onEdit={() => openEditBlockDialog(activeSubModule, c)}
                        onDelete={() => requestDelete("block", c)}
                      >
                        <h2 className="text-2xl font-bold text-slate-800">{c.content}</h2>
                      </ContentBlock>
                      <AddBlockDivider onClick={() => openEditBlockDialog(activeSubModule, null)} />
                    </div>
                  );
                }

                // Quote block
                if (bt === "quote") {
                  return (
                    <div key={c.id} className="group/block relative">
                      <ContentBlock
                        icon={<Quote size={14} />}
                        label="Quote"
                        badge="quote"
                        onEdit={() => openEditBlockDialog(activeSubModule, c)}
                        onDelete={() => requestDelete("block", c)}
                      >
                        <div className="p-4 border-l-4 border-[#6C1D5F] bg-[#6C1D5F]/3 rounded-r-xl">
                          <p className="text-[15px] text-slate-600 italic leading-relaxed">"{c.content}"</p>
                        </div>
                      </ContentBlock>
                      <AddBlockDivider onClick={() => openEditBlockDialog(activeSubModule, null)} />
                    </div>
                  );
                }

                // Divider block
                if (bt === "divider") {
                  const style = c.content || "solid";
                  return (
                    <div key={c.id} className="group/block relative">
                      <ContentBlock
                        icon={<Minus size={14} />}
                        label="Divider"
                        badge="divider"
                        onEdit={() => openEditBlockDialog(activeSubModule, c)}
                        onDelete={() => requestDelete("block", c)}
                      >
                        <div className="py-4 flex items-center justify-center">
                          <div className={`w-full h-0 border-t-2 ${
                            style === "dashed" ? "border-dashed" :
                            style === "dotted" ? "border-dotted" : "border-solid"
                          } border-slate-300`} />
                        </div>
                      </ContentBlock>
                      <AddBlockDivider onClick={() => openEditBlockDialog(activeSubModule, null)} />
                    </div>
                  );
                }

                // Image block
                if (bt === "image") {
                  let alt = "", caption = "";
                  try { const meta = JSON.parse(c.content || "{}"); alt = meta.alt || ""; caption = meta.caption || ""; } catch {}
                  return (
                    <div key={c.id} className="group/block relative">
                      <ContentBlock
                        icon={<Image size={14} />}
                        label="Image"
                        badge="image"
                        highlighted
                        onEdit={() => openEditBlockDialog(activeSubModule, c)}
                        onDelete={() => requestDelete("block", c)}
                      >
                        <div className="space-y-2">
                          {c.imageUrl && (
                            <div className="rounded-xl overflow-hidden border border-slate-200 shadow-md">
                              <img src={c.imageUrl} alt={alt} className="w-full max-h-[400px] object-contain bg-slate-100" />
                            </div>
                          )}
                          {caption && <p className="text-[12px] text-slate-500 text-center italic">{caption}</p>}
                        </div>
                      </ContentBlock>
                      <AddBlockDivider onClick={() => openEditBlockDialog(activeSubModule, null)} />
                    </div>
                  );
                }

                // Code block
                if (bt === "code") {
                  let code = c.content || "", language = "javascript";
                  try { const meta = JSON.parse(c.content || "{}"); code = meta.code || ""; language = meta.language || "javascript"; } catch {}
                  return (
                    <div key={c.id} className="group/block relative">
                      <ContentBlock
                        icon={<Code2 size={14} />}
                        label="Code Snippet"
                        badge={language}
                        onEdit={() => openEditBlockDialog(activeSubModule, c)}
                        onDelete={() => requestDelete("block", c)}
                      >
                        <div className="rounded-xl overflow-hidden border border-slate-700">
                          <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{language}</span>
                          </div>
                          <pre className="p-4 bg-slate-900 text-slate-100 text-[13px] font-mono overflow-x-auto leading-relaxed whitespace-pre-wrap">
                            <code>{code}</code>
                          </pre>
                        </div>
                      </ContentBlock>
                      <AddBlockDivider onClick={() => openEditBlockDialog(activeSubModule, null)} />
                    </div>
                  );
                }

                // Download / File block
                if (bt === "download" || bt === "file") {
                  const fileUrl = c.pdfUrl || c.imageUrl || "";
                  const displayName = c.content || "Downloadable File";
                  return (
                    <div key={c.id} className="group/block relative">
                      <ContentBlock
                        icon={<Download size={14} />}
                        label={bt === "file" ? "File Attachment" : "Downloadable Resource"}
                        badge={bt}
                        onEdit={() => openEditBlockDialog(activeSubModule, c)}
                        onDelete={() => requestDelete("block", c)}
                      >
                        <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100 shrink-0">
                              <Download size={20} />
                            </div>
                            <div className="min-w-0">
                              <p className="text-[13px] font-bold text-slate-700 truncate">{displayName}</p>
                              {fileUrl && <p className="text-[10.5px] text-slate-400 font-medium truncate max-w-[280px]">{fileUrl.split("/").pop()}</p>}
                            </div>
                          </div>
                          {fileUrl && (
                            <a href={fileUrl} target="_blank" rel="noreferrer"
                              className="flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200 hover:border-[#6C1D5F] text-slate-600 hover:text-[#6C1D5F] rounded-lg text-[12px] font-bold shadow-sm transition-all shrink-0 cursor-pointer"
                            >
                              <Download size={13} /> Download
                            </a>
                          )}
                        </div>
                      </ContentBlock>
                      <AddBlockDivider onClick={() => openEditBlockDialog(activeSubModule, null)} />
                    </div>
                  );
                }

                // Link block
                if (bt === "link") {
                  const url = c.videoUrl || c.imageUrl || "";
                  const text = c.content || url;
                  return (
                    <div key={c.id} className="group/block relative">
                      <ContentBlock
                        icon={<Link2 size={14} />}
                        label="External Link"
                        badge="link"
                        onEdit={() => openEditBlockDialog(activeSubModule, c)}
                        onDelete={() => requestDelete("block", c)}
                      >
                        <div className="flex items-center gap-3 p-4 bg-blue-50/50 border border-blue-100 rounded-xl">
                          <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                            <ExternalLink size={16} />
                          </div>
                          <a href={url} target="_blank" rel="noreferrer" className="text-[14px] font-semibold text-blue-700 hover:underline break-all">{text}</a>
                        </div>
                      </ContentBlock>
                      <AddBlockDivider onClick={() => openEditBlockDialog(activeSubModule, null)} />
                    </div>
                  );
                }

                // Embed block
                if (bt === "embed") {
                  const url = c.videoUrl || c.imageUrl || "";
                  const title = c.content || "Embedded Content";
                  return (
                    <div key={c.id} className="group/block relative">
                      <ContentBlock
                        icon={<ExternalLink size={14} />}
                        label="Embedded Resource"
                        badge="embed"
                        highlighted
                        onEdit={() => openEditBlockDialog(activeSubModule, c)}
                        onDelete={() => requestDelete("block", c)}
                      >
                        <div className="space-y-3">
                          <p className="text-[13px] text-slate-500 font-medium">{title}</p>
                          {url && (
                            <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-900 border border-slate-800 shadow-inner">
                              <SafeMediaEmbed url={url} title={title} />
                            </div>
                          )}
                        </div>
                      </ContentBlock>
                      <AddBlockDivider onClick={() => openEditBlockDialog(activeSubModule, null)} />
                    </div>
                  );
                }

                // Callout block
                if (bt === "callout") {
                  return (
                    <div key={c.id} className="group/block relative">
                      <ContentBlock
                        icon={<CalloutIcon size={14} />}
                        label="Callout"
                        badge="callout"
                        onEdit={() => openEditBlockDialog(activeSubModule, c)}
                        onDelete={() => requestDelete("block", c)}
                      >
                        <div className="p-4 bg-blue-50 border border-blue-100 text-blue-800 rounded-xl text-[14px] flex gap-3 leading-relaxed">
                          <CalloutIcon size={18} className="text-blue-500 shrink-0 mt-0.5" />
                          <span>{c.content}</span>
                        </div>
                      </ContentBlock>
                      <AddBlockDivider onClick={() => openEditBlockDialog(activeSubModule, null)} />
                    </div>
                  );
                }

                // Audio block
                if (bt === "audio") {
                  const audioUrl = c.videoUrl || "";
                  const audioTitle = c.content || "Audio";
                  return (
                    <div key={c.id} className="group/block relative">
                      <ContentBlock
                        icon={<Volume2 size={14} />}
                        label="Audio"
                        badge="audio"
                        onEdit={() => openEditBlockDialog(activeSubModule, c)}
                        onDelete={() => requestDelete("block", c)}
                      >
                        <div className="space-y-3">
                          <p className="text-[13px] font-bold text-slate-700">{audioTitle}</p>
                          {audioUrl && (
                            <audio controls className="w-full rounded-lg" src={audioUrl}>
                              Your browser does not support the audio element.
                            </audio>
                          )}
                        </div>
                      </ContentBlock>
                      <AddBlockDivider onClick={() => openEditBlockDialog(activeSubModule, null)} />
                    </div>
                  );
                }

                // Paragraph/Text block
                if (bt === "paragraph" || bt === "text") {
                  return (
                    <div key={c.id} className="group/block relative">
                      <ContentBlock
                        icon={<AlignLeft size={14} />}
                        label="Paragraph"
                        badge="paragraph"
                        onEdit={() => openEditBlockDialog(activeSubModule, c)}
                        onDelete={() => requestDelete("block", c)}
                      >
                        <div className="text-[14px] text-slate-600 leading-relaxed whitespace-pre-wrap">
                          {c.content}
                        </div>
                      </ContentBlock>
                      <AddBlockDivider onClick={() => openEditBlockDialog(activeSubModule, null)} />
                    </div>
                  );
                }

                // Quiz block
                if (bt === "quiz") {
                  let questions = [];
                  try {
                    const parsed = JSON.parse(c.content || "[]");
                    questions = Array.isArray(parsed) ? parsed : parsed.questions || [];
                  } catch {}
                  return (
                    <div key={c.id} className="group/block relative">
                      <ContentBlock
                        icon={<HelpCircle size={14} />}
                        label="Quiz Assessment"
                        badge="quiz"
                        highlighted
                        onEdit={() => openEditBlockDialog(activeSubModule, c)}
                        onDelete={() => requestDelete("block", c)}
                      >
                        <div className="space-y-4">
                          <div className="pb-2 border-b border-slate-100 flex items-center justify-between">
                            <span className="text-[12px] font-bold text-slate-500">{questions.length} Questions</span>
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full uppercase tracking-wider">Active</span>
                          </div>
                          {questions.length === 0 ? (
                            <p className="text-[12.5px] text-slate-400 italic">No questions added yet. Click edit to configure.</p>
                          ) : (
                            <div className="space-y-4">
                              {questions.map((q, qIdx) => (
                                <div key={qIdx} className="space-y-2 p-3 bg-slate-50/50 rounded-xl border border-slate-100">
                                  <p className="text-[13px] font-bold text-slate-800">
                                    {qIdx + 1}. {q.text || <span className="text-slate-400 italic">Untitled question</span>}
                                  </p>
                                  <div className="grid grid-cols-2 gap-2 pl-4">
                                    {q.options?.map((opt, oIdx) => (
                                      <div key={oIdx} className={`flex items-center gap-2 p-2 rounded-lg text-[12px] border ${
                                        opt.isCorrect
                                          ? "bg-emerald-50/50 border-emerald-200 text-emerald-800 font-semibold"
                                          : "bg-white border-slate-200/80 text-slate-600"
                                      }`}>
                                        <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 border ${
                                          opt.isCorrect
                                            ? "bg-emerald-600 border-emerald-600 text-white"
                                            : "border-slate-300"
                                        }`}>
                                          {opt.isCorrect && <span className="text-[8px]">✓</span>}
                                        </div>
                                        <span className="truncate">{opt.text || <span className="text-slate-300 italic">Empty option</span>}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </ContentBlock>
                      <AddBlockDivider onClick={() => openEditBlockDialog(activeSubModule, null)} />
                    </div>
                  );
                }

                // Assignment block
                if (bt === "assignment") {
                  let parsed = { instructions: "", dueDate: "", submissionType: "file", maxScore: 100 };
                  try {
                    parsed = JSON.parse(c.content || "{}");
                  } catch {
                    parsed.instructions = c.content || "";
                  }
                  return (
                    <div key={c.id} className="group/block relative">
                      <ContentBlock
                        icon={<CheckSquare size={14} />}
                        label="Course Assignment"
                        badge="assignment"
                        highlighted
                        onEdit={() => openEditBlockDialog(activeSubModule, c)}
                        onDelete={() => requestDelete("block", c)}
                      >
                        <div className="space-y-4">
                          <div className="grid grid-cols-3 gap-3">
                            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                              <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Max Score</span>
                              <span className="text-[16px] font-bold text-[#6C1D5F] mt-0.5 block">{parsed.maxScore || 100} pts</span>
                            </div>
                            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                              <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Submission</span>
                              <span className="text-[12px] font-semibold text-slate-700 mt-1.5 block capitalize truncate">
                                {parsed.submissionType === "file" ? "File upload" : parsed.submissionType === "text" ? "Text input" : "URL Link"}
                              </span>
                            </div>
                            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                              <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Due Date</span>
                              <span className="text-[12px] font-semibold text-slate-700 mt-1.5 block truncate">
                                {parsed.dueDate ? new Date(parsed.dueDate).toLocaleDateString() : "No due date"}
                              </span>
                            </div>
                          </div>

                          {parsed.instructions && (
                            <div className="space-y-1.5">
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Instructions</span>
                              <div className="p-4 bg-white border border-slate-200/80 rounded-xl text-[13.5px] text-slate-600 leading-relaxed whitespace-pre-wrap">
                                {parsed.instructions}
                              </div>
                            </div>
                          )}
                        </div>
                      </ContentBlock>
                      <AddBlockDivider onClick={() => openEditBlockDialog(activeSubModule, null)} />
                    </div>
                  );
                }

                // Fallback: legacy rendering
                return (
                  <div key={c.id} className="group/block relative">
                    <ContentBlock
                      icon={<AlignLeft size={14} />}
                      label="Rich Text Content"
                      onEdit={() => openEditBlockDialog(activeSubModule, c)}
                      onDelete={() => requestDelete("block", c)}
                    >
                      <div
                        className="text-[14px] text-slate-600 leading-relaxed prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: c.content }}
                      />
                    </ContentBlock>
                    <AddBlockDivider onClick={() => openEditBlockDialog(activeSubModule, null)} />
                  </div>
                );
              })
            ) : (
              /* ── No content at all ── */
              <div className="group/block relative">
                <EmptyState
                  size="sm"
                  icon={LayoutTemplate}
                  title="Empty Content Block"
                  description={
                    <span className="flex flex-col gap-1.5">
                      <span>No details or learning materials are attached to this submodule block yet.</span>
                    </span>
                  }
                  primaryAction={{
                    label: "Add Your First Block",
                    onClick: () => { openEditBlockDialog(activeSubModule, null); },
                  }}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-8 w-full">
            {!course ? (
              <EmptyState
                icon={BookOpen}
                title="No Course Selected"
                description="Select an existing course or create a new one to start building and managing the curriculum."
                primaryAction={{
                  label: "Add Course to Curriculum",
                  onClick: () => openCourseDialog("select"),
                }}
              />
            ) : (
              <EmptyState
                icon={BookOpen}
                title="Select a block to start editing"
                description="Choose a block from the curriculum tree on the left to view and edit its content."
                primaryAction={
                  modules.length === 0
                    ? {
                        label: "Create First Module",
                        onClick: openAddModuleModal,
                      }
                    : null
                }
              />
            )}
          </div>
        )}
      </div>

      {/* Editor Footer */}
      <footer className="h-[44px] bg-white border-t border-slate-200 px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3 text-[11.5px] text-slate-400">
          {activeSubModule && (
            <>
              <span className="flex items-center gap-1">
                <Layers size={11} /> {modules.find(m => m.subModules?.find(s => s.id === activeSubModule.id))?.subModules?.length || 0} blocks in module
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-300" />
              <span className="flex items-center gap-1">
                <Clock size={11} /> Est. 15 min
              </span>
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => { setBlockPickerOpen(true); setBlockSearch(""); }}
            disabled={!activeSubModule}
            className="flex items-center gap-1.5 px-3 py-1 border border-dashed border-slate-300 hover:border-[#6C1D5F] text-slate-500 hover:text-[#6C1D5F] hover:bg-[#6C1D5F]/5 rounded-lg text-[11.5px] font-semibold transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Plus size={11} /> Add Block
          </button>
          <button
            onClick={handlePublishCourse}
            disabled={course?.status === "Published"}
            className="flex items-center gap-1.5 px-3 py-1 bg-[#6C1D5F] text-white rounded-lg text-[11.5px] font-bold hover:bg-[#521347] disabled:bg-slate-200 disabled:text-slate-400 transition-all cursor-pointer disabled:cursor-not-allowed shadow-sm"
          >
            <Save size={11} /> Save
          </button>
        </div>
      </footer>
    </main>
  );
}

/* ─── Local Sub-components ──────────────────────────────────────────── */

function AddBlockDivider({ onClick }) {
  return (
    <div className="flex items-center justify-center py-2 opacity-0 group-hover/block:opacity-100 transition-opacity">
      <div className="h-px flex-1 bg-slate-200/60" />
      <button
        onClick={onClick}
        className="mx-4 flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 hover:border-[#6C1D5F] rounded-full text-[10.5px] font-bold text-slate-400 hover:text-[#6C1D5F] transition-all shadow-sm cursor-pointer"
      >
        <Plus size={10} /> Add Block
      </button>
      <div className="h-px flex-1 bg-slate-200/60" />
    </div>
  );
}

function ContentBlock({ icon, label, color = "text-slate-600", badge, highlighted, onEdit, onDelete, children }) {
  return (
    <div className={`relative bg-white rounded-xl border shadow-sm hover:shadow-md transition-all ${
      highlighted ? "border-[#6C1D5F]/30 shadow-[#6C1D5F]/5" : "border-slate-200/80 hover:border-slate-300"
    }`}>
      <div className={`flex items-center justify-between px-5 py-3 border-b ${highlighted ? "border-[#6C1D5F]/15 bg-[#6C1D5F]/3" : "border-slate-100 bg-slate-50/50"}`}>
        <div className="flex items-center gap-2">
          <GripVertical size={13} className="text-slate-300 cursor-grab" />
          <span className={`${color} shrink-0`}>{icon}</span>
          <span className="text-[11.5px] font-bold text-slate-700">{label}</span>
          {badge && (
            <span className="text-[9px] font-bold text-[#6C1D5F] bg-[#6C1D5F]/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
              {badge}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <button onClick={onEdit} className="w-6 h-6 flex items-center justify-center rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
            <Edit size={11} />
          </button>
          <button onClick={onDelete} className="w-6 h-6 flex items-center justify-center rounded hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors cursor-pointer">
            <Trash2 size={11} />
          </button>
        </div>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

// Simple local duplicate wrapper for edit block button
function PenLine({ size }) {
  return <Edit size={size} />;
}
