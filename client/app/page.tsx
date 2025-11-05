"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import LoginForm from "@/components/auth/login-form"
import RegisterForm from "@/components/auth/register-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Shield, Smartphone, Stethoscope, Activity } from "lucide-react"

export default function HomePage() {
  const [isLogin, setIsLogin] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const patientData = localStorage.getItem("patientData")
    if (patientData) {
      setIsLoggedIn(true)
      router.push("/dashboard")
    }
  }, [router])

  if (isLoggedIn) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
        <div
          className="absolute top-3/4 right-1/4 w-64 h-64 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen">
        <div className="flex-1 flex items-center justify-center p-4 lg:p-8">
          <div className="max-w-lg text-center lg:text-left">
            <div className="mb-8">
              <div className="flex items-center justify-center lg:justify-start mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mr-4">
                  <Stethoscope className="h-8 w-8 text-white" />
                </div>
                <div className="text-left">
                  <h2 className="font-heading text-2xl font-bold text-green-800">SmartDoc360</h2>
                  <p className="text-green-600 text-sm">Patient Portal</p>
                </div>
              </div>

              <h1 className="font-heading text-4xl lg:text-6xl font-black text-gray-800 mb-4 leading-tight">
                Your Health Journey,{" "}
                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Simplified
                </span>
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed">
                Connect with healthcare professionals, manage appointments, and track your wellness—all in one secure
                platform.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center space-x-3 p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-green-100 hover:bg-white/80 transition-all duration-300">
                <Heart className="h-6 w-6 text-green-600" />
                <span className="text-sm font-semibold text-gray-700">24/7 Care</span>
              </div>
              <div className="flex items-center space-x-3 p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-emerald-100 hover:bg-white/80 transition-all duration-300">
                <Shield className="h-6 w-6 text-emerald-600" />
                <span className="text-sm font-semibold text-gray-700">HIPAA Secure</span>
              </div>
              <div className="flex items-center space-x-3 p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-teal-100 hover:bg-white/80 transition-all duration-300">
                <Smartphone className="h-6 w-6 text-teal-600" />
                <span className="text-sm font-semibold text-gray-700">Mobile Ready</span>
              </div>
              <div className="flex items-center space-x-3 p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-green-100 hover:bg-white/80 transition-all duration-300">
                <Activity className="h-6 w-6 text-green-600" />
                <span className="text-sm font-semibold text-gray-700">Health Tracking</span>
              </div>
            </div>

            <div className="flex justify-center lg:justify-start space-x-8 text-center">
              <div>
                <div className="text-2xl font-bold text-green-700">10K+</div>
                <div className="text-sm text-gray-600">Happy Patients</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-emerald-700">500+</div>
                <div className="text-sm text-gray-600">Expert Doctors</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-teal-700">24/7</div>
                <div className="text-sm text-gray-600">Support</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center p-4 lg:p-8">
          <div className="w-full max-w-md">
            <Card className="glass-effect border-white/30 shadow-2xl animate-pulse-glow bg-white/20">
              <CardHeader className="text-center pb-6">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="font-heading text-2xl font-bold text-gray-800">
                  {isLogin ? "Welcome Back" : "Join SmartDoc360"}
                </CardTitle>
                <CardDescription className="text-gray-600 text-base">
                  {isLogin ? "Access your health dashboard" : "Start your wellness journey today"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {isLogin ? <LoginForm /> : <RegisterForm />}

                <div className="text-center">
                  <Button
                    variant="ghost"
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-green-600 hover:text-green-800 hover:bg-green-50/50 font-medium transition-all duration-300"
                  >
                    {isLogin ? "New patient? Create account" : "Returning patient? Sign in"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
