import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Axiom Tracker",
  description:
    "Axiom Tracker – smart certificate tracking, compliance automation, and real-time dashboards.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-black antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
