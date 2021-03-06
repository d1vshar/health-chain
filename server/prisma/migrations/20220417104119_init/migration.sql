-- CreateTable
CREATE TABLE "patients" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "dob" TIMESTAMP(6) NOT NULL,
    "dod" TIMESTAMP(6),
    "gender" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "address" TEXT,
    "blood_group" VARCHAR(2),

    CONSTRAINT "patients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "doctors" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "dob" TIMESTAMP(6) NOT NULL,
    "dod" TIMESTAMP(6),
    "gender" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "address" TEXT,

    CONSTRAINT "doctors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "doctor_qualifications" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "doctor_id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "organization" TEXT NOT NULL,

    CONSTRAINT "doctor_qualifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "doctor_registrations" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "doctor_id" UUID NOT NULL,
    "reg_no" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "organization" TEXT NOT NULL,

    CONSTRAINT "doctor_registrations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vital_records" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "patient_id" UUID NOT NULL,
    "temperature" DECIMAL(10,4),
    "heart_rate" DECIMAL(10,4),
    "resp_rate" DECIMAL(10,4),
    "o2sat" DECIMAL(10,4),
    "sbp" INTEGER,
    "dpb" INTEGER,
    "rhythm" TEXT,
    "pain" TEXT,
    "added_by" UUID,

    CONSTRAINT "vital_records_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "doctor_registrations_reg_no_key" ON "doctor_registrations"("reg_no");

-- AddForeignKey
ALTER TABLE "doctor_qualifications" ADD CONSTRAINT "doctor_qualifications_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "doctor_registrations" ADD CONSTRAINT "doctor_registrations_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "vital_records" ADD CONSTRAINT "vital_records_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "vital_records" ADD CONSTRAINT "vital_records_added_by_fkey" FOREIGN KEY ("added_by") REFERENCES "doctors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
