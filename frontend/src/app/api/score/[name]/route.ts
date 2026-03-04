import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ name: string }> },
) {
  // return the captured route param as a plain string for testing
  const { name } = await params;
  return new NextResponse(name);
}
