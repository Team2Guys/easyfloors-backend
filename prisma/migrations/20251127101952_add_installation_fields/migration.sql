-- AlterTable
ALTER TABLE "salesProducts" ADD COLUMN     "addInstallation" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "installationCost" INTEGER DEFAULT 0,
ADD COLUMN     "isClearance" BOOLEAN DEFAULT false;
