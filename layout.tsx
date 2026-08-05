import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Link & Ko Bali | Private Female Driver & Travel Companion",
  description: "Explore Bali with Chelyn—private transport, flexible itineraries, photo assistance and thoughtful comfort.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
