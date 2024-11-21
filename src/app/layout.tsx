import type { Metadata } from "next";
import { Red_Hat_Text } from "next/font/google";

import "./globals.css";

const sans = Red_Hat_Text({
  variable: "--font-red-hat-text",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CIIT Student Dashboard",
  description: "For CIITzens, by CIITzens!",
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
