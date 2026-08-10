import React from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/shared/components/ui/dropdown-menu";

export default function ModulesHeader({
  courses,
  selectedCourseId,
  setSelectedCourseId,
  isDropdownOpen,
  setIsDropdownOpen,
}) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white border border-slate-200 rounded-xl p-5 shadow-sm text-left">
      <div>
        <h2 className="text-xl font-bold text-slate-800">Module Management</h2>
      </div>

      <div className="flex items-center gap-3 w-full md:w-auto">
        <Label htmlFor="courseSelect" className="text-[13px] font-semibold text-slate-500 whitespace-nowrap">
          Select Course:
        </Label>
        <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              id="courseSelect"
              variant="outline"
              className="bg-white border border-slate-200 text-slate-700 text-[13px] font-medium rounded-lg px-3.5 py-2.5 min-w-[200px] justify-between h-10 hover:bg-slate-50 cursor-pointer"
            >
              <span>
                {courses.find((c) => String(c.id) === String(selectedCourseId))?.title || "Select a Course"}
              </span>
              <ChevronDown size={14} className="opacity-50 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white border border-slate-200 shadow-lg rounded-xl max-h-60 overflow-y-auto z-50">
            <DropdownMenuRadioGroup value={String(selectedCourseId)} onValueChange={(val) => setSelectedCourseId(val)}>
              {courses.map((c) => (
                <DropdownMenuRadioItem
                  key={c.id}
                  value={String(c.id)}
                  className="text-slate-700 text-xs hover:bg-slate-50 py-2 px-3 rounded-md cursor-pointer"
                >
                  {c.title}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
