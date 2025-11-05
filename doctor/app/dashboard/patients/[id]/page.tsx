"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { User, Phone, Mail, Calendar, FileText, Activity } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import api from "@/lib/api"

type Medicine = {
  id: number
  medicineName: string
  dosage: string
  frequency: string
  duration: string
  instructions: string
}

type Prescription = {
  prescriptionId: number
  createdAt: string
  diagnosis: string
  notes?: string
  doctorName: string
  doctorPhone: string
  doctorEmail: string
  patientName: string
  patientPhone: string
  patientEmail: string
  medicines: Medicine[]
}

export default function PatientDetailPage() {
  const params = useParams()
  const patientId = Number.parseInt(params.id as string)
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const res = await api.get<Prescription[]>(
          `Prescriptions/GetAllPrescriptions/${patientId}`
        )
        console.log(res.data)
        setPrescriptions(res.data)
      } catch (error) {
        console.error("Error fetching patient prescriptions:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPrescriptions()
  }, [patientId])

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (prescriptions.length === 0) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          No Prescriptions Found
        </h1>
        <p className="text-gray-600">
          This patient has no recorded prescription history.
        </p>
      </div>
    )
  }

  // All prescriptions belong to the same patient (take from first record)
  const patient = prescriptions[0]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-around">
        <h1 className="text-2xl font-bold text-gray-900">Patient History</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Patient Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-blue-700">Patient Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-lg">
                  {patient.patientName}
                </p>
                <p className="text-gray-600">Unknown Age • Unknown Gender</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-medium">{patient.patientPhone}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium">{patient.patientEmail}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Last Visit</p>
                  <p className="font-medium">
                    {new Date(
                      prescriptions[prescriptions.length - 1].createdAt
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

       

        {/* Prescription History */}
        <Card>
          <CardHeader>
            <CardTitle className="text-purple-700 flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Prescription History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {prescriptions.map((prescription) => (
                <div
                  key={prescription.prescriptionId}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="mb-2">
                    <p className="font-medium text-gray-900">
                      {prescription.diagnosis}
                    </p>
                    <p className="text-sm text-gray-600">
                      {new Date(prescription.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="mb-3">
                    <p className="text-sm font-medium text-gray-700 mb-1">
                      Medicines:
                    </p>
                    <div className="space-y-1">
                      {prescription.medicines.map((medicine) => (
                        <div
                          key={medicine.id}
                          className="text-sm text-gray-600"
                        >
                          <span className="font-medium">
                            {medicine.medicineName}
                          </span>{" "}
                          - {medicine.dosage}, {medicine.frequency} for{" "}
                          {medicine.duration} ({medicine.instructions})
                        </div>
                      ))}
                    </div>
                  </div>

                  {prescription.notes && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">
                        Notes:
                      </p>
                      <p className="text-sm text-gray-600">
                        {prescription.notes}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
