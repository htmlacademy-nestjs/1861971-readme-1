/*
  Warnings:

  - You are about to drop the column `author_link` on the `links` table. All the data in the column will be lost.
  - You are about to drop the column `author_photo` on the `photos` table. All the data in the column will be lost.
  - You are about to drop the column `author_publication` on the `texts` table. All the data in the column will be lost.
  - You are about to drop the column `author_publication` on the `video` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "links" DROP COLUMN "author_link",
ADD COLUMN     "id_author_link" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "photos" DROP COLUMN "author_photo",
ADD COLUMN     "id_author_photo" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "quotes" ADD COLUMN     "id_author_publication" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "texts" DROP COLUMN "author_publication",
ADD COLUMN     "id_author_publication" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "video" DROP COLUMN "author_publication",
ADD COLUMN     "id_author_publication" TEXT NOT NULL DEFAULT '';
