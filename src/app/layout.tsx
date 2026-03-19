import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AgeGate from "@/components/AgeGate";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "CalienteHub — Exclusive Adult Content",
  description: "Members-only exclusive content. Subscribe for full access.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans bg-bg min-h-screen`}>
        <AgeGate />
        <Navbar />
        <main className="pt-16 min-h-screen">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
