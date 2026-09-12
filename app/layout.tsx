import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    metadataBase: new URL("https://kwaii.dev"),
    title: {
        default: "jason sacerio",
        template: "%s | kwaii.dev",
    },
    description: "hello! welcome to my portfolio, im a third year at UCF, 3x intern, and treasurer of knight hacks",
    openGraph: {
        type: "website",
        siteName: "kwaii.dev",
        title: "jason sacerio",
        description: "hello! welcome to my portfolio, im a third year at UCF, 3x intern, and treasurer of knight hacks",
        url: "https://kwaii.dev",
    },
    twitter: {
        card: "summary",
        title: "jason sacerio",
        description: "hello! welcome to my portfolio, im a third year at UCF, 3x intern, and treasurer of knight hacks",
    },
};

export const viewport: Viewport = {
    colorScheme: "dark",
    themeColor: "#0d1b2a",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <head>
        <script
            defer
            src="https://cloud.umami.is/script.js"
            data-website-id="b0bb5e65-0b53-4c19-86f6-1a08165c2e06"
        ></script>
        </head>
        <body className={geistSans.variable}>
        <a href="#main-content" className="skip-link">skip to content</a>
        {children}
        <Footer />
        </body>
        </html>
    );
}
