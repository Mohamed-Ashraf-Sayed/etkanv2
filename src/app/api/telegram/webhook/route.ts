import {
  findConversationByTelegramId,
  findConversationByClientNumber,
  getLastActiveConversation,
  addAdminReply,
} from "@/lib/conversations";
import { sendAdminConfirmation, sendTelegramMessage } from "@/lib/telegram";

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
  const secret = req.headers.get("x-telegram-bot-api-secret-token");
  if (secret && secret !== process.env.TELEGRAM_WEBHOOK_SECRET) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const update: TelegramUpdate = await req.json();
    const message = update.message;

    if (!message?.text) {
      return Response.json({ ok: true });
    }

    // Verify it's from the admin
    const adminChatId = process.env.TELEGRAM_ADMIN_CHAT_ID;
    if (String(message.chat.id) !== adminChatId) {
      return Response.json({ ok: true });
    }

    const text = message.text.trim();

    // Option 1: Reply to a specific message → send to that client
    if (message.reply_to_message) {
      const repliedToId = message.reply_to_message.message_id;
      const conv = findConversationByTelegramId(repliedToId);
      if (conv) {
        addAdminReply(conv.id, text);
        await sendAdminConfirmation(conv.clientNumber, message.message_id);
        return Response.json({ ok: true });
      }
    }

    // Option 2: Message starts with client number like "1 أهلاً" or "2 تمام"
    const numberMatch = text.match(/^(\d+)\s+([\s\S]+)/);
    if (numberMatch) {
      const clientNum = parseInt(numberMatch[1]);
      const replyText = numberMatch[2];
      const conv = findConversationByClientNumber(clientNum);
      if (conv) {
        addAdminReply(conv.id, replyText);
        await sendAdminConfirmation(conv.clientNumber, message.message_id);
        return Response.json({ ok: true });
      }
    }

    // Option 3: Just text → send to last active client
    const lastConv = getLastActiveConversation();
    if (lastConv) {
      addAdminReply(lastConv.id, text);
      await sendAdminConfirmation(
        lastConv.clientNumber,
        message.message_id
      );
      return Response.json({ ok: true });
    }

    // No active conversations
    await sendTelegramMessage("⚠️ مفيش محادثات نشطة دلوقتي");
    return Response.json({ ok: true });
  } catch (error) {
    console.error("Telegram webhook error:", error);
    return Response.json({ ok: true });
  }
}

export async function GET() {
  return Response.json({ status: "ok" });
}
