/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Auth" (
    "nonce" INTEGER NOT NULL,
    "publicAddress" TEXT NOT NULL,
    "user_id" UUID NOT NULL,
    "role" "Role" NOT NULL DEFAULT E'PATIENT',

    CONSTRAINT "Auth_pkey" PRIMARY KEY ("publicAddress")
);
