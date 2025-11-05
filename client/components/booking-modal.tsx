"use client";

import type React from "react";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { is } from "date-fns/locale";

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  bio?: string;
  phone: string;
  email: string;
}

interface BookingModalProps {
  doctor: Doctor;
  onClose: () => void;
  onSuccess: () => void;
}

export default function BookingModal({
  doctor,
  onClose,
  onSuccess,
}: BookingModalProps) {
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const patientData = localStorage.getItem("patientData");
    if (!patientData) {
      toast({
        title: "Error",
        description: "You must be logged in to book an appointment.",
        variant: "destructive",
      });
      router.push("/");
      return;
    } else {
      const patientId = JSON.parse(patientData).patientId;
    

      // api exicution
      try {
        const res = await api.post("/Appoinments/CreateAppointment", {
          DoctorId: doctor.id,
          PatientId: patientId,
          AppointmentDate: appointmentDate + "T" + appointmentTime,
        });

        if (res.status === 200) {
          toast({
            title: "Success",
            description: `Your appointment with Dr. ${doctor.name} has been booked successfully.`,
            className: "border-emerald-200 bg-emerald-50 text-emerald-800",
          });
          onSuccess();
        }
      } catch (error) {
        console.error("Error booking appointment:", error);
        toast({
          title: "Error",
          description:
            "There was an error booking your appointment. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
        onClose();
      }
    }
  };

  // Get tomorrow's date as minimum date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-emerald-800">
            Book Appointment
          </DialogTitle>
          <DialogDescription className="text-emerald-600">
            Schedule an appointment with Dr. {doctor.name} ({doctor.specialty})
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="date" className="text-emerald-700">
              Appointment Date
            </Label>
            <Input
              id="date"
              type="date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              min={minDate}
              required
              className="border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="time" className="text-emerald-700">
              Appointment Time
            </Label>
            <Input
              id="time"
              type="time"
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
              required
              className="border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>

          <div className="flex space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-emerald-300 text-emerald-700 hover:bg-emerald-50 bg-transparent"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              {isLoading ? "Booking..." : "Book Appointment"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
