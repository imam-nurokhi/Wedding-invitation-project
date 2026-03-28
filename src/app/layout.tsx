import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Undangan Pernikahan Rizky & Anisa | 15 Juni 2025",
  description: "Dengan penuh kebahagiaan, kami mengundang Anda untuk hadir dalam pernikahan Rizky Ahmad Fauzi dan Anisa Rahma Putri pada 15 Juni 2025 di Jakarta Selatan.",
  keywords: "undangan pernikahan, wedding invitation, Rizky, Anisa, Jakarta",
  openGraph: {
    title: "Undangan Pernikahan Rizky & Anisa",
    description: "15 Juni 2025 · Jakarta Selatan",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600&family=Great+Vibes&family=Montserrat:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
