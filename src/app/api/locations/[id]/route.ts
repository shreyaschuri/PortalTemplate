import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src", "data", "locations.json");

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const index = data.findIndex((l: any) => l.id === id);

  if (index === -1) {
    return NextResponse.json(
      { error: `Location not found: ${id}` },
      { status: 404 }
    );
  }

  const loc = data[index];

  // ✅ remove image if exists
  if (loc.imageUrl) {
    const imgPath = path.join(process.cwd(), "public", loc.imageUrl);
    if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
  }

  data.splice(index, 1);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  return NextResponse.json({ success: true, deleted: id });
}
