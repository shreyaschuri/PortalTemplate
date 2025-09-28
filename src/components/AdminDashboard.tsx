"use client";

import { motion } from "framer-motion";

export default function AdminDashboard() {
  const sections = ["Users", "Reports", "Settings", "Notifications", "Analytics"];

  return (
    <>
      <motion.h2
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-blue-700 mb-6"
      >
        Admin Dashboard
      </motion.h2>

      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => (
          <motion.div
            key={section}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-xl shadow p-6 text-center"
          >
            <h3 className="text-xl font-semibold mb-2">{section}</h3>
            <p className="text-gray-500">Manage {section.toLowerCase()} efficiently.</p>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}
