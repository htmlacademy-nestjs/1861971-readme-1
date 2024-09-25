/*
  Warnings:

  - You are about to drop the column `author_comment` on the `comments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "comments" DROP COLUMN "author_comment",
ADD COLUMN     "id_author_comment" TEXT NOT NULL DEFAULT '';
