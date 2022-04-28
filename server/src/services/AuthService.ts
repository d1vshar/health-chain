import { Auth, PrismaClient } from '@prisma/client';
// import { toHex } from '../utils/hash';

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
        nonce: queryResult.nonce.toString(),
      },
    };
  }

  public static async setAuthByPublicAddress(
    nonce: string,
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
