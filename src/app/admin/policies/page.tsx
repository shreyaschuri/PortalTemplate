"use client";
import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Input,
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

type Policy = {
  id: string;
  title: string;
  category: string;
  description?: string;
  fileUrl: string;
  uploadedAt: string;
};

export default function AdminPolicies() {
  const [list, setList] = useState<Policy[]>([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState<File | null>(null);

  // ✅ Load policies fresh from backend
  const load = async () => {
    const res = await fetch("/api/policies");
    const data = await res.json();
    console.log(
      "Loaded policies:",
      data.map((p: Policy) => p.id)
    );
    setList(data);
  };

  useEffect(() => {
    load();
  }, []);

  // ✅ Upload PDF to /uploads/policies
  const upload = async (file: File | null) => {
    if (!file) return "";
    const fd = new FormData();
    fd.append("file", file);
    fd.append("type", "policies"); // 👈 goes into /uploads/policies
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    return data.url as string;
  };

  // ✅ Add new policy (backend assigns ID)
  const add = async () => {
    const fileUrl = await upload(file);
    const res = await fetch("/api/policies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        category,
        fileUrl,
        uploadedAt: new Date().toISOString(),
      }),
    });

    const created = await res.json();
    console.log("Created policy:", created); // 👈 see real ID from backend

    setTitle("");
    setCategory("");
    setFile(null);

    await load(); // ✅ reload from backend JSON
  };

  // ✅ Delete by backend ID
  const remove = async (id: string) => {
    console.log("Deleting:", id);
    await fetch(`/api/policies/${id}`, { method: "DELETE" });
    await load(); // ✅ refresh UI
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
      <h1 className="text-2xl font-bold">Manage Policies</h1>

      {/* Create form */}
      <Card className="glass-card">
        <CardBody className="grid md:grid-cols-2 gap-4">
          <Input
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm">Upload PDF</label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </div>
          <div className="md:col-span-2">
            <Button color="primary" onPress={add}>
              Add Policy
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Policies table */}
      <Table aria-label="Policies table" removeWrapper>
        <TableHeader>
          <TableColumn>Title</TableColumn>
          <TableColumn>Category</TableColumn>
          <TableColumn>File</TableColumn>
          <TableColumn align="end">Actions</TableColumn>
        </TableHeader>
        <TableBody items={list}>
          {list.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{p.title}</TableCell>
              <TableCell>{p.category}</TableCell>
              <TableCell>
                <a href={p.fileUrl} target="_blank" className="text-primary">
                  View PDF
                </a>
              </TableCell>
              <TableCell className="flex justify-end">
                <Button
                  size="sm"
                  color="danger"
                  variant="flat"
                  onPress={() => remove(p.id)} // ✅ only real backend ID
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
