import { getPendingAdminMessages, getConversation } from "@/lib/conversations";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const convId = searchParams.get("conversationId");

  if (!convId) {
    return Response.json({ messages: [], isAdminMode: false });
  }

  const conv = getConversation(convId);
  const messages = getPendingAdminMessages(convId);

  return Response.json({
    messages,
    isAdminMode: conv?.isAdminMode || false,
  });
}
