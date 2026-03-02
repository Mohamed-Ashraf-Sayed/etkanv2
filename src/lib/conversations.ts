import { prisma } from "@/lib/db";

export interface Message {
  role: "user" | "assistant" | "admin";
  content: string;
  timestamp: number;
}

export interface Conversation {
  id: string;
  clientNumber: number;
  messages: Message[];
  isAdminMode: boolean;
  pendingAdminMessages: string[];
  telegramMessageIds: Set<number>;
  lastActivity: number;
}

// In-memory cache (for real-time telegram features)
const conversations = new Map<string, Conversation>();
const telegramToConversation = new Map<number, string>();
const clientNumberToConversation = new Map<number, string>();
let clientCounter = 0;
let lastActiveConversationId: string | null = null;
let dbLoaded = false;

// Load conversations from DB into memory on first access
async function ensureLoaded() {
  if (dbLoaded) return;
  dbLoaded = true;
  try {
    const sessions = await (prisma as any).chatSession.findMany({
      orderBy: { lastActivity: "desc" },
    });
    for (const s of sessions) {
      const msgs: Message[] = JSON.parse(s.messages);
      const conv: Conversation = {
        id: s.sessionId,
        clientNumber: s.clientNumber,
        messages: msgs,
        isAdminMode: s.isAdminMode,
        pendingAdminMessages: [],
        telegramMessageIds: new Set(),
        lastActivity: s.lastActivity.getTime(),
      };
      conversations.set(s.sessionId, conv);
      clientNumberToConversation.set(s.clientNumber, s.sessionId);
      if (s.clientNumber > clientCounter) clientCounter = s.clientNumber;
    }
  } catch {
    // DB not available — continue with empty memory
  }
}

// Persist a conversation to DB (fire and forget)
function persistConversation(conv: Conversation) {
  try {
    (prisma as any).chatSession
      .upsert({
        where: { sessionId: conv.id },
        create: {
          sessionId: conv.id,
          clientNumber: conv.clientNumber,
          isAdminMode: conv.isAdminMode,
          messages: JSON.stringify(conv.messages),
          lastActivity: new Date(conv.lastActivity),
        },
        update: {
          isAdminMode: conv.isAdminMode,
          messages: JSON.stringify(conv.messages),
          lastActivity: new Date(conv.lastActivity),
        },
      })
      .catch(() => {});
  } catch {
    // silent
  }
}

// Cleanup conversations older than 7 days
const EXPIRY_MS = 7 * 24 * 60 * 60 * 1000;

function cleanup() {
  const now = Date.now();
  for (const [id, conv] of conversations) {
    if (now - conv.lastActivity > EXPIRY_MS) {
      for (const msgId of conv.telegramMessageIds) {
        telegramToConversation.delete(msgId);
      }
      clientNumberToConversation.delete(conv.clientNumber);
      conversations.delete(id);
      try {
        (prisma as any).chatSession
          .delete({ where: { sessionId: id } })
          .catch(() => {});
      } catch {
        // silent
      }
    }
  }
}

if (typeof setInterval !== "undefined") {
  setInterval(cleanup, 60 * 60 * 1000);
}

export function getConversation(id: string): Conversation | undefined {
  return conversations.get(id);
}

export function createConversation(id: string): Conversation {
  clientCounter++;
  const conv: Conversation = {
    id,
    clientNumber: clientCounter,
    messages: [],
    isAdminMode: false,
    pendingAdminMessages: [],
    telegramMessageIds: new Set(),
    lastActivity: Date.now(),
  };
  conversations.set(id, conv);
  clientNumberToConversation.set(clientCounter, id);
  persistConversation(conv);
  return conv;
}

export async function getOrCreateConversation(id: string): Promise<Conversation> {
  await ensureLoaded();
  return conversations.get(id) || createConversation(id);
}

export async function addMessage(convId: string, message: Message) {
  const conv = await getOrCreateConversation(convId);
  conv.messages.push(message);
  conv.lastActivity = Date.now();
  persistConversation(conv);
}

export function setLastActiveConversation(convId: string) {
  lastActiveConversationId = convId;
}

export function getLastActiveConversation(): Conversation | undefined {
  if (!lastActiveConversationId) return undefined;
  return conversations.get(lastActiveConversationId);
}

export function findConversationByClientNumber(
  num: number
): Conversation | undefined {
  const convId = clientNumberToConversation.get(num);
  if (convId) return conversations.get(convId);
  return undefined;
}

export async function getActiveConversationsCount(): Promise<number> {
  await ensureLoaded();
  const now = Date.now();
  const ACTIVE_MS = 30 * 60 * 1000;
  let count = 0;
  for (const conv of conversations.values()) {
    if (now - conv.lastActivity < ACTIVE_MS) count++;
  }
  return count;
}

export async function getAllConversations(): Promise<Conversation[]> {
  await ensureLoaded();
  return Array.from(conversations.values()).sort(
    (a, b) => b.lastActivity - a.lastActivity
  );
}

export function addTelegramMessageId(convId: string, messageId: number) {
  const conv = conversations.get(convId);
  if (conv) {
    conv.telegramMessageIds.add(messageId);
    telegramToConversation.set(messageId, convId);
    conv.lastActivity = Date.now();
  }
}

export function getFirstTelegramMessageId(
  convId: string
): number | undefined {
  const conv = conversations.get(convId);
  if (!conv || conv.telegramMessageIds.size === 0) return undefined;
  return conv.telegramMessageIds.values().next().value;
}

export function addAdminReply(convId: string, text: string) {
  const conv = conversations.get(convId);
  if (conv) {
    conv.isAdminMode = true;
    conv.pendingAdminMessages.push(text);
    conv.messages.push({
      role: "admin",
      content: text,
      timestamp: Date.now(),
    });
    conv.lastActivity = Date.now();
    persistConversation(conv);
  }
}

export function getPendingAdminMessages(convId: string): string[] {
  const conv = conversations.get(convId);
  if (!conv) return [];
  const pending = [...conv.pendingAdminMessages];
  conv.pendingAdminMessages = [];
  return pending;
}

export function findConversationByTelegramId(
  messageId: number
): Conversation | undefined {
  const convId = telegramToConversation.get(messageId);
  if (convId) return conversations.get(convId);
  return undefined;
}
