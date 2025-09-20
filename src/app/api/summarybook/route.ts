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