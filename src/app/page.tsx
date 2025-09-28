"use client";
import { Card, CardBody, CardHeader, CardFooter, Image, Link } from "@nextui-org/react";

const NEWS = [
  {
    slug: "q3-results",
    title: "Q3 Results Beat Expectations",
    date: "Sep 25, 2025",
    excerpt: "Revenue grew 18% YoY...",
    imageSrc: "/news/q3.jpg",
  },
  {
    slug: "hr-policy-update",
    title: "New HR Policy Update",
    date: "Sep 20, 2025",
    excerpt: "Flexible Fridays & leave...",
    imageSrc: "/news/hr.jpg",
  },
  {
    slug: "renovation-complete",
    title: "Mumbai HQ Renovation Complete",
    date: "Sep 15, 2025",
    excerpt: "12th floor collaboration hub...",
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

export default function Landing() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10 space-y-12">
      {/* News */}
      <section>
        <h2 className="text-2xl font-bold">News & Announcements</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {NEWS.map((n) => (
            <Card key={n.slug} shadow="sm" className="glass-card" isPressable as={Link} href={`/announcements/${n.slug}`}>
              <CardHeader className="p-0">
                <Image removeWrapper width="100%" alt={n.title} className="h-40 object-cover" src={n.imageSrc}/>
              </CardHeader>
              <CardBody>
                <p className="text-xs text-default-500">{n.date}</p>
                <h3 className="font-semibold mt-1">{n.title}</h3>
                <p className="text-sm text-default-600 mt-1">{n.excerpt}</p>
              </CardBody>
              <CardFooter className="text-primary">Read more →</CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Birthdays */}
      <section>
        <h2 className="text-2xl font-bold">🎂 Today’s Birthdays</h2>
        <div className="mt-6 flex flex-wrap gap-6">
          {BIRTHDAYS.map((emp, i) => (
            <Card key={i} className="w-64 glass-card" shadow="sm">
              <CardBody className="items-center text-center gap-3">
                <Image alt={emp.name} src={emp.image} width={96} height={96} className="rounded-full object-cover"/>
                <div>
                  <p className="font-semibold">{emp.name}</p>
                  <p className="text-sm text-default-600">{emp.role}</p>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      {/* Sales */}
      <section>
        <h2 className="text-2xl font-bold">🌍 Global Sales Snapshot</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card shadow="sm" className="h-64 glass-card items-center justify-center">
            <CardBody className="flex items-center justify-center">
              <Image alt="Mini Map" src="/mini-map.png" width={320} height={200} className="opacity-90"/>
            </CardBody>
          </Card>
          <div className="grid grid-cols-2 gap-6">
            {SALES.map((s, i) => (
              <Card key={i} shadow="sm" className="glass-card">
                <CardBody>
                  <p className="text-xs text-default-500">{s.location}</p>
                  <p className="text-2xl font-bold text-primary mt-2">{s.value}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
