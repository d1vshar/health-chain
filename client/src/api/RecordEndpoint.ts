import axios from 'axios';
import { ApiResponse, VitalRecord } from '.';
import { AuthState } from '../store/authState';
import { RecordPermissionData } from '../types';
import RouteBuilder, { ApiResource } from './RouteBuilder';

// eslint-disable-next-line import/prefer-default-export
export const getAllRecordsForPatient = async (
  auth: AuthState,
  patientId: string,
  page?: number,
  limit?: number,
): Promise<ApiResponse<{ records: VitalRecord[] }> | null> => {
  try {
    const routeBuilder = new RouteBuilder().append(ApiResource.RECORD).queryParam('patientId', patientId);
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

export const getRecordPermissions = async (
  auth: AuthState,
  recordId: string,
): Promise<ApiResponse<{ permissions: RecordPermissionData[] }> | null> => {
  try {
    const routeBuilder = new RouteBuilder().append(ApiResource.RECORD)
      .select(recordId).append(ApiResource.RECORD_PERMISSION);

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

export const createRecordPermission = async (
  auth: AuthState,
  recordPermission: RecordPermissionData,
): Promise<ApiResponse<{ permission: RecordPermissionData[] }> | null> => {
  try {
    const routeBuilder = new RouteBuilder().append(ApiResource.RECORD)
      .select(recordPermission.recordId).append(ApiResource.RECORD_PERMISSION);

    const queryResponse = await axios.post(
      routeBuilder.build(),
      recordPermission,
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
