"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Phone, Stethoscope } from "lucide-react";
import api from "@/lib/api";
import { SymptomModal } from "@/components/SymptomModal";

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  bio?: string;
  phone: string;
  email: string;
}

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSymptomModalOpen, setIsSymptomModalOpen] = useState(false);

  const router = useRouter();

  const getDoctors = async () => {
    try {
      const res = await api.get("/Doctor/GetDoctors");
      const mappedDoctors: Doctor[] = res.data.map((doc: any) => ({
        id: doc.adminId,
        name: doc.fullname,
        specialty: doc.specialty,
        phone: doc.phone,
        email: doc.email,
        bio: doc.bio,
      }));
      setDoctors(mappedDoctors);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const patientData = localStorage.getItem("patientData");
    if (!patientData) {
      router.push("/");
      return;
    }
    getDoctors();
  }, [router]);

  const handleBookAppointment = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsSymptomModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-emerald-600">Loading doctors...</div>
      </div>
    );
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
            <h1 className="text-2xl font-bold text-emerald-800">
              Find Doctors
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-emerald-800 mb-2">
            Available Doctors
          </h2>
          <p className="text-emerald-600">
            Choose from our qualified healthcare professionals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <Card
              key={doctor.id}
              className="border-emerald-200 hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Stethoscope className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <CardTitle className="text-emerald-800">
                      {doctor.name}
                    </CardTitle>
                    <Badge
                      variant="secondary"
                      className="bg-emerald-100 text-emerald-700"
                    >
                      {doctor.specialty}
                    </Badge>
                  </div>
                </div>
                <CardDescription className="text-emerald-600">
                  {doctor.bio || "No biography available."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 mb-4 text-emerald-600">
                  <Phone className="h-4 w-4" />
                  <span className="text-sm">{doctor.phone}</span>
                </div>
                <Button
                  onClick={() => handleBookAppointment(doctor)}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  Book Appointment
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {doctors.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <Stethoscope className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-emerald-800 mb-2">
              No doctors available
            </h3>
            <p className="text-emerald-600">
              Please check back later for available doctors.
            </p>
          </div>
        )}
      </main>

      {isSymptomModalOpen && selectedDoctor && (
        <SymptomModal
          isOpen={isSymptomModalOpen}
          onClose={() => setIsSymptomModalOpen(false)}
          selectedDoctor={selectedDoctor}
        />
      )}
    </div>
  );
}
  