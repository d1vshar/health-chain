-- CreateTable
CREATE TABLE "record_permissions" (
    "recordId" UUID NOT NULL,
    "doctorId" UUID NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "write" BOOLEAN NOT NULL DEFAULT false,
    "manage" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "record_permissions_pkey" PRIMARY KEY ("recordId")
);

-- AddForeignKey
ALTER TABLE "record_permissions" ADD CONSTRAINT "record_permissions_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "record_permissions" ADD CONSTRAINT "record_permissions_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "vital_records"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
