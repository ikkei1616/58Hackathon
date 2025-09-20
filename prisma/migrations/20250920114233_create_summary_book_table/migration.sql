-- CreateTable
CREATE TABLE "public"."SummaryBook" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SummaryBook_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."SummaryBook" ADD CONSTRAINT "SummaryBook_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
