"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, FileText, Stethoscope, User, Bell, Activity, Clock, TrendingUp } from "lucide-react"

interface PatientData {
  patientId: string
  fullname: string
  email: string
}

export default function DashboardPage() {
  const [patientData, setPatientData] = useState<PatientData | null>(null)
  const router = useRouter()

  useEffect(() => {
    const data = localStorage.getItem("patientData")
    if (!data) {
      router.push("/")
      return
    }
    setPatientData(JSON.parse(data))
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("patientData")
    router.push("/")
  }

  if (!patientData) {
    return null
  }

  const navigationCards = [
    {
      title: "Find Doctors",
      description: "Browse specialists and book appointments with top-rated doctors",
      icon: Stethoscope,
      href: "/doctors",
      gradient: "from-green-500 to-emerald-600",
      bgColor: "bg-gradient-to-br from-green-50 to-emerald-50",
      iconBg: "bg-gradient-to-r from-green-500 to-emerald-600",
    },
    {
      title: "My Appointments",
      description: "View upcoming visits and manage your appointment schedule",
      icon: Calendar,
      href: "/appointments",
      gradient: "from-emerald-500 to-teal-600",
      bgColor: "bg-gradient-to-br from-emerald-50 to-teal-50",
      iconBg: "bg-gradient-to-r from-emerald-500 to-teal-600",
    },
    {
      title: "My Prescriptions",
      description: "Access digital prescriptions and medication reminders",
      icon: FileText,
      href: "/prescriptions",
      gradient: "from-teal-500 to-green-600",
      bgColor: "bg-gradient-to-br from-teal-50 to-green-50",
      iconBg: "bg-gradient-to-r from-teal-500 to-green-600",
    },
  ]

  const quickStats = [
    { label: "Next Appointment", value: "Tomorrow", icon: Clock, color: "text-green-600" },
    { label: "Health Score", value: "95%", icon: TrendingUp, color: "text-emerald-600" },
    { label: "Active Prescriptions", value: "3", icon: Activity, color: "text-teal-600" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100">
      <header className="bg-white/80 backdrop-blur-md border-b border-green-200/50 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center">
                <Stethoscope className="h-6 w-6 text-white" />
              </div>
              <h1 className="font-heading text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                SmartDoc360
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              
              <div className="hidden sm:flex items-center space-x-2 text-gray-700">
                <User className="h-5 w-5" />
                <span className="font-medium">{patientData.fullname}</span>
              </div>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="border-green-300 text-green-700 hover:bg-green-50 bg-transparent"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="font-heading text-3xl lg:text-4xl font-black text-gray-800 mb-2">
            Welcome back,{" "}
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              {patientData.fullname}
            </span>
            !
          </h2>
          <p className="text-gray-600 text-lg">Your health is our priority. Stay informed, stay healthy.</p>
        </div>

       

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {navigationCards.map((card) => {
            const Icon = card.icon
            return (
              <Card
                key={card.title}
                className={`${card.bgColor} border-white/20 hover:shadow-xl transition-all duration-300 cursor-pointer group hover:scale-105`}
                onClick={() => router.push(card.href)}
              >
                <CardHeader className="pb-4">
                  <div
                    className={`w-14 h-14 rounded-xl ${card.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <CardTitle className="font-heading text-xl font-bold text-gray-800 group-hover:text-green-700 transition-colors">
                    {card.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 leading-relaxed">{card.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    className={`w-full bg-gradient-to-r ${card.gradient} hover:shadow-lg text-white font-medium transition-all duration-300`}
                  >
                    Access {card.title}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="mt-12">
          <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Activity className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold mb-1">Health Tip of the Day</h3>
                  <p className="text-green-100">
                    Stay hydrated! Aim for 8 glasses of water daily to maintain optimal health.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
