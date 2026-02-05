-- AlterTable
ALTER TABLE "salesProducts" ADD COLUMN     "pay_methodType" TEXT,
ADD COLUMN     "paymethod_sub_type" TEXT,
ALTER COLUMN "is3DSecure" SET DATA TYPE TEXT;
