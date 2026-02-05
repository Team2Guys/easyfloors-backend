/*
  Warnings:

  - You are about to drop the column `whatamIdetails` on the `subCategories` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "subCategories" DROP COLUMN "whatamIdetails",
ADD COLUMN     "colors" JSONB[] DEFAULT ARRAY[]::JSONB[];
