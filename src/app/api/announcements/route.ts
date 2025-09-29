import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src", "data", "announcements.json");

export async function GET() {
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const newAnnouncement = await req.json();
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const announcement = {
    id: crypto.randomUUID(),
    ...newAnnouncement,
  };

  data.push(announcement);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  return NextResponse.json(announcement);
}
