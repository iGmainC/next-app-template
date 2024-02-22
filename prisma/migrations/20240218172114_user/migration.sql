/*
  Warnings:

  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "phone" VARCHAR(256),
    "email" VARCHAR(256),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
