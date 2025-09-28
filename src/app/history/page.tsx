"use client";

import { motion } from "framer-motion";

const milestones = [
  { year: "2005", event: "Company founded" },
  { year: "2010", event: "Expanded to international markets" },
  { year: "2020", event: "Launched new intranet portal" },
];

export default function HistoryPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-blue-700 text-center"
      >
        Company History
      </motion.h2>

      <div className="space-y-6">
        {milestones.map((ms, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.02 }}
            className="card p-6 flex justify-between"
          >
            <span className="font-bold text-blue-600">{ms.year}</span>
            <span className="text-gray-600">{ms.event}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
