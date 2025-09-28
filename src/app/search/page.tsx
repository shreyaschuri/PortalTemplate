"use client";
import { useSearchParams } from "next/navigation";
import { Card, CardBody, Link } from "@nextui-org/react";

// Mock data (replace with API/DB later)
const EMPLOYEES = [
  { id: 1, name: "John Doe", role: "Engineer" },
  { id: 2, name: "Jane Smith", role: "Designer" },
];
const POLICIES = [
  { id: 1, title: "Remote Work Policy" },
  { id: 2, title: "Leave Policy" },
];
const ANNOUNCEMENTS = [
  { slug: "q3-results", title: "Q3 Results Released" },
  { slug: "hr-policy-update", title: "New HR Policy Update" },
];

export default function SearchPage() {
  const params = useSearchParams();
  const q = (params.get("q") || "").toLowerCase();

  const results = {
    employees: EMPLOYEES.filter((e) => e.name.toLowerCase().includes(q) || e.role.toLowerCase().includes(q)),
    policies: POLICIES.filter((p) => p.title.toLowerCase().includes(q)),
    announcements: ANNOUNCEMENTS.filter((a) => a.title.toLowerCase().includes(q)),
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
      <h1 className="text-2xl font-bold">Search Results for "{q}"</h1>

      {Object.entries(results).map(([category, items]) => (
        <div key={category}>
          <h2 className="text-xl font-semibold capitalize">{category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {items.length > 0 ? (
              items.map((item: any, i) => (
                <Card key={i} shadow="sm" className="glass-card">
                  <CardBody>
                    {category === "employees" && (
                      <Link href={`/employees/${item.id}`}>{item.name} — {item.role}</Link>
                    )}
                    {category === "policies" && (
                      <Link href={`/policies#${item.id}`}>{item.title}</Link>
                    )}
                    {category === "announcements" && (
                      <Link href={`/announcements/${item.slug}`}>{item.title}</Link>
                    )}
                  </CardBody>
                </Card>
              ))
            ) : (
              <p className="text-slate-500">No matches</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
