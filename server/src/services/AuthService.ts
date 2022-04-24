import { Auth, PrismaClient } from '@prisma/client';

export interface GetAuthByPublicAddressResult {
  data: Auth | null;
}

export interface SetAuthByPublicAddressResult {
  data: Auth | null;
}

export default class AuthService {
  public static prisma: PrismaClient = new PrismaClient();

  public static async getAuthByPublicAddress(
    publicAddress: string,
  ): Promise<GetAuthByPublicAddressResult> {
    const queryResult = await this.prisma.auth.findUnique({
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

  public static async setAuthByPublicAddress(
    nonce: number,
    publicAddress: string,
    userId: string,
    role: any,
  ): Promise<SetAuthByPublicAddressResult> {
    const queryResult = await this.prisma.auth.create({
      data: {
        nonce,
        publicAddress,
        userId,
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
