"use client"

import { useEffect, useState } from "react"
import { User, Phone, Mail, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/DataTable"
import { PatientCard } from "./PatientCard"
import type { Patient } from "@/types/models"
import Link from "next/link"
import api from "@/lib/api"

export default function     PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPatients = async () => {
      const doctor = localStorage.getItem("doctor")
      const doctorId = doctor ? JSON.parse(doctor).adminId : null

      try {
        const res = await api.get(`Doctor/GetAllPatinets/${doctorId}`)
        if (res.status === 200) {
          setPatients(res.data)
        } else {
          console.error("Failed to fetch patients")
        }
      } catch (error) {
        console.error("Error fetching patients:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPatients()
  }, [])

const columns = [
  {
    key: "patientName" as keyof Patient,
    label: "Patient",
    render: (value: string, patient: Patient) => (
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-blue-600" />
        </div>
        <div>
          <div className="font-medium text-gray-900">{patient.fullname}</div>
          <div className="text-sm text-gray-500">
            
            {patient.gender ?? "Unknown"}
          </div>
        </div>
      </div>
    ),
  },
  {
    key: "patientPhone" as keyof Patient,
    label: "Contact",
    render: (value: string, patient: Patient) => (
      <div className="space-y-1">
        <div className="flex items-center text-sm text-gray-600">
          <Phone className="w-4 h-4 mr-2" />
          {patient.phone}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Mail className="w-4 h-4 mr-2" />
          {patient.email}
        </div>
      </div>
    ),
  },
  {
    key: "lastVisit" as keyof Patient,
    label: "Last Visit",
    render: (value: string, patient: Patient) => (
      <div className="flex items-center text-sm text-gray-600">
        <Calendar className="w-4 h-4 mr-2" />
        {patient.appointmentDate.slice(0, 10)}
      </div>
    ),
  },
  {
    key: "diagnosis" as keyof Patient,
    label: "Diagnosis",
    render: (value: string, patient: Patient) => (
      <div className="text-sm text-gray-600">
        {patient.diagnosis || "N/A"}
      </div>
    ),
  },
  {
    key: "patientId" as keyof Patient,
    label: "Actions",
    render: (value: number) => (
      <Button asChild size="sm" className="bg-green-600 hover:bg-green-700">
        <Link href={`/dashboard/patients/${value}`}>View History</Link>
      </Button>
    ),
  },
]


  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-48 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Patients</h1>
        <div className="flex space-x-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className={viewMode === "grid" ? "bg-green-600 hover:bg-green-700" : ""}
          >
            Grid View
          </Button>
          <Button
            variant={viewMode === "table" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("table")}
            className={viewMode === "table" ? "bg-green-600 hover:bg-green-700" : ""}
          >
            Table View
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{patients.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">New This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">12</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Cases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">8</div>
          </CardContent>
        </Card>
      </div>

      {/* Patients Display */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {patients.map((patient) => (
            <PatientCard key={patient.patientId} patient={patient} />
          ))}
        </div>
      ) : (
        <Card>
          <CardHeader>  
            <CardTitle>All Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable data={patients} columns={columns} searchPlaceholder="Search patients..." />
          </CardContent>
        </Card>
      )}
    </div>
  )
}
