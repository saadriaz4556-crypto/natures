import type { Metadata } from "next";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";
import { ThemeProvider } from "next-themes";
import { CartProvider } from "@/lib/cart-context";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";

export const metadata: Metadata = {
  title: "Saad Nature Photography | Capturing Punjab's Beauty",
  description:
    "Nature photography by Saad from Hazro, Punjab, Pakistan — breathtaking landscapes, golden wheat fields, sunsets, wildlife, and more. Shop fine art prints.",
  keywords: "nature photography, Punjab Pakistan, landscape photography, wheat fields, sunset photography, fine art prints",
  openGraph: {
    title: "Saad Nature Photography",
    description: "Capturing the raw beauty of Punjab, Pakistan through the lens.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <CartProvider>
            <ErrorReporter />
            <Script
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
              strategy="afterInteractive"
              data-target-origin="*"
              data-message-type="ROUTE_CHANGE"
              data-include-search-params="true"
              data-only-in-iframe="true"
              data-debug="true"
              data-custom-data='{"appName": "SaadNature", "version": "1.0.0"}'
            />
            <Navbar />
            <CartDrawer />
            <main className="flex-1">{children}</main>
            <Footer />
            <VisualEditsMessenger />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
