import { Doctor, PrismaClient } from '@prisma/client';
import { DoctorInterface } from '../types';
import { validateObject } from '../utils/hash';
import ChainService from './ChainService';

export interface GetAllDoctorsOptions {
  limit: number
  page: number
}

export interface GetAllDoctorsResult {
  count: number
  data: DoctorInterface[]
}

export interface GetDoctorByIdResult {
  data: DoctorInterface | null
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

    const doctorsData = await Promise.all(queryResult.map<Promise<DoctorInterface>>(
      async (doctor) => {
        const storedHash = await ChainService.getDoctorHash(doctor.id);
        const validationResult = validateObject(doctor, storedHash);
        return {
          ...doctor,
          validation: {
            hash: storedHash,
            result: validationResult,
          },
        };
      },
    ));

    return {
      count,
      data: doctorsData,
    };
  }

  public static async getDoctorById(id: string): Promise<GetDoctorByIdResult> {
    const queryResult = await this.prisma.doctor.findUnique({
      where: {
        id,
      },
    });

    if (queryResult) {
      const storedHash = await ChainService.getDoctorHash(queryResult.id);
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
