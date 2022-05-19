import axios from 'axios';
import { ApiResponse, Patient } from '.';
import RouteBuilder, { ApiResource } from './RouteBuilder';

export const getAllPatients = async (
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
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAwMjhmNDlmLTc3NzUtNGNmNS1hMDliLWJjYzk3MDUzYmYyZCIsImFkZHJlc3MiOiIweGYzOUZkNmU1MWFhZDg4RjZGNGNlNmFCODgyNzI3OWNmZkZiOTIyNjYiLCJyb2xlIjoiUEFUSUVOVCIsImlhdCI6MTY1MTIyMzI4MCwiZXhwIjoxNjUxMjY2NDgwLCJhdWQiOiJoZWFsdGgtY2hhaW4iLCJpc3MiOiJoZWFsdGgtY2hhaW4ifQ.638yKGv3K0p5GJXNVQjFtWbTDPTdtjSWRV9ltSmil_M',
        },
      },
    );

    return queryResponse.data;
  } catch (e) {
    return null;
  }
};

export const getPatientById = async (
  id: string,
): Promise<ApiResponse<{ patient: Patient }> | null> => {
  try {
    const routeBuilder = new RouteBuilder().append(ApiResource.PATIENT).select(id);
    const queryResponse = await axios.get(routeBuilder.build());

    return queryResponse.data;
  } catch (e) {
    return null;
  }
};
