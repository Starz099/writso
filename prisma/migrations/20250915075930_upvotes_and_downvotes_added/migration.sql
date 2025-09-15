-- AlterTable
ALTER TABLE "public"."Article" ADD COLUMN     "downVotes" INTEGER DEFAULT 0,
ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "upVotes" INTEGER DEFAULT 0;

-- AlterTable
ALTER TABLE "public"."ArticleStatement" ADD COLUMN     "downVotes" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "upVotes" INTEGER NOT NULL DEFAULT 0;
