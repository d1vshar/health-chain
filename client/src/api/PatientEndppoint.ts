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
    const queryResponse = await axios.get(routeBuilder.build());

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