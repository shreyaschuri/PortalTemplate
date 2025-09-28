"use client";

import Link from "next/link";
import { UserCircle } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 bg-blue-700 text-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <div className="text-2xl font-bold tracking-wide">🏢 Intranet</div>

        {/* Links */}
        <div className="hidden md:flex gap-6 font-medium">
          <Link href="/">Home</Link>
          <Link href="/employees">Employees</Link>
          <Link href="/locations">Locations</Link>
          <Link href="/history">History</Link>
          <Link href="/policies">Policies</Link>
          <Link href="/admin">Admin</Link>
        </div>

        {/* User */}
        <div className="flex items-center gap-2 cursor-pointer hover:opacity-80">
          <UserCircle className="w-8 h-8" />
          <span className="hidden md:block">Welcome, User</span>
        </div>
      </div>
    </nav>
  );
}
