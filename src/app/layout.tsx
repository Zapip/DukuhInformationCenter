import type { Metadata } from "next";
import { Plus_Jakarta_Sans, } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dukuh Information Center",
  description: "A centralized information hub for Dukuh.",
  keywords: ["dukuh", "padukuhan Dukuh", "ngabean", "mirit", "kebumen", "umkm dukuh"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${plusJakartaSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
