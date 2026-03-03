import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ClientShell from "@/components/shared/ClientShell";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <ClientShell>{children}</ClientShell>
      <Footer />
    </>
  );
}
