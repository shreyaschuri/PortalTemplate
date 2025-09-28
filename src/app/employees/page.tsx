"use client";
import PageWrapper from "@/components/PageWrapper";
import { Card, CardBody, Image, User } from "@nextui-org/react";

const employees = [
  { name: "John Doe", role: "Software Engineer", image: "/employees/john.jpg" },
  { name: "Jane Smith", role: "HR Manager", image: "/employees/jane.jpg" },
  { name: "Raj Patel", role: "Project Manager", image: "/employees/raj.jpg" },
];

export default function EmployeesPage() {
  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
      <h2 className="text-3xl font-bold">Employee Directory</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {employees.map((emp, i) => (
          <Card key={i} shadow="sm" className="glass-card">
            <CardBody>
              <User
                name={emp.name}
                description={emp.role}
                avatarProps={{ src: emp.image }}
              />
            </CardBody>
          </Card>
        ))}
      </div>
    </div></PageWrapper>
    
  );
}
