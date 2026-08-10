import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import categoryService from "@/features/categories/services/categoryService";

export default function useCreateCategory() {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1); // start from Basic Info (step 1)
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  /* ── Form state ─────────────────────────────────────────────────── */
  const [form, setForm] = useState({
    name: "",
    slug: "",
    parentCat: "",
    emoji: "",
    accentColor: "",
    hexInput: "",
    shortDesc: "",
    longDesc: "",
    status: "Published",
    visibleCatalog: true,
    featured: false,
    allowEnroll: true,
    showNav: false,
    metaTitle: "",
    metaDesc: "",
    focusKeyword: "",
    tags: [],
  });

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const removeTag = (tag) => update("tags", form.tags.filter(t => t !== tag));

  /* ── Submit ─────────────────────────────────────────────────────── */
  const handleSubmit = async () => {
    if (!form.name.trim()) { setError("Category name is required."); return; }
    setSubmitting(true);
    setError("");

    let nameToSubmit = form.name.trim();
    let success = false;
    let attempts = 0;

    while (!success && attempts < 3) {
      try {
        const fd = new FormData();
        fd.append("name", nameToSubmit);
        fd.append("description", form.shortDesc);
        fd.append("publishState", form.status);
        fd.append("status",form.status === "Published" ? "Active" : "Inactive");
        if (imageFile) {
          fd.append("image", imageFile);
        }
        fd.append("slug", form.slug || "");
        fd.append("parentCat", form.parentCat || "");
        fd.append("emoji", form.emoji || "");
        fd.append("accentColor", form.accentColor || "");
        fd.append("longDesc", form.longDesc || "");
        fd.append("visibleCatalog", form.visibleCatalog);
        fd.append("featured", form.featured);
        fd.append("allowEnroll", form.allowEnroll);
        fd.append("showNav", form.showNav);
        fd.append("metaTitle", form.metaTitle || "");
        fd.append("metaDesc", form.metaDesc || "");
        fd.append("focusKeyword", form.focusKeyword || "");
        if (form.tags && form.tags.length > 0) {
          form.tags.forEach(tag => fd.append("tags", tag));
        }
        await categoryService.createCategory(fd);
        success = true;
      } catch (err) {
        const msg = err?.response?.data?.message || "";
        if (msg.toLowerCase().includes("exist") && attempts < 2) {
          nameToSubmit = `${form.name.trim()} ${Math.floor(Math.random() * 900 + 100)}`;
          attempts++;
        } else {
          setError(msg || "Failed to create category.");
          setSubmitting(false);
          return;
        }
      }
    }

    if (success) {
      navigate("/categories");
    }
  };

  const seoBarWidth = (val, max) => Math.min(100, Math.round((val / max) * 100));
  const seoBarColor = (pct) => pct >= 80 ? "bg-emerald-500" : pct >= 50 ? "bg-amber-500" : "bg-red-500";

  return {
    currentStep,
    setCurrentStep,
    submitting,
    error,
    setError,
    imageFile,
    setImageFile,
    imagePreview,
    setImagePreview,
    handleImageChange,
    form,
    setForm,
    update,
    removeTag,
    handleSubmit,
    seoBarWidth,
    seoBarColor,
  };
}
