import { Metadata } from "next";

export const APP_CONFIG = {
  meta: {
    title: "Brant Rusnak",
    description: "Creative engineer building calm, practical software.",
    authors: [{ name: "Brant Rusnak", url: "https://www.brantrusnak.com" }],
    applicationName: "Brant Rusnak",
    icons: [
      { rel: "icon", url: "/img/favicon/favicon.svg", type: "image/svg+xml" },
    ],
    alternates: {
      canonical: "https://www.brantrusnak.com",
      languages: {
        'en': 'https://www.brantrusnak.com',
        'fr': 'https://www.brantrusnak.com',
      }
    }
  } as Metadata,
  locale: {
    en: {
      flag: "🇺🇸",
      label: "English"
    },
    fr: {
      flag: "🇫🇷",
      label: "Français"
    }
  }
};