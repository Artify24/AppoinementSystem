"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LoginForm } from "@/components/auth/login-form"
import { RegisterForm } from "@/components/auth/register-form"
import { Heart, Shield, Users, Clock } from "lucide-react"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-emerald-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-emerald-800">SmartDoc360</span>
            </div>
            <Button
              variant="ghost"
              onClick={() => setIsLogin(!isLogin)}
              className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
            >
              {isLogin ? "Need an account?" : "Already have an account?"}
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
          {/* Left Side - Features */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl lg:text-5xl font-bold text-emerald-800 mb-4">
                Your Health, <span className="text-teal-600">Simplified</span>
              </h1>
              <p className="text-lg text-emerald-600 mb-8">
                Access quality healthcare from the comfort of your home with SmartDoc360's comprehensive patient portal.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-emerald-100">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-emerald-800 mb-2">Secure & Private</h3>
                <p className="text-emerald-600 text-sm">
                  Your health data is protected with enterprise-grade security.
                </p>
              </div>

              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-emerald-100">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="font-semibold text-emerald-800 mb-2">Expert Doctors</h3>
                <p className="text-emerald-600 text-sm">Connect with qualified healthcare professionals instantly.</p>
              </div>

              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-emerald-100">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-emerald-800 mb-2">24/7 Access</h3>
                <p className="text-emerald-600 text-sm">Book appointments and access records anytime, anywhere.</p>
              </div>

              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-emerald-100">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-emerald-800 mb-2">Personalized Care</h3>
                <p className="text-emerald-600 text-sm">Tailored healthcare solutions for your unique needs.</p>
              </div>
            </div>
          </div>

          {/* Right Side - Auth Form */}
          <div className="flex justify-center">
            <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm border-emerald-200 shadow-xl">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-emerald-800">
                  {isLogin ? "Welcome Back" : "Join SmartDoc360"}
                </CardTitle>
                <CardDescription className="text-emerald-600">
                  {isLogin ? "Sign in to access your health dashboard" : "Create your account to get started"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLogin ? <LoginForm /> : <RegisterForm />}

                <div className="mt-6 text-center">
                  <Button
                    variant="ghost"
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                  >
                    {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white/60 backdrop-blur-sm border-t border-emerald-100 mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-emerald-600 text-sm">
            <p>&copy; 2024 SmartDoc360. Your trusted healthcare partner.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
