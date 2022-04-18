import chance from 'chance';
import {
  Doctor, Patient, Prisma, PrismaClient,
} from '@prisma/client';
import cliProgress, { Options } from 'cli-progress';

const generateDoctorQualifications = ():
Prisma.DoctorQualificationUncheckedCreateWithoutDoctorInput[] => {
  const amount = 1 + Math.floor(Math.random() * 3);
  const data: Prisma.DoctorQualificationUncheckedCreateWithoutDoctorInput[] = [];

  for (let i = 0; i < amount; i += 1) {
    data.push({
      title: chance().profession(),
      year: parseInt(chance().year({ min: 1930, max: 2010 }), 10),
      organization: chance().company(),
    });
  }

  return data;
};

const generateDoctorRegistrations = ():
Prisma.DoctorRegistrationUncheckedCreateWithoutDoctorInput[] => {
  const amount = 1 + Math.floor(Math.random() * 3);
  const data: Prisma.DoctorRegistrationUncheckedCreateWithoutDoctorInput[] = [];

  for (let i = 0; i < amount; i += 1) {
    data.push({
      reg_no: chance().guid(),
      year: parseInt(chance().year({ min: 1930, max: 2010 }), 10),
      organization: chance().company(),
    });
  }

  return data;
};

const generateDoctors = (amount: number): Prisma.DoctorUncheckedCreateInput[] => {
  const data: Prisma.DoctorUncheckedCreateInput[] = [];

  for (let i = 0; i < amount; i += 1) {
    data.push({
      name: chance().name(),
      dob: chance().date({
        min: new Date('01 January 1940 00:00 UTC'),
        max: new Date('31 December 1995 00:00 UTC'),
      }),
      gender: chance().gender(),
      phone: chance().phone(),
      email: chance().email(),
      address: chance().email(),
      doctorQualifications: {
        createMany: {
          data: generateDoctorQualifications(),
        },
      },
      doctorRegistrations: {
        createMany: {
          data: generateDoctorRegistrations(),
        },
      },
    });
  }

  return data;
};

const generatePatientRecords = (doctors: Doctor[]):
Prisma.VitalRecordCreateManyPatientInput[] => {
  const amount = 10 + Math.floor(Math.random() * 100);
  const data: Prisma.VitalRecordCreateManyPatientInput[] = [];

  for (let i = 0; i < amount; i += 1) {
    data.push({
      temperature: chance().floating({ min: 97, max: 104, fixed: 1 }),
      heart_rate: chance().floating({ min: 40, max: 140, fixed: 1 }),
      resp_rate: chance().natural({ min: 10, max: 40 }),
      o2sat: chance().floating({ min: 85, max: 99, fixed: 1 }),
      sbp: chance().natural({ min: 100, max: 200 }),
      dpb: chance().natural({ min: 60, max: 140 }),
      added_by: chance().pickone(doctors).id,
    });
  }

  return data;
};

const generatePaitents = (
  amount: number,
  doctors: Doctor[],
):Prisma.PatientUncheckedCreateInput[] => {
  const data: Prisma.PatientUncheckedCreateInput[] = [];

  for (let i = 0; i < amount; i += 1) {
    data.push({
      name: chance().name(),
      dob: chance().date({
        min: new Date('01 January 1940 00:00 UTC'),
        max: new Date('31 December 1995 00:00 UTC'),
      }),
      dod: chance().weighted([null, chance().date({
        min: new Date('01 January 2000 00:00 UTC'),
        max: new Date('31 December 2021 00:00 UTC'),
      })], [25, 1]),
      gender: chance().gender(),
      phone: chance().phone(),
      email: chance().email(),
      address: chance().address(),
      bloodGroup: chance().pickone(['B+', 'A+', 'O+', 'B-', 'A-', 'O-']),
      vitalRecords: {
        createMany: {
          data: generatePatientRecords(doctors),
        },
      },
    });
  }

  return data;
};

const populate = async () => {
  const opt: Options = {
    format: '{bar} {percentage}% | {value}/{total}',
  };
  const resetBar = new cliProgress.SingleBar(opt, cliProgress.Presets.rect);
  const doctorBar = new cliProgress.SingleBar(opt, cliProgress.Presets.rect);
  const patientBar = new cliProgress.SingleBar(opt, cliProgress.Presets.rect);
  const prisma = new PrismaClient();

  // clear existing data
  console.log('Deleting all existing data');
  resetBar.start(5, 0);
  await prisma.doctorQualification.deleteMany();
  resetBar.increment();
  await prisma.doctorRegistration.deleteMany();
  resetBar.increment();
  await prisma.vitalRecord.deleteMany();
  resetBar.increment();
  await prisma.doctor.deleteMany();
  resetBar.increment();
  await prisma.patient.deleteMany();
  resetBar.increment();
  resetBar.stop();

  console.log('Starting mock data generation for `doctors` model');
  doctorBar.start(100, 0);
  const doctorsList = generateDoctors(100);
  const doctorPromises: Promise<Doctor>[] = [];

  doctorsList.forEach(async (doctor) => {
    const promise = prisma.doctor.create({
      data: doctor,
    });
    doctorPromises.push(promise);
    await promise;
    doctorBar.increment();
  });
  const savedDoctors = await Promise.all(doctorPromises);
  doctorBar.stop();

  console.log('Starting mock data generation for `patients` model');
  patientBar.start(1000, 0);
  const patientsList = generatePaitents(1000, savedDoctors);
  const patientPromises: Promise<Patient>[] = [];

  patientsList.forEach(async (patient) => {
    const promise = prisma.patient.create({
      data: patient,
    });
    patientPromises.push(promise);
    await promise;
    patientBar.increment();
  });
  await Promise.all(patientPromises);
  patientBar.stop();

  console.log('Mock data generation successfull!');
};

populate();
