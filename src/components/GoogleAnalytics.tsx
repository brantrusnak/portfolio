"use client";

import Script from "next/script";
import { useEffect } from "react";

export const GA_TRACKING_ID = "UA-167578313-1";
// export const GA_TRACKING_ID = "G-K1NL6FV381";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export default function GoogleAnalytics() {
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function (...args: unknown[]) {
      window.dataLayer.push(args);
    };

    window.gtag("js", new Date());
    window.gtag("config", GA_TRACKING_ID);
  }, []);

  return (
    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      strategy="afterInteractive"
    />
  );
}
