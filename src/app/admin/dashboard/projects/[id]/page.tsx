"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProjectForm from "@/components/admin/ProjectForm";

export default function EditProjectPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/admin/projects/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setProject(data.project);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-white/40 font-cairo">
        جاري التحميل...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex items-center justify-center h-64 text-red-400 font-cairo">
        المشروع غير موجود
      </div>
    );
  }

  return <ProjectForm initialData={project} />;
}
