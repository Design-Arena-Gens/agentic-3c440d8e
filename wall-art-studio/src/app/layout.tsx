import type { Metadata } from "next";
import { 
  Geist,
  Geist_Mono,
} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lamina — مولد باقات اللوحات الجدارية",
  description:
    "أداة عصرية تولد باقات فنية جاهزة للتعليق تناسب هوية المحلات والمشاريع الصغيرة.",
  metadataBase: new URL("https://agentic-3c440d8e.vercel.app"),
  openGraph: {
    title: "Lamina — مولد باقات اللوحات الجدارية",
    description:
      "حوّل وصف محلك إلى مجموعة لوحات جدارية متناسقة بأسلوب Flat / Minimal / Modern.",
    url: "https://agentic-3c440d8e.vercel.app",
    siteName: "Lamina Studio",
    locale: "ar_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lamina — مولد باقات اللوحات الجدارية",
    description:
      "توليد تلقائي لحزم لوحات جدارية متناسقة متوافقة مع هوية متجرك.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-slate-950 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

