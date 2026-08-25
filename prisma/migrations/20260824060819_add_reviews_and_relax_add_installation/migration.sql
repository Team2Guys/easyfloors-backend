-- AlterTable
ALTER TABLE "salesProducts" ALTER COLUMN "addInstallation" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Reviews" (
    "id" SERIAL NOT NULL,
    "posterImageUrl" JSONB,
    "name" TEXT NOT NULL,
    "starRating" INTEGER,
    "ReviewsDescription" TEXT NOT NULL,
    "reviewDate" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "status" "BlogStatus" DEFAULT 'PUBLISHED',

    CONSTRAINT "Reviews_pkey" PRIMARY KEY ("id")
);
