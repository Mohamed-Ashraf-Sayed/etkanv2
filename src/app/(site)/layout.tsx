import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/shared/ScrollToTop";
import CustomCursor from "@/components/shared/CustomCursor";
import ScrollProgress from "@/components/shared/ScrollProgress";
import PageTransition from "@/components/shared/PageTransition";
import ChatWidget from "@/components/chat/ChatWidget";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <PageTransition>
        <main>{children}</main>
      </PageTransition>
      <Footer />
      <ScrollToTop />
      <ChatWidget />
    </>
  );
}
