/*
  Warnings:

  - Made the column `waterproof` on table `Products` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Products" ALTER COLUMN "waterproof" SET NOT NULL;
