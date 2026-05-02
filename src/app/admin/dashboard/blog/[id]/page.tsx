"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  Save,
  Loader2,
  Eye,
  RefreshCw,
  ImageIcon,
} from "lucide-react";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  titleEn: string;
  excerpt: string;
  excerptEn: string;
  content: string;
  contentEn: string;
  author: string;
  category: string;
  tags: string;
  heroImage: string;
  inlineImages: string;
  readingTime: number;
  status: string;
}

export default function BlogEditPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [regeneratingHero, setRegeneratingHero] = useState(false);
  const [regeneratingInline, setRegeneratingInline] = useState<number | null>(
    null
  );
  const [heroPrompt, setHeroPrompt] = useState("");
  const [inlinePrompts, setInlinePrompts] = useState<Record<number, string>>(
    {}
  );

  const regenerateImage = async (
    target: "hero" | "inline",
    index: number,
    prompt: string
  ) => {
    if (prompt.trim().length < 5) {
      alert("اكتب وصف للصورة على الأقل 5 أحرف");
      return;
    }
    if (target === "hero") setRegeneratingHero(true);
    else setRegeneratingInline(index);
    try {
      const res = await fetch(`/api/admin/blog/${id}/regenerate-image`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, target, index }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "فشل التوليد");

      // Reload post to get updated images
      const r2 = await fetch(`/api/admin/blog/${id}`);
      const d2 = await r2.json();
      setPost(d2.post);
      if (target === "hero") setHeroPrompt("");
      else setInlinePrompts({ ...inlinePrompts, [index]: "" });
    } catch (e) {
      alert(e instanceof Error ? e.message : "حصل خطأ");
    } finally {
      if (target === "hero") setRegeneratingHero(false);
      else setRegeneratingInline(null);
    }
  };

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`/api/admin/blog/${id}`);
        const data = await res.json();
        setPost(data.post);
        setTags(JSON.parse(data.post.tags || "[]"));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleSave = async (status?: string) => {
    if (!post) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/blog/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: post.title,
          titleEn: post.titleEn,
          excerpt: post.excerpt,
          excerptEn: post.excerptEn,
          content: post.content,
          contentEn: post.contentEn,
          category: post.category,
          author: post.author,
          readingTime: post.readingTime,
          heroImage: post.heroImage,
          tags,
          ...(status && { status }),
        }),
      });
      if (!res.ok) throw new Error("فشل الحفظ");
      const data = await res.json();
      setPost({ ...data.post });
      if (status === "published") {
        alert("تم النشر بنجاح!");
        router.push("/admin/dashboard/blog");
      } else {
        alert("تم الحفظ");
      }
    } catch (e) {
      alert(e instanceof Error ? e.message : "حصل خطأ");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-center">جاري التحميل...</div>;
  if (!post) return <div className="p-8 text-center">المقال غير موجود</div>;

  const inlineImages = JSON.parse(post.inlineImages || "[]");

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Link
          href="/admin/dashboard/blog"
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"
        >
          <ArrowRight className="w-5 h-5" />
        </Link>
        <div className="flex-1">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
            تعديل المقال
          </h1>
          <p className="text-xs text-gray-500">{post.slug}</p>
        </div>
        <div className="flex items-center gap-2">
          {post.status === "published" && (
            <Link
              href={`/blog/${post.slug}`}
              target="_blank"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-semibold hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <Eye className="w-4 h-4" />
              معاينة
            </Link>
          )}
          <button
            onClick={() => handleSave()}
            disabled={saving}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white text-sm font-semibold disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            حفظ
          </button>
          {post.status === "draft" ? (
            <button
              onClick={() => handleSave("published")}
              disabled={saving}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-bold disabled:opacity-50"
            >
              <Eye className="w-4 h-4" />
              نشر
            </button>
          ) : (
            <button
              onClick={() => handleSave("draft")}
              disabled={saving}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-yellow-600 hover:bg-yellow-700 text-white text-sm font-bold disabled:opacity-50"
            >
              إلغاء النشر
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main */}
        <div className="lg:col-span-2 space-y-5">
          {/* Hero image */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-gray-500" />
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                الصورة الرئيسية
              </label>
            </div>
            {post.heroImage ? (
              <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                <img
                  src={post.heroImage}
                  alt={post.title}
                  className="w-full aspect-[16/9] object-cover"
                />
              </div>
            ) : (
              <div className="rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 aspect-[16/9] flex items-center justify-center text-gray-400">
                <ImageIcon className="w-12 h-12" />
              </div>
            )}
            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-4 space-y-3">
              <p className="text-xs text-purple-700 dark:text-purple-300 font-semibold">
                إعادة توليد الصورة الرئيسية بالذكاء الاصطناعي
              </p>
              <textarea
                value={heroPrompt}
                onChange={(e) => setHeroPrompt(e.target.value)}
                placeholder="اوصف الصورة اللي عايزها... مثلاً: 3D rendering of a modern web development workspace with code on multiple screens, including Arabic title 'تطوير المواقع 2026' on the wall, navy blue and gold color scheme"
                disabled={regeneratingHero}
                rows={3}
                className="w-full px-3 py-2 rounded-lg border border-purple-200 dark:border-purple-700 bg-white dark:bg-gray-900 text-sm placeholder:text-gray-400 disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => regenerateImage("hero", 0, heroPrompt)}
                disabled={regeneratingHero || heroPrompt.trim().length < 5}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {regeneratingHero ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    جاري التوليد...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4" />
                    توليد صورة جديدة
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Title AR */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              العنوان (عربي)
            </label>
            <input
              type="text"
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          {/* Title EN */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Title (English)
            </label>
            <input
              type="text"
              value={post.titleEn}
              onChange={(e) => setPost({ ...post, titleEn: e.target.value })}
              dir="ltr"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          {/* Excerpt AR */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              الملخص (عربي)
            </label>
            <textarea
              value={post.excerpt}
              onChange={(e) => setPost({ ...post, excerpt: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          {/* Content AR */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              المحتوى (Markdown - عربي)
            </label>
            <textarea
              value={post.content}
              onChange={(e) => setPost({ ...post, content: e.target.value })}
              rows={20}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm"
            />
          </div>

          {/* Inline images */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              صور المقال (Inline)
            </label>
            <div className="space-y-4">
              {[0, 1].map((i) => {
                const img = inlineImages[i];
                return (
                  <div
                    key={i}
                    className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 space-y-3"
                  >
                    <p className="text-xs text-gray-500 font-semibold">
                      صورة {i + 1}
                    </p>
                    {img ? (
                      <img
                        src={img}
                        alt=""
                        className="w-full rounded-lg aspect-[16/9] object-cover border border-gray-200 dark:border-gray-700"
                      />
                    ) : (
                      <div className="rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-700 aspect-[16/9] flex items-center justify-center text-gray-400">
                        <ImageIcon className="w-10 h-10" />
                      </div>
                    )}
                    <textarea
                      value={inlinePrompts[i] || ""}
                      onChange={(e) =>
                        setInlinePrompts({
                          ...inlinePrompts,
                          [i]: e.target.value,
                        })
                      }
                      placeholder="اوصف الصورة اللي عايزها..."
                      disabled={regeneratingInline === i}
                      rows={2}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm disabled:opacity-50"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        regenerateImage(
                          "inline",
                          i,
                          inlinePrompts[i] || ""
                        )
                      }
                      disabled={
                        regeneratingInline === i ||
                        (inlinePrompts[i] || "").trim().length < 5
                      }
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {regeneratingInline === i ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          جاري التوليد...
                        </>
                      ) : (
                        <>
                          <RefreshCw className="w-3.5 h-3.5" />
                          {img ? "إعادة توليد" : "توليد"}
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">
                Slug
              </label>
              <input
                type="text"
                value={post.slug}
                disabled
                dir="ltr"
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm text-gray-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">
                التصنيف
              </label>
              <input
                type="text"
                value={post.category}
                onChange={(e) =>
                  setPost({ ...post, category: e.target.value })
                }
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">
                الكاتب
              </label>
              <input
                type="text"
                value={post.author}
                onChange={(e) => setPost({ ...post, author: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">
                وقت القراءة (دقايق)
              </label>
              <input
                type="number"
                value={post.readingTime}
                onChange={(e) =>
                  setPost({ ...post, readingTime: parseInt(e.target.value) || 5 })
                }
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">
                Tags (مفصولة بفاصلة)
              </label>
              <input
                type="text"
                value={tags.join(", ")}
                onChange={(e) =>
                  setTags(
                    e.target.value
                      .split(",")
                      .map((t) => t.trim())
                      .filter(Boolean)
                  )
                }
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
