/*
  Warnings:

  - Added the required column `custom_url` to the `subCategories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "Recall_Cat" TEXT;

-- AlterTable
ALTER TABLE "subCategories" ADD COLUMN     "Recall_subCat" TEXT,
ADD COLUMN     "categoryId" INTEGER,
ADD COLUMN     "custom_url" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "subCategories" ADD CONSTRAINT "subCategories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
