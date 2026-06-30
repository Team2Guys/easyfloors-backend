-- CreateTable
CREATE TABLE "B2BQuote" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "role" TEXT,
    "quantity" TEXT NOT NULL,
    "productRequired" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "projectStatus" TEXT,
    "budgetRange" TEXT,
    "additionalInfo" TEXT,
    "tradeLicense" JSONB,
    "trnNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "status" "BlogStatus" DEFAULT 'PUBLISHED',

    CONSTRAINT "B2BQuote_pkey" PRIMARY KEY ("id")
);
