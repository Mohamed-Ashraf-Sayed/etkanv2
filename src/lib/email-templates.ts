interface BookingData {
  type: "consultation" | "quote";
  name: string;
  email: string;
  phone: string;
  // Consultation
  date?: string;
  timeSlot?: string;
  serviceType?: string;
  notes?: string;
  // Quote
  serviceCategories?: string[];
  features?: string[];
  budgetRange?: string;
  timeline?: string;
  companyName?: string;
  projectDescription?: string;
}

const baseStyle = `
  font-family: 'Segoe UI', Tahoma, sans-serif;
  direction: rtl;
  text-align: right;
  max-width: 600px;
  margin: 0 auto;
  background: #0B1F3F;
  border-radius: 12px;
  overflow: hidden;
`;

const headerStyle = `
  background: linear-gradient(135deg, #0B1F3F 0%, #132d5e 100%);
  padding: 30px;
  text-align: center;
  border-bottom: 3px solid #D4AF37;
`;

const bodyStyle = `padding: 30px; color: #e0e0e0;`;
const goldText = `color: #D4AF37; font-weight: bold;`;
const rowStyle = `
  padding: 12px 0;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  font-size: 14px;
`;

export function buildAdminEmailHtml(data: BookingData): string {
  const isConsultation = data.type === "consultation";
  const title = isConsultation ? "حجز استشارة جديد" : "طلب عرض سعر جديد";

  let detailsHtml = `
    <div style="${rowStyle}"><span style="${goldText}">الاسم:</span> ${data.name}</div>
    <div style="${rowStyle}"><span style="${goldText}">الإيميل:</span> ${data.email}</div>
    <div style="${rowStyle}"><span style="${goldText}">الهاتف:</span> ${data.phone}</div>
  `;

  if (isConsultation) {
    detailsHtml += `
      <div style="${rowStyle}"><span style="${goldText}">التاريخ:</span> ${data.date || "-"}</div>
      <div style="${rowStyle}"><span style="${goldText}">الوقت:</span> ${data.timeSlot || "-"}</div>
      <div style="${rowStyle}"><span style="${goldText}">نوع الخدمة:</span> ${data.serviceType || "-"}</div>
      ${data.notes ? `<div style="${rowStyle}"><span style="${goldText}">ملاحظات:</span> ${data.notes}</div>` : ""}
    `;
  } else {
    detailsHtml += `
      ${data.companyName ? `<div style="${rowStyle}"><span style="${goldText}">الشركة:</span> ${data.companyName}</div>` : ""}
      <div style="${rowStyle}"><span style="${goldText}">الخدمات:</span> ${(data.serviceCategories || []).join("، ")}</div>
      <div style="${rowStyle}"><span style="${goldText}">الميزات:</span> ${(data.features || []).join("، ")}</div>
      <div style="${rowStyle}"><span style="${goldText}">الميزانية:</span> ${data.budgetRange || "-"}</div>
      <div style="${rowStyle}"><span style="${goldText}">الجدول الزمني:</span> ${data.timeline || "-"}</div>
      <div style="${rowStyle}"><span style="${goldText}">وصف المشروع:</span><br/>${data.projectDescription || "-"}</div>
    `;
  }

  return `
    <div style="${baseStyle}">
      <div style="${headerStyle}">
        <h1 style="color: #D4AF37; margin: 0; font-size: 22px;">إتقان للحلول المتكاملة</h1>
        <p style="color: #aaa; margin: 8px 0 0; font-size: 14px;">${title}</p>
      </div>
      <div style="${bodyStyle}">
        ${detailsHtml}
        <p style="margin-top: 20px; font-size: 12px; color: #888;">
          تم الإرسال في ${new Date().toLocaleString("ar-EG")}
        </p>
      </div>
    </div>
  `;
}

export function buildClientEmailHtml(data: BookingData): string {
  const isConsultation = data.type === "consultation";
  const title = isConsultation
    ? "تم تأكيد حجز موعدك"
    : "استلمنا طلب عرض السعر";
  const subtitle = isConsultation
    ? "هنتواصل معاك قبل الموعد للتأكيد"
    : "فريقنا هيراجع طلبك ويرد عليك خلال 24 ساعة";

  return `
    <div style="${baseStyle}">
      <div style="${headerStyle}">
        <h1 style="color: #D4AF37; margin: 0; font-size: 22px;">إتقان للحلول المتكاملة</h1>
      </div>
      <div style="${bodyStyle}">
        <h2 style="color: #fff; margin: 0 0 8px; font-size: 20px;">${title}</h2>
        <p style="color: #aaa; font-size: 14px; margin: 0 0 24px;">${subtitle}</p>

        <div style="background: rgba(212,175,55,0.1); border: 1px solid rgba(212,175,55,0.2); border-radius: 8px; padding: 16px; margin-bottom: 20px;">
          <p style="color: #D4AF37; font-size: 14px; margin: 0;">
            أهلاً ${data.name}، شكراً لتواصلك مع إتقان.
            ${isConsultation ? `موعدك يوم ${data.date || ""} الساعة ${data.timeSlot || ""}.` : ""}
          </p>
        </div>

        <p style="color: #888; font-size: 13px; margin-top: 24px; text-align: center;">
          لو عندك أي استفسار تواصل معانا في أي وقت
        </p>
      </div>
    </div>
  `;
}

export function buildTelegramBookingMessage(data: BookingData): string {
  const isConsultation = data.type === "consultation";
  const emoji = isConsultation ? "📅" : "💰";
  const title = isConsultation ? "حجز استشارة جديد" : "طلب عرض سعر جديد";

  let details = `👤 ${data.name}\n📧 ${data.email}\n📱 ${data.phone}`;

  if (isConsultation) {
    details += `\n📅 ${data.date || "-"}\n🕐 ${data.timeSlot || "-"}\n🔧 ${data.serviceType || "-"}`;
    if (data.notes) details += `\n📝 ${data.notes}`;
  } else {
    if (data.companyName) details += `\n🏢 ${data.companyName}`;
    details += `\n🔧 ${(data.serviceCategories || []).join("، ")}`;
    details += `\n💵 ${data.budgetRange || "-"}`;
    details += `\n⏰ ${data.timeline || "-"}`;
    if (data.projectDescription)
      details += `\n📋 ${data.projectDescription.substring(0, 200)}`;
  }

  return `${emoji} ${title}\n━━━━━━━━━━━━\n${details}`;
}
