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
import { ArrowLeft, FileText, Pill } from "lucide-react";
import api from "@/lib/api";

interface Medicine {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

interface Prescription {
  prescriptionId: string;
  doctorName: string;
  diagnosis: string;
  notes: string;
  date: string;
  medicines: Medicine[];
}

export default function PrescriptionsPage() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const fetchPrescriptions = async () => {
    setIsLoading(true);
    const patientData = localStorage.getItem("patientData");
    if (!patientData) {
      router.push("/");
      return;
    }
    const patientId = JSON.parse(patientData).patientId;
    try {
      const res = await api.get(`/Prescriptions/GetAllPrescriptions/${patientId}`);
      // console.log("Fetched prescriptions:", res.data);
      if (res.status === 200) {
        setPrescriptions(res.data);
        
      } else {
        console.error("Failed to fetch prescriptions:", res.statusText);
        setPrescriptions([]);
      }
    } catch (error) {
      console.error("Error fetching prescriptions:", error);
      setPrescriptions([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPrescriptions();
  }, [router]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-emerald-600">Loading prescriptions...</div>
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
              My Prescriptions
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-emerald-800 mb-2">
            Your Prescriptions
          </h2>
          <p className="text-emerald-600">
            View your medical prescriptions and medications
          </p>
        </div>

        <div className="space-y-6">
          {prescriptions.map((prescription) => (
            <Card key={prescription.prescriptionId} className="border-emerald-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-emerald-800">
                      Dr. {prescription.doctorName}
                    </CardTitle>
                    <CardDescription className="text-emerald-600">
                      {formatDate(prescription.date)}
                    </CardDescription>
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-700">
                    {prescription.medicines.length} Medicine
                    {prescription.medicines.length !== 1 ? "s" : ""}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-emerald-800 mb-1">
                    Diagnosis
                  </h4>
                  <p className="text-emerald-600">{prescription.diagnosis}</p>
                </div>

                {prescription.notes && (
                  <div>
                    <h4 className="font-medium text-emerald-800 mb-1">Notes</h4>
                    <p className="text-emerald-600">{prescription.notes}</p>
                  </div>
                )}

                <div>
                  <h4 className="font-medium text-emerald-800 mb-3">
                    Prescribed Medicines
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {prescription.medicines.map((medicine, index) => (
                      <Card
                        key={index}
                        className="border-emerald-100 bg-emerald-50/50"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <Pill className="h-4 w-4 text-emerald-600" />
                            <h5 className="font-medium text-emerald-800">
                              {medicine.name}
                            </h5>
                          </div>
                          <div className="space-y-1 text-sm text-emerald-600">
                            <p>
                              <span className="font-medium">Dosage:</span>{" "}
                              {medicine.dosage}
                            </p>
                            <p>
                              <span className="font-medium">Frequency:</span>{" "}
                              {medicine.frequency}
                            </p>
                            <p>
                              <span className="font-medium">Duration:</span>{" "}
                              {medicine.duration}
                            </p>
                            {medicine.instructions && (
                              <p>
                                <span className="font-medium">
                                  Instructions:
                                </span>{" "}
                                {medicine.instructions}
                              </p>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {prescriptions.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-emerald-800 mb-2">
              No prescriptions found
            </h3>
            <p className="text-emerald-600 mb-4">
              You don't have any prescriptions yet.
            </p>
            <Button
              onClick={() => router.push("/doctors")}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Find Doctors
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
