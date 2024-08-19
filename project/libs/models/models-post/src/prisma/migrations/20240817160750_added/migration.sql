/*
  Warnings:

  - The primary key for the `links` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_photo` on the `links` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_id_link_fkey";

-- AlterTable
ALTER TABLE "links" DROP CONSTRAINT "links_pkey",
DROP COLUMN "id_photo",
ADD COLUMN     "id_link" SERIAL NOT NULL,
ALTER COLUMN "type_publication" SET DEFAULT 'link',
ADD CONSTRAINT "links_pkey" PRIMARY KEY ("id_link");

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_id_link_fkey" FOREIGN KEY ("id_link") REFERENCES "links"("id_link") ON DELETE CASCADE ON UPDATE CASCADE;
