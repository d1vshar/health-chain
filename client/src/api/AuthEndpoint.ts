import axios from 'axios';
import { ApiResponse, Auth, Nonce } from '.';
import RouteBuilder, { ApiResource } from './RouteBuilder';

export const getNonceForAddress = async (
  address: string,
): Promise<ApiResponse<{ auth: Nonce }> | null> => {
  try {
    const routeBuilder = new RouteBuilder().append(ApiResource.AUTH).select(address);

    const queryResponse = await axios.get(routeBuilder.build());

    return queryResponse.data;
  } catch (e) {
    return null;
  }
};

export const verifyAndLogin = async (
  address: string,
  signature: string,
): Promise<ApiResponse<{ auth: Auth }> | null> => {
  try {
    const routeBuilder = new RouteBuilder().append(ApiResource.AUTH).select(address);

    const queryResponse = await axios.post(routeBuilder.build(), {
      signature,
    });

    return queryResponse.data;
  } catch (e) {
    return null;
  }
};
