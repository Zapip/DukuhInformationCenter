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
  keywords: ["dukuh", "padukuhan Dukuh", "ngabean", "mirit", "kebumen", "umkm dukuh","pusat data dukuh", "informasi dukuh", "dukoh", "dukoh information center", "dukoh ic", "dukoh data hub"],
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
        <section className="relative flex min-h-screen w-full items-center justify-center bg-whit">
          <section
            className="absolute inset-0 bg-size-[40px_40px] bg-[linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
          />
          <section className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white mask-[radial-gradient(ellipse_at_center,transparent_20%,black)]"></section>
          <section className="w-full relative z-20 min-h-screen">
            {children}
          </section>
        </section>
      </body>
    </html>
  );
}
