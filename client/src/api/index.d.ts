export type ApiResponse<T> = {
  status: number,
  data?: T,
  errors?: ErrorObject[]
  _pagination? : Pagination
};

export type Pagination = {
  page: number
  page_limit: number
  count: number
  page_count: number
};

export type ErrorObject = {
  error: string,
  message: string
  details?: string
};

/**
 * Model Patient
 *
 */
export type Patient = {
  id: string
  name: string
  dob: string
  dod: string | null
  gender: string
  phone: string | null
  email: string | null
  address: string | null
  bloodGroup: string | null
};

/**
 * Model Doctor
 *
 */
export type Doctor = {
  id: string
  name: string
  dob: string
  dod: string | null
  gender: string | null
  phone: string | null
  email: string | null
  address: string | null
};

/**
 * Model DoctorQualification
 *
 */
export type DoctorQualification = {
  id: string
  doctor_id: string
  title: string
  year: number
  organization: string
};

/**
 * Model DoctorRegistration
 *
 */
export type DoctorRegistration = {
  id: string
  doctor_id: string
  reg_no: string
  year: number
  organization: string
};

/**
 * Model VitalRecord
 *
 */
export type VitalRecord = {
  id: string
  patient_id: string
  temperature: number | null
  heart_rate: number | null
  resp_rate: number | null
  o2sat: number | null
  sbp: number | null
  dpb: number | null
  rhythm: string | null
  pain: string | null
  added_by: string | null
};

export type PaginationQueryOpts = {
  limit: number
  page: number
};

export type Auth = {
  verificationResult: boolean;
  id?: string;
  token?: string;
  publicAddress?: string;
  role?: 'PATIENT' | 'DOCTOR';
};

export type Nonce = {
  nonce: number;
  publicAddress: string;
  userId: string;
  role: 'PATIENT' | 'DOCTOR';
};
