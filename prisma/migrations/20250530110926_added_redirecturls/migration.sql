-- CreateTable
CREATE TABLE "Redirecturls" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "redirectedUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Redirecturls_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Redirecturls_url_key" ON "Redirecturls"("url");
