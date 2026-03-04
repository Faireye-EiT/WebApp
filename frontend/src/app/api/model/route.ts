import { NextResponse } from "next/server";

export async function GET() {
  // simple string response for debugging
  return new NextResponse("models");
}
