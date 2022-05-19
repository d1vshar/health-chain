import axios from 'axios';
import { ApiResponse, Patient } from '.';
import { AuthState } from '../store/authState';
import RouteBuilder, { ApiResource } from './RouteBuilder';

export const getAllPatients = async (
  auth: AuthState,
  page?: number,
  limit?: number,
): Promise<ApiResponse<{ patients: Patient[] }> | null> => {
  try {
    const routeBuilder = new RouteBuilder().append(ApiResource.PATIENT);
    if (page !== undefined && limit !== undefined) {
      routeBuilder.queryParam('page', page.toString()).queryParam('limit', limit.toString());
    }
    const queryResponse = await axios.get(
      routeBuilder.build(),
      {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      },
    );

    return queryResponse.data;
  } catch (e) {
    return null;
  }
};

export const getPatientById = async (
  auth: AuthState,
  id: string,
): Promise<ApiResponse<{ patient: Patient }> | null> => {
  try {
    const routeBuilder = new RouteBuilder().append(ApiResource.PATIENT).select(id);
    const queryResponse = await axios.get(
      routeBuilder.build(),
      {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      },
    );

    return queryResponse.data;
  } catch (e) {
    return null;
  }
};
