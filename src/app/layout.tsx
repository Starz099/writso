import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from "@/app/_components/Navbar/navbar";
import Footer from "@/app/_components/Footer/footer";

export const metadata: Metadata = {
  title: "Writso",
  description: "",
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
          </Providers>
          <div className="flex-1">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
