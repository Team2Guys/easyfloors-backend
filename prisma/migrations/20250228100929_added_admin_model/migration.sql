-- CreateTable
CREATE TABLE "Admins" (
    "id" SERIAL NOT NULL,
    "fullname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "canAddProduct" BOOLEAN NOT NULL DEFAULT false,
    "canEditProduct" BOOLEAN NOT NULL DEFAULT false,
    "canDeleteProduct" BOOLEAN NOT NULL DEFAULT false,
    "canAddCategory" BOOLEAN NOT NULL DEFAULT false,
    "canDeleteCategory" BOOLEAN NOT NULL DEFAULT false,
    "canEditCategory" BOOLEAN NOT NULL DEFAULT false,
    "canCheckProfit" BOOLEAN NOT NULL DEFAULT false,
    "canCheckRevenue" BOOLEAN NOT NULL DEFAULT false,
    "canCheckVisitors" BOOLEAN NOT NULL DEFAULT false,
    "canViewUsers" BOOLEAN NOT NULL DEFAULT false,
    "canViewSales" BOOLEAN NOT NULL DEFAULT false,
    "canVeiwAdmins" BOOLEAN NOT NULL DEFAULT false,
    "canVeiwTotalproducts" BOOLEAN NOT NULL DEFAULT false,
    "canVeiwTotalCategories" BOOLEAN NOT NULL DEFAULT false,
    "posterImageUrl" JSONB,
    "role" TEXT NOT NULL DEFAULT 'Admin',

    CONSTRAINT "Admins_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admins_email_key" ON "Admins"("email");
