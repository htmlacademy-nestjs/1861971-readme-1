/*
  Warnings:

  - The `count_like` column on the `links` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `count_like` column on the `photos` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `count_like` column on the `quotes` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `count_like` column on the `texts` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `count_like` column on the `video` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "links" DROP COLUMN "count_like",
ADD COLUMN     "count_like" TEXT[];

-- AlterTable
ALTER TABLE "photos" DROP COLUMN "count_like",
ADD COLUMN     "count_like" TEXT[];

-- AlterTable
ALTER TABLE "quotes" DROP COLUMN "count_like",
ADD COLUMN     "count_like" TEXT[];

-- AlterTable
ALTER TABLE "texts" DROP COLUMN "count_like",
ADD COLUMN     "count_like" TEXT[];

-- AlterTable
ALTER TABLE "video" DROP COLUMN "count_like",
ADD COLUMN     "count_like" TEXT[];
