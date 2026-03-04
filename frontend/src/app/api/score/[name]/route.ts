import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: { name: string } },
) {
  // return the captured route param as a plain string for testing
  const { name } = await params;
  return new NextResponse(name);
}
