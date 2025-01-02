import type { Metadata } from "next";
import { fontSans, fontMono, fontHeading } from "@/lib/fonts";
import { cn } from "@/lib/utils";

import "@/app/globals.css";
import { Providers } from "@/app/providers";
import { DrawerCSSProvider } from "@/components/providers/DrawerProvider";
import { MotionConfig } from "motion/react";

export const metadata: Metadata = {
  title: "Farcaster Frames v2 Demo",
  description: "A Farcaster Frames v2 demo app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          fontHeading.variable,
          fontSans.variable,
          fontMono.variable
        )}
      >
        <MotionConfig
          transition={{
            type: "spring",
            damping: 42,
            stiffness: 500,
          }}
        >
          <DrawerCSSProvider>
            <Providers>{children}</Providers>
          </DrawerCSSProvider>
        </MotionConfig>
      </body>
    </html>
  );
}
