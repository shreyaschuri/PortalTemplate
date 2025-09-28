"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import NewsCard from "../components/NewsCard";

const NEWS = [
  {
    slug: "q3-results",
    title: "Q3 Results Beat Expectations",
    date: "Sep 25, 2025",
    excerpt: "Revenue grew 18% YoY with strong performance in APAC and EMEA. Product margins improved…",
    imageSrc: "/news/q3.jpg",
  },
  {
    slug: "hr-policy-update",
    title: "New HR Policy Update",
    date: "Sep 20, 2025",
    excerpt: "We’ve streamlined leave approvals and introduced flexible Friday timings. Here’s what changes…",
    imageSrc: "/news/hr.jpg",
  },
  {
    slug: "renovation-complete",
    title: "Mumbai HQ Renovation Complete",
    date: "Sep 15, 2025",
    excerpt: "The 12th floor collaboration hub is now open with new meeting pods and focus rooms…",
    imageSrc: "/news/reno.jpg",
  },
];

const BIRTHDAYS = [
  { name: "John Doe", role: "Engineer", image: "/employees/john.jpg" },
  { name: "Jane Smith", role: "Designer", image: "/employees/jane.jpg" },
];

const SALES = [
  { location: "USA", value: "$1.2M" },
  { location: "UK", value: "$900K" },
  { location: "India", value: "$1.5M" },
  { location: "Japan", value: "$700K" },
];

export default function LandingPage() {
  return (
    <div className="bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12">
        {/* News & Announcements */}
        <section>
          <motion.h2
            initial={{ y: -12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="text-2xl font-bold text-slate-900"
          >
            News & Announcements
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {NEWS.map((n) => (
              <NewsCard key={n.slug} {...n} />
            ))}
          </div>
        </section>

        {/* Today’s Birthdays */}
        <section>
          <motion.h2
            initial={{ y: -12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="text-2xl font-bold text-slate-900"
          >
            🎂 Today’s Birthdays
          </motion.h2>

          <div className="flex flex-wrap gap-6 mt-6">
            {BIRTHDAYS.map((emp, idx) => (
              <div key={idx} className="card w-56 text-center p-6">
                <Image
                  src={emp.image}
                  alt={emp.name}
                  width={96}
                  height={96}
                  className="mx-auto rounded-full object-cover"
                />
                <h3 className="mt-3 font-bold text-slate-900">{emp.name}</h3>
                <p className="text-slate-600 text-sm">{emp.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Global Sales Snapshot */}
        <section>
          <motion.h2
            initial={{ y: -12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="text-2xl font-bold text-slate-900"
          >
            🌍 Global Sales Snapshot
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Mini Map (image logo) */}
            <div className="card flex items-center justify-center h-64">
              <Image
                src="/mini-map.png"
                alt="Mini World Map"
                width={320}
                height={200}
                className="opacity-90"
              />
            </div>

            {/* KPI tiles */}
            <div className="grid grid-cols-2 gap-6">
              {SALES.map((s, i) => (
                <div key={i} className="card p-6">
                  <p className="text-sm text-slate-500">{s.location}</p>
                  <p className="text-2xl font-bold text-[color:var(--color-primary)] mt-2">
                    {s.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
