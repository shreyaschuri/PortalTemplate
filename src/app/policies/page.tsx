"use client";
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

const policies = [
  {
    section: "HR Policies",
    items: [
      { title: "Code of Conduct", file: "/policies/code-of-conduct.pdf" },
      { title: "Leave Policy", file: "/policies/leave-policy.pdf" },
    ],
  },
  {
    section: "IT Policies",
    items: [
      { title: "Information Security", file: "/policies/information-security.pdf" },
      { title: "Remote Work Policy", file: "/policies/remote-work.pdf" },
    ],
  },
  {
    section: "Finance Policies",
    items: [
      { title: "Expense Reimbursement", file: "/policies/expense-reimbursement.pdf" },
    ],
  },
];

export default function PoliciesPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-12">
      <h2 className="text-3xl font-bold">Company Policies</h2>

      {policies.map((section, idx) => (
        <Card key={idx} shadow="sm" className="glass-card">
          <CardBody>
            <h3 className="text-xl font-semibold mb-4">{section.section}</h3>

            <Table removeWrapper aria-label={`${section.section} table`}>
              <TableHeader>
                <TableColumn>Policy</TableColumn>
                <TableColumn align="start">Actions</TableColumn>
              </TableHeader>
              <TableBody>
                {section.items.map((p, i) => (
                  <TableRow key={i}>
                    {/* Left column → Policy name */}
                    <TableCell className="flex items-center gap-2">
                      <FileText size={18} className="text-indigo-400 shrink-0" />
                      <span>{p.title}</span>
                    </TableCell>

                    {/* Right column → Buttons aligned */}
                    <TableCell className="flex items-center justify-end gap-4">
                      {/* View PDF in new tab */}
                      <Button
                        size="sm"
                        color="primary"
                        variant="flat"
                        startContent={<Eye size={16} />}
                        onPress={() => window.open(p.file, "_blank")}
                      >
                        View
                      </Button>

                      {/* Download PDF */}
                      <a href={p.file} download>
                        <Button
                          size="sm"
                          color="secondary"
                          variant="flat"
                          startContent={<Download size={16} />}
                        >
                          Download
                        </Button>
                      </a>
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
