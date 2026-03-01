import {
  findConversationByTelegramId,
  addAdminReply,
} from "@/lib/conversations";
import { sendAdminConfirmation } from "@/lib/telegram";

interface TelegramUpdate {
  message?: {
    message_id: number;
    chat: { id: number };
    text?: string;
    reply_to_message?: {
      message_id: number;
    };
  };
}

export async function POST(req: Request) {
  // Verify webhook secret
  const secret = req.headers.get("x-telegram-bot-api-secret-token");
  if (secret && secret !== process.env.TELEGRAM_WEBHOOK_SECRET) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const update: TelegramUpdate = await req.json();
    const message = update.message;

    if (!message?.text || !message.reply_to_message) {
      return Response.json({ ok: true });
    }

    // Verify it's from the admin
    const adminChatId = process.env.TELEGRAM_ADMIN_CHAT_ID;
    if (String(message.chat.id) !== adminChatId) {
      return Response.json({ ok: true });
    }

    // Find conversation by ANY telegram message ID in the thread
    const repliedToId = message.reply_to_message.message_id;
    const conv = findConversationByTelegramId(repliedToId);

    if (conv) {
      addAdminReply(conv.id, message.text);
      await sendAdminConfirmation(conv.clientNumber, message.message_id);
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Telegram webhook error:", error);
    return Response.json({ ok: true });
  }
}

export async function GET() {
  return Response.json({ status: "ok" });
}
