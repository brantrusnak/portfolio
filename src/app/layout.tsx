import { JetBrains_Mono } from "next/font/google";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import Provider from "@/app/Provider";
import "@/styles/app.css";
import Particles from "@/components/Particles/Particles";
import { GoogleAnalytics } from "@next/third-parties/google";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
});
const GA_TRACKING_ID = "G-K1NL6FV381";

export const metadata: Metadata = {
  title: "Brant Rusnak",
  description: "Creative engineer building calm, practical software.",
  applicationName: "Brant Rusnak",
  authors: [{ name: "Brant Rusnak", url: "https://brantrusnak.com" }],
  icons: [
    { rel: "icon", url: "/img/favicon/favicon.svg", type: "image/svg+xml" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" dir="ltr" className="scroll-smooth">
      <body
        className={`${jetbrainsMono.className} antialiased bg-background text-foreground font-sans`}
      >
        <Provider>
          {children}
          <Particles />
        </Provider>
      </body>
      <GoogleAnalytics gaId={GA_TRACKING_ID} />
    </html>
  );
}
