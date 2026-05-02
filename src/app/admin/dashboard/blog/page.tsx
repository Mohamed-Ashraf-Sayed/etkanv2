"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Loader2,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Plus,
} from "lucide-react";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  heroImage: string;
  status: string;
  readingTime: number;
  publishedAt: string | null;
  createdAt: string;
}

export default function BlogAdminPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [topic, setTopic] = useState("");
  const [error, setError] = useState("");

  const loadPosts = async () => {
    try {
      const res = await fetch("/api/admin/blog");
      const data = await res.json();
      setPosts(data.posts || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleGenerate = async () => {
    if (topic.trim().length < 5) {
      setError("اكتب موضوع 5 أحرف على الأقل");
      return;
    }
    setError("");
    setGenerating(true);
    try {
      const res = await fetch("/api/admin/blog/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "فشل التوليد");
      setTopic("");
      await loadPosts();
      alert(`تم إنشاء المقال "${data.post.title}" كـ draft. راجعه ونشره.`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "حصل خطأ");
    } finally {
      setGenerating(false);
    }
  };

  const togglePublish = async (post: BlogPost) => {
    const newStatus = post.status === "published" ? "draft" : "published";
    try {
      await fetch(`/api/admin/blog/${post.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      await loadPosts();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("متأكد إنك عايز تحذف المقال ده؟")) return;
    try {
      await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
      await loadPosts();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            المدونة
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            إنشاء وإدارة المقالات بالذكاء الاصطناعي
          </p>
        </div>
      </div>

      {/* Generate Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h2 className="font-bold text-gray-900 dark:text-white">
              إنشاء مقال بالذكاء الاصطناعي
            </h2>
            <p className="text-xs text-gray-500">
              اكتب موضوع المقال وسيتم إنشاؤه كاملاً مع الصور
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <input
            type="text"
            value={topic}
            onChange={(e) => {
              setTopic(e.target.value);
              setError("");
            }}
            placeholder="مثلاً: تكلفة تطوير تطبيق موبايل في مصر 2026"
            disabled={generating}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/30 disabled:opacity-50"
          />
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
          <button
            onClick={handleGenerate}
            disabled={generating || topic.trim().length < 5}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {generating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                جاري الإنشاء (1-2 دقيقة)...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                إنشاء المقال
              </>
            )}
          </button>
          <p className="text-xs text-gray-400">
            * يستخدم Claude AI لكتابة المقال + DALL-E 3 لإنشاء الصور (~$0.20 لكل
            مقال)
          </p>
        </div>
      </div>

      {/* Posts List */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="font-bold text-gray-900 dark:text-white">
            المقالات ({posts.length})
          </h2>
        </div>

        {loading ? (
          <div className="p-12 text-center text-gray-500">جاري التحميل...</div>
        ) : posts.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            لا توجد مقالات. ابدأ بإنشاء أول مقال.
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {posts.map((post) => (
              <div
                key={post.id}
                className="p-5 flex flex-col md:flex-row gap-4 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
              >
                {/* Image */}
                {post.heroImage && (
                  <div className="w-full md:w-32 h-24 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-900 shrink-0">
                    <img
                      src={post.heroImage}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-semibold ${
                        post.status === "published"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                      }`}
                    >
                      {post.status === "published" ? "منشور" : "مسودة"}
                    </span>
                    <span className="text-xs text-gray-500">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-400">
                      • {post.readingTime} د قراءة
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1 line-clamp-1">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`/admin/dashboard/blog/${post.id}`}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
                    title="تعديل"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => togglePublish(post)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
                    title={post.status === "published" ? "إلغاء النشر" : "نشر"}
                  >
                    {post.status === "published" ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600"
                    title="حذف"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
