import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["700"],
});

export const metadata: Metadata = {
  title: "Cory Firstenberg — PM & Builder",
  description: "Senior Product Manager with 7+ years building at the intersection of AI, compliance, and ecommerce.",
  openGraph: {
    title: "Cory Firstenberg — PM & Builder",
    description: "Senior Product Manager with 7+ years building at the intersection of AI, compliance, and ecommerce.",
    url: "https://whatdidcorybuild.vercel.app",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${fraunces.variable}`}>{children}</body>
    </html>
  );
}
