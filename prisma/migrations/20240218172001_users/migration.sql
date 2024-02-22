-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "phone" VARCHAR(256),
    "email" VARCHAR(256),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
