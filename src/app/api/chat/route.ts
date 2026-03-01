import Anthropic from "@anthropic-ai/sdk";
import { SYSTEM_PROMPT } from "@/data/chatbot";
import {
  getOrCreateConversation,
  addMessage,
  addTelegramMessageId,
  getFirstTelegramMessageId,
  setLastActiveConversation,
} from "@/lib/conversations";
import {
  sendTelegramMessage,
  formatNewConversation,
  formatFollowUpMessage,
  formatFollowUpWithAi,
} from "@/lib/telegram";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages, conversationId } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response("Invalid messages format", { status: 400 });
    }

    const convId = conversationId || "anonymous";
    const conv = getOrCreateConversation(convId);
    const latestUserMessage =
      messages[messages.length - 1]?.content || "";

    // Store user message & mark as last active
    addMessage(convId, {
      role: "user",
      content: latestUserMessage,
      timestamp: Date.now(),
    });
    setLastActiveConversation(convId);

    const replyToId = getFirstTelegramMessageId(convId);

    // If admin has taken over, forward to Telegram silently
    if (conv.isAdminMode) {
      const msgId = await sendTelegramMessage(
        formatFollowUpMessage(conv.clientNumber, latestUserMessage),
        { reply_to_message_id: replyToId }
      );
      if (msgId) addTelegramMessageId(convId, msgId);

      // Return empty — admin reply will come via polling
      return new Response("", {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }

    // Use Claude AI
    const apiMessages = messages
      .filter(
        (m: { role: string }) =>
          m.role === "user" || m.role === "assistant"
      )
      .map((m: { role: string; content: string }) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      }));

    const stream = await client.messages.stream({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: apiMessages,
    });

    let fullResponse = "";
    const isFirstMessage = conv.messages.length <= 1;

    const readableStream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        for await (const event of stream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            fullResponse += event.delta.text;
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        controller.close();

        // Store AI response
        addMessage(convId, {
          role: "assistant",
          content: fullResponse,
          timestamp: Date.now(),
        });

        // Forward to Telegram
        const telegramText = isFirstMessage
          ? formatNewConversation(
              conv.clientNumber,
              latestUserMessage,
              fullResponse
            )
          : formatFollowUpWithAi(
              conv.clientNumber,
              latestUserMessage,
              fullResponse
            );

        sendTelegramMessage(telegramText, {
          reply_to_message_id: replyToId,
        }).then((msgId) => {
          if (msgId) addTelegramMessageId(convId, msgId);
        });
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response("حصل خطأ، حاول تاني", { status: 500 });
  }
}
