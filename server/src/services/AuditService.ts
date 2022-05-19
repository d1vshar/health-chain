import { PrismaClient } from '@prisma/client';

export interface AuditServiceInterface {
  eventAddress: string;
  eventType: string;
  status: string;
  accountAddress: string;
  ip: string;
}

export default class AuditService {
  public static prisma: PrismaClient = new PrismaClient();

  public static async createAuditEvent(
    auditData:AuditServiceInterface,
  ) {
    const auditEvent = await this.prisma.auditEvent.create({
      data: {
        eventAddress: auditData.eventAddress,
        eventType: auditData.eventType,
        status: auditData.status,
        accountAddress: auditData.accountAddress,
        ip: auditData.ip,
      },
    });
    return auditEvent;
  }

  public static async getAuditEvents() {
    const auditEvents = await this.prisma.auditEvent.findMany();
    return auditEvents;
  }
}
