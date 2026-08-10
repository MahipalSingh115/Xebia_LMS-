import React from "react";
import {
  Search,
  Plus,
  GraduationCap,
  MoreHorizontal,
  MoveRight,
  FolderOpen,
  FolderClosed,
  ChevronDown,
  ChevronRight,
  Edit,
  Trash2,
  BookOpen,
  Video,
  FileText,
  AlignLeft,
  Layers,
  Copy,
  RefreshCw,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

import { Button } from "@/shared/components/ui/button";

import {
  DropdownMenu as ShadcnDropdownMenu,
  DropdownMenuTrigger as ShadcnDropdownMenuTrigger,
  DropdownMenuContent as ShadcnDropdownMenuContent,
  DropdownMenuItem as ShadcnDropdownMenuItem,
  DropdownMenuSeparator as ShadcnDropdownMenuSeparator,
} from "@/shared/components/ui/dropdown-menu";
import { getContentType } from "@/features/courses/utils/curriculumHelpers";

export default function CurriculumSidebar({
  loadingCurriculum,
  treeSearch,
  setTreeSearch,
  expandedModules,
  setExpandedModules,
  activeSubModule,
  setActiveSubModule,
  expandedSubModules,
  toggleSubModuleExpand,
  openAddModuleModal,
  openEditModuleModal,
  openAddSubModuleDrawer,  // used: creates a Sub-module under a Module
  openEditSubModuleDrawer, // used: edits a Sub-module (which contains a block)
  openEditBlockDialog,     // used: edits block content
  requestDelete,
  openCourseDialog,
  // Multi course props
  loadedCourses,
  activeCourseId,
  setActiveCourseId,
  expandedCourses,
  setExpandedCourses,
  handleDuplicateCourse,
  handleDuplicateModule,
  handleDuplicateSubModule,
  handleDuplicateBlock,
  handleMoveModule,
  handleMoveSubModule,
  loadCurriculumData,
}) {
  return (
    <aside className="w-[300px] bg-slate-50 border-r border-slate-200 flex flex-col shrink-0">
      {/* ── Search Header ── */}
      <div className="p-4 border-b border-slate-200/60 flex flex-col gap-2.5 shrink-0 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Curriculum Explorer</span>
          <div className="flex items-center gap-0.5">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => loadCurriculumData?.()}
              title="Refresh Curriculum"
              aria-label="Refresh Curriculum"
              className="text-slate-500 hover:text-[#6C1D5F] hover:bg-slate-100 rounded-md cursor-pointer"
            >
              <RefreshCw className={`size-3.5 ${loadingCurriculum ? 'animate-spin' : ''}`} />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => openCourseDialog()}
              title="Add Course"
              aria-label="Add Course"
              className="text-slate-500 hover:text-[#6C1D5F] hover:bg-slate-100 rounded-md cursor-pointer"
            >
              <Plus className="size-3.5" />
            </Button>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={13} />
          <input
            type="text"
            value={treeSearch}
            onChange={e => setTreeSearch(e.target.value)}
            placeholder="Search curriculum..."
            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-[12px] focus:ring-1 focus:ring-[#6C1D5F] focus:border-[#6C1D5F] outline-none transition-all placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* ── Tree Content ── */}
      <div className="flex-1 overflow-y-auto min-h-0 custom-scrollbar">
        {loadingCurriculum && loadedCourses.length === 0 ? (
          /* ── Loading skeleton ── */
          <div className="p-4 space-y-3">
            <div className="flex items-center gap-2 animate-pulse">
              <div className="w-4 h-4 bg-slate-200 rounded-full" />
              <div className="h-3.5 bg-slate-200 rounded flex-1" />
            </div>
            {[1, 2].map(i => (
              <div key={i} className="animate-pulse pl-5">
                <div className="flex items-center gap-2 px-2 py-1.5">
                  <div className="w-3.5 h-3.5 bg-slate-100 rounded" />
                  <div className="h-3 bg-slate-100 rounded flex-1" />
                </div>
                <div className="pl-5 space-y-1 mt-0.5">
                  <div className="h-2.5 bg-slate-50 rounded ml-2" />
                  <div className="h-2.5 bg-slate-50 rounded ml-2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-3 select-none font-sans">
            {loadedCourses.map((c) => {
              const isCourseExpanded = !!expandedCourses[c.id];
              const isCourseActive = activeCourseId === c.id;

              // Filter modules + sub-modules by search
              const filteredModules = treeSearch.trim()
                ? c.modules.map(mod => ({
                    ...mod,
                    subModules: mod.subModules?.filter(sub =>
                      sub.title.toLowerCase().includes(treeSearch.toLowerCase())
                    ) || [],
                  })).filter(mod =>
                    mod.title.toLowerCase().includes(treeSearch.toLowerCase()) ||
                    mod.subModules.length > 0
                  )
                : c.modules;

              return (
                <div key={c.id} className="mb-4">
                  {/* ════════════════════════════════
                      COURSE ROW
                  ════════════════════════════════ */}
                  <div
                    onClick={() => {
                      setActiveCourseId(c.id);
                      if (filteredModules[0]?.subModules?.[0]) {
                        setActiveSubModule(filteredModules[0].subModules[0]);
                      }
                    }}
                    className={`group/course flex items-center gap-1.5 px-2.5 py-2 mx-1.5 rounded-lg cursor-pointer transition-all ${
                      isCourseActive
                        ? "bg-[#6C1D5F]/10 border border-[#6C1D5F]/20"
                        : "hover:bg-white hover:shadow-sm"
                    }`}
                  >
                    {/* Expand/collapse chevron */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedCourses(prev => ({ ...prev, [c.id]: !prev[c.id] }));
                      }}
                      className="w-4 h-4 flex items-center justify-center rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all shrink-0"
                    >
                      {isCourseExpanded
                        ? <ChevronDown size={11} className="transition-transform duration-200" />
                        : <ChevronRight size={11} className="transition-transform duration-200" />
                      }
                    </button>

                    <GraduationCap size={14} className="text-[#6C1D5F] shrink-0" />

                    <span className={`text-[12.5px] font-bold truncate flex-1 ${isCourseActive ? "text-[#6C1D5F]" : "text-slate-800"}`}>
                      {c.title}
                    </span>

                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full border shrink-0 ${
                      c.status === "Published"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-amber-50 text-amber-700 border-amber-200"
                    }`}>
                      {c.status || "Draft"}
                    </span>

                    {/* Course context menu */}
                    <div className="opacity-0 group-hover/course:opacity-100 transition-opacity shrink-0">
                      <ShadcnDropdownMenu>
                        <ShadcnDropdownMenuTrigger asChild>
                          <button
                            onClick={(e) => e.stopPropagation()}
                            className="w-5 h-5 flex items-center justify-center rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                          >
                            <MoreHorizontal size={11} />
                          </button>
                        </ShadcnDropdownMenuTrigger>
                        <ShadcnDropdownMenuContent className="text-[12px] min-w-[170px] z-50">
                          <ShadcnDropdownMenuItem onClick={() => openAddModuleModal(c.id)}>
                            <Plus size={12} className="mr-2" /> Add Module
                          </ShadcnDropdownMenuItem>
                          <ShadcnDropdownMenuItem onClick={() => handleDuplicateCourse(c)}>
                            <Copy size={11} className="mr-2" /> Duplicate Course
                          </ShadcnDropdownMenuItem>
                          <ShadcnDropdownMenuSeparator />
                          <ShadcnDropdownMenuItem onClick={openCourseDialog}>
                            <MoveRight size={12} className="mr-2" /> Switch Course
                          </ShadcnDropdownMenuItem>
                        </ShadcnDropdownMenuContent>
                      </ShadcnDropdownMenu>
                    </div>
                  </div>

                  {/* ── Course children (only when expanded) ── */}
                  {isCourseExpanded && (
                    <div className="ml-[21px] border-l-2 border-slate-200/80">
                      {/* Empty state */}
                      {filteredModules.length === 0 ? (
                        treeSearch ? (
                          <div className="pl-4 py-4 text-center">
                            <Search size={16} className="mx-auto mb-1.5 text-slate-300" />
                            <p className="text-[11px] text-slate-400">No results for "{treeSearch}"</p>
                          </div>
                        ) : (
                          <div className="pl-3 py-3">
                            <button
                              onClick={() => openAddModuleModal(c.id)}
                              className="flex items-center gap-1.5 text-[11px] text-slate-400 hover:text-[#6C1D5F] px-2 py-1.5 rounded-lg hover:bg-[#6C1D5F]/5 transition-all font-semibold"
                            >
                              <Plus size={11} /> Add first module
                            </button>
                          </div>
                        )
                      ) : (
                        filteredModules.map((mod) => {
                          const isModExpanded = !!expandedModules[mod.id];
                          const modMatches = treeSearch && mod.title.toLowerCase().includes(treeSearch.toLowerCase());

                          return (
                            <div key={mod.id} className="relative">
                              {/* Connector tick */}
                              <div className="absolute left-0 top-[14px] w-3 h-px bg-slate-200/80" />

                              {/* ════════════════════════════════
                                  MODULE ROW
                              ════════════════════════════════ */}
                              <div
                                onClick={() => setActiveCourseId(c.id)}
                                className={`group/mod ml-3 mr-1.5 flex items-center gap-1.5 pl-1.5 pr-1.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                                  modMatches ? "bg-[#6C1D5F]/5" : "hover:bg-white hover:shadow-sm"
                                }`}
                              >
                                {/* Chevron toggle */}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setExpandedModules(p => ({ ...p, [mod.id]: !p[mod.id] }));
                                  }}
                                  className="w-4 h-4 flex items-center justify-center rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all shrink-0"
                                >
                                  {isModExpanded
                                    ? <ChevronDown size={11} />
                                    : <ChevronRight size={11} />
                                  }
                                </button>

                                {/* Folder icon */}
                                {isModExpanded
                                  ? <FolderOpen size={13} className="text-amber-500 shrink-0" />
                                  : <FolderClosed size={13} className="text-slate-400 shrink-0" />
                                }

                                <span className={`text-[12px] font-semibold truncate flex-1 ${
                                  modMatches ? "text-[#6C1D5F]" : "text-slate-700"
                                }`}>
                                  {mod.title}
                                </span>

                                {/* Sub-module count badge (hidden on hover) */}
                                <span className="text-[9.5px] font-bold text-slate-400 bg-slate-100 rounded-full px-1.5 py-0.5 shrink-0 group-hover/mod:hidden">
                                  {mod.subModules?.length || 0}
                                </span>

                                {/* Hover quick actions — Add Sub-module + context menu */}
                                <div className="opacity-0 group-hover/mod:opacity-100 flex items-center gap-0.5 transition-opacity shrink-0">
                                  {/* Quick "+" → Add Sub-module */}
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      openAddSubModuleDrawer(mod.id);
                                    }}
                                    className="w-5 h-5 flex items-center justify-center rounded text-slate-400 hover:text-[#6C1D5F] hover:bg-[#6C1D5F]/8 transition-colors"
                                    title="Add Sub-module"
                                  >
                                    <Plus size={10} />
                                  </button>

                                  {/* Module context menu */}
                                  <ShadcnDropdownMenu>
                                    <ShadcnDropdownMenuTrigger asChild>
                                      <button
                                        onClick={(e) => e.stopPropagation()}
                                        className="w-5 h-5 flex items-center justify-center rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                                      >
                                        <MoreHorizontal size={10} />
                                      </button>
                                    </ShadcnDropdownMenuTrigger>
                                    <ShadcnDropdownMenuContent className="text-[12px] min-w-[175px] z-50">
                                      <ShadcnDropdownMenuItem onClick={() => openEditModuleModal(mod)}>
                                        <Edit size={11} className="mr-2" /> Rename Module
                                      </ShadcnDropdownMenuItem>
                                      <ShadcnDropdownMenuItem onClick={() => openAddSubModuleDrawer(mod.id)}>
                                        <Layers size={11} className="mr-2" /> Add Sub-module
                                      </ShadcnDropdownMenuItem>
                                      <ShadcnDropdownMenuItem onClick={() => handleDuplicateModule(mod)}>
                                        <Copy size={11} className="mr-2" /> Duplicate Module
                                      </ShadcnDropdownMenuItem>
                                      <ShadcnDropdownMenuSeparator />
                                      <ShadcnDropdownMenuItem onClick={() => handleMoveModule(mod, "up")}>
                                        <ArrowUp size={11} className="mr-2" /> Move Up
                                      </ShadcnDropdownMenuItem>
                                      <ShadcnDropdownMenuItem onClick={() => handleMoveModule(mod, "down")}>
                                        <ArrowDown size={11} className="mr-2" /> Move Down
                                      </ShadcnDropdownMenuItem>
                                      <ShadcnDropdownMenuSeparator />
                                      <ShadcnDropdownMenuItem
                                        onClick={() => requestDelete("module", mod)}
                                        className="text-red-600 focus:text-red-600"
                                      >
                                        <Trash2 size={11} className="mr-2" /> Delete Module
                                      </ShadcnDropdownMenuItem>
                                    </ShadcnDropdownMenuContent>
                                  </ShadcnDropdownMenu>
                                </div>
                              </div>

                              {/* ── Module children (animated expand) ── */}
                              <div
                                className="overflow-hidden transition-all duration-200 ease-in-out"
                                style={{ maxHeight: isModExpanded ? "9999px" : "0" }}
                              >
                                <div className="ml-3 border-l-2 border-slate-200/60">
                                  {/* ── Sub-module rows ── */}
                                  {mod.subModules?.map((sub) => {
                                    const isActive = activeSubModule?.id === sub.id;
                                    const contentT = getContentType(sub);
                                    const subIsExpanded = !!expandedSubModules[sub.id];
                                    const subMatches = treeSearch && sub.title.toLowerCase().includes(treeSearch.toLowerCase());

                                    return (
                                      <div key={sub.id} className="relative">
                                        {/* Connector tick */}
                                        <div className="absolute left-0 top-[14px] w-3 h-px bg-slate-200/60" />

                                        {/* ════════════════════════════════
                                            SUB-MODULE ROW
                                        ════════════════════════════════ */}
                                        <div
                                          onClick={() => {
                                            setActiveCourseId(c.id);
                                            setActiveSubModule(sub);
                                            toggleSubModuleExpand(sub.id);
                                          }}
                                          className={`group/sub ml-3 mr-1 flex items-center gap-1.5 pl-1 pr-1.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                                            isActive
                                              ? "bg-[#6C1D5F] text-white shadow-sm"
                                              : subMatches
                                              ? "bg-[#6C1D5F]/8"
                                              : "hover:bg-white hover:shadow-sm"
                                          }`}
                                        >
                                          {/* Expand chevron */}
                                          <button
                                            onClick={e => {
                                              e.stopPropagation();
                                              toggleSubModuleExpand(sub.id);
                                            }}
                                            className={`w-4 h-4 flex items-center justify-center rounded transition-colors shrink-0 ${
                                              isActive ? "text-white/70 hover:text-white" : "text-slate-400 hover:text-slate-600"
                                            }`}
                                          >
                                            {subIsExpanded
                                              ? <ChevronDown size={10} />
                                              : <ChevronRight size={10} />
                                            }
                                          </button>

                                          {/* Sub-module icon */}
                                          <BookOpen
                                            size={12}
                                            className={`shrink-0 ${
                                              isActive ? "text-white" : subMatches ? "text-[#6C1D5F]" : "text-slate-400"
                                            }`}
                                          />

                                          <span className={`text-[11.5px] truncate flex-1 ${
                                            isActive
                                              ? "font-semibold text-white"
                                              : subMatches
                                              ? "font-semibold text-[#6C1D5F]"
                                              : "text-slate-600"
                                          }`}>
                                            {sub.title}
                                          </span>

                                          {/* Content type pill (only when not active and has content) */}
                                          {contentT && !isActive && (
                                            <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-full shrink-0 group-hover/sub:hidden ${
                                              subMatches ? "bg-[#6C1D5F]/10 text-[#6C1D5F]" : "bg-slate-100 text-slate-400"
                                            }`}>
                                              {contentT}
                                            </span>
                                          )}

                                          {/* Sub-module context menu */}
                                          <div className={`flex items-center gap-0.5 shrink-0 transition-opacity ${
                                            isActive ? "opacity-100" : "opacity-0 group-hover/sub:opacity-100"
                                          }`}>
                                            <ShadcnDropdownMenu>
                                              <ShadcnDropdownMenuTrigger asChild>
                                                <button
                                                  onClick={e => e.stopPropagation()}
                                                  className={`w-5 h-5 flex items-center justify-center rounded transition-colors ${
                                                    isActive
                                                      ? "text-white/70 hover:text-white hover:bg-white/20"
                                                      : "text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                                                  }`}
                                                >
                                                  <MoreHorizontal size={10} />
                                                </button>
                                              </ShadcnDropdownMenuTrigger>
                                              <ShadcnDropdownMenuContent className="text-[12px] min-w-[175px] z-50">
                                                <ShadcnDropdownMenuItem onClick={() => openEditSubModuleDrawer(sub)}>
                                                  <Edit size={11} className="mr-2" /> Edit Sub-module
                                                </ShadcnDropdownMenuItem>
                                                <ShadcnDropdownMenuItem onClick={() => handleDuplicateSubModule(sub)}>
                                                  <Copy size={11} className="mr-2" /> Duplicate Sub-module
                                                </ShadcnDropdownMenuItem>
                                                <ShadcnDropdownMenuSeparator />
                                                <ShadcnDropdownMenuItem onClick={() => handleMoveSubModule(sub, "up")}>
                                                  <ArrowUp size={11} className="mr-2" /> Move Up
                                                </ShadcnDropdownMenuItem>
                                                <ShadcnDropdownMenuItem onClick={() => handleMoveSubModule(sub, "down")}>
                                                  <ArrowDown size={11} className="mr-2" /> Move Down
                                                </ShadcnDropdownMenuItem>
                                                <ShadcnDropdownMenuSeparator />
                                                <ShadcnDropdownMenuItem
                                                  onClick={() => requestDelete("submodule", sub)}
                                                  className="text-red-600 focus:text-red-600"
                                                >
                                                  <Trash2 size={11} className="mr-2" /> Delete Sub-module
                                                </ShadcnDropdownMenuItem>
                                              </ShadcnDropdownMenuContent>
                                            </ShadcnDropdownMenu>
                                          </div>
                                        </div>

                                        {/* ── Sub-module children (Blocks) — only when expanded ── */}
                                        <div
                                          className="overflow-hidden transition-all duration-200 ease-in-out"
                                          style={{ maxHeight: subIsExpanded ? "9999px" : "0" }}
                                        >
                                          <div className="ml-3 border-l-2 border-slate-200/40">
                                            {/* ════════════════════════════════
                                                BLOCK (CONTENT LEAF)
                                            ════════════════════════════════ */}
                                            {sub.blocks && sub.blocks.length > 0 && sub.blocks.map((block) => {
                                              const blockT = getContentType(block);
                                              return (
                                                <div key={block.id} className="relative">
                                                  <div className="absolute left-0 top-[13px] w-3 h-px bg-slate-200/40" />
                                                  <div
                                                    onClick={() => {
                                                      setActiveCourseId(c.id);
                                                      setActiveSubModule(sub);
                                                    }}
                                                    className="group/leaf ml-3 mr-1 flex items-center gap-1.5 pl-1 pr-2 py-1.5 rounded-lg cursor-pointer transition-all hover:bg-white hover:shadow-sm"
                                                  >
                                                    {/* Content type icon */}
                                                    <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ${
                                                      blockT === "video" ? "bg-violet-100 text-violet-600"
                                                      : blockT === "pdf" ? "bg-rose-100 text-rose-600"
                                                      : "bg-sky-100 text-sky-600"
                                                    }`}>
                                                      {blockT === "video" ? <Video size={10} />
                                                        : blockT === "pdf" ? <FileText size={10} />
                                                        : <AlignLeft size={10} />}
                                                    </div>
                                                    <span className="text-[11px] text-slate-500 truncate flex-1">
                                                      {block.title || (blockT === "video" ? "Video" : blockT === "pdf" ? "PDF Document" : "Article")}
                                                    </span>
                                                    {/* Block context menu */}
                                                    <div className="opacity-0 group-hover/leaf:opacity-100 flex items-center gap-0.5 transition-opacity shrink-0">
                                                      <ShadcnDropdownMenu>
                                                        <ShadcnDropdownMenuTrigger asChild>
                                                          <button
                                                            onClick={e => e.stopPropagation()}
                                                            className="w-5 h-5 flex items-center justify-center rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                                                          >
                                                            <MoreHorizontal size={10} />
                                                          </button>
                                                        </ShadcnDropdownMenuTrigger>
                                                        <ShadcnDropdownMenuContent className="text-[12px] min-w-[165px] z-50">
                                                          <ShadcnDropdownMenuItem onClick={() => openEditBlockDialog(sub, block)}>
                                                            <Edit size={11} className="mr-2" /> Edit Block
                                                          </ShadcnDropdownMenuItem>
                                                          <ShadcnDropdownMenuItem onClick={() => handleDuplicateBlock(block)}>
                                                            <Copy size={11} className="mr-2" /> Duplicate Block
                                                          </ShadcnDropdownMenuItem>
                                                          <ShadcnDropdownMenuSeparator />
                                                          <ShadcnDropdownMenuItem
                                                            onClick={() => requestDelete("block", block)}
                                                            className="text-red-600 focus:text-red-600"
                                                          >
                                                            <Trash2 size={11} className="mr-2" /> Delete Block
                                                          </ShadcnDropdownMenuItem>
                                                        </ShadcnDropdownMenuContent>
                                                      </ShadcnDropdownMenu>
                                                    </div>
                                                  </div>
                                                </div>
                                              );
                                            })}

                                            {/* ── Add Block — inside Sub-module ── */}
                                            <div className="relative ml-3 mr-1 my-1">
                                              <div className="absolute left-[-12px] top-[12px] w-3 h-px bg-slate-200/40" />
                                              <button
                                                onClick={() => openEditBlockDialog(sub, null)}
                                                className="w-full flex items-center gap-1.5 px-2 py-1.5 text-slate-400 hover:text-violet-600 hover:bg-violet-50 border border-dashed border-slate-200 hover:border-violet-300 rounded-lg transition-all text-[11px] font-semibold cursor-pointer"
                                              >
                                                <Plus size={10} /> Add Block
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}

                                  {/* ── Add Sub-module — at the bottom of each Module ── */}
                                  <div className="relative ml-3 mr-1 my-1">
                                    <div className="absolute left-[-12px] top-[12px] w-3 h-px bg-slate-200/60" />
                                    <button
                                      onClick={() => openAddSubModuleDrawer(mod.id)}
                                      className="w-full flex items-center gap-1.5 px-2 py-1.5 text-slate-400 hover:text-[#6C1D5F] hover:bg-[#6C1D5F]/5 border border-dashed border-slate-200 hover:border-[#6C1D5F]/30 rounded-lg transition-all text-[11px] font-semibold cursor-pointer"
                                    >
                                      <Plus size={10} /> Add Sub-module
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      )}

                      {/* ── Add Module — at the bottom of course ── */}
                      {!loadingCurriculum && filteredModules.length > 0 && (
                        <div className="relative ml-3 mr-1 my-1">
                          <div className="absolute left-[-12px] top-[12px] w-3 h-px bg-slate-200/80" />
                          <button
                            onClick={() => openAddModuleModal(c.id)}
                            className="w-full flex items-center gap-1.5 px-2 py-2 text-slate-400 hover:text-[#6C1D5F] hover:bg-[#6C1D5F]/5 border border-dashed border-slate-200 hover:border-[#6C1D5F]/30 rounded-lg transition-all text-[11.5px] font-semibold cursor-pointer"
                          >
                            <Plus size={11} /> Add Module
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </aside>
  );
}
