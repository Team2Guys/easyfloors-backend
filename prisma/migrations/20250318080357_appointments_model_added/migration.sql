-- CreateTable
CREATE TABLE "Appointment" (
    "id" SERIAL NOT NULL,
    "firstname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "whatsappNumber" TEXT,
    "area" TEXT,
    "selectRooms" TEXT,
    "preferredDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "preferredTime" TEXT,
    "findUs" TEXT,
    "comment" TEXT,
    "contactMethod" JSONB,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Appointment_email_key" ON "Appointment"("email");
