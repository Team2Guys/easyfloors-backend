-- CreateTable
CREATE TABLE "RequestCallback" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "whatsapp" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "status" "BlogStatus" DEFAULT 'PUBLISHED',

    CONSTRAINT "RequestCallback_pkey" PRIMARY KEY ("id")
);
