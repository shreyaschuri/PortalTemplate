"use client";
import { useEffect, useState } from "react";
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
  Chip,
} from "@nextui-org/react";

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

export default function AdminAnnouncements() {
  const [list, setList] = useState<Announcement[]>([]);
  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [fullDesc, setFullDesc] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const load = async () => {
    const res = await fetch("/api/announcements");
    setList(await res.json());
  };

  useEffect(() => {
    load();
  }, []);

  const upload = async (file: File | null, type: string) => {
    if (!file) return "";
    const fd = new FormData();
    fd.append("file", file);
    fd.append("type", type); // 👈 tell backend where to store
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    return data.url as string;
  };

  const add = async () => {
    const imageUrl = await upload(imageFile, "announcement-images");
    const fileUrl = await upload(pdfFile, "announcements");

    const res = await fetch("/api/announcements", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        shortDesc,
        fullDesc,
        imageUrl,
        fileUrl,
        isActive: true,
        publishedAt: new Date().toISOString(),
      }),
    });

    const created = await res.json();
    console.log("Created announcement:", created); // backend ID
    await load();
  };

  const remove = async (id: string) => {
    await fetch(`/api/announcements/${id}`, { method: "DELETE" });
    await load();
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
      <h1 className="text-2xl font-bold">Manage Announcements</h1>

      {/* Create form */}
      <Card className="glass-card">
        <CardBody className="grid md:grid-cols-2 gap-4">
          <Input
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            label="Short Description"
            value={shortDesc}
            onChange={(e) => setShortDesc(e.target.value)}
          />
          <Textarea
            label="Full Description"
            value={fullDesc}
            onChange={(e) => setFullDesc(e.target.value)}
            className="md:col-span-2"
          />
          <div className="space-y-2">
            <label className="text-sm">Image (optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm">PDF (optional)</label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
            />
          </div>
          <div className="md:col-span-2">
            <Button color="primary" onPress={add}>
              Add Announcement
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Table */}
      <Table aria-label="Announcements table" removeWrapper>
        <TableHeader>
          <TableColumn>Title</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn>Files</TableColumn>
          <TableColumn align="end">Actions</TableColumn>
        </TableHeader>
        <TableBody items={list}>
          {list.map((a) => (
            <TableRow key={a.id}>
              <TableCell>
                <div className="font-medium">{a.title}</div>
                <div className="text-sm text-default-500">{a.shortDesc}</div>
              </TableCell>
              <TableCell>
                <Chip color={a.isActive ? "success" : "default"} size="sm">
                  {a.isActive ? "Active" : "Hidden"}
                </Chip>
              </TableCell>
              <TableCell className="text-sm">
                {a.imageUrl ? (
                  <a className="text-primary" href={a.imageUrl} target="_blank">
                    Image
                  </a>
                ) : (
                  "-"
                )}{" "}
                {a.fileUrl ? (
                  <a
                    className="text-primary ml-2"
                    href={a.fileUrl}
                    target="_blank"
                  >
                    PDF
                  </a>
                ) : (
                  ""
                )}
              </TableCell>
              <TableCell className="flex justify-end gap-3">
                <Button
                  size="sm"
                  color="danger"
                  variant="flat"
                  onPress={() => remove(a.id)}
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
