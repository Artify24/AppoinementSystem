"use client"

import { useState } from "react"
import { User, Mail, Phone, Edit, Save, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Doctor } from "@/types/models"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [doctor, setDoctor] = useState<Doctor>({
    id: 1,
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@hospital.com",
    specialization: "Internal Medicine",
    phone: "+1 (555) 123-4567",
    avatar: "/placeholder.svg?height=100&width=100",
  })

  const [editedDoctor, setEditedDoctor] = useState(doctor)

  const handleSave = () => {
    setDoctor(editedDoctor)
    setIsEditing(false)
    // In a real app, you would call your API here
    console.log("Saving doctor profile:", editedDoctor)
  }

  const handleCancel = () => {
    setEditedDoctor(doctor)
    setIsEditing(false)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} className="bg-green-600 hover:bg-green-700">
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button onClick={handleCancel} variant="outline">
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-green-700">Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar Section */}
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={doctor.avatar || "/placeholder.svg"} alt={doctor.name} />
                <AvatarFallback className="bg-green-100 text-green-700 text-xl">
                  {doctor.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <Button variant="outline" size="sm">
                  Change Photo
                </Button>
              )}
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                {isEditing ? (
                  <Input
                    id="name"
                    value={editedDoctor.name}
                    onChange={(e) => setEditedDoctor({ ...editedDoctor, name: e.target.value })}
                  />
                ) : (
                  <div className="flex items-center mt-1 p-2 bg-gray-50 rounded-md">
                    <User className="w-4 h-4 mr-2 text-gray-400" />
                    <span>{doctor.name}</span>
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="specialization">Specialization</Label>
                {isEditing ? (
                  <Input
                    id="specialization"
                    value={editedDoctor.specialization}
                    onChange={(e) => setEditedDoctor({ ...editedDoctor, specialization: e.target.value })}
                  />
                ) : (
                  <div className="flex items-center mt-1 p-2 bg-gray-50 rounded-md">
                    <span>{doctor.specialization}</span>
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                {isEditing ? (
                  <Input
                    id="email"
                    type="email"
                    value={editedDoctor.email}
                    onChange={(e) => setEditedDoctor({ ...editedDoctor, email: e.target.value })}
                  />
                ) : (
                  <div className="flex items-center mt-1 p-2 bg-gray-50 rounded-md">
                    <Mail className="w-4 h-4 mr-2 text-gray-400" />
                    <span>{doctor.email}</span>
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="phone">Phone</Label>
                {isEditing ? (
                  <Input
                    id="phone"
                    value={editedDoctor.phone}
                    onChange={(e) => setEditedDoctor({ ...editedDoctor, phone: e.target.value })}
                  />
                ) : (
                  <div className="flex items-center mt-1 p-2 bg-gray-50 rounded-md">
                    <Phone className="w-4 h-4 mr-2 text-gray-400" />
                    <span>{doctor.phone}</span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-blue-700">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Appointments</span>
                <span className="font-semibold text-gray-900">156</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Patients Treated</span>
                <span className="font-semibold text-gray-900">124</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Prescriptions</span>
                <span className="font-semibold text-gray-900">89</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Years Experience</span>
                <span className="font-semibold text-gray-900">8</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-purple-700">Account Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                Change Password
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                Notification Settings
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                Privacy Settings
              </Button>
              <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700 bg-transparent">
                Deactivate Account
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
