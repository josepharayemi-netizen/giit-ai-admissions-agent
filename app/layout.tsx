import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GIIT Africa AI Admissions",
  description: "Get course recommendations, compare programme fees and book counselling with GIIT Africa.",
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
      <body className="antialiased">{children}</body>
    </html>
  );
}
