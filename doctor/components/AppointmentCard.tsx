import { Calendar, Clock, User } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { PendingAppointments } from "@/types/models"
import Link from "next/link"

interface AppointmentCardProps {
  appointment: PendingAppointments
}

export function AppointmentCard({ appointment }: AppointmentCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "concluded":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{appointment.fullname}</h3>
              <p className="text-sm text-gray-500">Gender: {appointment.gender}</p>
            </div>
          </div>
          {/* {console.log(appointment.isConclude)} */}
          <Badge className={getStatusColor(appointment.isConclude ? "concluded" : "pending")}>
            {appointment.isConclude ? "concluded" : "pending"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            {appointment.appointmentDate.split("T")[0]}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            {appointment.appointmentDate.split("T")[1].slice(0, 5)}
          </div>
        </div>
        <div className="flex space-x-2">
          <Button asChild size="sm" className="bg-green-600 hover:bg-green-700">
            <Link href={`/dashboard/appointment/${appointment.appointmentId}`}>View Details</Link>
          </Button>

            <Button variant="outline" size="sm">
              Mark Complete
            </Button>
          
        </div>
      </CardContent>
    </Card>
  )
}
