/*
  Warnings:

  - You are about to drop the column `Recall_subCat` on the `subCategories` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "subCategories" DROP COLUMN "Recall_subCat";

-- CreateTable
CREATE TABLE "RecallSubCategory" (
    "categoryId" INTEGER NOT NULL,
    "subCategoryId" INTEGER NOT NULL,

    CONSTRAINT "RecallSubCategory_pkey" PRIMARY KEY ("categoryId","subCategoryId")
);

-- AddForeignKey
ALTER TABLE "RecallSubCategory" ADD CONSTRAINT "RecallSubCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecallSubCategory" ADD CONSTRAINT "RecallSubCategory_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES "subCategories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
