/*
  Warnings:

  - Added the required column `totalPrice` to the `salesProducts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "salesProducts" ADD COLUMN     "totalPrice" INTEGER NOT NULL;
