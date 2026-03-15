import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
