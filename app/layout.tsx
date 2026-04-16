import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PUBG Profile Finder",
  description: "Search PUBG player stats quickly"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
