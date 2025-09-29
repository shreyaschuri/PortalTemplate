import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { pwd } = await req.json();
  if (pwd && pwd === process.env.ADMIN_PASSWORD) {
    const res = NextResponse.json({ ok: true });
    res.cookies.set("admin", "1", { httpOnly: true, path: "/", sameSite: "lax" });
    return res;
  }
  return NextResponse.json({ ok: false }, { status: 401 });
}
