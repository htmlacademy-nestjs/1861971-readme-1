-- CreateTable
CREATE TABLE "comments" (
    "id_comment" SERIAL NOT NULL,
    "text" TEXT NOT NULL DEFAULT '',
    "author_comment" TEXT NOT NULL DEFAULT '',
    "date_creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_video" INTEGER,
    "id_text" INTEGER,
    "id_quote" INTEGER,
    "id_photo" INTEGER,
    "id_link" INTEGER,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id_comment")
);

-- CreateTable
CREATE TABLE "video" (
    "id_video" SERIAL NOT NULL,
    "name_publication" TEXT NOT NULL DEFAULT '',
    "link_video" TEXT NOT NULL DEFAULT '',
    "set_tag" TEXT[],
    "author_publication" TEXT NOT NULL DEFAULT '',
    "type_publication" TEXT NOT NULL DEFAULT 'video',
    "count_like" INTEGER NOT NULL DEFAULT 0,
    "date_creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_publication" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "state" TEXT NOT NULL DEFAULT '',
    "originol_author" TEXT NOT NULL DEFAULT '',
    "repost" TEXT NOT NULL DEFAULT '',
    "originol_id" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "video_pkey" PRIMARY KEY ("id_video")
);

-- CreateTable
CREATE TABLE "texts" (
    "id_text" SERIAL NOT NULL,
    "name_publication" TEXT NOT NULL DEFAULT '',
    "announcement_publication" TEXT NOT NULL DEFAULT '',
    "text_publication" TEXT NOT NULL DEFAULT '',
    "set_tag" TEXT[],
    "author_publication" TEXT NOT NULL DEFAULT '',
    "type_publication" TEXT NOT NULL DEFAULT 'text',
    "count_like" INTEGER NOT NULL DEFAULT 0,
    "date_creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_publication" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "state" TEXT NOT NULL DEFAULT '',
    "originol_author" TEXT NOT NULL DEFAULT '',
    "repost" TEXT NOT NULL DEFAULT '',
    "originol_id" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "texts_pkey" PRIMARY KEY ("id_text")
);

-- CreateTable
CREATE TABLE "quotes" (
    "id_quote" SERIAL NOT NULL,
    "text_quote" TEXT NOT NULL DEFAULT '',
    "set_tag" TEXT[],
    "author_quote" TEXT NOT NULL DEFAULT '',
    "type_publication" TEXT NOT NULL DEFAULT 'quote',
    "count_like" INTEGER NOT NULL DEFAULT 0,
    "date_creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_publication" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "state" TEXT NOT NULL DEFAULT '',
    "originol_author" TEXT NOT NULL DEFAULT '',
    "repost" TEXT NOT NULL DEFAULT '',
    "originol_id" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "quotes_pkey" PRIMARY KEY ("id_quote")
);

-- CreateTable
CREATE TABLE "photos" (
    "id_photo" SERIAL NOT NULL,
    "photo" TEXT NOT NULL DEFAULT '',
    "set_tag" TEXT[],
    "author_photo" TEXT NOT NULL DEFAULT '',
    "type_publication" TEXT NOT NULL DEFAULT 'photo',
    "count_like" INTEGER NOT NULL DEFAULT 0,
    "date_creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_publication" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "state" TEXT NOT NULL DEFAULT '',
    "originol_author" TEXT NOT NULL DEFAULT '',
    "repost" TEXT NOT NULL DEFAULT '',
    "originol_id" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "photos_pkey" PRIMARY KEY ("id_photo")
);

-- CreateTable
CREATE TABLE "links" (
    "id_link" SERIAL NOT NULL,
    "link" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "set_tag" TEXT[],
    "author_link" TEXT NOT NULL DEFAULT '',
    "type_publication" TEXT NOT NULL DEFAULT 'link',
    "count_like" INTEGER NOT NULL DEFAULT 0,
    "date_creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_publication" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "state" TEXT NOT NULL DEFAULT '',
    "originol_author" TEXT NOT NULL DEFAULT '',
    "repost" TEXT NOT NULL DEFAULT '',
    "originol_id" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "links_pkey" PRIMARY KEY ("id_link")
);

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_id_video_fkey" FOREIGN KEY ("id_video") REFERENCES "video"("id_video") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_id_text_fkey" FOREIGN KEY ("id_text") REFERENCES "texts"("id_text") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_id_quote_fkey" FOREIGN KEY ("id_quote") REFERENCES "quotes"("id_quote") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_id_photo_fkey" FOREIGN KEY ("id_photo") REFERENCES "photos"("id_photo") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_id_link_fkey" FOREIGN KEY ("id_link") REFERENCES "links"("id_link") ON DELETE CASCADE ON UPDATE CASCADE;
