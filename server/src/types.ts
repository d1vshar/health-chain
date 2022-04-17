export interface ApiResponse {
  status: number,
  data?: object,
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
  error: string,
  message: string
  details?: string
}

export interface DoctorInterface {
  address: string
  uuid: string
  name: string
  speciality: string
  lastActivity: Date
}

export interface PatientInterface {
  address: string
  uuid: string
  name: string
  age: number
  gender: string
  lastActivity: Date
}

export interface AuditInterface {
  eventAddress: string,
  timestamp: Date,
  eventType: string,
  status: string,
  accountAddress: string,
  ip: string,
}
