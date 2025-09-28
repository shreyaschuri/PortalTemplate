import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Logo + tagline */}
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="Company Logo" width={36} height={36} />
          <span className="font-semibold text-slate-800">Intranet Portal</span>
        </div>

        {/* Center: Links */}
        <div className="flex gap-6 text-sm">
          <Link
            href="/about"
            className="text-slate-600 hover:text-[color:var(--color-primary)]"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-slate-600 hover:text-[color:var(--color-primary)]"
          >
            Contact
          </Link>
        </div>

        {/* Right: Copyright */}
        <p className="text-xs text-slate-500 text-center md:text-right">
          © {new Date().getFullYear()} Intranet Portal. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
