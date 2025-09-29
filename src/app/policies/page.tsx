"use client";
import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";
import { FileText, Eye, Download } from "lucide-react";

type Policy = {
  id: string;
  title: string;
  category: string;
  description?: string;
  fileUrl?: string;
  uploadedAt: string;
};

export default function PoliciesPage() {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/policies");
      const data = await res.json();
      setPolicies(data);
      setLoading(false);
    };
    load();
  }, []);

  // Group by category
  const grouped = policies.reduce<Record<string, Policy[]>>((acc, p) => {
    acc[p.category] = acc[p.category] || [];
    acc[p.category].push(p);
    return acc;
  }, {});

  if (loading) {
    return <p className="px-6 py-10">Loading policies...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-12">
      <h2 className="text-3xl font-bold">Company Policies</h2>

      {Object.entries(grouped).map(([category, items]) => (
        <Card key={category} shadow="sm" className="glass-card">
          <CardBody>
            <h3 className="text-xl font-semibold mb-4">{category} Policies</h3>

            <Table removeWrapper aria-label={`${category} policies`}>
              <TableHeader>
                <TableColumn>Policy</TableColumn>
                <TableColumn>Description</TableColumn>
                <TableColumn align="end">Actions</TableColumn>
              </TableHeader>
              <TableBody>
                {items.map((p) => (
                  <TableRow key={p.id}>
                    {/* Title */}
                    <TableCell className="flex items-center gap-2">
                      <FileText size={18} className="text-indigo-400 shrink-0" />
                      <span>{p.title}</span>
                    </TableCell>

                    {/* Short description */}
                    <TableCell className="text-sm text-default-500">
                      {p.description || "-"}
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="flex justify-end gap-3">
                      {p.fileUrl && (
                        <>
                          {/* View */}
                          <Button
                            size="sm"
                            color="primary"
                            variant="flat"
                            startContent={<Eye size={16} />}
                            onPress={() => window.open(p.fileUrl!, "_blank")}
                          >
                            View
                          </Button>

                          {/* Download */}
                          <a href={p.fileUrl} download>
                            <Button
                              size="sm"
                              color="secondary"
                              variant="flat"
                              startContent={<Download size={16} />}
                            >
                              Download
                            </Button>
                          </a>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
