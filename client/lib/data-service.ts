import {
  mockDoctors,
  mockAppointments,
  mockPrescriptions,
  type Doctor,
  type Appointment,
  type Prescription,
} from "./mock-data"

export const dataService = {
  // Doctors
  getDoctors: (): Promise<Doctor[]> => {
    return Promise.resolve(mockDoctors)
  },

  // Appointments
  getAppointments: (patientId: string): Promise<Appointment[]> => {
    const appointments = mockAppointments.filter((apt) => apt.patientId === patientId)
    return Promise.resolve(appointments)
  },

  bookAppointment: (appointmentData: {
    patientId: string
    doctorId: string
    date: string
    time: string
  }): Promise<{ success: boolean; appointment?: Appointment; message?: string }> => {
    const doctor = mockDoctors.find((d) => d.id === appointmentData.doctorId)
    if (!doctor) {
      return Promise.resolve({ success: false, message: "Doctor not found" })
    }

    const newAppointment: Appointment = {
      id: Date.now().toString(),
      patientId: appointmentData.patientId,
      doctorId: appointmentData.doctorId,
      doctorName: doctor.name,
      date: appointmentData.date,
      time: appointmentData.time,
      status: "scheduled",
    }

    // In a real app, this would be saved to a database
    mockAppointments.push(newAppointment)

    return Promise.resolve({ success: true, appointment: newAppointment })
  },

  // Prescriptions
  getPrescriptions: (patientId: string): Promise<Prescription[]> => {
    const prescriptions = mockPrescriptions.filter((rx) => rx.patientId === patientId)
    return Promise.resolve(prescriptions)
  },
}
