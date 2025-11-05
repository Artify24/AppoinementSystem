export interface Doctor {
  id: string
  name: string
  specialty: string
  bio: string
  phone: string
  isActive: boolean
  image: string
}

export interface Appointment {
  id: string
  patientId: string
  doctorId: string
  doctorName: string
  date: string
  time: string
  status: "scheduled" | "completed" | "cancelled"
}

export interface Prescription {
  id: string
  patientId: string
  doctorId: string
  doctorName: string
  diagnosis: string
  notes: string
  medicines: Medicine[]
  createdAt: string
}

export interface Medicine {
  id: string
  name: string
  dosage: string
  frequency: string
  duration: string
  instructions: string
}

export interface Patient {
  id: string
  fullname: string
  email: string
  phone: string
  gender: string
  dateOfBirth: string
}

// Mock doctors data
export const mockDoctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    bio: "Experienced cardiologist with 15+ years in cardiovascular medicine. Specializes in preventive cardiology and heart disease management.",
    phone: "+1 (555) 123-4567",
    isActive: true,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    specialty: "Dermatologist",
    bio: "Board-certified dermatologist focusing on skin cancer prevention, cosmetic dermatology, and advanced skin treatments.",
    phone: "+1 (555) 234-5678",
    isActive: true,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "3",
    name: "Dr. Emily Rodriguez",
    specialty: "Pediatrician",
    bio: "Dedicated pediatrician with expertise in child development, immunizations, and family-centered care for children of all ages.",
    phone: "+1 (555) 345-6789",
    isActive: true,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "4",
    name: "Dr. James Wilson",
    specialty: "Orthopedic Surgeon",
    bio: "Orthopedic surgeon specializing in sports medicine, joint replacement, and minimally invasive surgical techniques.",
    phone: "+1 (555) 456-7890",
    isActive: true,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "5",
    name: "Dr. Lisa Thompson",
    specialty: "Neurologist",
    bio: "Neurologist with expertise in treating headaches, epilepsy, stroke, and neurodegenerative diseases using latest treatment methods.",
    phone: "+1 (555) 567-8901",
    isActive: true,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "6",
    name: "Dr. Robert Kim",
    specialty: "Psychiatrist",
    bio: "Compassionate psychiatrist specializing in anxiety, depression, and mood disorders with both therapy and medication management.",
    phone: "+1 (555) 678-9012",
    isActive: true,
    image: "/placeholder.svg?height=100&width=100",
  },
]

// Mock appointments data
export const mockAppointments: Appointment[] = [
  {
    id: "1",
    patientId: "patient-1",
    doctorId: "1",
    doctorName: "Dr. Sarah Johnson",
    date: "2024-01-20",
    time: "10:00",
    status: "scheduled",
  },
  {
    id: "2",
    patientId: "patient-1",
    doctorId: "2",
    doctorName: "Dr. Michael Chen",
    date: "2024-01-15",
    time: "14:00",
    status: "completed",
  },
  {
    id: "3",
    patientId: "patient-1",
    doctorId: "5",
    doctorName: "Dr. Lisa Thompson",
    date: "2024-01-25",
    time: "09:00",
    status: "scheduled",
  },
]

// Mock prescriptions data
export const mockPrescriptions: Prescription[] = [
  {
    id: "1",
    patientId: "patient-1",
    doctorId: "1",
    doctorName: "Dr. Sarah Johnson",
    diagnosis: "Hypertension",
    notes: "Monitor blood pressure regularly. Follow up in 3 months.",
    medicines: [
      {
        id: "1",
        name: "Lisinopril",
        dosage: "10mg",
        frequency: "Once daily",
        duration: "3 months",
        instructions: "Take with or without food, preferably at the same time each day",
      },
      {
        id: "2",
        name: "Amlodipine",
        dosage: "5mg",
        frequency: "Once daily",
        duration: "3 months",
        instructions: "Take in the morning with water",
      },
    ],
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    patientId: "patient-1",
    doctorId: "2",
    doctorName: "Dr. Michael Chen",
    diagnosis: "Eczema",
    notes: "Apply topical treatment as needed. Avoid known triggers.",
    medicines: [
      {
        id: "3",
        name: "Hydrocortisone Cream",
        dosage: "1%",
        frequency: "Twice daily",
        duration: "2 weeks",
        instructions: "Apply thin layer to affected areas only",
      },
    ],
    createdAt: "2024-01-10",
  },
]

// Mock patient data
export const mockPatient: Patient = {
  id: "patient-1",
  fullname: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 987-6543",
  gender: "male",
  dateOfBirth: "1990-05-15",
}
