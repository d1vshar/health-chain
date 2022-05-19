import { atomFamily } from 'recoil';
import {
  ApiResponse, Pagination, PaginationQueryOpts, Patient,
} from '../api';
import { getAllPatients } from '../api/PatientEndppoint';
import authAtom from './authState';

type PatientListState = {
  list?: Patient[] | null,
  _pagination?: Pagination
};

const patientListStateFamily = atomFamily<PatientListState, PaginationQueryOpts | undefined>({
  key: 'PatientsList',
  default: {},
  effects: (paginationQueryOpts) => [
    ({ setSelf, trigger, getPromise }) => {
      const fetchData = async () => {
        try {
          let apiResponse: ApiResponse<{ patients: Patient[]; }> | null;
          const authState = await getPromise(authAtom);
          if (authState !== null) {
            if (paginationQueryOpts) {
              apiResponse = await getAllPatients(
                authState,
                paginationQueryOpts.page,
                paginationQueryOpts.limit,
              );
            } else {
              apiResponse = await getAllPatients(authState);
            }
            if (apiResponse && apiResponse.data) {
              setSelf({
                list: apiResponse.data.patients,
                _pagination: apiResponse._pagination,
              });
              return;
            }
            setSelf({});
          }
        } catch {
          setSelf({});
        }
      };

      if (trigger === 'get') {
        fetchData();
      }
    },
  ],
});

export default patientListStateFamily;
