"use client";

import { motion } from "framer-motion";

const policies = [
  {
    title: "Code of Conduct",
    description:
      "All employees must maintain professional behavior and follow ethical practices.",
  },
  {
    title: "Remote Work Policy",
    description:
      "Flexible remote work arrangements are available with prior manager approval.",
  },
  {
    title: "Leave Policy",
    description:
      "Employees are entitled to annual, sick, and casual leaves as per company policy.",
  },
];

export default function PoliciesPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-blue-700 text-center"
      >
        Company Policies
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {policies.map((policy, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.02 }}
            className="card p-6"
          >
            <h3 className="text-2xl font-semibold">{policy.title}</h3>
            <p className="text-gray-600 mt-2">{policy.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
