import { atomFamily } from 'recoil';
import {
  ApiResponse, Doctor, Pagination, PaginationQueryOpts,
} from '../api';
import { getAllDoctors } from '../api/DoctorEndpoint';

type DoctorListState = {
  list?: Doctor[] | null,
  _pagination?: Pagination
};

const doctorsListStateFamily = atomFamily<DoctorListState, PaginationQueryOpts | undefined>({
  key: 'DoctorsList',
  default: {},
  effects: (paginationQueryOpts) => [
    ({ setSelf, trigger }) => {
      const fetchData = async () => {
        try {
          let apiResponse: ApiResponse<{ doctors: Doctor[]; }> | null;
          if (paginationQueryOpts) {
            apiResponse = await getAllDoctors(
              paginationQueryOpts.page,
              paginationQueryOpts.limit,
            );
          } else {
            apiResponse = await getAllDoctors();
          }
          if (apiResponse && apiResponse.data) {
            setSelf({
              list: apiResponse.data.doctors,
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

export default doctorsListStateFamily;
