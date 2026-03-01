"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  CalendarCheck,
  MessageCircle,
  LogOut,
} from "lucide-react";

const links = [
  { href: "/admin/dashboard", label: "لوحة التحكم", icon: LayoutDashboard },
  { href: "/admin/dashboard/bookings", label: "الحجوزات", icon: CalendarCheck },
  {
    href: "/admin/dashboard/conversations",
    label: "المحادثات",
    icon: MessageCircle,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" });
    document.cookie = "admin-token=; path=/; max-age=0";
    router.push("/admin/login");
  };

  return (
    <aside className="w-64 bg-[#0B1F3F] border-l border-white/10 min-h-screen flex flex-col" dir="rtl">
      <div className="p-6 border-b border-white/10">
        <Link href="/admin/dashboard" className="flex items-center gap-2">
          <span className="text-xl font-black text-white font-cairo">إتقان</span>
          <span className="text-[#D4AF37] text-xs font-cairo">أدمن</span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {links.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-cairo font-medium transition-all ${
                isActive
                  ? "bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon className="w-5 h-5" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-cairo font-medium text-red-400 hover:bg-red-400/10 w-full transition-all"
        >
          <LogOut className="w-5 h-5" />
          تسجيل خروج
        </button>
      </div>
    </aside>
  );
}
