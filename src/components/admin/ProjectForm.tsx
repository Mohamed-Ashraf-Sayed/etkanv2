"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Plus, Trash2, ArrowRight, Upload, ImageIcon, X, GripVertical } from "lucide-react";
import Image from "next/image";

interface Result {
  metric: string;
  value: string;
  description: string;
}

interface Testimonial {
  text: string;
  author: string;
  role: string;
}

interface ProjectData {
  id?: string;
  slug: string;
  category: string;
  title: string;
  titleEn: string;
  client: string;
  clientEn: string;
  industry: string;
  industryEn: string;
  summary: string;
  summaryEn: string;
  description: string;
  descriptionEn: string;
  problem: string;
  problemEn: string;
  solution: string;
  solutionEn: string;
  results: string;
  resultsEn: string;
  tags: string;
  tagsEn: string;
  testimonial: string;
  testimonialEn: string;
  techStack: string;
  thumbnail: string;
  images: string;
  duration: string;
  durationEn: string;
  year: string;
  displayOrder: number;
  isActive: boolean;
}

const categories = [
  { value: "website", label: "مواقع" },
  { value: "mobile", label: "تطبيقات" },
  { value: "systems", label: "أنظمة" },
  { value: "infrastructure", label: "بنية تحتية" },
];

const defaultProject: ProjectData = {
  slug: "",
  category: "website",
  title: "",
  titleEn: "",
  client: "",
  clientEn: "",
  industry: "",
  industryEn: "",
  summary: "",
  summaryEn: "",
  description: "",
  descriptionEn: "",
  problem: "",
  problemEn: "",
  solution: "",
  solutionEn: "",
  results: "[]",
  resultsEn: "[]",
  tags: "[]",
  tagsEn: "[]",
  testimonial: "{}",
  testimonialEn: "{}",
  techStack: "[]",
  thumbnail: "",
  images: "[]",
  duration: "",
  durationEn: "",
  year: new Date().getFullYear().toString(),
  displayOrder: 0,
  isActive: true,
};

function parseJson<T>(str: string, fallback: T): T {
  try {
    return JSON.parse(str);
  } catch {
    return fallback;
  }
}

export default function ProjectForm({
  initialData,
}: {
  initialData?: ProjectData;
}) {
  const router = useRouter();
  const isEditing = !!initialData?.id;

  const [form, setForm] = useState<ProjectData>(initialData || defaultProject);
  const [results, setResults] = useState<Result[]>(
    parseJson(initialData?.results || "[]", [])
  );
  const [testimonial, setTestimonial] = useState<Testimonial>(
    parseJson(initialData?.testimonial || "{}", { text: "", author: "", role: "" })
  );
  const [tagsStr, setTagsStr] = useState(
    parseJson<string[]>(initialData?.tags || "[]", []).join("، ")
  );
  const [techStackStr, setTechStackStr] = useState(
    parseJson<string[]>(initialData?.techStack || "[]", []).join("، ")
  );
  const [thumbnail, setThumbnail] = useState(initialData?.thumbnail || "");
  const [projectImages, setProjectImages] = useState<string[]>(
    parseJson<string[]>(initialData?.images || "[]", [])
  );
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState<"ar" | "en">("ar");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const set = (key: keyof ProjectData, value: string | number | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s\u0621-\u064A-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()
      .substring(0, 60);
  };

  const addResult = () => {
    setResults((prev) => [...prev, { metric: "", value: "", description: "" }]);
  };

  const updateResult = (idx: number, field: keyof Result, value: string) => {
    setResults((prev) =>
      prev.map((r, i) => (i === idx ? { ...r, [field]: value } : r))
    );
  };

  const removeResult = (idx: number) => {
    setResults((prev) => prev.filter((_, i) => i !== idx));
  };

  const uploadFile = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "فشل رفع الملف");
        return null;
      }
      const data = await res.json();
      return data.url;
    } catch {
      setError("فشل رفع الملف");
      return null;
    }
  };

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    const url = await uploadFile(file);
    if (url) setThumbnail(url);
    setUploading(false);
    e.target.value = "";
  };

  const handleImagesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    setError("");
    const urls: string[] = [];
    for (const file of Array.from(files)) {
      const url = await uploadFile(file);
      if (url) urls.push(url);
    }
    if (urls.length > 0) {
      setProjectImages((prev) => [...prev, ...urls]);
    }
    setUploading(false);
    e.target.value = "";
  };

  const removeImage = (idx: number) => {
    setProjectImages((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSave = async () => {
    if (!form.title.trim()) {
      setError("عنوان المشروع مطلوب");
      return;
    }

    setSaving(true);
    setError("");

    const slug = form.slug || generateSlug(form.title);
    const tags = tagsStr
      .split(/[،,]/)
      .map((t) => t.trim())
      .filter(Boolean);
    const techStack = techStackStr
      .split(/[،,]/)
      .map((t) => t.trim())
      .filter(Boolean);

    const body = {
      ...form,
      slug,
      tags: JSON.stringify(tags),
      tagsEn: form.tagsEn || JSON.stringify([]),
      techStack: JSON.stringify(techStack),
      results: JSON.stringify(results),
      testimonial: JSON.stringify(testimonial),
      thumbnail,
      images: JSON.stringify(projectImages),
    };

    try {
      const url = isEditing
        ? `/api/admin/projects/${form.id}`
        : "/api/admin/projects";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "حصل خطأ");
        return;
      }

      window.location.href = "/admin/dashboard/projects";
    } catch {
      setError("حصل خطأ في الحفظ");
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF37]/50 transition-colors font-cairo text-sm";
  const labelClass = "block text-sm font-medium text-white/70 mb-2 font-cairo";
  const textareaClass = `${inputClass} resize-none`;

  return (
    <div>
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-white/50 hover:text-white text-sm font-cairo mb-6 transition-colors"
      >
        <ArrowRight className="w-4 h-4" />
        رجوع
      </button>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold font-cairo">
          {isEditing ? "تعديل المشروع" : "إضافة مشروع جديد"}
        </h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#D4AF37] text-[#0B1F3F] rounded-xl text-sm font-cairo font-bold hover:bg-[#e0c04a] transition-colors disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {saving ? "جاري الحفظ..." : "حفظ"}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-400/10 border border-red-400/20 rounded-xl text-red-400 text-sm font-cairo">
          {error}
        </div>
      )}

      {/* Language tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab("ar")}
          className={`px-4 py-2 rounded-xl text-sm font-cairo font-medium transition-all ${
            activeTab === "ar"
              ? "bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30"
              : "bg-white/5 text-white/50 hover:text-white"
          }`}
        >
          عربي
        </button>
        <button
          onClick={() => setActiveTab("en")}
          className={`px-4 py-2 rounded-xl text-sm font-cairo font-medium transition-all ${
            activeTab === "en"
              ? "bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30"
              : "bg-white/5 text-white/50 hover:text-white"
          }`}
        >
          English
        </button>
      </div>

      <div className="space-y-6">
        {/* Basic Info */}
        <div className="bg-[#0B1F3F] border border-white/10 rounded-2xl p-6">
          <h2 className="text-lg font-bold font-cairo mb-4 text-[#D4AF37]">
            معلومات أساسية
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>
                {activeTab === "ar" ? "عنوان المشروع" : "Project Title (EN)"}
              </label>
              <input
                type="text"
                value={activeTab === "ar" ? form.title : form.titleEn}
                onChange={(e) => {
                  if (activeTab === "ar") {
                    set("title", e.target.value);
                    if (!isEditing && !form.slug) {
                      set("slug", generateSlug(e.target.value));
                    }
                  } else {
                    set("titleEn", e.target.value);
                  }
                }}
                className={inputClass}
                placeholder={
                  activeTab === "ar" ? "مثال: منصة عقارية متكاملة" : "e.g. Real Estate Platform"
                }
                dir={activeTab === "en" ? "ltr" : "rtl"}
              />
            </div>
            <div>
              <label className={labelClass}>Slug (رابط المشروع)</label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => set("slug", e.target.value)}
                className={inputClass}
                dir="ltr"
                placeholder="saudi-real-estate-platform"
              />
            </div>
            <div>
              <label className={labelClass}>
                {activeTab === "ar" ? "العميل" : "Client (EN)"}
              </label>
              <input
                type="text"
                value={activeTab === "ar" ? form.client : form.clientEn}
                onChange={(e) =>
                  set(activeTab === "ar" ? "client" : "clientEn", e.target.value)
                }
                className={inputClass}
                dir={activeTab === "en" ? "ltr" : "rtl"}
              />
            </div>
            <div>
              <label className={labelClass}>
                {activeTab === "ar" ? "الصناعة" : "Industry (EN)"}
              </label>
              <input
                type="text"
                value={activeTab === "ar" ? form.industry : form.industryEn}
                onChange={(e) =>
                  set(activeTab === "ar" ? "industry" : "industryEn", e.target.value)
                }
                className={inputClass}
                dir={activeTab === "en" ? "ltr" : "rtl"}
              />
            </div>
            <div>
              <label className={labelClass}>التصنيف</label>
              <select
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
                className={inputClass}
              >
                {categories.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>السنة</label>
              <input
                type="text"
                value={form.year}
                onChange={(e) => set("year", e.target.value)}
                className={inputClass}
                dir="ltr"
              />
            </div>
            <div>
              <label className={labelClass}>
                {activeTab === "ar" ? "المدة" : "Duration (EN)"}
              </label>
              <input
                type="text"
                value={activeTab === "ar" ? form.duration : form.durationEn}
                onChange={(e) =>
                  set(
                    activeTab === "ar" ? "duration" : "durationEn",
                    e.target.value
                  )
                }
                className={inputClass}
                placeholder={activeTab === "ar" ? "12 أسبوع" : "12 weeks"}
                dir={activeTab === "en" ? "ltr" : "rtl"}
              />
            </div>
            <div>
              <label className={labelClass}>ترتيب العرض</label>
              <input
                type="number"
                value={form.displayOrder}
                onChange={(e) => set("displayOrder", parseInt(e.target.value) || 0)}
                className={inputClass}
                dir="ltr"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-[#0B1F3F] border border-white/10 rounded-2xl p-6">
          <h2 className="text-lg font-bold font-cairo mb-4 text-[#D4AF37]">
            المحتوى {activeTab === "en" ? "(English)" : ""}
          </h2>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>
                {activeTab === "ar" ? "ملخص" : "Summary (EN)"}
              </label>
              <textarea
                value={activeTab === "ar" ? form.summary : form.summaryEn}
                onChange={(e) =>
                  set(activeTab === "ar" ? "summary" : "summaryEn", e.target.value)
                }
                className={textareaClass}
                rows={2}
                dir={activeTab === "en" ? "ltr" : "rtl"}
              />
            </div>
            <div>
              <label className={labelClass}>
                {activeTab === "ar" ? "الوصف التفصيلي" : "Description (EN)"}
              </label>
              <textarea
                value={activeTab === "ar" ? form.description : form.descriptionEn}
                onChange={(e) =>
                  set(
                    activeTab === "ar" ? "description" : "descriptionEn",
                    e.target.value
                  )
                }
                className={textareaClass}
                rows={3}
                dir={activeTab === "en" ? "ltr" : "rtl"}
              />
            </div>
            <div>
              <label className={labelClass}>
                {activeTab === "ar" ? "المشكلة" : "Problem (EN)"}
              </label>
              <textarea
                value={activeTab === "ar" ? form.problem : form.problemEn}
                onChange={(e) =>
                  set(activeTab === "ar" ? "problem" : "problemEn", e.target.value)
                }
                className={textareaClass}
                rows={3}
                dir={activeTab === "en" ? "ltr" : "rtl"}
              />
            </div>
            <div>
              <label className={labelClass}>
                {activeTab === "ar" ? "الحل" : "Solution (EN)"}
              </label>
              <textarea
                value={activeTab === "ar" ? form.solution : form.solutionEn}
                onChange={(e) =>
                  set(
                    activeTab === "ar" ? "solution" : "solutionEn",
                    e.target.value
                  )
                }
                className={textareaClass}
                rows={3}
                dir={activeTab === "en" ? "ltr" : "rtl"}
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="bg-[#0B1F3F] border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold font-cairo text-[#D4AF37]">
              النتائج
            </h2>
            <button
              onClick={addResult}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#D4AF37]/20 text-[#D4AF37] rounded-lg text-xs font-cairo hover:bg-[#D4AF37]/30 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              إضافة نتيجة
            </button>
          </div>
          <div className="space-y-3">
            {results.map((r, i) => (
              <div
                key={i}
                className="flex gap-3 items-start bg-white/5 rounded-xl p-3"
              >
                <div className="flex-1 grid grid-cols-3 gap-3">
                  <input
                    type="text"
                    value={r.metric}
                    onChange={(e) => updateResult(i, "metric", e.target.value)}
                    className={inputClass}
                    placeholder="المقياس (مثال: زيادة المبيعات)"
                  />
                  <input
                    type="text"
                    value={r.value}
                    onChange={(e) => updateResult(i, "value", e.target.value)}
                    className={inputClass}
                    placeholder="القيمة (مثال: 340%)"
                    dir="ltr"
                  />
                  <input
                    type="text"
                    value={r.description}
                    onChange={(e) =>
                      updateResult(i, "description", e.target.value)
                    }
                    className={inputClass}
                    placeholder="الوصف"
                  />
                </div>
                <button
                  onClick={() => removeResult(i)}
                  className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors shrink-0 mt-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            {results.length === 0 && (
              <p className="text-white/30 text-sm font-cairo text-center py-4">
                اضغط &ldquo;إضافة نتيجة&rdquo; لإضافة نتائج المشروع
              </p>
            )}
          </div>
        </div>

        {/* Tags & Tech */}
        <div className="bg-[#0B1F3F] border border-white/10 rounded-2xl p-6">
          <h2 className="text-lg font-bold font-cairo mb-4 text-[#D4AF37]">
            التقنيات والتاجز
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>
                التاجز (مفصولة بفاصلة)
              </label>
              <input
                type="text"
                value={tagsStr}
                onChange={(e) => setTagsStr(e.target.value)}
                className={inputClass}
                placeholder="Next.js، React، PostgreSQL"
              />
            </div>
            <div>
              <label className={labelClass}>
                التقنيات المستخدمة (مفصولة بفاصلة)
              </label>
              <input
                type="text"
                value={techStackStr}
                onChange={(e) => setTechStackStr(e.target.value)}
                className={inputClass}
                placeholder="Next.js، React، Node.js، PostgreSQL"
              />
            </div>
          </div>
        </div>

        {/* Testimonial */}
        <div className="bg-[#0B1F3F] border border-white/10 rounded-2xl p-6">
          <h2 className="text-lg font-bold font-cairo mb-4 text-[#D4AF37]">
            شهادة العميل (اختياري)
          </h2>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>نص الشهادة</label>
              <textarea
                value={testimonial.text}
                onChange={(e) =>
                  setTestimonial((prev) => ({ ...prev, text: e.target.value }))
                }
                className={textareaClass}
                rows={2}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>اسم الشخص</label>
                <input
                  type="text"
                  value={testimonial.author}
                  onChange={(e) =>
                    setTestimonial((prev) => ({
                      ...prev,
                      author: e.target.value,
                    }))
                  }
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>المنصب</label>
                <input
                  type="text"
                  value={testimonial.role}
                  onChange={(e) =>
                    setTestimonial((prev) => ({
                      ...prev,
                      role: e.target.value,
                    }))
                  }
                  className={inputClass}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="bg-[#0B1F3F] border border-white/10 rounded-2xl p-6">
          <h2 className="text-lg font-bold font-cairo mb-4 text-[#D4AF37]">
            <ImageIcon className="w-5 h-5 inline-block ml-2" />
            صور المشروع
          </h2>

          {/* Thumbnail */}
          <div className="mb-6">
            <label className={labelClass}>الصورة الرئيسية (Thumbnail)</label>
            {thumbnail ? (
              <div className="relative w-full max-w-md aspect-video rounded-xl overflow-hidden border border-white/10 group">
                <Image
                  src={thumbnail}
                  alt="Thumbnail"
                  fill
                  className="object-cover"
                  unoptimized
                />
                <button
                  onClick={() => setThumbnail("")}
                  className="absolute top-2 left-2 p-1.5 bg-red-500/80 rounded-lg text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full max-w-md aspect-video border-2 border-dashed border-white/20 rounded-xl cursor-pointer hover:border-[#D4AF37]/40 transition-colors">
                <Upload className="w-8 h-8 text-white/30 mb-2" />
                <span className="text-sm text-white/40 font-cairo">
                  {uploading ? "جاري الرفع..." : "اضغط لرفع الصورة الرئيسية"}
                </span>
                <span className="text-xs text-white/20 font-cairo mt-1">
                  JPG, PNG, WebP — حد أقصى 5MB
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailUpload}
                  className="hidden"
                  disabled={uploading}
                />
              </label>
            )}
          </div>

          {/* Gallery Images */}
          <div>
            <label className={labelClass}>معرض الصور (Gallery)</label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-3">
              {projectImages.map((img, idx) => (
                <div
                  key={idx}
                  className="relative aspect-video rounded-xl overflow-hidden border border-white/10 group"
                >
                  <Image
                    src={img}
                    alt={`Image ${idx + 1}`}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={() => removeImage(idx)}
                      className="p-1.5 bg-red-500/80 rounded-lg text-white"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="absolute bottom-1 right-1 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded font-cairo">
                    {idx + 1}
                  </div>
                </div>
              ))}

              {/* Add more button */}
              <label className="flex flex-col items-center justify-center aspect-video border-2 border-dashed border-white/20 rounded-xl cursor-pointer hover:border-[#D4AF37]/40 transition-colors">
                <Plus className="w-6 h-6 text-white/30 mb-1" />
                <span className="text-xs text-white/40 font-cairo">
                  {uploading ? "جاري الرفع..." : "إضافة صور"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImagesUpload}
                  className="hidden"
                  disabled={uploading}
                />
              </label>
            </div>
            {projectImages.length > 0 && (
              <p className="text-xs text-white/30 font-cairo">
                {projectImages.length} صورة — اضغط على الصورة لحذفها
              </p>
            )}
          </div>
        </div>

        {/* Active toggle */}
        <div className="bg-[#0B1F3F] border border-white/10 rounded-2xl p-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) => set("isActive", e.target.checked)}
              className="w-5 h-5 rounded bg-white/10 border-white/20 text-[#D4AF37] focus:ring-[#D4AF37]"
            />
            <span className="font-cairo text-sm text-white">
              نشط (يظهر في الموقع)
            </span>
          </label>
        </div>

        {/* Save button bottom */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-[#D4AF37] text-[#0B1F3F] rounded-xl text-sm font-cairo font-bold hover:bg-[#e0c04a] transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? "جاري الحفظ..." : "حفظ المشروع"}
          </button>
        </div>
      </div>
    </div>
  );
}
