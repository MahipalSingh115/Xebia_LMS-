import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import courseService from "@/features/courses/services/courseService";
import categoryService from "@/features/categories/services/categoryService";

export const generateSlug = (val) => {
  return val.toLowerCase()
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/\s+/g, '-');
};

export default function useCreateCourse() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  // Form states
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [curriculum, setCurriculum] = useState("");
  const [difficulty, setDifficulty] = useState("Beginner");
  const [durationNum, setDurationNum] = useState("40");
  const [durationUnit, setDurationUnit] = useState("Hours");
  const [categoryId, setCategoryId] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [status, setStatus] = useState("Published");

  // Simulated / UI-only states matching the Stitch mockup
  const [language, setLanguage] = useState("English");
  const [targetAudience, setTargetAudience] = useState("");
  const [hasCertificate, setHasCertificate] = useState(false);
  const [currency, setCurrency] = useState("USD ($)");
  const [price, setPrice] = useState("0.00");
  
  // Expanded fields states (Screen 12)
  const [courseCode, setCourseCode] = useState("");
  const [teaserVideoUrl, setTeaserVideoUrl] = useState("");
  const [takeaways, setTakeaways] = useState([""]);
  const [prerequisites, setPrerequisites] = useState("");

  // UI / API states
  const [categories, setCategories] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [loadingCourse, setLoadingCourse] = useState(false);


  useEffect(() => {
    async function fetchData() {
      try {
        const data = await categoryService.getAllCategories();
        if (data) setCategories(data);
      } catch (err) {
        console.error("Failed to load categories:", err);
      }

      // If editing, fetch existing course data
      if (isEditMode) {
        setLoadingCourse(true);
        try {
          const course = await courseService.getCourseById(id);
          if (course) {
            setTitle(course.title || "");
            // Auto generate slug from title initially
            setSlug(course.title ? generateSlug(course.title) : "");
            setDescription(course.description || "");
            setCurriculum(course.curriculum || "");
            setDifficulty(course.difficulty || "Beginner");
            
            // Parse duration
            if (course.duration) {
              const numMatch = course.duration.match(/^\d+/);
              const unitMatch = course.duration.match(/[a-zA-Z]+/);
              if (numMatch) setDurationNum(numMatch[0]);
              if (unitMatch) {
                const unit = unitMatch[0].toLowerCase();
                if (unit.startsWith("hour")) setDurationUnit("Hours");
                else if (unit.startsWith("day")) setDurationUnit("Days");
                else if (unit.startsWith("week")) setDurationUnit("Weeks");
              }
            }
            
            setCategoryId(course.categoryId ? String(course.categoryId) : "");
            setThumbnail(course.thumbnail || "");
            setStatus(course.status || "Published");
            setSlug(course.slug || (course.title ? generateSlug(course.title) : ""));
            setLanguage(course.language || "English");
            setTargetAudience(course.targetAudience || "");
            setHasCertificate(!!course.hasCertificate);
            setCurrency(course.currency || "USD ($)");
            setPrice(course.price || "0.00");
            setCourseCode(course.courseCode || "");
            setTeaserVideoUrl(course.teaserVideoUrl || "");
            setTakeaways(course.takeaways && course.takeaways.length > 0 ? course.takeaways : [""]);
            setPrerequisites(course.prerequisites || "");
          }
        } catch (err) {
          console.error("Failed to load course:", err);
          alert("Failed to load course data: " + (err.response?.data?.message || err.message));
        } finally {
          setLoadingCourse(false);
        }
      }
    }
    fetchData();
  }, [id, isEditMode]);

  const handleTitleChange = (val) => {
    setTitle(val);
    setSlug(generateSlug(val));
  };

  const handleThumbnailFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnail(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const getCombinedDuration = () => {
    return `${durationNum || "0"} ${durationUnit}`;
  };

  const prepareCourseData = (statusVal) => {
    return {
      title: title.trim(),
      description: description.trim(),
      curriculum: curriculum.trim(),
      difficulty: difficulty,
      duration: getCombinedDuration(),
      thumbnail:
        thumbnail.trim() ||
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60",
      categoryId: Number(categoryId),
      status: statusVal,
      slug: slug.trim(),
      language: language,
      targetAudience: targetAudience.trim(),
      hasCertificate: hasCertificate,
      currency: currency,
      price: price,
      courseCode: courseCode.trim(),
      teaserVideoUrl: teaserVideoUrl.trim(),
      takeaways: takeaways.filter(t => t.trim() !== ""),
      prerequisites: prerequisites.trim(),
    };
  };

  const handlePublishCourse = async (e) => {
    if (e) e.preventDefault();
    if (!title.trim()) { alert("Course title is required"); return; }
    if (!categoryId)    { alert("Please select a category");  return; }

    setSubmitting(true);
    try {
      const courseData = prepareCourseData("Published");

      if (isEditMode) {
        await courseService.updateCourse(id, courseData);
      } else {
        await courseService.createCourse(courseData);
      }
      navigate("/courses");
    } catch (err) {
      console.error(`Failed to ${isEditMode ? "update" : "create"} course:`, err);
      alert(`Failed to ${isEditMode ? "update" : "publish"} course: ` + (err.response?.data?.message || err.message));
    } finally {
      setSubmitting(false);
    }
  };

  const handleSaveDraft = async (e) => {
    if (e) e.preventDefault();
    if (!title.trim()) { alert("Course title is required"); return; }
    if (!categoryId)    { alert("Please select a category");  return; }

    setSubmitting(true);
    try {
      const courseData = prepareCourseData("Draft");

      if (isEditMode) {
        await courseService.updateCourse(id, courseData);
      } else {
        await courseService.createCourse(courseData);
      }
      navigate("/courses");
    } catch (err) {
      console.error(`Failed to save draft:`, err);
      alert(`Failed to save draft: ` + (err.response?.data?.message || err.message));
    } finally {
      setSubmitting(false);
    }
  };

  const activeCategoryName = categories.find((cat) => String(cat.dbId || cat.id) === String(categoryId))?.name || "Select Category";

  return {
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
    status,
    setStatus,
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
  };
}
