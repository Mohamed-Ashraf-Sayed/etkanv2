"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Save, Loader2, Eye } from "lucide-react";

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
          {post.heroImage && (
            <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
              <img
                src={post.heroImage}
                alt={post.title}
                className="w-full aspect-[16/9] object-cover"
              />
            </div>
          )}

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

          {/* Inline images preview */}
          {inlineImages.length > 0 && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                صور المقال
              </label>
              <div className="grid grid-cols-2 gap-3">
                {inlineImages.map((img: string, i: number) => (
                  <img
                    key={i}
                    src={img}
                    alt=""
                    className="rounded-xl border border-gray-200 dark:border-gray-700 aspect-[16/9] object-cover"
                  />
                ))}
              </div>
            </div>
          )}
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
