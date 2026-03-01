const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "";
const ADMIN_CHAT_ID = process.env.TELEGRAM_ADMIN_CHAT_ID || "";

const API_BASE = `https://api.telegram.org/bot${BOT_TOKEN}`;

interface SendMessageOptions {
  parse_mode?: "HTML" | "Markdown";
  reply_to_message_id?: number;
}

interface TelegramResponse {
  ok: boolean;
  result?: { message_id: number };
}

export async function sendTelegramMessage(
  text: string,
  options: SendMessageOptions = {}
): Promise<number | null> {
  try {
    const res = await fetch(`${API_BASE}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: ADMIN_CHAT_ID,
        text,
        parse_mode: options.parse_mode || "HTML",
        reply_to_message_id: options.reply_to_message_id,
      }),
    });

    const data: TelegramResponse = await res.json();
    return data.ok ? data.result?.message_id ?? null : null;
  } catch (error) {
    console.error("Telegram send error:", error);
    return null;
  }
}

const CLIENT_EMOJIS = ["🔵", "🟢", "🟡", "🟠", "🔴", "🟣", "⚪", "🟤"];

function getClientEmoji(clientNumber: number): string {
  return CLIENT_EMOJIS[(clientNumber - 1) % CLIENT_EMOJIS.length];
}

export function formatNewConversation(
  clientNumber: number,
  clientMessage: string,
  aiReply: string
): string {
  const emoji = getClientEmoji(clientNumber);
  return [
    `${emoji} <b>عميل #${clientNumber} — محادثة جديدة</b>`,
    "━━━━━━━━━━━━",
    `💬 <b>العميل:</b> ${escapeHtml(clientMessage)}`,
    "",
    `🤖 <b>رد البوت:</b> ${escapeHtml(aiReply)}`,
    "━━━━━━━━━━━━",
    `↩️ ارد على الرسالة دي عشان تتكلم مع <b>عميل #${clientNumber}</b>`,
  ].join("\n");
}

export function formatFollowUpMessage(
  clientNumber: number,
  clientMessage: string
): string {
  const emoji = getClientEmoji(clientNumber);
  return [
    `${emoji} <b>عميل #${clientNumber}:</b>`,
    escapeHtml(clientMessage),
  ].join("\n");
}

export function formatFollowUpWithAi(
  clientNumber: number,
  clientMessage: string,
  aiReply: string
): string {
  const emoji = getClientEmoji(clientNumber);
  return [
    `${emoji} <b>عميل #${clientNumber}:</b>`,
    escapeHtml(clientMessage),
    "",
    `🤖 ${escapeHtml(aiReply)}`,
  ].join("\n");
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function sendAdminConfirmation(
  clientNumber: number,
  replyToId: number
): Promise<void> {
  const emoji = getClientEmoji(clientNumber);
  await sendTelegramMessage(
    `✅ ردك اتبعت لـ ${emoji} <b>عميل #${clientNumber}</b>`,
    { reply_to_message_id: replyToId }
  );
}
