-- AlterTable
ALTER TABLE "public"."Article" ADD COLUMN     "statementId" TEXT;

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "image" TEXT;

-- CreateTable
CREATE TABLE "public"."ArticleStatement" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ArticleStatement_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Article" ADD CONSTRAINT "Article_statementId_fkey" FOREIGN KEY ("statementId") REFERENCES "public"."ArticleStatement"("id") ON DELETE SET NULL ON UPDATE CASCADE;
