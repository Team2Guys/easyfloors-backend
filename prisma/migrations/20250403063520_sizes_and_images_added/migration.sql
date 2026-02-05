/*
  Warnings:

  - The `whatAmiImage` column on the `subCategories` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Acessories" ADD COLUMN     "sizes" JSONB[] DEFAULT ARRAY[]::JSONB[];

-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "sizes" JSONB[] DEFAULT ARRAY[]::JSONB[];

-- AlterTable
ALTER TABLE "subCategories" DROP COLUMN "whatAmiImage",
ADD COLUMN     "whatAmiImage" JSONB[] DEFAULT ARRAY[]::JSONB[];
