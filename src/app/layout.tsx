import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from "@/components/Navbar/navbar";
import Footer from "@/components/Footer/footer";

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
        <Providers>
          <div className="min-h-screen relative">
            <Navbar />
            {children}
            <Footer/>
          </div>
        </Providers>
      </body>
    </html>
  );
}
