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
        default: "Jason Sacerio | Software Engineer & Knight Hacks Treasurer",
        template: "%s | Jason Sacerio",
    },
    description: "Jason Sacerio is a UCF computer science and math student, software engineer, and Knight Hacks treasurer. Explore his robotics projects, hackathon work, and writing.",
    authors: [{ name: "Jason Sacerio", url: "https://kwaii.dev" }],
    creator: "Jason Sacerio",
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
    openGraph: {
        type: "website",
        siteName: "Jason Sacerio",
        title: "Jason Sacerio | Software Engineer & Knight Hacks Treasurer",
        description: "UCF student, software engineer, and Knight Hacks treasurer. Robotics projects, hackathon work, and writing by Jason Sacerio.",
        url: "https://kwaii.dev/",
        images: [{ url: "/cachedImage.png", width: 1200, height: 630, alt: "Knight Hacks team posing together at an event" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Jason Sacerio | Software Engineer & Knight Hacks Treasurer",
        description: "UCF student, software engineer, and Knight Hacks treasurer. Robotics projects, hackathon work, and writing by Jason Sacerio.",
        images: [{ url: "/cachedImage.png", alt: "Knight Hacks team posing together at an event" }],
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
