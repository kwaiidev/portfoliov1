import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/Footer";
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "kwaiidev",
    description: "Jason Sacerio is a third year computer science and math student at the University of Central Florida. He is a software engineer with a focus on low-level programming and system development. He is also the current Treasurer of Knight Hacks and Researcher at Knights Scholars Research Program.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning={true}>
        <Navbar />
        {children}
        <Analytics />
        <Footer />
        </body>
        </html>
    );
}
