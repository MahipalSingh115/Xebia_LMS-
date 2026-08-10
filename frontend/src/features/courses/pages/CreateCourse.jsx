import { useNavigate } from "react-router-dom";
import AppLayout from "@/app/layouts/AppLayout";
import useCreateCourse from "@/features/courses/hooks/useCreateCourse";
import { ChevronRight } from "lucide-react";
import CourseForm from "@/features/courses/components/CourseForm";
import CoursePreview from "@/features/courses/components/CoursePreview";

export default function CreateCourse() {
  const navigate = useNavigate();

  const {
    isEditMode,
    title,
    setTitle,
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
    thumbnail,
    setThumbnail,
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
    loadingCourse,
    handleTitleChange,
    handleThumbnailFileChange,
    handlePublishCourse,
    handleSaveDraft,
    activeCategoryName,
    getCombinedDuration,
  } = useCreateCourse();

  return (
    <AppLayout>
      <div className="max-w-[1400px] mx-auto pb-24">
        
        {/* Breadcrumbs & Title */}
        <div className="mb-6 flex justify-between items-end">
          <div>
            <nav className="flex items-center text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              <span className="hover:text-[#6C1D5F] cursor-pointer" onClick={() => navigate("/courses")}>
                Courses
              </span>
              <ChevronRight size={10} className="mx-1 text-slate-300" />
              <span className="text-slate-800 font-bold">
                {isEditMode ? "Edit Course" : "Create New Course"}
              </span>
            </nav>
            <h2 className="text-xl font-bold text-slate-800">
              {isEditMode ? "Edit Course" : "Create New Course"}
            </h2>
          </div>
        </div>

        {/* Stepper progress bar */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 mb-8 shadow-sm">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-8 h-8 rounded-full bg-[#6C1D5F] text-white flex items-center justify-center font-bold text-[13px] shadow-sm shadow-[#6C1D5F]/20">1</div>
              <span className="text-[12px] font-bold text-[#6C1D5F]">Basic Details</span>
            </div>
            <div className="flex-grow h-[1px] bg-slate-100 mx-4 -mt-5"></div>
            <div className="flex flex-col items-center gap-1.5 opacity-40">
              <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-semibold text-[13px]">2</div>
              <span className="text-[12px] text-slate-500 font-semibold">SEO & Meta</span>
            </div>
            <div className="flex-grow h-[1px] bg-slate-100 mx-4 -mt-5"></div>
            <div className="flex flex-col items-center gap-1.5 opacity-40">
              <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-semibold text-[13px]">3</div>
              <span className="text-[12px] text-slate-500 font-semibold">Pricing</span>
            </div>
            <div className="flex-grow h-[1px] bg-slate-100 mx-4 -mt-5"></div>
            <div className="flex flex-col items-center gap-1.5 opacity-40">
              <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-semibold text-[13px]">4</div>
              <span className="text-[12px] text-slate-500 font-semibold">Publish</span>
            </div>
          </div>
        </div>

        {loadingCourse ? (
          <div className="bg-white border border-slate-200 rounded-xl p-20 flex flex-col items-center justify-center text-slate-400">
            <span className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6C1D5F] mb-3" />
            <p className="text-[13px] font-medium">Loading course data...</p>
          </div>
        ) : (
          <div className="grid grid-cols-12 gap-6 items-start">
            <CourseForm
              isEditMode={isEditMode}
              title={title}
              setTitle={setTitle}
              slug={slug}
              setSlug={setSlug}
              description={description}
              setDescription={setDescription}
              curriculum={curriculum}
              setCurriculum={setCurriculum}
              difficulty={difficulty}
              setDifficulty={setDifficulty}
              durationNum={durationNum}
              setDurationNum={setDurationNum}
              durationUnit={durationUnit}
              setDurationUnit={setDurationUnit}
              categoryId={categoryId}
              setCategoryId={setCategoryId}
              language={language}
              setLanguage={setLanguage}
              targetAudience={targetAudience}
              setTargetAudience={setTargetAudience}
              hasCertificate={hasCertificate}
              setHasCertificate={setHasCertificate}
              currency={currency}
              setCurrency={setCurrency}
              price={price}
              setPrice={setPrice}
              courseCode={courseCode}
              setCourseCode={setCourseCode}
              teaserVideoUrl={teaserVideoUrl}
              setTeaserVideoUrl={setTeaserVideoUrl}
              takeaways={takeaways}
              setTakeaways={setTakeaways}
              prerequisites={prerequisites}
              setPrerequisites={setPrerequisites}
              categories={categories}
              submitting={submitting}
              handleTitleChange={handleTitleChange}
              handlePublishCourse={handlePublishCourse}
              handleSaveDraft={handleSaveDraft}
            />

            <CoursePreview
              thumbnail={thumbnail}
              setThumbnail={setThumbnail}
              handleThumbnailFileChange={handleThumbnailFileChange}
              activeCategoryName={activeCategoryName}
              title={title}
              description={description}
              getCombinedDuration={getCombinedDuration}
              price={price}
              currency={currency}
            />
          </div>
        )}

      </div>
    </AppLayout>
  );
}

