"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Bell, User, LogOut } from "lucide-react"
import { authService } from "@/lib/auth"
import { useRouter } from "next/navigation"

export function Header() {
  const [patient] = useState(() => authService.getPatient())
  const router = useRouter()

  const handleLogout = () => {
    authService.clearPatient()
    router.push("/login")
  }

  if (!patient) return null

  return (
    <header className="bg-white border-b border-border px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
            <div className="w-6 h-6 bg-primary-foreground rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-primary">SmartDoc360</h1>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              2
            </span>
          </Button>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="font-medium text-foreground">{patient.fullname}</p>
              <p className="text-sm text-muted-foreground">Patient</p>
            </div>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-muted-foreground hover:text-foreground"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  )
}
