"use client";
import Link from "next/link";
import { Card, CardBody, Button } from "@nextui-org/react";

export default function AdminHome() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-card"><CardBody>
          <h3 className="font-semibold text-lg mb-2">Announcements</h3>
          <Button as={Link} href="/admin/announcements" color="primary">Manage</Button>
        </CardBody></Card>
        <Card className="glass-card"><CardBody>
          <h3 className="font-semibold text-lg mb-2">Locations</h3>
          <Button as={Link} href="/admin/locations" color="primary">Manage</Button>
        </CardBody></Card>
        <Card className="glass-card"><CardBody>
          <h3 className="font-semibold text-lg mb-2">Policies</h3>
          <Button as={Link} href="/admin/policies" color="primary">Manage</Button>
        </CardBody></Card>
      </div>
    </div>
  );
}
