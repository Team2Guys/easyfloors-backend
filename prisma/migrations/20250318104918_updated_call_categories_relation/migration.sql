/*
  Warnings:

  - You are about to drop the `RecallSubCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RecallSubCategory" DROP CONSTRAINT "RecallSubCategory_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "RecallSubCategory" DROP CONSTRAINT "RecallSubCategory_subCategoryId_fkey";

-- DropTable
DROP TABLE "RecallSubCategory";

-- CreateTable
CREATE TABLE "_RecallCategories" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_RecallCategories_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_RecallCategories_B_index" ON "_RecallCategories"("B");

-- AddForeignKey
ALTER TABLE "_RecallCategories" ADD CONSTRAINT "_RecallCategories_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecallCategories" ADD CONSTRAINT "_RecallCategories_B_fkey" FOREIGN KEY ("B") REFERENCES "subCategories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
