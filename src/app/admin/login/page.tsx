"use client";

import { useState } from "react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "حصل خطأ");
        return;
      }

      // Full page navigation to ensure cookie is properly sent
      window.location.href = "/admin/dashboard";
    } catch {
      setError("حصل خطأ في الاتصال");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#060E1A] flex items-center justify-center p-4" dir="rtl">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-white font-cairo">إتقان</h1>
          <p className="text-[#D4AF37] text-sm mt-1 font-cairo">لوحة التحكم</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[#0B1F3F] rounded-2xl border border-white/10 p-8 space-y-5"
        >
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2 font-cairo">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF37] transition-colors font-cairo"
              placeholder="admin@etqan.com"
              dir="ltr"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/70 mb-2 font-cairo">
              كلمة المرور
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF37] transition-colors font-cairo"
              placeholder="••••••••"
              dir="ltr"
              required
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm font-cairo text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#D4AF37] text-[#0B1F3F] font-bold rounded-xl hover:bg-[#e0c04a] transition-colors disabled:opacity-50 font-cairo"
          >
            {loading ? "جاري الدخول..." : "تسجيل الدخول"}
          </button>
        </form>
      </div>
    </div>
  );
}
