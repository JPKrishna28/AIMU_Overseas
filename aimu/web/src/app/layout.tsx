import type { Metadata } from "next";
import { Sansation } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { client } from "@/sanity/client";
import { SITE_SETTINGS_QUERY, LEAD_FORM_OPTIONS_QUERY } from "@/sanity/queries";
import { FloatingActions } from "@/components/FloatingActions";
import "./globals.css";

const sansation = Sansation({
  variable: "--font-sansation",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
  // Next has no size metrics for Sansation, so it can't generate an
  // auto-adjusted fallback — use plain fallbacks instead of warning.
  adjustFontFallback: false,
  fallback: ["Arial", "Helvetica", "sans-serif"],
});

export const metadata: Metadata = {
  title: "AIMU Global — Global Education & Career Advisory",
  description:
    "Trusted global education guidance for ambitious students seeking world-class opportunities.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [siteSettings, leadFormOptions] = await Promise.all([
    client.fetch(SITE_SETTINGS_QUERY),
    client.fetch(LEAD_FORM_OPTIONS_QUERY),
  ]);

  const countries = (leadFormOptions.countries ?? []).filter((c): c is string => Boolean(c));
  const courses = (leadFormOptions.courses ?? []).filter((c): c is string => Boolean(c));

  return (
    <html lang="en" className={`${sansation.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-navy">
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap"
          precedence="default"
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer siteSettings={siteSettings} countries={countries} courses={courses} />
        <FloatingActions
          phone={siteSettings?.phone}
          whatsappNumber={siteSettings?.whatsappNumber}
          countries={countries}
          courses={courses}
        />
      </body>
    </html>
  );
}
