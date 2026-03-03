"use client";

import dynamic from "next/dynamic";

const CustomCursor = dynamic(() => import("@/components/shared/CustomCursor"), { ssr: false });
const ScrollProgress = dynamic(() => import("@/components/shared/ScrollProgress"), { ssr: false });
const ScrollToTop = dynamic(() => import("@/components/shared/ScrollToTop"), { ssr: false });
const WhatsAppButton = dynamic(() => import("@/components/shared/WhatsAppButton"), { ssr: false });
const ChatWidget = dynamic(() => import("@/components/chat/ChatWidget"), { ssr: false });

export default function ClientShell() {
  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <ScrollToTop />
      <WhatsAppButton />
      <ChatWidget />
    </>
  );
}
