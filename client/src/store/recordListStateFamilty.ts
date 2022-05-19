import { atomFamily } from 'recoil';
import {
  ApiResponse, Pagination, PaginationQueryOpts, VitalRecord,
} from '../api';
import { getAllRecordsForPatient } from '../api/RecordEndpoint';
import { AuthState } from './authState';

type VitalRecordListState = {
  list?: VitalRecord[] | null,
  _pagination?: Pagination
};

type VitalRecordOpts = {
  authState: AuthState | null,
  _pagination?: PaginationQueryOpts
};

const recordListStateFamily = atomFamily<VitalRecordListState, VitalRecordOpts>({
  key: 'VitalRecordList',
  default: {},
  effects: (vitalRecordOpts) => [
    ({ setSelf, trigger }) => {
      const fetchData = async () => {
        try {
          if (vitalRecordOpts.authState?.id) {
            let apiResponse: ApiResponse<{ records: VitalRecord[]; }> | null;

            if (vitalRecordOpts.authState) {
              if (vitalRecordOpts._pagination) {
                apiResponse = await getAllRecordsForPatient(
                  vitalRecordOpts.authState,
                  vitalRecordOpts.authState.id,
                  vitalRecordOpts._pagination.page,
                  vitalRecordOpts._pagination.limit,
                );
              } else {
                apiResponse = await getAllRecordsForPatient(
                  vitalRecordOpts.authState,
                  vitalRecordOpts.authState.id,
                );
              }
              if (apiResponse && apiResponse.data) {
                setSelf({
                  list: apiResponse.data.records,
                  _pagination: apiResponse._pagination,
                });
                return;
              }
              setSelf({});
            }
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

export default recordListStateFamily;
