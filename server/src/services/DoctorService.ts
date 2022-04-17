import { Doctor, PrismaClient } from '@prisma/client';

export interface GetAllDoctorsOptions {
  limit: number
  page: number
}

export interface GetAllDoctorsResult {
  count: number
  data: Doctor[]
}

export interface GetDoctorByIdResult {
  data: Doctor | null
}

export default class DoctorService {
  public static readonly prisma: PrismaClient = new PrismaClient();

  public static async getAllDoctors(args?: GetAllDoctorsOptions): Promise<GetAllDoctorsResult> {
    let queryResult: Doctor[];

    const count = await this.prisma.doctor.count();
    if (args) {
      queryResult = await this.prisma.doctor.findMany({
        skip: args.limit * (args.page - 1),
        take: args.limit,
      });
    } else {
      queryResult = await this.prisma.doctor.findMany();
    }

    return {
      count,
      data: queryResult,
    };
  }

  public static async getDoctorById(id: string): Promise<GetDoctorByIdResult> {
    const queryResult = await this.prisma.doctor.findUnique({
      where: {
        id,
      },
    });

    return {
      data: queryResult,
    };
  }
}
