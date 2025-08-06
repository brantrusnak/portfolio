import { JetBrains_Mono } from "next/font/google";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import Provider from "@/app/Provider";
import "@/styles/app.css";
import Particles from "@/components/Particles/Particles";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
});

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
        <GoogleAnalytics />
        <Provider>
          {children}
          <Particles />
        </Provider>
      </body>
    </html>
  );
}
