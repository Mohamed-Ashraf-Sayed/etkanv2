"use client";

import { MessageCircle } from "lucide-react";

export default function ConversationsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold font-cairo mb-6">المحادثات النشطة</h1>

      <div className="bg-[#0B1F3F] border border-white/10 rounded-2xl p-8">
        <div className="flex flex-col items-center justify-center text-center py-8">
          <div className="w-16 h-16 rounded-2xl bg-blue-400/10 flex items-center justify-center mb-4">
            <MessageCircle className="w-8 h-8 text-blue-400" />
          </div>
          <h2 className="text-lg font-bold font-cairo text-white mb-2">
            المحادثات تُدار من تليجرام
          </h2>
          <p className="text-white/40 font-cairo text-sm max-w-md">
            رسائل العملاء من الشات بوت توصلك على تليجرام مباشرة. تقدر ترد من
            هناك والرد يوصل للعميل على الموقع.
          </p>
          <div className="mt-6 p-4 bg-white/5 rounded-xl max-w-sm">
            <p className="text-xs text-white/30 font-cairo mb-2">طرق الرد من تليجرام:</p>
            <ul className="text-xs text-white/50 font-cairo space-y-1 text-right">
              <li>• Reply على رسالة العميل مباشرة</li>
              <li>• اكتب &ldquo;رقم العميل + الرسالة&rdquo; (مثال: 1 أهلاً)</li>
              <li>• اكتب الرسالة مباشرة (ترسل لآخر عميل)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
