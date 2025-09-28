import { ReactNode } from "react";
import "./globals.css";
import TopNav from "../components/TopNav";
import Footer from "@/components/Footer";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900">
        <TopNav />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
