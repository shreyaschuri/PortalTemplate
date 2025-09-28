"use client";
import { Accordion, AccordionItem, Card, CardBody } from "@nextui-org/react";

const history = [
  {
    year: "1995",
    event: "Company Founded",
    description:
      "Our journey began in 1995 with a small team passionate about innovation. The company was established with the mission of delivering technology solutions that make a difference.",
  },
  {
    year: "2005",
    event: "Expanded Globally",
    description:
      "In 2005, we opened offices in London, New York, and Mumbai, marking our entry into international markets. This expansion allowed us to serve clients worldwide.",
  },
  {
    year: "2020",
    event: "Digital Transformation Initiatives",
    description:
      "During 2020, we launched several digital transformation projects, introducing AI, cloud solutions, and automation to modernize both internal and client-facing processes.",
  },
];

export default function HistoryPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-10">Company History</h2>

      <div className="relative border-l border-indigo-500/40 pl-6">
        {history.map((h, i) => (
          <div key={i} className="mb-10 relative">
            {/* Dot on timeline */}
            <span className="absolute -left-[9px] top-2 w-4 h-4 bg-indigo-500 rounded-full border-2 border-slate-900 shadow-lg"></span>

            {/* Event Card */}
            <Card shadow="sm" className="glass-card">
              <CardBody>
                <Accordion variant="splitted">
                  <AccordionItem
                    key={h.year}
                    aria-label={h.event}
                    title={
                      <div>
                        <p className="font-bold text-lg">{h.year}</p>
                        <p className="text-slate-400">{h.event}</p>
                      </div>
                    }
                  >
                    <p className="text-default-600">{h.description}</p>
                  </AccordionItem>
                </Accordion>
              </CardBody>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
