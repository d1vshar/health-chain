import { Patient, PrismaClient } from '@prisma/client';

export interface GetAllPatientsOptions {
  limit: number
  page: number
}

export default class PatientService {
  public static readonly prisma: PrismaClient = new PrismaClient();

  public static async getAllPatients(args?: GetAllPatientsOptions): Promise<Patient[]> {
    if (args) {
      return this.prisma.patient.findMany({
        skip: args.limit * args.page,
        take: args.limit,
      });
    }
    return this.prisma.patient.findMany();
  }

  public static async getPatientById(id: string): Promise<Patient | null> {
    return this.prisma.patient.findUnique({
      where: {
        id,
      },
    });
  }
}
