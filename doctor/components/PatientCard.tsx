import { User, Phone, Mail, Calendar,Stethoscope  } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Patient } from "@/types/models"
import Link from "next/link"

interface PatientCardProps {
  patient: Patient
}

export function PatientCard({ patient }: PatientCardProps) {
  console.log(patient)
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{patient.fullname}</h3>
            <p className="text-sm text-gray-500">
                {patient.gender}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Phone className="w-4 h-4 mr-2" />
            {patient.phone}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Mail className="w-4 h-4 mr-2" />
            {patient.email}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            Last visit: {patient.appointmentDate.slice(0, 10)}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Stethoscope className="w-4 h-4 mr-2" />
            Diagnosis: {patient.diagnosis? patient.diagnosis : "N/A"}
          </div>
        </div>
        <div className="flex space-x-2">
          <Button asChild size="sm" className="bg-green-600 hover:bg-green-700">
            <Link href={`/dashboard/patients/${patient.patientId}`}>View History</Link>
          </Button>
          <Button variant="outline" size="sm">
            Contact
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
