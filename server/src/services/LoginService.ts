import { User, PrismaClient } from "@prisma/client";

enum Role {
  PATIENT,
  DOCTOR,
}
export default class LoginService {
  public static prisma: PrismaClient = new PrismaClient();

  public static async getUserByPublicAddress(
    publicAddress: string
  ): Promise<any> {
    const queryResult = await this.prisma.user.findUnique({
      where: {
        publicAddress,
      },
    });

    if (!queryResult) return { data: null };
    return {
      data: {
        ...queryResult,
      },
    };
  }

  public static async setUserByPublicAddress(
    nonce: number,
    publicAddress: string,
    username: string,
    role: any
  ): Promise<any> {
    const queryResult = await this.prisma.user.create({
      data: {
        nonce,
        publicAddress,
        username,
        role,
      },
    });
    if (!queryResult) return { data: null };
    return {
      data: {
        ...queryResult,
      },
    };
  }
}
