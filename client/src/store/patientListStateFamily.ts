import { atomFamily } from 'recoil';
import {
  ApiResponse, Pagination, PaginationQueryOpts, Patient,
} from '../api';
import { getAllPatients } from '../api/PatientEndppoint';

type PatientListState = {
  list?: Patient[] | null,
  _pagination?: Pagination
};

const patientListStateFamily = atomFamily<PatientListState, PaginationQueryOpts | undefined>({
  key: 'PatientsList',
  default: {},
  effects: (paginationQueryOpts) => [
    ({ setSelf, trigger }) => {
      const fetchData = async () => {
        try {
          let apiResponse: ApiResponse<{ patients: Patient[]; }> | null;
          if (paginationQueryOpts) {
            apiResponse = await getAllPatients(
              paginationQueryOpts.page,
              paginationQueryOpts.limit,
            );
          } else {
            apiResponse = await getAllPatients();
          }
          if (apiResponse && apiResponse.data) {
            setSelf({
              list: apiResponse.data.patients,
              _pagination: apiResponse._pagination,
            });
            return;
          }
          setSelf({});
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
