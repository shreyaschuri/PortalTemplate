"use client";
import { useEffect, useRef, useState } from "react";
import Globe, { GlobeMethods } from "react-globe.gl";
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

export default function LocationsPage() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/locations");
      const data = await res.json();
      setLocations(data);
      setLoading(false);
    };
    load();
  }, []);

  useEffect(() => {
    if (globeRef.current) {
      const controls = globeRef.current.controls();
      if (controls) {
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.6;
      }
    }
  }, [loading]);

  const handleLocationClick = (loc: Location) => {
    if (globeRef.current) {
      globeRef.current.pointOfView(
        { lat: loc.lat, lng: loc.lng, altitude: 1.5 },
        1500
      );
    }

    const el = cardRefs.current[loc.id];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (loading) return <p className="px-6 py-10">Loading locations...</p>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
      <h2 className="text-3xl font-bold mb-6">Our Global Offices</h2>

      {/* Globe */}
      <div className="relative flex justify-center items-center bg-slate-900 rounded-xl shadow-lg overflow-hidden">
        <div className="w-full h-[500px]">
          <Globe
            ref={globeRef}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
            bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
            backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
            labelsData={locations}
            labelLat={(d: any) => d.lat}
            labelLng={(d: any) => d.lng}
            labelText={(d: any) => d.city}
            labelSize={2.5}
            labelColor={() => "rgba(255,255,255,0.9)"}
            labelDotRadius={1.5}
            onLabelClick={(d: any) => handleLocationClick(d as Location)}
            animateIn={true}
          />
        </div>
      </div>

      {/* Cards */}
      <div className="grid gap-8 md:grid-cols-2">
        {locations.map((loc) => (
          <Card
            key={loc.id}
            shadow="sm"
            className="glass-card"
            ref={(el) => {
              cardRefs.current[loc.id] = el;
            }}
          >
            <CardBody className="space-y-3">
              <h3 className="text-xl font-semibold">
                {loc.city}, {loc.country}
              </h3>

              {loc.imageUrl && (
                <img
                  src={loc.imageUrl}
                  alt={loc.city}
                  className="rounded-lg mt-3 h-40 w-full object-cover"
                />
              )}

              <Button
                as={Link}
                href={`/locations/${loc.id}`}
                size="sm"
                variant="flat"
                color="primary"
              >
                View Details
              </Button>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
