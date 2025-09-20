import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/prisma";

export async function GET(req: NextRequest) {
  const authId = req.nextUrl.searchParams.get("authId");

  if (!authId) {
    return NextResponse.json({ error: "authId is required" }, { status: 400 });
  }

  try {
    const summaries = await prisma.summaryBook.findMany({
      where: {
        userId: authId,
      },
    });
    return NextResponse.json(summaries, { status: 200 });
  } catch (error) {
    console.error("Error fetching summaries:", error);
    return NextResponse.json(
      { error: "Failed to fetch summaries" },
      { status: 500 }
    );
  }
}



