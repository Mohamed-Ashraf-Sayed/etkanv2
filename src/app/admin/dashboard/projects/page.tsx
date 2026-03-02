"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit2, Trash2, Eye, EyeOff } from "lucide-react";

interface Project {
  id: string;
  slug: string;
  category: string;
  title: string;
  client: string;
  year: string;
  isActive: boolean;
  displayOrder: number;
  createdAt: string;
}

const categoryLabels: Record<string, string> = {
  website: "مواقع",
  mobile: "تطبيقات",
  systems: "أنظمة",
  infrastructure: "بنية تحتية",
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/projects");
    const data = await res.json();
    setProjects(data.projects || []);
    setTotal(data.total || 0);
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const toggleActive = async (id: string, isActive: boolean) => {
    await fetch(`/api/admin/projects/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !isActive }),
    });
    fetchProjects();
  };

  const deleteProject = async (id: string, title: string) => {
    if (!confirm(`هل أنت متأكد من حذف "${title}"؟`)) return;
    await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
    fetchProjects();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold font-cairo">المشاريع ({total})</h1>
        <Link
          href="/admin/dashboard/projects/new"
          className="flex items-center gap-2 px-4 py-2.5 bg-[#D4AF37] text-[#0B1F3F] rounded-xl text-sm font-cairo font-bold hover:bg-[#e0c04a] transition-colors"
        >
          <Plus className="w-4 h-4" />
          إضافة مشروع
        </Link>
      </div>

      <div className="bg-[#0B1F3F] border border-white/10 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-white/40 font-cairo">
            جاري التحميل...
          </div>
        ) : projects.length === 0 ? (
          <div className="p-8 text-center text-white/40 font-cairo">
            <p className="mb-4">لا يوجد مشاريع حتى الآن</p>
            <Link
              href="/admin/dashboard/projects/new"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37]/20 text-[#D4AF37] rounded-xl text-sm font-cairo hover:bg-[#D4AF37]/30 transition-colors"
            >
              <Plus className="w-4 h-4" />
              أضف أول مشروع
            </Link>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-6 py-4 text-right text-xs font-cairo font-medium text-white/40">
                  المشروع
                </th>
                <th className="px-6 py-4 text-right text-xs font-cairo font-medium text-white/40">
                  التصنيف
                </th>
                <th className="px-6 py-4 text-right text-xs font-cairo font-medium text-white/40">
                  العميل
                </th>
                <th className="px-6 py-4 text-right text-xs font-cairo font-medium text-white/40">
                  السنة
                </th>
                <th className="px-6 py-4 text-right text-xs font-cairo font-medium text-white/40">
                  الحالة
                </th>
                <th className="px-6 py-4 text-right text-xs font-cairo font-medium text-white/40">
                  إجراءات
                </th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="px-6 py-4">
                    <p className="font-medium font-cairo text-white text-sm">
                      {p.title}
                    </p>
                    <p className="text-xs text-white/40 font-cairo">{p.slug}</p>
                  </td>
                  <td className="px-6 py-4 text-sm font-cairo text-white/60">
                    {categoryLabels[p.category] || p.category}
                  </td>
                  <td className="px-6 py-4 text-sm font-cairo text-white/60">
                    {p.client}
                  </td>
                  <td className="px-6 py-4 text-sm font-cairo text-white/60">
                    {p.year}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleActive(p.id, p.isActive)}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-cairo font-medium transition-colors ${
                        p.isActive
                          ? "bg-green-400/20 text-green-400"
                          : "bg-white/10 text-white/40"
                      }`}
                    >
                      {p.isActive ? (
                        <>
                          <Eye className="w-3 h-3" /> نشط
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3 h-3" /> مخفي
                        </>
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/dashboard/projects/${p.id}`}
                        className="p-2 rounded-lg text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => deleteProject(p.id, p.title)}
                        className="p-2 rounded-lg text-red-400 hover:bg-red-400/10 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
