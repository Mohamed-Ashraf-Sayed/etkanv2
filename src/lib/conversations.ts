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

// In-memory stores
const conversations = new Map<string, Conversation>();
const telegramToConversation = new Map<number, string>();
const clientNumberToConversation = new Map<number, string>();
let clientCounter = 0;
let lastActiveConversationId: string | null = null;

// Cleanup conversations older than 24 hours
const EXPIRY_MS = 24 * 60 * 60 * 1000;

function cleanup() {
  const now = Date.now();
  for (const [id, conv] of conversations) {
    if (now - conv.lastActivity > EXPIRY_MS) {
      for (const msgId of conv.telegramMessageIds) {
        telegramToConversation.delete(msgId);
      }
      clientNumberToConversation.delete(conv.clientNumber);
      conversations.delete(id);
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
  return conv;
}

export function getOrCreateConversation(id: string): Conversation {
  return conversations.get(id) || createConversation(id);
}

export function addMessage(convId: string, message: Message) {
  const conv = getOrCreateConversation(convId);
  conv.messages.push(message);
  conv.lastActivity = Date.now();
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

export function getActiveConversationsCount(): number {
  const now = Date.now();
  const ACTIVE_MS = 30 * 60 * 1000; // 30 minutes
  let count = 0;
  for (const conv of conversations.values()) {
    if (now - conv.lastActivity < ACTIVE_MS) count++;
  }
  return count;
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
  }
}

export function getPendingAdminMessages(convId: string): string[] {
  const conv = conversations.get(convId);
  if (!conv) return [];
  const pending = [...conv.pendingAdminMessages];
  conv.pendingAdminMessages = [];
  return pending;
}

// Fast lookup: find conversation by ANY telegram message ID
export function findConversationByTelegramId(
  messageId: number
): Conversation | undefined {
  const convId = telegramToConversation.get(messageId);
  if (convId) return conversations.get(convId);
  return undefined;
}
