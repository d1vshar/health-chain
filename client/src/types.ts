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

export interface RecordData {
  id: string,
  patientId: string,
  temperature: number,
  heartRate:number,
  respRate:number,
  o2sat:number,
  sbp:number,
  dbp:number,
  doctorId:string,
}

export interface RecordPermissionData {
  recordId: string,
  patientId: string,
  doctorId: string,
  read: boolean,
  write: boolean,
  manage: boolean,
}
