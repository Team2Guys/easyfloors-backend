-- DropIndex
DROP INDEX "Acessories_name_key";

-- DropIndex
DROP INDEX "Products_name_key";

-- DropIndex
DROP INDEX "subCategories_name_key";

-- AddForeignKey
ALTER TABLE "Acessories" ADD CONSTRAINT "Acessories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
