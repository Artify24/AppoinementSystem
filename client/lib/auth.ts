import { mockPatient } from "./mock-data"

export interface Patient {
  id: string
  fullname: string
  email: string
  phone: string
  gender: string
  dateOfBirth: string
}

export const AUTH_STORAGE_KEY = "smartdoc360_patient"

export const authService = {
  login: (email: string, password: string): { success: boolean; patient?: Patient; message?: string } => {
    // Simple mock authentication - accept any email/password combination
    if (email && password) {
      const patient = { ...mockPatient, email }
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(patient))
      return { success: true, patient }
    }
    return { success: false, message: "Please enter valid credentials" }
  },

  register: (patientData: Omit<Patient, "id">): { success: boolean; patient?: Patient; message?: string } => {
    // Simple mock registration
    const patient = { ...patientData, id: "patient-1" }
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(patient))
    return { success: true, patient }
  },

  setPatient: (patient: Patient) => {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(patient))
  },

  getPatient: (): Patient | null => {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY)
    return stored ? JSON.parse(stored) : null
  },

  clearPatient: () => {
    localStorage.removeItem(AUTH_STORAGE_KEY)
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem(AUTH_STORAGE_KEY)
  },
}
