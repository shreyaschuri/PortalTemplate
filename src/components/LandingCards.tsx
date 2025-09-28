"use client";

import { motion } from "framer-motion";

export default function LandingCards() {
  const cards = [
    { title: "News", desc: "Latest company announcements and updates." },
    { title: "Documents", desc: "Access policies, templates, and guides." },
    { title: "Teams", desc: "Connect with colleagues across departments." },
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card) => (
        <motion.div
          key={card.title}
          whileHover={{ scale: 1.05 }}
          className="card text-center"
        >
          <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
          <p className="text-gray-500">{card.desc}</p>
        </motion.div>
      ))}
    </section>
  );
}
