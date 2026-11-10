import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navber/Navbar";

// Self-hosted Geist fonts (same family as before) so production builds do not
// depend on fetching Google Fonts at build time.
const geistSans = GeistSans;
const geistMono = GeistMono;

export const metadata: Metadata = {
  title: "Materia Medica",
  description:
    "A Homeopathic Materia Medica study and reference platform for students.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-background text-foreground">
        <Navbar/>

        {children}

        <Footer />
      </body>
    </html>
  );
}