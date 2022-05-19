import { atom } from 'recoil';
// import { getPatientById } from '../api/PatientEndppoint';
// import authAtom from './authState';

interface UserState {
  id: string
  role: string
  publicAddress: string | null
  name: string
}

const userAtom = atom<UserState | null>({
  key: 'user',
  default: null,
  // get: async ({ get }) => {
  //   const authState = get(authAtom);

  // if (authState?.role === 'PATIENT') {
  //   const apiResponse = await getPatientById(authState.id);
  //   if (apiResponse && apiResponse.data) {
  //     return {
  //       id: apiResponse.data.patient.id,
  //       role: 'PATIENT',
  //       publicAddress: apiResponse.data.patient.address,
  //       name: apiResponse.data.patient.name,
  //     };
  //   }
  //   }

  //   return null;
  // },
});

export default userAtom;
