/*
  Warnings:

  - The `shipmentFee` column on the `salesProducts` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "salesProducts" DROP COLUMN "shipmentFee",
ADD COLUMN     "shipmentFee" INTEGER;
