-- CreateEnum
CREATE TYPE "Role" AS ENUM ('PATIENT', 'DOCTOR');

-- CreateTable
CREATE TABLE "User" (
    "nonce" INTEGER NOT NULL,
    "publicAddress" TEXT NOT NULL,
    "user_id" UUID NOT NULL,
    "role" "Role" NOT NULL DEFAULT E'PATIENT',

    CONSTRAINT "User_pkey" PRIMARY KEY ("publicAddress")
);
