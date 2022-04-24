import { Patient, PrismaClient } from '@prisma/client';
import { PatientInterface } from '../types';
import { validateObject } from '../utils/hash';
import ChainService from './ChainService';

export interface GetAllPatientsOptions {
  limit: number;
  page: number;
}

export interface GetAllPatientsResult {
  count: number;
  data: PatientInterface[];
}

export interface GetPatientByIdResult {
  data: PatientInterface | null;
}

export default class PatientService {
  public static prisma: PrismaClient = new PrismaClient();

  public static async getAllPatients(
    args?: GetAllPatientsOptions,
  ): Promise<GetAllPatientsResult> {
    let queryResult: Patient[];

    const count = await this.prisma.patient.count();
    if (args) {
      queryResult = await this.prisma.patient.findMany({
        skip: args.limit * (args.page - 1),
        take: args.limit,
      });
    } else {
      queryResult = await this.prisma.patient.findMany();
    }

    const patientsData = await Promise.all(
      queryResult.map<Promise<PatientInterface>>(async (patient) => {
        const storedHash = await ChainService.getPatientHash(patient.id);
        const validationResult = validateObject(patient, storedHash);
        return {
          ...patient,
          validation: {
            hash: storedHash,
            result: validationResult,
          },
        };
      }),
    );

    return {
      count,
      data: patientsData,
    };
  }

  public static async getPatientById(
    id: string,
  ): Promise<GetPatientByIdResult> {
    const queryResult = await this.prisma.patient.findUnique({
      where: {
        id,
      },
    });

    if (queryResult) {
      const storedHash = await ChainService.getPatientHash(queryResult.id);
      const validationResult = validateObject(queryResult, storedHash);

      return {
        data: {
          ...queryResult,
          validation: {
            hash: storedHash,
            result: validationResult,
          },
        },
      };
    }

    return {
      data: null,
    };
  }
}
