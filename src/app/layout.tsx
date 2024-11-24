import type { Metadata, Viewport } from "next";
import { Red_Hat_Text } from "next/font/google";

import "./globals.css";

const sans = Red_Hat_Text({
  variable: "--font-red-hat-text",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

const APP_NAME = "CIITzen";
const APP_DEFAULT_TITLE = "CIIT Student Dashboard";
const APP_TITLE_TEMPLATE = "%s - CIITzen";
const APP_DESCRIPTION = "For CIITzens, by CIITzens!";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: APP_NAME,
  },
  formatDetection: {
    telephone: true,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} antialiased`}>{children}</body>
    </html>
  );
}
