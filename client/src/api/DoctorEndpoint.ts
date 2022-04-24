import axios from 'axios';
import { ethers } from 'ethers';
import { ApiResponse, Doctor } from '.';
import RouteBuilder, { ApiResource } from './RouteBuilder';

const provider = new ethers.providers.Web3Provider(window.ethereum);

enum Role {
  PATIENT = 'PATIENT',
  DOCTOR = 'DOCTOR',
}

export const getAllDoctors = async (
  page?: number,
  limit?: number,
): Promise<ApiResponse<{ doctors: Doctor[] }> | null> => {
  try {
    const routeBuilder = new RouteBuilder().append(ApiResource.DOCTOR);
    if (page !== undefined && limit !== undefined) {
      routeBuilder
        .queryParam('page', page.toString())
        .queryParam('limit', limit.toString());
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
    const routeBuilder = new RouteBuilder()
      .append(ApiResource.DOCTOR)
      .select(id);
    const queryResponse = await axios.get(routeBuilder.build());

    return queryResponse.data;
  } catch (e) {
    return null;
  }
};

const handleAuthentication = async (publicAddress: string, nonce: number) => {
  const signer = provider.getSigner();
  const signature = await signer.signMessage(nonce.toString());
  const response = await axios.post(
    `/api/verify?address=${publicAddress}&signature=${signature}`,
  );
  console.log(response);
};

export const connectDoctor = async () => {
  const publicAddress = await provider.listAccounts();
  console.log(publicAddress[0]);
  const res = await axios.post('http://localhost:8000/api/user/register', {
    publicAddress: publicAddress[0].toLowerCase(),
    nonce: Math.floor(Math.random() * 1000000),
    username: 'test3',
    role: Role.DOCTOR,
  });
  if (!res) return null;
  console.log(res.data);
  handleAuthentication(publicAddress[0], res.data.nonce);
  return res.data;
};

export const loginDoctor = async () => {
  const publicAddress = await provider.listAccounts();
  const res = await axios.get(
    `http://localhost:8000/api/user/${publicAddress[0].toLowerCase()}`,
  );

  if (!res) return null;
  console.log(res.data);
  handleAuthentication(publicAddress[0], res.data.nonce);
  return res.data;
};
