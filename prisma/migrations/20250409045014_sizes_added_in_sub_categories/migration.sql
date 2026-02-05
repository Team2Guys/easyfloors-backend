-- AlterTable
ALTER TABLE "subCategories" ADD COLUMN     "sizes" JSONB[] DEFAULT ARRAY[]::JSONB[];
