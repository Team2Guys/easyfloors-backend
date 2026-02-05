/*
  Warnings:

  - You are about to drop the column `colors` on the `subCategories` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "subCategories" DROP COLUMN "colors",
ADD COLUMN     "whatamIdetails" JSONB[] DEFAULT ARRAY[]::JSONB[];
