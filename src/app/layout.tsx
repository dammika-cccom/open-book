import type { Metadata } from "next";
import "./globals.css";
// IMPORT the missing component
import { GlobalTools } from "@/components/layout/GlobalTools";
import Script from "next/script";

export const metadata: Metadata = {
  title: "The Open Book | Dr. S. P. de Silva",
  description: "A scientific rationalization of Buddhism through 50 verses of truth.",
  icons: {
    icon: "/icon.png", // Next.js usually finds this automatically, but explicitly defining it is safer
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning is required for Google Translate to work without crashing React
    <html lang="en" suppressHydrationWarning> 
      <body className="antialiased selection:bg-gold/30 selection:text-gold">
        {children}
        
        {/* Floating navigation tools (Back to top / Home) */}
        <GlobalTools />

        {/* 
          Requirement #10: Load Google Translate globally.
          This loads once and stays in memory across all page changes.
        */}
        <Script
          id="google-translate-script"
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}