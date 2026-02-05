-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "categoryId" INTEGER,
ADD COLUMN     "short_description" TEXT,
ADD COLUMN     "subCategoryId" INTEGER;

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "posterImageUrl" JSONB NOT NULL,
    "last_editedBy" TEXT,
    "short_description" TEXT,
    "Canonical_Tag" TEXT,
    "Meta_Description" TEXT,
    "Meta_Title" TEXT,
    "custom_url" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subCategories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "posterImageUrl" JSONB NOT NULL,
    "last_editedBy" TEXT,
    "short_description" TEXT,
    "Canonical_Tag" TEXT,
    "Meta_Description" TEXT,
    "Meta_Title" TEXT,

    CONSTRAINT "subCategories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "subCategories_name_key" ON "subCategories"("name");

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES "subCategories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
