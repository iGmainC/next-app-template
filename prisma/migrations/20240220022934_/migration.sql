-- CreateTable
CREATE TABLE "phoneVerification" (
    "phoneNumber" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "verified" BOOLEAN NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "phoneVerification_phoneNumber_code_key" ON "phoneVerification"("phoneNumber", "code");
