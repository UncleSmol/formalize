import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import StickyVideoBackground from "@/components/StickyVideoBackground";
import { ScrollToTop } from "@/components/ScrollToTop";
import "./globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
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
      suppressHydrationWarning
      className={`${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#f7f4ff] text-[#17142a] relative overflow-x-hidden">
        <ScrollToTop />
        <StickyVideoBackground />
        <Navbar />
        <div className="flex-1 pt-16 relative z-10">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
