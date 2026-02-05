-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "colors" JSONB[] DEFAULT ARRAY[]::JSONB[];
