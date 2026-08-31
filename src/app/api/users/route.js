import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "User API endpoint" });
}

export async function POST(req) {
  const body = await req.json().catch(() => ({}));
  return NextResponse.json({ message: "Success", user: body });
}
