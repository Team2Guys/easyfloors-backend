-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "AdditionalInformation" JSONB[] DEFAULT ARRAY[]::JSONB[],
ADD COLUMN     "CommmericallWarranty" TEXT,
ADD COLUMN     "ResidentialWarranty" TEXT,
ADD COLUMN     "plankWidth" TEXT,
ADD COLUMN     "waterproof" BOOLEAN NOT NULL DEFAULT false;
