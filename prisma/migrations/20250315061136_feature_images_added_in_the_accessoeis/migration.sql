-- AlterTable
ALTER TABLE "Acessories" ADD COLUMN     "featureImages" JSONB[] DEFAULT ARRAY[]::JSONB[];
