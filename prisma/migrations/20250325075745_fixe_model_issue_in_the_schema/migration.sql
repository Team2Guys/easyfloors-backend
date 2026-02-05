/*
  Warnings:

  - The `id` column on the `salesProducts` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropIndex
DROP INDEX "salesProducts_id_key";

-- AlterTable
ALTER TABLE "salesProducts" DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "salesProducts_pkey" PRIMARY KEY ("id");
