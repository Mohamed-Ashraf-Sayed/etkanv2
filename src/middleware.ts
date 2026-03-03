import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const ARABIC_COUNTRIES = new Set([
  "EG", "SA", "AE", "KW", "QA", "BH", "OM", "JO", "LB", "SY",
  "IQ", "YE", "LY", "TN", "DZ", "MA", "SD", "PS", "MR",
]);

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip if locale is already in URL or user has a cookie preference
  const hasLocaleCookie = request.cookies.has("NEXT_LOCALE");
  if (hasLocaleCookie || pathname.startsWith("/en") || pathname.startsWith("/ar")) {
    return intlMiddleware(request);
  }

  // Detect country from headers (nginx GeoIP, Cloudflare, Vercel)
  const country =
    request.headers.get("x-country-code") ||
    request.headers.get("cf-ipcountry") ||
    request.headers.get("x-vercel-ip-country") ||
    "";

  if (country && !ARABIC_COUNTRIES.has(country.toUpperCase())) {
    // Non-Arabic country → redirect to /en version
    const url = request.nextUrl.clone();
    url.pathname = `/en${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url);
  }

  // Arabic country or unknown → default Arabic (handled by next-intl)
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|admin|.*\\..*).*)"],
};
