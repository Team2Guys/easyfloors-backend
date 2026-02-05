/*
  Warnings:

  - You are about to drop the column `colors` on the `Products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Products" DROP COLUMN "colors",
ADD COLUMN     "colorCode" INTEGER;

-- CreateTable
CREATE TABLE "Acessories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,
    "discountPrice" INTEGER,
    "posterImageUrl" JSONB NOT NULL,
    "hoverImageUrl" JSONB,
    "productImages" JSONB[],
    "colors" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "Canonical_Tag" TEXT,
    "Meta_Description" TEXT,
    "Meta_Title" TEXT,
    "last_editedBy" TEXT,
    "custom_url" TEXT NOT NULL,
    "AdditionalInformation" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "FAQS" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "boxCoverage" TEXT,
    "categoryId" INTEGER,
    "short_description" TEXT,

    CONSTRAINT "Acessories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProductAccessories" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ProductAccessories_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Acessories_name_key" ON "Acessories"("name");

-- CreateIndex
CREATE INDEX "_ProductAccessories_B_index" ON "_ProductAccessories"("B");

-- AddForeignKey
ALTER TABLE "_ProductAccessories" ADD CONSTRAINT "_ProductAccessories_A_fkey" FOREIGN KEY ("A") REFERENCES "Acessories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductAccessories" ADD CONSTRAINT "_ProductAccessories_B_fkey" FOREIGN KEY ("B") REFERENCES "Products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
