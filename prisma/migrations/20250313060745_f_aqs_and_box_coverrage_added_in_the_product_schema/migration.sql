-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "FAQS" JSONB[] DEFAULT ARRAY[]::JSONB[],
ADD COLUMN     "boxCoverage" TEXT;
