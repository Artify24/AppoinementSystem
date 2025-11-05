"use client"

import { useEffect, useState } from "react"
import { Calendar, Users, FileText, Clock, TrendingUp, Activity } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AppointmentCard } from "@/components/AppointmentCard"
import type { DashboardStats, Appointment, PendingAppointments } from "@/types/models"
import { useRouter } from "next/navigation"
import api from "@/lib/api"


export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [recentAppointments, setRecentAppointments] = useState<PendingAppointments[]>([])
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const fetchPendingAppointments = async () => {
    const doctor = localStorage.getItem("doctor");
    if (!doctor) {
      router.push("/login");
      return;
    }
    const doctorId = JSON.parse(doctor).adminId;
    // api
    try {
      const res = await api.get(`Appoinments/GetRecentAppointments/${doctorId}`);
      if (res.status === 200) {
        setRecentAppointments(res.data);
      } else {
        console.error("Failed to fetch recent appointments");
      }
    } catch (error) {
      console.error("Error fetching pending appointments:", error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        
       fetchPendingAppointments();

        // Mock data for demonstration
        const mockStats: DashboardStats = {
          totalAppointments: 156,
          todayAppointments: 8,
          totalPrescriptions: 89,
          totalPatients: 124,
          pendingAppointments: 12,
        }

       

        setStats(mockStats)
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats?.totalAppointments}</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Today's Appointments</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats?.todayAppointments}</div>
            <p className="text-xs text-blue-600 flex items-center mt-1">
              <Activity className="w-3 h-3 mr-1" />
              {stats?.pendingAppointments} pending
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Patients</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats?.totalPatients}</div>
            <p className="text-xs text-purple-600 flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              +8% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Prescriptions</CardTitle>
            <FileText className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats?.totalPrescriptions}</div>
            <p className="text-xs text-orange-600 flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              +15% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Appointments */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Pending Appointments</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentAppointments.length > 0 ? <div>
            {
              recentAppointments.map((appointment) => (
                console.log(appointment),
            <AppointmentCard key={appointment.appointmentId} appointment={appointment} />
          ))
            }
          </div>: <h2>No Appointments Sheduled Today</h2>}
        </div>
      </div>
    </div>
  )
}
