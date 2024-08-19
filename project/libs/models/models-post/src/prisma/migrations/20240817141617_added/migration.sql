/*
  Warnings:

  - You are about to drop the column `photo_string` on the `photos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "photos" DROP COLUMN "photo_string",
ADD COLUMN     "photo" TEXT NOT NULL DEFAULT '';
