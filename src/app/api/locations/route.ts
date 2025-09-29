import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src", "data", "locations.json");

export async function GET() {
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const newLocation = await req.json();
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const location = {
    id: crypto.randomUUID(),
    ...newLocation,
  };

  data.push(location);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  return NextResponse.json(location);
}
