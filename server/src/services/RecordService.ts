import { PrismaClient, VitalRecord } from '@prisma/client';
import { VitalRecordInterface } from '../types';
import { validateObject } from '../utils/hash';
import ChainService from './ChainService';

export interface GetAllRecordsByPatientIdOptions {
  limit: number;
  page: number;
}

export interface GetAllRecordsByPatientIdResult {
  count: number;
  data: VitalRecordInterface[];
}

export interface GetPatientByIdResult {
  data: VitalRecordInterface | null;
}

export default class RecordService {
  public static prisma: PrismaClient = new PrismaClient();

  public static async getAllRecordsByPatientId(
    patientId: string,
    args?: GetAllRecordsByPatientIdOptions,
  ): Promise<GetAllRecordsByPatientIdResult> {
    let queryResult: VitalRecord[];

    const count = await this.prisma.vitalRecord.count();
    if (args) {
      queryResult = await this.prisma.vitalRecord.findMany({
        skip: args.limit * (args.page - 1),
        take: args.limit,
        where: {
          patientId,
        },
      });
    } else {
      queryResult = await this.prisma.vitalRecord.findMany({
        where: {
          patientId,
        },
      });
    }

    const recordsData = await Promise.all(
      queryResult.map<Promise<VitalRecordInterface>>(async (record) => {
        const storedHash = await ChainService.getRecordHash(record.id);
        const validationResult = validateObject(record, storedHash);
        return {
          ...record,
          validation: {
            hash: storedHash,
            result: validationResult,
          },
        };
      }),
    );

    return {
      count,
      data: recordsData,
    };
  }
}
