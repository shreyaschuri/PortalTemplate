"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Card, CardBody, Input, Button } from "@nextui-org/react";

export default function AdminLogin() {
  const [pwd, setPwd] = useState("");
  const [err, setErr] = useState("");
  const router = useRouter();
  const next = useSearchParams().get("next") || "/admin";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/admin-login", {
      method: "POST",
      body: JSON.stringify({ pwd }),
      headers: { "Content-Type": "application/json" }
    });
    if (res.ok) router.replace(next);
    else setErr("Invalid password");
  };

  return (
    <div className="max-w-md mx-auto px-6 py-16">
      <Card className="glass-card">
        <CardBody className="space-y-4">
          <h1 className="text-2xl font-bold">Admin Login</h1>
          <form onSubmit={submit} className="space-y-4">
            <Input
              label="Admin Password"
              type="password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
            />
            {err && <p className="text-danger text-sm">{err}</p>}
            <Button color="primary" type="submit">Login</Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
