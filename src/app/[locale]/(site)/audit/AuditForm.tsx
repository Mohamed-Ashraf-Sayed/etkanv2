"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { CheckCircle2, Loader2, Send } from "lucide-react";

export default function AuditForm() {
  const locale = useLocale();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [goals, setGoals] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setStatus("loading");
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "audit",
          name,
          email,
          phone,
          company: website,
          description: `Website to audit: ${website}\n\nGoals: ${goals || "—"}`,
          services: ["audit"],
          features: ["website-audit"],
          budget: "free",
          timeline: "48h",
        }),
      });
      if (!res.ok) throw new Error("submit failed");
      setStatus("success");
    } catch {
      setStatus("error");
      setError("حصل خطأ. حاول تاني أو راسلنا على info@etqanly.com");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-white/[0.04] backdrop-blur-sm border border-emerald-400/30 rounded-2xl p-8 text-center">
        <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 mx-auto flex items-center justify-center mb-4">
          <CheckCircle2 className="w-7 h-7 text-emerald-300" />
        </div>
        <h3 className="text-h3 font-bold font-cairo text-white mb-2">
          تم استلام طلبك ✓
        </h3>
        <p className="text-white/60 font-cairo leading-relaxed">
          هنبدأ في تقييم موقعك خلال ساعات. التقرير المفصّل هيوصلك على{" "}
          <span className="text-accent font-bold" dir="ltr">
            {email}
          </span>{" "}
          خلال 48 ساعة عمل.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] rounded-2xl p-6 sm:p-8 space-y-4"
    >
      <div className="text-center mb-2">
        <h3 className="text-h4 font-bold font-cairo text-white mb-1">
          ابدأ التقييم المجاني الآن
        </h3>
        <p className="text-xs text-white/50 font-cairo">
          املأ النموذج والتقرير يوصلك بريدياً خلال 48 ساعة
        </p>
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-xs font-cairo text-white/60 mb-1.5">
            الاسم *
          </label>
          <input
            type="text"
            required
            minLength={3}
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={status === "loading"}
            placeholder="محمد أحمد"
            className="w-full px-4 py-2.5 text-sm rounded-lg bg-white/5 border border-white/15 text-white placeholder:text-white/30 focus:outline-none focus:border-accent font-cairo disabled:opacity-50"
          />
        </div>

        <div>
          <label className="block text-xs font-cairo text-white/60 mb-1.5">
            البريد الإلكتروني *
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "loading"}
            placeholder="you@company.com"
            dir="ltr"
            className="w-full px-4 py-2.5 text-sm rounded-lg bg-white/5 border border-white/15 text-white placeholder:text-white/30 focus:outline-none focus:border-accent font-cairo disabled:opacity-50"
          />
        </div>

        <div>
          <label className="block text-xs font-cairo text-white/60 mb-1.5">
            رقم الواتساب *
          </label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={status === "loading"}
            placeholder="+20 1XX XXX XXXX"
            dir="ltr"
            className="w-full px-4 py-2.5 text-sm rounded-lg bg-white/5 border border-white/15 text-white placeholder:text-white/30 focus:outline-none focus:border-accent font-cairo disabled:opacity-50"
          />
        </div>

        <div>
          <label className="block text-xs font-cairo text-white/60 mb-1.5">
            رابط الموقع المراد تقييمه *
          </label>
          <input
            type="url"
            required
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            disabled={status === "loading"}
            placeholder="https://yoursite.com"
            dir="ltr"
            className="w-full px-4 py-2.5 text-sm rounded-lg bg-white/5 border border-white/15 text-white placeholder:text-white/30 focus:outline-none focus:border-accent font-cairo disabled:opacity-50"
          />
        </div>

        <div>
          <label className="block text-xs font-cairo text-white/60 mb-1.5">
            إيه أهم نقطة محتاج نركز عليها؟ (اختياري)
          </label>
          <textarea
            value={goals}
            onChange={(e) => setGoals(e.target.value)}
            disabled={status === "loading"}
            placeholder="مثلاً: الموقع بطيء على الموبايل، أو معدل التحويل قليل..."
            rows={3}
            className="w-full px-4 py-2.5 text-sm rounded-lg bg-white/5 border border-white/15 text-white placeholder:text-white/30 focus:outline-none focus:border-accent font-cairo resize-none disabled:opacity-50"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-accent hover:bg-accent-light text-navy font-bold font-cairo transition-colors disabled:opacity-50"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            جاري الإرسال...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            ابعت طلب التقييم المجاني
          </>
        )}
      </button>

      {error && (
        <p className="text-xs text-red-400 font-cairo text-center">{error}</p>
      )}

      <p className="text-[10px] text-white/40 font-cairo text-center leading-relaxed">
        بإرسالك للنموذج، فأنت توافق على{" "}
        <a href="/privacy" className="text-accent hover:underline">
          سياسة الخصوصية
        </a>
      </p>
    </form>
  );
}
