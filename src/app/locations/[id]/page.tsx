"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardBody, Button } from "@nextui-org/react";
import Link from "next/link";

type Location = {
  id: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  imageUrl?: string;
  description?: string;
};

export default function LocationDetail() {
  const { id } = useParams();
  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/locations");
      const data: Location[] = await res.json();
      setLocation(data.find((l) => l.id === id) || null);
      setLoading(false);
    };
    load();
  }, [id]);

  if (loading) return <p className="px-6 py-10">Loading...</p>;
  if (!location) return <p className="px-6 py-10">Location not found.</p>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">
      {/* Back Button */}
      <Button as={Link} href="/locations" variant="flat" color="primary">
        ← Back to Locations
      </Button>

      <Card className="glass-card">
        <CardBody className="space-y-4">
          <h2 className="text-3xl font-bold">
            {location.city}, {location.country}
          </h2>

          {location.imageUrl && (
            <img
              src={location.imageUrl}
              alt={location.city}
              className="rounded-lg h-60 w-full object-cover"
            />
          )}

          {location.description && (
            <p className="text-default-500">{location.description}</p>
          )}

          <p className="text-sm text-default-400">
            📍 Coordinates: {location.lat}, {location.lng}
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
