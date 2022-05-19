import { Decimal } from '@prisma/client/runtime';

export interface ApiResponse {
  status: number;
  data?: object;
  errors?: ErrorObject[];
  _pagination?: Pagination;
}

export interface Pagination {
  page: number;
  page_limit: number;
  count: number;
  page_count: number;
}

export interface ErrorObject {
  error: string;
  message: string;
  details?: string;
}

export interface NonceInterface {
  nonce: number;
  publicAddress: string;
  userId: string;
  role: 'PATIENT' | 'DOCTOR';
}

export interface AuthInterface {
  verificationResult: boolean;
  id?: string;
  token?: string;
}

export interface ValidationState {
  hash: string;
  result: boolean;
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
  validation: ValidationState;
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
  validation: ValidationState;
}

export interface VitalRecordInterface {
  id: string;
  patientId: string;
  temperature: Decimal | null;
  respRate: Decimal | null;
  o2sat: Decimal | null;
  sbp: number | null;
  dpb: number | null;
  rhythm: string | null;
  pain: string | null;
  addedBy: string | null;
}
