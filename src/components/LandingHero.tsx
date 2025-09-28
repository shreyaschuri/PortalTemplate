"use client";

import { motion } from "framer-motion";

export default function LandingHero() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-gradient-to-r from-blue-100 to-blue-50 rounded-2xl p-12 shadow-xl text-center"
    >
      <h1 className="text-5xl font-extrabold text-blue-700 mb-4">
        Welcome to Our Company Portal
      </h1>
      <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
        Explore employee resources, company history, policies, and locations—all
        in one place.
      </p>
      <a
        href="/employees"
        className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg shadow hover:bg-blue-700 transition text-lg"
      >
        Get Started
      </a>
    </motion.section>
  );
}
