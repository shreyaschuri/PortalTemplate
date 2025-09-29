import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src", "data", "policies.json");

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const index = data.findIndex((p: any) => p.id === id);

  if (index === -1) {
    return NextResponse.json(
      { error: `Policy not found: ${id}` },
      { status: 404 }
    );
  }

  const policy = data[index];

  // ✅ remove PDF if exists
  if (policy.fileUrl) {
    const pdfPath = path.join(process.cwd(), "public", policy.fileUrl);
    if (fs.existsSync(pdfPath)) fs.unlinkSync(pdfPath);
  }

  data.splice(index, 1);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  return NextResponse.json({ success: true, deleted: id });
}
