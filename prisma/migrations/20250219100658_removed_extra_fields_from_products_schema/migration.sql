-- CreateTable
CREATE TABLE "Products" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,
    "discountPrice" INTEGER,
    "posterImageUrl" JSONB NOT NULL,
    "hoverImageUrl" JSONB NOT NULL,
    "productImages" JSONB[],
    "colors" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Canonical_Tag" TEXT,
    "Meta_Description" TEXT,
    "Meta_Title" TEXT,
    "last_editedBy" TEXT,
    "custom_url" TEXT NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Products_name_key" ON "Products"("name");
