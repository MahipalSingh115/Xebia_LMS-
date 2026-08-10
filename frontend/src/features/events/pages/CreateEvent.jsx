import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Image, MapPin, Calendar, Info, Upload, Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import AppLayout from "@/app/layouts/AppLayout";
import eventService from "../services/eventService";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Textarea } from "@/shared/components/ui/textarea";

export default function CreateEvent() {
  const navigate = useNavigate();
  const { id } = useParams(); // Edit mode detector
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    location: "",
    registrationDeadline: "",
    timelineStart: "",
    timelineEnd: ""
  });
  const [timelineEntries, setTimelineEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const [imageFile, setImageFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [uploadError, setUploadError] = useState("");

  // Load existing event data in edit mode
  useEffect(() => {
    if (isEditMode) {
      const fetchEvent = async () => {
        setLoading(true);
        try {
          const res = await eventService.getEventById(id);
          const eventData = res;
          
          // Format fields to HTML5 input-compatible formats
          setFormData({
            title: eventData.title || "",
            description: eventData.description || "",
            imageUrl: eventData.imageUrl || "",
            location: eventData.location || "",
            registrationDeadline: eventData.registrationDeadline ? eventData.registrationDeadline.split("T")[0] : "",
            timelineStart: eventData.timelineStart ? eventData.timelineStart.substring(0, 16) : "",
            timelineEnd: eventData.timelineEnd ? eventData.timelineEnd.substring(0, 16) : ""
          });

          // Prepopulate timeline entries sorted by sortOrder
          const entries = eventData.timelineEntries || [];
          const sortedEntries = [...entries].sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
          setTimelineEntries(sortedEntries);
        } catch (err) {
          showToast("Failed to load event details for editing", "error");
        } finally {
          setLoading(false);
        }
      };
      fetchEvent();
    }
  }, [id, isEditMode]);

  // Timeline operations
  const addTimelineEntry = () => {
    const newDayNum = timelineEntries.length + 1;
    const formattedDay = `Day ${newDayNum < 10 ? "0" + newDayNum : newDayNum}`;
    setTimelineEntries(prev => [
      ...prev,
      {
        id: "",
        dayNumber: formattedDay,
        time: "09:00 AM",
        title: "",
        description: ""
      }
    ]);
  };

  const removeTimelineEntry = (index) => {
    setTimelineEntries(prev => {
      const updated = prev.filter((_, idx) => idx !== index);
      return updated.map((item, idx) => {
        const newDayNum = idx + 1;
        const formattedDay = `Day ${newDayNum < 10 ? "0" + newDayNum : newDayNum}`;
        return { ...item, dayNumber: formattedDay };
      });
    });
  };

  const moveTimelineEntry = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= timelineEntries.length) return;
    
    setTimelineEntries(prev => {
      const updated = [...prev];
      const temp = updated[index];
      updated[index] = updated[targetIndex];
      updated[targetIndex] = temp;
      
      return updated.map((item, idx) => {
        const newDayNum = idx + 1;
        const formattedDay = `Day ${newDayNum < 10 ? "0" + newDayNum : newDayNum}`;
        return { ...item, dayNumber: formattedDay };
      });
    });
  };

  const handleTimelineEntryChange = (index, field, value) => {
    setTimelineEntries(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getEventImageUrl = (url) => {
    if (!url) return "";
    if (url.startsWith("/uploads/")) {
      const backendHost = import.meta.env.VITE_API_URL?.replace("/api", "") || "http://localhost:8080";
      return `${backendHost}${url}`;
    }
    return url;
  };

  const handleFileChange = (file) => {
    if (!file) return;
    
    // Validate file size: 5MB (5 * 1024 * 1024 bytes)
    if (file.size > 5 * 1024 * 1024) {
      showToast("File size exceeds the 5MB limit", "error");
      setUploadError("File size exceeds the 5MB limit");
      return;
    }

    // Validate content type
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      showToast("Only JPEG, PNG, GIF, and WEBP image files are allowed", "error");
      setUploadError("Only JPEG, PNG, GIF, and WEBP image files are allowed");
      return;
    }

    setUploadError("");
    setImageFile(file);
    const localUrl = URL.createObjectURL(file);
    setImagePreviewUrl(localUrl);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      showToast("Event title is required", "error");
      return;
    }
    if (!formData.timelineStart || !formData.timelineEnd) {
      showToast("Event start and end times are required", "error");
      return;
    }
    if (!formData.registrationDeadline) {
      showToast("Registration deadline is required", "error");
      return;
    }

    setLoading(true);
    try {
      let finalImageUrl = formData.imageUrl;
      
      // If a new local file is selected, upload it first
      if (imageFile) {
        try {
          const uploadRes = await eventService.uploadImage(imageFile);
          finalImageUrl = uploadRes.url;
        } catch (uploadErr) {
          const errMsg = uploadErr.response?.data?.message || "Failed to upload banner image";
          showToast(errMsg, "error");
          setUploadError(errMsg);
          setLoading(false);
          return;
        }
      }

      // Format dates to complete LocalDateTime format (e.g. YYYY-MM-DDTHH:MM:SS)
      const formattedDeadline = formData.registrationDeadline.includes("T") 
        ? formData.registrationDeadline 
        : `${formData.registrationDeadline}T23:59:59`;
      
      const formattedStart = formData.timelineStart.includes("T") && formData.timelineStart.split("T")[1].split(":").length === 3
        ? formData.timelineStart
        : (formData.timelineStart.includes(":") ? `${formData.timelineStart}:00` : formData.timelineStart);

      const formattedEnd = formData.timelineEnd.includes("T") && formData.timelineEnd.split("T")[1].split(":").length === 3
        ? formData.timelineEnd
        : (formData.timelineEnd.includes(":") ? `${formData.timelineEnd}:00` : formData.timelineEnd);

      const payload = {
        ...formData,
        imageUrl: finalImageUrl,
        registrationDeadline: formattedDeadline,
        timelineStart: formattedStart,
        timelineEnd: formattedEnd,
        timelineEntries: timelineEntries,
        createdBy: "LMS Admin"
      };

      if (isEditMode) {
        await eventService.updateEvent(id, payload);
        showToast("Event updated successfully!", "success");
      } else {
        await eventService.createEvent(payload);
        showToast("Event created successfully!", "success");
      }
      setTimeout(() => navigate("/admin/events"), 1500);
    } catch (err) {
      const errMsg = err.response?.data?.message || `Failed to ${isEditMode ? "update" : "create"} event`;
      showToast(errMsg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="flex flex-1 justify-center py-6 px-4 sm:px-6 lg:px-20 max-w-[1000px] mx-auto">
        <div className="flex flex-col flex-1">
          {/* Back Button & Title Section */}
          <div className="flex flex-col gap-4 mb-8">
            <Button
              onClick={() => navigate("/admin/events")}
              className="flex items-center gap-2 text-slate-500 hover:text-[#6C1D5F] transition-colors text-sm font-medium w-fit border-none bg-transparent cursor-pointer"
              variant="link"
            >
              <ArrowLeft size={16} />
              Back to Events
            </Button>
            <div>
              <h1 className="text-slate-800 text-3xl font-bold tracking-tight">{isEditMode ? "Edit Event" : "Create New Event"}</h1>
              <p className="text-slate-500 text-base mt-1">{isEditMode ? "Modify your learning session, workshop, or seminar details below." : "Configure your learning session, workshop, or seminar details below."}</p>
            </div>
          </div>

          {/* Main Form Card */}
          <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 flex flex-col gap-8 shadow-sm">
            {/* Event Basic Info */}
            <div className="grid grid-cols-1 gap-6">
              <div className="flex flex-col gap-2">
                <Label className="text-slate-700 font-semibold text-sm">Event Title</Label>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full h-12 px-4 rounded-lg border border-slate-200 bg-slate-50 hover:border-slate-300 focus:border-[#6C1D5F] focus:ring-1 focus:ring-[#6C1D5F] outline-none transition-all placeholder:text-slate-400 text-slate-800 focus-visible:ring-0 focus-visible:border-[#6C1D5F]"
                  placeholder="e.g. UX Design Masterclass 2024"
                  type="text"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-slate-700 font-semibold text-sm">Description</Label>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full min-h-[120px] p-4 rounded-lg border border-slate-200 bg-slate-50 hover:border-slate-300 focus:border-[#6C1D5F] focus:ring-1 focus:ring-[#6C1D5F] outline-none transition-all placeholder:text-slate-400 text-slate-800 resize-none focus-visible:ring-0 focus-visible:border-[#6C1D5F]"
                  placeholder="Provide a detailed overview of what students will learn..."
                  required
                />
              </div>
            </div>

            {/* Image Section */}
            <div className="flex flex-col gap-3">
              <Label className="text-slate-700 font-semibold text-sm">Event Banner Image</Label>
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <div className="w-full sm:w-48 h-32 rounded-lg bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 overflow-hidden relative group">
                  {imagePreviewUrl ? (
                    <img className="absolute inset-0 w-full h-full object-cover" src={imagePreviewUrl} alt="New Banner Preview" />
                  ) : formData.imageUrl ? (
                    <img className="absolute inset-0 w-full h-full object-cover" src={getEventImageUrl(formData.imageUrl)} alt="Existing Banner Preview" />
                  ) : (
                    <>
                      <Image size={24} />
                      <span className="text-[11px] font-medium mt-1">Preview Area</span>
                    </>
                  )}
                </div>
                <div className="flex-1 w-full space-y-3">
                  <div 
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    className={`relative w-full h-32 rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all ${
                      dragActive 
                        ? "border-[#6C1D5F] bg-[#6C1D5F]/5" 
                        : "border-slate-200 bg-white hover:border-[#6C1D5F]"
                    }`}
                    onClick={() => document.getElementById("file-input").click()}
                  >
                    <Input 
                      id="file-input"
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleFileChange(e.target.files[0]);
                        }
                      }}
                    />
                    <Upload size={22} className={dragActive ? "text-[#6C1D5F] animate-bounce" : "text-slate-400"} />
                    <span className="text-[12px] font-bold text-slate-700 mt-2">
                      {imageFile ? imageFile.name : "Drag & drop image here, or click to browse"}
                    </span>
                    <span className="text-[10px] text-slate-400 mt-1">JPEG, PNG, GIF, or WEBP (Max 5MB)</span>
                    
                    {imageFile && (
                      <Button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setImageFile(null);
                          setImagePreviewUrl("");
                          setUploadError("");
                        }}
                        className="absolute top-2 right-2 px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-650 rounded text-[10px] font-bold border-none cursor-pointer"
                        variant="ghost"
                        size="xs"
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                  {uploadError && (
                    <p className="text-rose-600 text-[11px] font-semibold mt-1">
                      {uploadError}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Logistics: Location & Deadline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <Label className="text-slate-700 font-semibold text-sm">Location</Label>
                <div className="relative">
                  <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <Input
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full h-12 pl-10 pr-4 rounded-lg border border-slate-200 bg-slate-50 hover:border-slate-300 focus:border-[#6C1D5F] focus:ring-1 focus:ring-[#6C1D5F] outline-none transition-all placeholder:text-slate-400 text-slate-800 focus-visible:ring-0 focus-visible:border-[#6C1D5F]"
                  placeholder="Online or Venue Address"
                  type="text"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-slate-700 font-semibold text-sm">Deadline to Register</Label>
              <div className="relative">
                <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <Input
                  name="registrationDeadline"
                  value={formData.registrationDeadline}
                  onChange={handleInputChange}
                  className="w-full h-12 pl-10 pr-4 rounded-lg border border-slate-200 bg-slate-50 hover:border-slate-300 focus:border-[#6C1D5F] focus:ring-1 focus:ring-[#6C1D5F] outline-none transition-all text-slate-800 focus-visible:ring-0 focus-visible:border-[#6C1D5F]"
                  type="date"
                  required
                />
              </div>
            </div>
          </div>

          {/* Timeline: Date Range */}
          <div className="flex flex-col gap-4 p-4 rounded-lg bg-slate-50 border border-slate-200">
            <Label className="text-slate-755 font-semibold text-sm flex items-center gap-2">
              <Calendar size={18} className="text-[#6C1D5F]" />
              Event Timeline
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-1">Start Date & Time</span>
                <Input
                  name="timelineStart"
                  value={formData.timelineStart}
                  onChange={handleInputChange}
                  className="w-full h-11 px-4 rounded-lg border border-slate-200 bg-white focus:border-[#6C1D5F] focus:ring-1 focus:ring-[#6C1D5F] outline-none transition-all text-sm text-slate-850 focus-visible:ring-0 focus-visible:border-[#6C1D5F]"
                  type="datetime-local"
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-1">End Date & Time</span>
                <Input
                  name="timelineEnd"
                  value={formData.timelineEnd}
                  onChange={handleInputChange}
                  className="w-full h-11 px-4 rounded-lg border border-slate-200 bg-white focus:border-[#6C1D5F] focus:ring-1 focus:ring-[#6C1D5F] outline-none transition-all text-sm text-slate-850 focus-visible:ring-0 focus-visible:border-[#6C1D5F]"
                  type="datetime-local"
                  required
                />
                </div>
              </div>
            </div>

            {/* Detailed Day-by-Day Timeline */}
            <div className="flex flex-col gap-4 p-5 rounded-lg border border-slate-200 bg-white">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-slate-800 font-bold text-sm">Detailed Timeline Schedule</h3>
                  <p className="text-slate-400 text-[10px] mt-0.5">Specify day-by-day learning session topics, times, and activities.</p>
                </div>
                <Button
                  type="button"
                  onClick={addTimelineEntry}
                  className="flex items-center gap-1 px-3 py-1.5 bg-[#6C1D5F]/10 hover:bg-[#6C1D5F]/15 text-[#6C1D5F] rounded-lg font-bold text-xs border-none cursor-pointer transition-all"
                  variant="ghost"
                  size="sm"
                >
                  <Plus size={14} />
                  Add Day
                </Button>
              </div>

              {timelineEntries.length === 0 ? (
                <div className="py-6 text-center text-slate-400 text-xs border border-dashed border-slate-200 rounded-lg">
                  No timeline schedule entries added yet. Click "Add Day" to add one.
                </div>
              ) : (
                <div className="space-y-4">
                  {timelineEntries.map((entry, idx) => (
                    <div key={idx} className="p-4 rounded-lg bg-slate-50 border border-slate-200 relative flex flex-col gap-3 group animate-fadeIn">
                      {/* Entry Header: Day number & reorder controls */}
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-[#6C1D5F] bg-[#6C1D5F]/10 px-2 py-0.5 rounded">
                          {entry.dayNumber}
                        </span>
                        <div className="flex items-center gap-1">
                          <Button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => moveTimelineEntry(idx, -1)}
                            className="p-1 hover:bg-slate-200 disabled:opacity-40 text-slate-500 rounded border-none bg-transparent cursor-pointer"
                            variant="ghost"
                            size="icon-xs"
                            title="Move Up"
                          >
                            <ArrowUp size={14} />
                          </Button>
                          <Button
                            type="button"
                            disabled={idx === timelineEntries.length - 1}
                            onClick={() => moveTimelineEntry(idx, 1)}
                            className="p-1 hover:bg-slate-200 disabled:opacity-40 text-slate-500 rounded border-none bg-transparent cursor-pointer"
                            variant="ghost"
                            size="icon-xs"
                            title="Move Down"
                          >
                            <ArrowDown size={14} />
                          </Button>
                          <Button
                            type="button"
                            onClick={() => removeTimelineEntry(idx)}
                            className="p-1 hover:bg-rose-100 hover:text-rose-600 text-slate-400 rounded border-none bg-transparent cursor-pointer ml-1"
                            variant="ghost"
                            size="icon-xs"
                            title="Remove Day"
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </div>

                      {/* Entry inputs */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] font-bold text-slate-450 uppercase">Time Slot</span>
                          <Input
                            type="text"
                            value={entry.time}
                            onChange={(e) => handleTimelineEntryChange(idx, "time", e.target.value)}
                            placeholder="e.g. 09:00 AM or All Day"
                            className="h-9 px-3 rounded border border-slate-200 bg-white focus:border-[#6C1D5F] focus:ring-1 focus:ring-[#6C1D5F] outline-none text-xs text-slate-800 focus-visible:ring-0 focus-visible:border-[#6C1D5F]"
                            required
                          />
                        </div>
                        <div className="flex flex-col gap-1 md:col-span-2">
                          <span className="text-[10px] font-bold text-slate-450 uppercase">Session Title</span>
                          <Input
                            type="text"
                            value={entry.title}
                            onChange={(e) => handleTimelineEntryChange(idx, "title", e.target.value)}
                            placeholder="e.g. Introduction & Fundamental Patterns"
                            className="h-9 px-3 rounded border border-slate-200 bg-white focus:border-[#6C1D5F] focus:ring-1 focus:ring-[#6C1D5F] outline-none text-xs text-slate-800 focus-visible:ring-0 focus-visible:border-[#6C1D5F]"
                            required
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold text-slate-450 uppercase">Session Description</span>
                        <Textarea
                          value={entry.description}
                          onChange={(e) => handleTimelineEntryChange(idx, "description", e.target.value)}
                          placeholder="e.g. Kickoff session introducing the key concepts, design philosophies..."
                          className="p-3 rounded border border-slate-200 bg-white focus:border-[#6C1D5F] focus:ring-1 focus:ring-[#6C1D5F] outline-none text-xs text-slate-800 min-h-[60px] resize-none focus-visible:ring-0 focus-visible:border-[#6C1D5F]"
                          required
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-4 border-t border-slate-200">
              <Button
                type="button"
                onClick={() => navigate("/admin/events")}
                className="w-full sm:w-auto px-8 py-3 rounded-lg text-slate-650 font-bold text-sm hover:bg-slate-100 transition-colors border-none bg-transparent cursor-pointer"
                variant="ghost"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-8 py-3 rounded-lg bg-[#6C1D5F] text-white font-bold text-sm shadow-md shadow-[#6C1D5F]/20 hover:bg-[#521347] transition-all active:scale-[0.98] cursor-pointer border-none"
              >
                {loading ? (isEditMode ? "Saving..." : "Creating...") : (isEditMode ? "Save Changes" : "Create Event")}
              </Button>
            </div>
          </form>

          {/* Helper Footer */}
          <div className="mt-8 p-4 rounded-lg border border-purple-100 bg-[#6C1D5F]/5 flex gap-3">
            <Info size={20} className="text-[#6C1D5F] shrink-0" />
            <p className="text-xs leading-relaxed text-slate-600">
              <strong>Note:</strong> Once created, this event will be visible to students on the main dashboard. You can always edit these details or mark the event as private later from the Events Manager.
            </p>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-lg shadow-lg border animate-[slideIn_0.3s_ease-out] ${
          toast.type === "error" ? "bg-red-50 border-red-200 text-red-700" : "bg-emerald-50 border-emerald-200 text-emerald-700"
        }`}>
          <span className={`w-2 h-2 rounded-full ${toast.type === "error" ? "bg-red-500" : "bg-emerald-500"} flex-shrink-0 animate-pulse`} />
          <span className="text-[13px] font-semibold">{toast.message}</span>
        </div>
      )}
    </AppLayout>
  );
}
