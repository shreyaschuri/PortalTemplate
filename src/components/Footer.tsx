"use client";
import Link from "next/link";
import Image from "next/image";
import { Linkedin, Twitter, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-16 bg-gradient-to-t from-slate-900 to-slate-800 text-slate-300">
      {/* Glow separator */}
      <div className="absolute -top-2 left-0 w-full h-2 bg-indigo-500/30 blur-lg"></div>

      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-8 md:grid-cols-3">
        
        {/* Logo + Brand */}
        <div className="flex items-center gap-3">
          <div className="bg-blue-800/80 p-2 rounded-md shadow-lg">
            <Image
              src="/Logo/logo.png"
              alt="logo"
              width={100}
              height={90}
              className="h-13 w-auto object-contain"
              priority
            />
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap gap-6 md:justify-center text-sm">
          <Link href="/about" className="hover:text-indigo-400 transition-colors">About</Link>
          <Link href="/contact" className="hover:text-indigo-400 transition-colors">Contact</Link>
          <Link href="/policies" className="hover:text-indigo-400 transition-colors">Policies</Link>
          <Link href="/careers" className="hover:text-indigo-400 transition-colors">Careers</Link>
        </div>

        {/* Social Icons */}
        <div className="flex gap-5 md:justify-end">
          <Link href="https://linkedin.com" target="_blank" className="hover:text-indigo-400 transition">
            <Linkedin size={22} />
          </Link>
          <Link href="https://twitter.com" target="_blank" className="hover:text-indigo-400 transition">
            <Twitter size={22} />
          </Link>
          <Link href="mailto:hr@company.com" className="hover:text-indigo-400 transition">
            <Mail size={22} />
          </Link>
        </div>
      </div>

      {/* Bottom Strip */}
      <div className="border-t border-slate-700/50 py-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} Intranet Portal. All rights reserved.
      </div>
    </footer>
  );
}
