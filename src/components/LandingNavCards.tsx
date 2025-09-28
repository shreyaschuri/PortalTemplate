"use client";

import { motion } from "framer-motion";
import { Users, Landmark, MapPin, FileText } from "lucide-react";

const navItems = [
  {
    title: "Employees",
    desc: "Meet our amazing team and explore employee directory.",
    href: "/employees",
    icon: Users,
  },
  {
    title: "History",
    desc: "Learn about our company journey and milestones.",
    href: "/history",
    icon: Landmark,
  },
  {
    title: "Locations",
    desc: "Discover our global offices and company presence.",
    href: "/locations",
    icon: MapPin,
  },
  {
    title: "Policies",
    desc: "Read company policies, guidelines, and compliance info.",
    href: "/policies",
    icon: FileText,
  },
];

export default function LandingNavCards() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {navItems.map(({ title, desc, href, icon: Icon }) => (
        <motion.a
          key={title}
          href={href}
          whileHover={{ scale: 1.05 }}
          className="card flex flex-col items-center text-center p-8"
        >
          <Icon className="w-12 h-12 text-blue-600 mb-4" />
          <h3 className="text-2xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-500">{desc}</p>
        </motion.a>
      ))}
    </section>
  );
}
