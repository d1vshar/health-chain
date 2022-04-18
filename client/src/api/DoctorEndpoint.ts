import axios from 'axios';
import { ApiResponse, Doctor } from '.';
import RouteBuilder, { ApiResource } from './RouteBuilder';

export const getAllDoctors = async (
  page?: number,
  limit?: number,
): Promise<ApiResponse<{ doctors: Doctor[] }> | null> => {
  try {
    const routeBuilder = new RouteBuilder().append(ApiResource.DOCTOR);
    if (page !== undefined && limit !== undefined) {
      routeBuilder.queryParam('page', page.toString()).queryParam('limit', limit.toString());
    }
    const queryResponse = await axios.get(routeBuilder.build());

    return queryResponse.data;
  } catch (e) {
    return null;
  }
};

export const getDoctorById = async (
  id: string,
): Promise<ApiResponse<{ doctor: Doctor }> | null> => {
  try {
    const routeBuilder = new RouteBuilder().append(ApiResource.DOCTOR).select(id);
    const queryResponse = await axios.get(routeBuilder.build());

    return queryResponse.data;
  } catch (e) {
    return null;
  }
};
