-- CreateEnum
CREATE TYPE "AppointsType" AS ENUM ('installations', 'appointments');

-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "AppointsType" "AppointsType" NOT NULL DEFAULT 'installations';

-- CreateTable
CREATE TABLE "salesProducts" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "address" TEXT,
    "orderId" TEXT NOT NULL,
    "checkout" BOOLEAN NOT NULL DEFAULT false,
    "paymentStatus" BOOLEAN NOT NULL DEFAULT false,
    "isRefund" BOOLEAN NOT NULL DEFAULT false,
    "currency" TEXT,
    "transactionId" TEXT,
    "integrationId" TEXT,
    "amountCents" TEXT,
    "success" BOOLEAN NOT NULL DEFAULT false,
    "pending" BOOLEAN NOT NULL DEFAULT false,
    "is3DSecure" BOOLEAN,
    "checkoutDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "transactionDate" TIMESTAMP(3),
    "shipmentFee" TEXT,
    "deliveryStatus" BOOLEAN NOT NULL DEFAULT false,
    "cardLastDigits" TEXT,
    "products" JSONB[] DEFAULT ARRAY[]::JSONB[]
);

-- CreateIndex
CREATE UNIQUE INDEX "salesProducts_id_key" ON "salesProducts"("id");

-- CreateIndex
CREATE UNIQUE INDEX "salesProducts_orderId_key" ON "salesProducts"("orderId");
