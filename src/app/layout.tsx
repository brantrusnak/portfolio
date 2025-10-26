import { JetBrains_Mono } from "next/font/google";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import RootProviders from "@/app/providers/RootProviders";
import "@/styles/app.css";
import Particles from "@/components/Particles/Particles";
import { GoogleAnalytics } from "@next/third-parties/google";
import { APP_CONFIG } from "@/config/config";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
});
const GA_TRACKING_ID = "G-K1NL6FV381";

export const metadata: Metadata = APP_CONFIG.meta;

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" dir="ltr" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${jetbrainsMono.className} antialiased bg-background text-foreground font-sans`}
      >
        <RootProviders>
          {children}
          <Particles />
        </RootProviders>
      </body>
      <GoogleAnalytics gaId={GA_TRACKING_ID} />
    </html>
  );
}
