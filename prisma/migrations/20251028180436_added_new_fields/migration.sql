-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('placed', 'shipped', 'delivered', 'cancel');

-- AlterTable
ALTER TABLE "Acessories" ADD COLUMN     "sku" TEXT;

-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "sku" TEXT;

-- AlterTable
ALTER TABLE "salesProducts" ADD COLUMN     "orderStatus" "OrderStatus" NOT NULL DEFAULT 'placed';

-- AlterTable
ALTER TABLE "subCategories" ADD COLUMN     "sku" TEXT;
