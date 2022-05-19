export interface DoctorData {
  address: string
  uuid: string
  name: string
  speciality: string
  lastActivity: Date
}

export interface PatientsData {
  address: string
  uuid: string
  name: string
  age: number
  gender: string
  lastActivity: Date
}

export interface AuditEvent {
  eventAddress: string,
  timestamp: string,
  eventType: string,
  status: string,
  accountAddress: string,
  ip: string,
}

export interface PatientRecords {
  id: string,
  temperature: number,
  heart_rate:number,
  resp_rate:number,
  o2sat:number,
  sbp:number,
  dbp:number,
  doctor:string,
}
