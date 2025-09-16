import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Writso",
  description: "it is a platform to practice writing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={`antialiased`}>
        <div className="relative flex min-h-screen flex-col">
          <Providers>
            <Navbar />
            <div className="flex-1">{children}</div>
          </Providers>
          <Footer />
        </div>
      </body>
    </html>
  );
}
