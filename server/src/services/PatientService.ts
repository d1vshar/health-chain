import { Patient, PrismaClient } from '@prisma/client';

export interface GetAllPatientsOptions {
  limit: number
  page: number
}

export interface GetAllPatientsResult {
  count: number
  data: Patient[]
}

export interface GetPatientByIdResult {
  data: Patient | null
}

export default class PatientService {
  public static readonly prisma: PrismaClient = new PrismaClient();

  public static async getAllPatients(args?: GetAllPatientsOptions): Promise<GetAllPatientsResult> {
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

    return {
      count,
      data: queryResult,
    };
  }

  public static async getPatientById(id: string): Promise<GetPatientByIdResult> {
    const queryResult = await this.prisma.patient.findUnique({
      where: {
        id,
      },
    });

    return {
      data: queryResult,
    };
  }
}
