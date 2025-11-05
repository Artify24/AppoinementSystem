"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Calendar, Clock, User, Phone, Mail } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatusTag } from "@/components/StatusTag"
import { PrescriptionForm } from "@/components/PrescriptionForm"
import type { Appointment, Patient } from "@/types/models"
import api from "@/lib/api"

export default function AppointmentDetailPage() {
  const params = useParams()
  const appointmentId = Number.parseInt(params.id as string)
  const [appointment, setAppointment] = useState<Appointment | null>(null)
  const [showPrescriptionForm, setShowPrescriptionForm] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  

  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      try {
        const res = await api.get(`Appoinments/GetAppoinmentDetail/${appointmentId}`)
        if (res.status === 200) {
          console.log(res.data)
          setAppointment(res.data)
        } else {
          console.error("Failed to fetch appointment details")
        }
      } catch (error) {
        console.error("Error fetching appointment details:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchAppointmentDetails()
  }, [appointmentId])

  const handlePrescriptionSubmit = async (prescriptionData: any) => {
    try {
      console.log("Creating prescription:", prescriptionData)
      setShowPrescriptionForm(false)
      console.log(prescriptionData);
      console.log(appointment);

      const res = await api.put(`/Appoinments/ConcludeAppointment/${appointment?.appointmentId}`, {
        isConclude : true,
        prescriptions:{
          notes: prescriptionData.notes,
          diagnosis: prescriptionData.diagnosis,
          doctorName: appointment?.doctorName,
          doctorEmail: appointment?.doctorEmail,
          doctorPhone: appointment?.doctorPhone,
          patientName: appointment?.patientName,
          patientEmail: appointment?.patientEmail,
          patientPhone: appointment?.patientPhone,
          medicines: prescriptionData.medicines
        }
      })
      console.log( res.data)
     
    } catch (error) {
      console.error("Error creating prescription:", error)
    }
  }

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

  if (!appointment) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Appointment Not Found</h1>
          <p className="text-gray-600">The requested appointment could not be found.</p>
        </div>
      </div>
    )
  }

  const appointmentDate = new Date(appointment.appointmentDate)
  // const createdDate = new Date(appointment.createdAt)

  const status = appointment.isConclude ? "concluded" : "pending"

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Appointment Details</h1>
        <StatusTag status={status} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appointment Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-green-700">Appointment Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Date</p>
                <p className="font-medium">{appointmentDate.toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Time</p>
                <p className="font-medium">{appointmentDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <User className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Doctor</p>
                <p className="font-medium">{appointment.doctorName}</p>
                <p className="text-sm text-gray-500">{appointment.doctorEmail} • {appointment.doctorPhone}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Patient Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-blue-700">Patient Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">{appointment.patientName}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium">{appointment.patientPhone}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{appointment.patientEmail}</p>
              </div>
            </div>
             <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Symptoms</p>
                <p className="font-medium">{appointment.symptoms}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex space-x-4">
        {status === "pending" && (
          <>
            <Button onClick={() => setShowPrescriptionForm(true)} className="bg-green-600 hover:bg-green-700">
              Create Prescription
            </Button>
            
          </>
        )}
        <Button variant="outline">View Patient History</Button>
      </div>

      {/* Prescription Form */}
      {showPrescriptionForm && (
        <PrescriptionForm
          patientId={appointment.appointmentId}
          patientName={appointment.patientName}
          onSubmit={handlePrescriptionSubmit}
          setShowPrescriptionForm={setShowPrescriptionForm}
        />
      )}
    </div>
  )
}
