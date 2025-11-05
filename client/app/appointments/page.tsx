"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import { mockAppointments } from "@/lib/mock-data"
import api from "@/lib/api"

interface Appointment {
  appointmentId: string
  isConclude: boolean
  createdAt: string
  doctorName: string
  appointmentDate: string
  doctorPhone:string
  doctorEmail: string
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchAppointments();
  }, [router])

  const fetchAppointments = async () => {
    setIsLoading(true);
    const patientData = localStorage.getItem("patientData")
    if (!patientData) {
      router.push("/")
      return
    }
    const patientId = JSON.parse(patientData).patientId;
    try{
      const res = await api.get(`Patient/GetPatientDetails/${patientId}`);
      if (res.status === 200) {
        setAppointments(res.data);
      }
    }
    catch (error) {
      console.error("Failed to fetch appointments:", error);
      setAppointments([]);
    } finally {
      setIsLoading(false);
    }
  }

  const getStatusColor = (status: boolean) => {
    switch (status) {
      case true:
        return "bg-emerald-100 text-emerald-700"
      case false:
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-emerald-600">Loading appointments...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      <header className="bg-white border-b border-emerald-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button
              variant="ghost"
              onClick={() => router.push("/dashboard")}
              className="mr-4 text-emerald-700 hover:bg-emerald-50"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-2xl font-bold text-emerald-800">My Appointments</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-emerald-800 mb-2">Your Appointments</h2>
          <p className="text-emerald-600">Manage your upcoming and past appointments</p>
        </div>

        <div className="space-y-4">
          {appointments.length > 0 ? appointments.map((appointment) => (
            <Card key={appointment.appointmentId} className="border-emerald-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-emerald-800">Dr. {appointment.doctorName}</CardTitle>
                    <CardDescription className="text-emerald-600">{formatDate(appointment.appointmentDate)}</CardDescription>
                  </div>
                  <Badge className={getStatusColor(appointment.isConclude)}>
                    {appointment.isConclude ? "Concluded" : "Upcoming"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 text-emerald-600">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">{formatDate(appointment.appointmentDate)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{
                      appointment.appointmentDate.split("T")[1].substring(0, 5)
                      }</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )): <div className="text-center py-12">No appointment Recorde</div>}
        </div>

        {appointments.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-emerald-800 mb-2">No appointments found</h3>
            <p className="text-emerald-600 mb-4">You haven't booked any appointments yet.</p>
            <Button onClick={() => router.push("/doctors")} className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Find Doctors
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}
