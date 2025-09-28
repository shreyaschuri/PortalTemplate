"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function TopNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "Home", href: "/" },
    { name: "Employees", href: "/employees" },
    { name: "History", href: "/history" },
    { name: "Locations", href: "/locations" },
    { name: "Policies", href: "/policies" },
  ];

  return (
    <nav className="bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Company Logo"
              width={36}
              height={36}
              className="rounded-md"
            />
            <span className="text-lg font-semibold text-[color:var(--color-primary)]">
              Intranet Portal
            </span>
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 text-sm">
          {links.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium transition ${
                  isActive
                    ? "text-[color:var(--color-primary)] border-b-2 border-[color:var(--color-primary)] pb-1"
                    : "hover:text-[color:var(--color-primary)] text-slate-700"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-slate-700 hover:text-[color:var(--color-primary)]"
          onClick={() => setMenuOpen(true)}
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Slide-over Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-50"
          >
            {/* Solid white panel (full height, from right) */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="absolute top-0 right-0 w-64 h-full bg-white shadow-xl flex flex-col"
            >
              <div className="flex justify-between items-center p-4 border-b border-slate-200">
                <span className="text-lg font-semibold text-[color:var(--color-primary)]">
                  Menu
                </span>
                <button onClick={() => setMenuOpen(false)}>
                  <X size={24} />
                </button>
              </div>
              <div className="flex flex-col p-4 gap-4">
                {links.map((link) => {
                  const isActive =
                    link.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(link.href);

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={`font-medium transition ${
                        isActive
                          ? "text-[color:var(--color-primary)]"
                          : "hover:text-[color:var(--color-primary)] text-slate-700"
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
