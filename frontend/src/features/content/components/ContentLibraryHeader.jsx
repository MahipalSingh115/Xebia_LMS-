import React from "react";
import { Plus, Search, Filter } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/shared/components/ui/dropdown-menu";

export default function ContentLibraryHeader({
  searchQuery,
  setSearchQuery,
  selectedType,
  setSelectedType,
  selectedModuleId,
  setSelectedModuleId,
  selectedCourseId,
  setSelectedCourseId,
  courses,
  modules,
  handleOpenModal,
  handleBulkDelete,
  selectedCount,
}) {
  return (
    <div className="space-y-4 text-left">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-800 font-display-lg text-primary">Content Library</h2>
        </div>

        <div className="flex gap-3">
          {selectedCount > 0 && (
            <Button
              variant="destructive"
              onClick={handleBulkDelete}
              className="text-[13px] font-semibold bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 cursor-pointer"
            >
              Delete Selected ({selectedCount})
            </Button>
          )}



          <Button
            onClick={() => handleOpenModal()}
            className="gap-2 text-[13px] font-semibold bg-[#6C1D5F] hover:bg-[#4A1E47] text-white cursor-pointer"
          >
            <Plus size={14} /> Create Content
          </Button>
        </div>
      </div>

      {/* Toolbar Filter Section */}
      <div className="flex flex-col md:flex-row gap-3 bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
        <div className="relative flex-grow">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, description or content body..."
            className="pl-10 text-[13px] border-slate-200 focus:border-[#6C1D5F] focus:ring-[#6C1D5F]/20 h-10 w-full"
          />
        </div>

        <div className="flex gap-2.5 flex-wrap">
          {/* Course filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 text-[13px] h-10 border-slate-200 text-slate-600 cursor-pointer">
                <Filter size={13} />
                Course: {courses.find(c => String(c.id) === String(selectedCourseId))?.title || "All Courses"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 max-h-60 overflow-y-auto">
              <DropdownMenuRadioGroup value={String(selectedCourseId)} onValueChange={setSelectedCourseId}>
                <DropdownMenuRadioItem value="">All Courses</DropdownMenuRadioItem>
                {courses.map(c => (
                  <DropdownMenuRadioItem key={c.id} value={String(c.id)}>{c.title}</DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Module filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 text-[13px] h-10 border-slate-200 text-slate-600 cursor-pointer" disabled={!selectedCourseId}>
                <Filter size={13} />
                Module: {modules.find(m => String(m.id) === String(selectedModuleId))?.title || "All Modules"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 max-h-60 overflow-y-auto">
              <DropdownMenuRadioGroup value={String(selectedModuleId)} onValueChange={setSelectedModuleId}>
                <DropdownMenuRadioItem value="">All Modules</DropdownMenuRadioItem>
                {modules
                  .filter(m => String(m.courseId) === String(selectedCourseId))
                  .map(m => (
                    <DropdownMenuRadioItem key={m.id} value={String(m.id)}>{m.title}</DropdownMenuRadioItem>
                  ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Content Type filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 text-[13px] h-10 border-slate-200 text-slate-600 cursor-pointer">
                <Filter size={13} />
                Type: {selectedType || "All Types"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-44">
              <DropdownMenuRadioGroup value={selectedType} onValueChange={setSelectedType}>
                <DropdownMenuRadioItem value="">All Types</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Video">Video</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="PDF">PDF</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Text">Article</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
