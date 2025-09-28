"use client";

import { motion } from "framer-motion";

const employees = [
  { name: "John Doe", role: "Software Engineer", image: "/employees/john.jpg" },
  { name: "Jane Smith", role: "HR Manager", image: "/employees/jane.jpg" },
  { name: "Raj Patel", role: "Project Manager", image: "/employees/raj.jpg" },
];

export default function EmployeesPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-12">
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-blue-700 text-center"
      >
        Employee Directory
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {employees.map((emp, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="card overflow-hidden text-center"
          >
            <img
              src={emp.image}
              alt={emp.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold">{emp.name}</h3>
              <p className="text-gray-600">{emp.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
