import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/lib/cartContext";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Smile Floors | Premium Flooring in Lombard, IL",
    template: "%s | Smile Floors",
  },
  description:
    "Smile Floors — your trusted flooring destination in Lombard, IL. Shop 4,000+ hardwood, tile, vinyl, mosaic, and rug products for homes, businesses, contractors, and more. Call (708) 299-5189.",
  keywords: [
    "flooring", "hardwood floors", "tile", "mosaics", "rugs", "vinyl flooring", "LVP",
    "flooring store", "Lombard IL", "Chicagoland flooring", "contractor flooring",
  ],
  openGraph: {
    siteName: "Smile Floors",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-full flex flex-col`}>
        <CartProvider>
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: { borderRadius: "12px", background: "#1c1917", color: "#fff" },
              success: { iconTheme: { primary: "#f59e0b", secondary: "#fff" } },
            }}
          />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
