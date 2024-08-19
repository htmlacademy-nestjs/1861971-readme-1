-- AlterTable
ALTER TABLE "comments" ADD COLUMN     "id_link" INTEGER,
ADD COLUMN     "id_photo" INTEGER,
ADD COLUMN     "id_quote" INTEGER;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_id_quote_fkey" FOREIGN KEY ("id_quote") REFERENCES "quotes"("id_quote") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_id_photo_fkey" FOREIGN KEY ("id_photo") REFERENCES "photos"("id_photo") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_id_link_fkey" FOREIGN KEY ("id_link") REFERENCES "links"("id_photo") ON DELETE CASCADE ON UPDATE CASCADE;
