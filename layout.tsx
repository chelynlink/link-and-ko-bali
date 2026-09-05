import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Link & Ko Bali | Drivers, Car Rental & Bali Trips",
  description: "Personal Bali transportation and selected trips. Arrange private drivers, car rental, airport transfers, Nusa Penida and Mount Batur jeep experiences.",
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
