import type { ReactNode } from "react";
import { SocialsProvider } from "@/app/providers/SocialsProvider";
import { ModalProvider } from "@/app/providers/ModalProvider";
import { MotionProvider } from "@/app/providers/MotionProvider";
import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from "@/app/providers/ThemeProvider"

export default function RootProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
      <NextIntlClientProvider>
        <MotionProvider>
          <ModalProvider>
            <SocialsProvider>
              {children}
            </SocialsProvider>
          </ModalProvider>
        </MotionProvider>
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}
