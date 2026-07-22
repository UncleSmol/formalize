import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import StickyVideoBackground from "@/components/StickyVideoBackground";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Tracker } from "@/components/Tracker";
import "./globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Formalize",
  description:
    "Formalize helps growing businesses structure finance, operations, systems, marketing, HR, and office setup in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${poppins.variable} h-full antialiased`}
    >
      <body className="relative flex min-h-full flex-col overflow-x-hidden bg-[#08080c] text-white">
        <Tracker />
        <ScrollToTop />
        <StickyVideoBackground />
        <div className="relative z-10 flex min-h-full flex-1 flex-col">
          <Navbar />
          <div className="flex-1 pt-16">{children}</div>
          <Footer />
        </div>
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
