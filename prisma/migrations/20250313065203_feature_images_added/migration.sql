-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "featureImages" JSONB[] DEFAULT ARRAY[]::JSONB[];
