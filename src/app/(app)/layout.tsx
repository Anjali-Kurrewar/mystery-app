import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from 'next/font/google';
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";


const inter = Inter({ subsets: ['latin'] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body className={inter.className}>
          <Navbar />
          {children}
          <Toaster />
        </body>
    </html>
  );
}
