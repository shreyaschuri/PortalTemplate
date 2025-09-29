import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src", "data", "announcements.json");

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const index = data.findIndex((a: any) => a.id === id);

  if (index === -1) {
    return NextResponse.json(
      { error: `Announcement not found: ${id}` },
      { status: 404 }
    );
  }

  const ann = data[index];

  // ✅ remove associated files
  if (ann.imageUrl) {
    const imgPath = path.join(process.cwd(), "public", ann.imageUrl);
    if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
  }
  if (ann.fileUrl) {
    const filePathAbs = path.join(process.cwd(), "public", ann.fileUrl);
    if (fs.existsSync(filePathAbs)) fs.unlinkSync(filePathAbs);
  }

  data.splice(index, 1);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  return NextResponse.json({ success: true, deleted: id });
}
