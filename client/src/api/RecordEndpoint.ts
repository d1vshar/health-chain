import axios from 'axios';
import { ApiResponse, VitalRecord } from '.';
import { AuthState } from '../store/authState';
import RouteBuilder, { ApiResource } from './RouteBuilder';

// eslint-disable-next-line import/prefer-default-export
export const getAllRecordsForPatient = async (
  auth: AuthState,
  patientId: string,
  page?: number,
  limit?: number,
): Promise<ApiResponse<{ records: VitalRecord[] }> | null> => {
  try {
    const routeBuilder = new RouteBuilder().append(ApiResource.RECORD).select(patientId);
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
