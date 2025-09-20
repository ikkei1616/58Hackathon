import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/prisma";

export async function GET(req: NextRequest,{params}:{params:{id:string}}) {
  const {id} = await params;

  if (!id) {
    return NextResponse.json({ error: "Missing summaryId" }, { status: 400 });
  }

  const books = await prisma.summaryBook.findUnique({
    where:{id}
  });

  if(!books){
    return NextResponse.json({error:"Not Found"}, {status:404});
  }

  return NextResponse.json(books);
}

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