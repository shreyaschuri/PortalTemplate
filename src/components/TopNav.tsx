"use client";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Input } from "@nextui-org/react";
import { useState } from "react";
import { SearchIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { color } from "framer-motion";
import Image from "next/image";

export default function TopNav() {
  const { theme, setTheme } = useTheme();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(query)}`;
    }
  };

  return (
    <Navbar maxWidth="2xl" className="glass border-b border-indigo-500/20">
      <NavbarBrand className="gap-2">
        <div className="bg-blue-800 p-1 ">
      <Image
        src="/Logo/logo.png"
        alt="logo"
        width={1000}   // exact pixel width
        height={80}  // exact pixel height
        className="h-14 w-auto object-contain"
        priority     // loads faster (important for navbar logos)
      />
    </div>
        {/* <p className="font-semibold text-primary">Intranet Portal</p> */}
      </NavbarBrand>

      {/* Global search */}
      <form onSubmit={handleSearch} className="flex-1 px-6 hidden md:block">
        <Input
          size="sm"
          variant="bordered"
          placeholder="Search employees, policies, announcements..."
          startContent={<SearchIcon size={16} />}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full"
        />
      </form>

      <NavbarContent justify="end" className="gap-6 items-center">
        <NavbarItem><Link href="/employees">Employees</Link></NavbarItem>
        <NavbarItem><Link href="/history">History</Link></NavbarItem>
        <NavbarItem><Link href="/locations">Locations</Link></NavbarItem>
        <NavbarItem><Link href="/policies">Policies</Link></NavbarItem>

        {/* Dark/Light toggle */}
        <button
          className="p-2 rounded-full hover:bg-slate-700/30"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <SunIcon size={18} /> : <MoonIcon size={18} />}
        </button>
      </NavbarContent>
    </Navbar>
  );
}
