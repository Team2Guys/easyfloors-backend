-- AlterTable
ALTER TABLE "subCategories" ADD COLUMN     "whatAmiImage" JSONB,
ADD COLUMN     "whatAmiTopHeading" TEXT,
ADD COLUMN     "whatamIdetails" JSONB[],
ALTER COLUMN "posterImageUrl" DROP NOT NULL;
