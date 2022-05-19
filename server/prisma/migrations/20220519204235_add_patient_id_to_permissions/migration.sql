/*
  Warnings:

  - Added the required column `patientId` to the `record_permissions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "record_permissions" ADD COLUMN     "patientId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "record_permissions" ADD CONSTRAINT "record_permissions_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
