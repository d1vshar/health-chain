import { PrismaClient, VitalRecord } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
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

export interface PatientRecordInterface {
  patientId: string;
  temperature: Decimal | null;
  respRate: Decimal | null;
  o2sat: Decimal | null;
  sbp: number | null;
  dpb: number | null;
  rhythm: string | null;
  pain: string | null;
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

  public static async createRecord(
    patientRecord: PatientRecordInterface,
  ) {
    const response = await this.prisma.vitalRecord.create({
      data: {
        patientId: patientRecord.patientId,
        temperature: patientRecord.temperature,
        respRate: patientRecord.respRate,
        o2sat: patientRecord.o2sat,
        sbp: patientRecord.sbp,
        dpb: patientRecord.dpb,
        rhythm: patientRecord.rhythm,
        pain: patientRecord.pain,

      },
    });
    return response;
  }
}
