import type { Metadata } from "next";
import NotFoundContent from "./NotFoundContent";

export const metadata: Metadata = {
  title: "الصفحة غير موجودة | إتقان للحلول المتكاملة",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return <NotFoundContent />;
}
