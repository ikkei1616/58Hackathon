import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/prisma";

export async function POST(req: NextRequest) {
  const { summaryId } = await req.json();
  console.log("aaaa",summaryId);

  // バリデーション例（必要に応じて追加）
  if (!summaryId) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const summaryBook = await prisma.summaryBook.findUnique({
    where: { id:summaryId},
  });

  return NextResponse.json(summaryBook, { status: 201 });
}