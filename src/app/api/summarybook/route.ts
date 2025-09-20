import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/prisma";

export async function POST(req: NextRequest) {
  const { title, userId, summary } = await req.json();

  // バリデーション例（必要に応じて追加）
  if (!title || !userId || !summary) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const newBook = await prisma.summaryBook.create({
    data: {
      title,
      userId,
      summary,
    },
  });

  return NextResponse.json(newBook, { status: 201 });
}

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  try {
    const summaries = await prisma.summaryBook.findMany({
      where: {
        userId: userId,
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