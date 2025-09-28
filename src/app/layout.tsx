import "./globals.css";
import { ReactNode } from "react";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import { Providers } from "./providers";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <TopNav />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
