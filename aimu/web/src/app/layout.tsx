import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { client } from "@/sanity/client";
import { SITE_SETTINGS_QUERY, LEAD_FORM_OPTIONS_QUERY } from "@/sanity/queries";
import { FloatingActions } from "@/components/FloatingActions";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
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
    <html lang="en" className={`${manrope.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-navy">
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
