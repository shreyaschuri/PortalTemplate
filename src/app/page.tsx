"use client";
import { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, CardFooter, Image, Link, Button } from "@nextui-org/react";

type Announcement = {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc?: string;
  imageUrl?: string;
  fileUrl?: string;
  publishedAt: string;
  isActive: boolean;
};

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
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/announcements");
      const data: Announcement[] = await res.json();
      // only active, latest first
      setAnnouncements(
        data.filter((a) => a.isActive).sort((a, b) => (b.publishedAt > a.publishedAt ? 1 : -1))
      );
      setLoading(false);
    };
    load();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 space-y-12">
      {/* News */}
      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">News & Announcements</h2>
          <Button
            as={Link}
            href="/announcements"
            size="sm"
            color="primary"
            variant="flat"
          >
            See all →
          </Button>
        </div>

        {loading ? (
          <p className="mt-6">Loading announcements...</p>
        ) : (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {announcements.slice(0, 3).map((n) => (
              <Card
                key={n.id}
                shadow="sm"
                className="glass-card"
                isPressable
                as={Link}
                href={`/announcements/${n.id}`}
              >
                {n.imageUrl && (
                  <CardHeader className="p-0">
                    <Image
                      removeWrapper
                      width="100%"
                      alt={n.title}
                      className="h-40 object-cover"
                      src={n.imageUrl}
                    />
                  </CardHeader>
                )}
                <CardBody>
                  <p className="text-xs text-default-500">
                    {new Date(n.publishedAt).toLocaleDateString()}
                  </p>
                  <h3 className="font-semibold mt-1">{n.title}</h3>
                  <p className="text-sm text-default-600 mt-1">{n.shortDesc}</p>
                </CardBody>
                <CardFooter className="text-primary">Read more →</CardFooter>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Birthdays */}
      <section>
        <h2 className="text-2xl font-bold">🎂 Today’s Birthdays</h2>
        <div className="mt-6 flex flex-wrap gap-6">
          {BIRTHDAYS.map((emp, i) => (
            <Card key={i} className="w-64 glass-card" shadow="sm">
              <CardBody className="items-center text-center gap-3">
                <Image
                  alt={emp.name}
                  src={emp.image}
                  width={96}
                  height={96}
                  className="rounded-full object-cover"
                />
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
              <Image
                alt="Mini Map"
                src="/mini-map.png"
                width={320}
                height={200}
                className="opacity-90"
              />
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
