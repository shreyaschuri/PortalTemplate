import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const type = (formData.get("type") as string) || "misc"; // default folder

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  // ✅ Map type to folder
  const folderMap: Record<string, string> = {
    locations: "locations/images",
    policies: "policies",
    announcements: "announcements/files",
    "announcement-images": "announcements/images",
  };

  const uploadFolder = folderMap[type] || "misc";

  const buffer = Buffer.from(await file.arrayBuffer());
  const uploadsDir = path.join(
    process.cwd(),
    "public",
    "uploads",
    uploadFolder
  );

  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  const filePath = path.join(uploadsDir, file.name);
  fs.writeFileSync(filePath, buffer);

  return NextResponse.json({
    url: `/uploads/${uploadFolder}/${file.name}`,
  });
}
