"use client"

import { useEffect, useState } from "react"
import { FileText, Calendar, User, Pill } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DataTable } from "@/components/DataTable"
import type { Prescription } from "@/types/models"
import api from "@/lib/api"

export default function PrescriptionsPage() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([])
  const [isLoading, setIsLoading] = useState(true)
 

  useEffect(() => {
    const fetchPrescriptions = async () => {
       const doctor = localStorage.getItem("doctor")
  const doctorId = doctor ? JSON.parse(doctor).adminId : null
      try {
        const res = await api.get(
          `Prescriptions/GetAllPrescriptions/${doctorId}`
        )
        console.log("API Response:", res) 

        // Map API response to match `Prescription` type if necessary
        const formatted = res.data.map((p: any) => ({
          prescriptionId: p.prescriptionId,
          doctorId: p.doctorId ?? null,
          patientId: p.patientId ?? null,
          notes: p.notes,
          diagnosis: p.diagnosis,
          createdAt: p.createdAt,
          patientName: p.patientName,
          medicines: p.medicines.map((m: any) => ({
            name: m.medicineName,
            dosage: m.dosage,
            duration: m.duration,
          })),
        }))

        setPrescriptions(formatted)
      } catch (error) {
        console.error("Error fetching prescriptions:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPrescriptions()
  }, [])

  const columns = [
    {
      key: "patientName" as keyof Prescription,
      label: "Patient",
      render: (value: string) => (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-blue-600" />
          </div>
          <span className="font-medium text-gray-900">{value}</span>
        </div>
      ),
    },
    {
      key: "diagnosis" as keyof Prescription,
      label: "Diagnosis",
      render: (value: string) => <span className="text-gray-900">{value}</span>,
    },
    {
      key: "medicines" as keyof Prescription,
      label: "Medicines",
      render: (value: any[]) => (
        <div className="space-y-1">
          {value?.slice(0, 2).map((medicine, index) => (
            <div key={index} className="flex items-center text-sm text-gray-600">
              <Pill className="w-3 h-3 mr-1" />
              {medicine.name} - {medicine.dosage}
            </div>
          ))}
          {value && value.length > 2 && (
            <span className="text-xs text-gray-500">+{value.length - 2} more</span>
          )}
        </div>
      ),
    },
    {
      key: "createdAt" as keyof Prescription,
      label: "Date",
      render: (value: string) => (
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="w-4 h-4 mr-2" />
          {new Date(value).toLocaleDateString()}
        </div>
      ),
    },
    {
      key: "prescriptionId" as keyof Prescription,
      label: "Status",
      render: () => (
        <Badge className="bg-green-100 text-green-800">Active</Badge>
      ),
    },
  ]

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Prescriptions</h1>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Prescriptions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {prescriptions.length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              This Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* <div className="text-2xl font-bold text-green-600">
              {
                prescriptions.filter(
                  (p) =>
                    new Date(p.createdAt).getMonth() === new Date().getMonth()
                ).length
              }
            </div> */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Active
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {prescriptions.length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Patients Treated
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {new Set(prescriptions.map((p) => p.patientName)).size}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Prescriptions Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="w-5 h-5 mr-2 text-green-600" />
            All Prescriptions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={prescriptions}
            columns={columns}
            searchPlaceholder="Search prescriptions..."
          />
        </CardContent>
      </Card>
    </div>
  )
}
