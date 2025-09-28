"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useEffect, useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  // Ensure theme is applied only after hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  return (
    <NextUIProvider>
      <NextThemesProvider
        defaultTheme="dark"   // 👈 force dark mode by default
        attribute="class"
        enableSystem={false}  // 👈 ignore system preference
      >
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  );
}
