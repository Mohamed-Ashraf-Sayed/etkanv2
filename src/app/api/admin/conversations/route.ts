import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { getAllConversations } from "@/lib/conversations";

export const dynamic = "force-dynamic";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin-token")?.value;
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const conversations = await getAllConversations();

  const data = conversations.map((conv) => ({
    id: conv.id,
    clientNumber: conv.clientNumber,
    isAdminMode: conv.isAdminMode,
    lastActivity: conv.lastActivity,
    messageCount: conv.messages.length,
    messages: conv.messages.slice(-50).map((m) => ({
      role: m.role,
      content: m.content,
      timestamp: m.timestamp,
    })),
  }));

  return NextResponse.json(data);
}
