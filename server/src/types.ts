export interface ApiResponse {
  status: number
  data?: object
  errors?: ErrorObject[]
  _pagination? : Pagination
}

export interface Pagination {
  page: number
  page_limit: number
  count: number
  page_count: number
}

export interface ErrorObject {
  error: string
  message: string
  details?: string
}

export interface ValidationState {
  hash: string
  result: boolean
}

export interface PatientInterface {
  id: string;
  name: string;
  dob: Date;
  dod: Date | null;
  gender: string;
  phone: string | null;
  email: string | null;
  address: string | null;
  bloodGroup: string | null;
  validation: ValidationState
}
export interface DoctorInterface {
  id: string;
  name: string;
  dob: Date;
  dod: Date | null;
  gender: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  validation: ValidationState
}
