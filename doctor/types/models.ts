export interface Appointment {
   appointmentId: number
  isConclude: boolean
  createdAt: string
  appointmentDate: string
  symptoms: string
  doctorName: string
  doctorPhone: string
  doctorEmail: string
  patientName: string
  patientPhone: string
  patientEmail: string
  
}
export interface PendingAppointments{
  fullname: string
  appointmentDate: string,
  appointmentId:number
  createdAt: string,
  isConclude: boolean,
  phone:string,
  gender: string,
}

export interface Prescription {
  prescriptionId: number
  doctorId: number
  patientId: number
  notes: string
  diagnosis?: string
  createdAt?: string
  medicines?: PrescriptionMedicine[]
  patientName: string
}

export interface PrescriptionMedicine {
  medicineName: string
  dosage: string
  duration: string,
  instructions: string,
  frequency:string
}

export interface Patient {
  patientId: number
  fullname: string
  gender: string
  diagnosis: string
  phone: string
  email: string
  appointmentDate: string
}

export interface Doctor {
  id: number
  name: string
  email: string
  specialization: string
  phone: string
  avatar?: string
}

export interface DashboardStats {
  totalAppointments: number
  todayAppointments: number
  totalPrescriptions: number
  totalPatients: number
  pendingAppointments: number
}
