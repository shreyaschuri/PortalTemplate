"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardBody, Button } from "@nextui-org/react";
import { FileText } from "lucide-react";

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

export default function AnnouncementDetail() {
  const { id } = useParams();
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/announcements");
      const data: Announcement[] = await res.json();
      setAnnouncement(data.find((a) => a.id === id) || null);
      setLoading(false);
    };
    load();
  }, [id]);

  if (loading) return <p className="px-6 py-10">Loading...</p>;
  if (!announcement) return <p className="px-6 py-10">Announcement not found.</p>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <Card className="glass-card">
        <CardBody className="space-y-4">
          <h2 className="text-3xl font-bold">{announcement.title}</h2>
          <p className="text-default-500">{announcement.fullDesc || announcement.shortDesc}</p>

          {announcement.imageUrl && (
            <img
              src={announcement.imageUrl}
              alt={announcement.title}
              className="rounded-lg h-60 w-full object-cover"
            />
          )}

          {announcement.fileUrl && (
            <a href={announcement.fileUrl} target="_blank" rel="noopener noreferrer">
              <Button
                color="secondary"
                startContent={<FileText size={16} />}
              >
                View PDF
              </Button>
            </a>
          )}

          <p className="text-xs text-slate-500">
            Published: {new Date(announcement.publishedAt).toLocaleDateString()}
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
