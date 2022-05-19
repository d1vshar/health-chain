/*
  Warnings:

  - The primary key for the `record_permissions` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "record_permissions" DROP CONSTRAINT "record_permissions_pkey",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "record_permissions_pkey" PRIMARY KEY ("id");
