import { Layers, Edit, Trash2, BookOpen, Loader2, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import EmptyState from "@/shared/components/EmptyState";

export default function CategoryGrid({
  categories,
  loading,
  onView,
  onEdit,
  onDelete,
}) {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-20 flex flex-col items-center justify-center text-slate-400 shadow-sm">
        <Loader2 className="animate-spin text-[#6C1D5F] mb-3" size={32} />
        <p className="text-[13px] font-medium">Loading category grid...</p>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <EmptyState
        icon={Layers}
        title="No Categories Found"
        description="Try adjusting your search query or filters, or create a new category to get started."
        primaryAction={{
          label: "Create New Category",
          onClick: () => navigate("/categories/create"),
        }}
      />
    );
  }

  const getInitials = (name) => {
    if (!name) return "CAT";
    return name.split(" ").slice(0, 2).map((word) => word[0]).join("").toUpperCase();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((cat) => (
        <div
          key={cat.id}
          className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col shadow-sm group"
        >
          {/* Card Header Cover */}
          <div className="h-32 relative bg-slate-100 shrink-0">
            {cat.image ? (
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div 
                className="w-full h-full flex items-center justify-center"
                style={{ 
                  background: cat.accentColor 
                    ? `linear-gradient(135deg, ${cat.accentColor}, ${cat.accentColor}cc)` 
                    : "linear-gradient(to top right, #6C1D5F, #521347)" 
                }}
              >
                <span className="text-white text-3xl font-extrabold tracking-widest opacity-25">
                  {getInitials(cat.name)}
                </span>
              </div>
            )}
            
            {/* Featured Badge */}
            {cat.featured && (
              <div className="absolute top-3.5 left-3.5">
                <span className="bg-amber-500 text-white border-none px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider shadow-sm flex items-center gap-0.5">
                  ★ Featured
                </span>
              </div>
            )}

            {/* Status Badges */}
            <div className="absolute top-3.5 right-3.5 flex gap-1.5 items-center">
              {cat.publishState && (
                <span className={`px-2 py-0.5 border rounded-full text-[9px] font-extrabold uppercase tracking-wider ${
                  cat.publishState === "Published"
                    ? "bg-blue-50 border-blue-100 text-blue-700"
                    : "bg-amber-50 border-amber-100 text-amber-700"
                }`}>
                  {cat.publishState}
                </span>
              )}
              <span className={`px-2 py-0.5 border rounded-full text-[9px] font-extrabold uppercase tracking-wider ${
                cat.status === "Active"
                  ? "bg-emerald-50 border-emerald-100 text-emerald-700"
                  : "bg-slate-100 border-slate-200 text-slate-500"
              }`}>
                {cat.status}
              </span>
            </div>

            {/* Courses Count Overlay */}
            <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1">
              <BookOpen size={11} />
              <span>{cat.courses} {cat.courses === 1 ? "Course" : "Courses"}</span>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-5 flex-1 flex flex-col min-w-0">
            <h4 className="font-bold text-slate-800 text-[14.5px] truncate mb-1 flex items-center gap-1.5">
              {cat.emoji && <span className="text-base shrink-0 select-none">{cat.emoji}</span>}
              <span className="truncate">{cat.name}</span>
            </h4>
            <p className="text-slate-400 text-[11.5px] font-medium uppercase tracking-wider mb-2">
              {cat.id}
            </p>
            <p className="text-slate-500 text-[12.5px] leading-relaxed line-clamp-2 mb-4">
              {cat.description || "No description provided."}
            </p>

            {/* Tags */}
            {cat.tags && cat.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-4">
                {cat.tags.slice(0, 3).map((tag, i) => (
                  <span key={i} className="text-[10px] px-2 py-0.5 bg-slate-50 text-slate-600 border border-slate-150 rounded-full font-medium">
                    #{tag}
                  </span>
                ))}
                {cat.tags.length > 3 && (
                  <span className="text-[10px] px-1.5 py-0.5 text-slate-400 font-medium select-none">
                    +{cat.tags.length - 3} more
                  </span>
                )}
              </div>
            )}

            {/* Card Footer Actions */}
            <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
              <button
                onClick={() => onView(cat)}
                className="text-[12px] font-bold text-[#6C1D5F] hover:text-[#521347] flex items-center gap-1 cursor-pointer transition-colors group-hover:underline"
              >
                <span>View Details</span>
                <ArrowRight size={12} />
              </button>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => onEdit(cat)}
                  className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-slate-700 transition-colors"
                  title="Edit Category"
                >
                  <Edit size={13} />
                </button>
                <button
                  onClick={() => onDelete(cat)}
                  className="p-2 hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-600 transition-colors"
                  title="Delete Category"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
