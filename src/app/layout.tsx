import type { Metadata } from "next";
import { Poppins, League_Spartan } from "next/font/google";
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

const leagueSpartan = League_Spartan({
  variable: "--font-league-spartan",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
});

export const metadata: Metadata = {
 title: {
 default: "Formalize — Business Infrastructure & Operations Partner",
 template: "%s | Formalize",
 },
 description:
 "Formalize helps growing businesses structure finance, operations, systems, marketing, HR, and office setup in one place. Based in eMalahleni, South Africa.",
 keywords: [
 "business support",
 "business operations",
 "finance",
 "HR",
 "marketing",
 "IT systems",
 "office setup",
 "eMalahleni",
 "Mpumalanga",
 "South Africa",
 "business infrastructure",
 "operational efficiency",
 ],
 authors: [{ name: "Formalize" }],
 creator: "Formalize",
 publisher: "Formalize",
 metadataBase: new URL("https://formalize.co.za"),
 openGraph: {
 type: "website",
 locale: "en_ZA",
 siteName: "Formalize",
 title: "Formalize — Business Infrastructure & Operations Partner",
 description:
 "We design the operating layer behind ambitious businesses. Finance, operations, IT, marketing, HR, and workspace — one connected partner.",
 url: "https://formalize.co.za",
 images: [
 {
 url: "/og-image.png",
 width: 1200,
 height: 630,
 alt: "Formalize",
 },
 ],
 },
 twitter: {
 card: "summary_large_image",
 title: "Formalize — Business Infrastructure & Operations Partner",
 description:
 "We design the operating layer behind ambitious businesses. Finance, operations, IT, marketing, HR, and workspace — one connected partner.",
 },
 robots: {
 index: true,
 follow: true,
 googleBot: {
 index: true,
 follow: true,
 "max-video-preview": -1,
 "max-image-preview": "large",
 "max-snippet": -1,
 },
 },
 icons: {
 icon: [
 { url: "/favicon.ico" },
 { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
 { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
 ],
 apple: [{ url: "/apple-touch-icon.png" }],
 },
 manifest: "/site.webmanifest",
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
      className={`${poppins.variable} ${leagueSpartan.variable} h-full overflow-x-hidden antialiased`}
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
 <Script
 id="schema-org"
 type="application/ld+json"
 dangerouslySetInnerHTML={{
 __html: JSON.stringify({
 "@context": "https://schema.org",
 "@type": "Organization",
 name: "Formalize",
 url: "https://formalize.co.za",
 logo: "https://formalize.co.za/Formalize-Logo.png",
 description:
 "Business infrastructure partner for growing companies. Finance, operations, IT, marketing, HR, and workspace setup.",
 address: {
 "@type": "PostalAddress",
 streetAddress: "Ext 10, 49 Duncan St",
 addressLocality: "eMalahleni",
 addressRegion: "Mpumalanga",
 postalCode: "1035",
 addressCountry: "ZA",
 },
 contactPoint: [
 {
 "@type": "ContactPoint",
 telephone: "+27-10-824-9087",
 contactType: "sales",
 },
 ],
 sameAs: [
 "https://www.facebook.com/formalizesa",
 "https://www.instagram.com/formalizesa/",
 "https://www.linkedin.com/company/110037992/",
 ],
 }),
 }}
 />
 </body>
 </html>
 );
}
