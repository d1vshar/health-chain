export interface DoctorData {
  address: string
  uuid: string
  name: string
  speciality: string
  lastActivity: Date
}

export interface AuditEvent {
  eventAddress: string,
  timestamp: Date,
  eventType: string,
  status: string,
  accountAddress: string,
  ip: string,
}
