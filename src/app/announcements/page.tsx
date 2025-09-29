"use client";
import { useEffect, useState } from "react";
import { Card, CardBody, Button } from "@nextui-org/react";
import { FileText, Eye } from "lucide-react";
import Link from "next/link";

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

export default function AnnouncementsPage() {
  const [list, setList] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  // fetch dynamic announcements
  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/announcements");
      const data = await res.json();
      setList(data.filter((a: Announcement) => a.isActive));
      setLoading(false);
    };
    load();
  }, []);

  if (loading) return <p className="px-6 py-10">Loading announcements...</p>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
      <h2 className="text-3xl font-bold">Company Announcements</h2>

      <div className="grid gap-6 md:grid-cols-2">
        {list.map((a) => (
          <Card key={a.id} shadow="sm" className="glass-card">
            <CardBody className="space-y-3">
              <h3 className="text-xl font-semibold">{a.title}</h3>
              <p className="text-default-500">{a.shortDesc}</p>

              {a.imageUrl && (
                <img
                  src={a.imageUrl}
                  alt={a.title}
                  className="rounded-lg h-40 w-full object-cover"
                />
              )}

              <div className="flex gap-3 mt-3">
                <Button
                  as={Link}
                  href={`/announcements/${a.id}`}
                  color="primary"
                  variant="flat"
                  startContent={<Eye size={16} />}
                  size="sm"
                >
                  View
                </Button>
                {a.fileUrl && (
                  <a href={a.fileUrl} target="_blank" rel="noopener noreferrer">
                    <Button
                      color="secondary"
                      variant="flat"
                      startContent={<FileText size={16} />}
                      size="sm"
                    >
                      PDF
                    </Button>
                  </a>
                )}
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
