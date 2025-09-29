"use client";
import { useEffect, useState, useRef } from "react";
import {
  Card,
  CardBody,
  Input,
  Textarea,
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

type Location = {
  id: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  imageUrl?: string;
  description?: string;
};

export default function AdminLocations() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  // FIX ✅ one ref object for all cards
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const load = async () => {
    const res = await fetch("/api/locations");
    const data = await res.json();
    setLocations(data);
  };

  useEffect(() => {
    load();
  }, []);

  const uploadImage = async (file: File | null) => {
    if (!file) return "";
    const fd = new FormData();
    fd.append("file", file);
    fd.append("type", "locations");
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const { url: imageUrl } = await res.json();
    return imageUrl as string;
  };

  const add = async () => {
    const imageUrl = await uploadImage(imageFile);

    const res = await fetch("/api/locations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        city,
        country,
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        description,
        imageUrl,
      }),
    });

    const created = await res.json();
    console.log("Created location:", created); // 👈 should show backend ID

    // reset form
    setCity("");
    setCountry("");
    setLat("");
    setLng("");
    setDescription("");
    setImageFile(null);

    await load(); // ✅ reload from backend JSON
  };

  const remove = async (id: string) => {
    await fetch(`/api/locations/${id}`, { method: "DELETE" });
    await load();
  };

  const scrollToCard = (id: string) => {
    const el = cardRefs.current[id];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">
      <h1 className="text-2xl font-bold">Manage Locations</h1>

      {/* Add New Location Form */}
      <Card className="glass-card">
        <CardBody className="grid md:grid-cols-2 gap-4">
          <Input
            label="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <Input
            label="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <Input
            label="Latitude"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
          />
          <Input
            label="Longitude"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
          />
          <Textarea
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="md:col-span-2"
          />
          <div className="space-y-2">
            <label className="text-sm">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            />
          </div>
          <div className="md:col-span-2">
            <Button color="primary" onPress={add}>
              Add Location
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Locations Table */}
      <Table aria-label="Locations Table" removeWrapper>
        <TableHeader>
          <TableColumn>City</TableColumn>
          <TableColumn>Country</TableColumn>
          <TableColumn>Coordinates</TableColumn>
          <TableColumn>Description</TableColumn>
          <TableColumn>Image</TableColumn>
          <TableColumn align="end">Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {locations.map((loc) => (
            <TableRow key={loc.id}>
              {/* Attach ref here via a wrapping div */}
              <TableCell>
                <div
                  ref={(el) => {
                    cardRefs.current[loc.id] = el;
                  }}
                >
                  {loc.city}
                </div>
              </TableCell>
              <TableCell>{loc.country}</TableCell>
              <TableCell>
                {loc.lat}, {loc.lng}
              </TableCell>
              <TableCell className="text-sm text-default-500">
                {loc.description || "-"}
              </TableCell>
              <TableCell>
                {loc.imageUrl ? (
                  <img
                    src={loc.imageUrl}
                    alt={loc.city}
                    className="h-12 w-20 object-cover rounded"
                  />
                ) : (
                  "-"
                )}
              </TableCell>
              <TableCell className="flex justify-end">
                <Button
                  size="sm"
                  color="danger"
                  variant="flat"
                  onPress={() => remove(loc.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
