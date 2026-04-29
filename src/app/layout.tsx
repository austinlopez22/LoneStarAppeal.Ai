import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Chatbot from "@/components/Chatbot";
import SessionProvider from "@/components/SessionProvider";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "LoneStarAppeals.AI | Property Tax Appeal Intelligence",
  description:
    "Professional property tax appeal support with AI-assisted valuation analysis, evidence organization, and polished protest letters.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${cormorant.variable} antialiased`}>
        <SessionProvider>
          <Header />
          {children}
          <Chatbot />
        </SessionProvider>
      </body>
    </html>
  );
}
