import type { Metadata } from "next";
import { Geist, Geist_Mono, Anek_Bangla } from "next/font/google";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Topbar from "@/components/Topbar";
import Footer from "@/components/Footer";
import { Suspense } from "react";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const anekBangla = Anek_Bangla({
  variable: "--font-anek-bangla",
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Bazardor",
  description: "Bazardor App",
  icons: {
    icon: "icon.svg",
}
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="bn"
      className={`${geistSans.variable} ${geistMono.variable} ${anekBangla.variable} h-full antialiased`}
    > 
      <body className={`${anekBangla.className} min-h-full flex flex-col bg-emerald-50/60`}>
        <Topbar/>
        <Suspense>
          {children}
        </Suspense>
        <Footer/>
      </body>
      
    </html>
  );
}