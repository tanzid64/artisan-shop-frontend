import { NavBar } from "@/components/global/navbar";
import { BaseContextProvider } from "@/context/base-context-provider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Artisan Shop",
  description: "Artisan Shop - an ecommerce platform for artisans",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <BaseContextProvider>
          <NavBar />
          <main className="mt-15">{children}</main>
        </BaseContextProvider>
      </body>
    </html>
  );
}
