/*
  Warnings:

  - Added the required column `score` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Article" ADD COLUMN     "score" INTEGER NOT NULL;
