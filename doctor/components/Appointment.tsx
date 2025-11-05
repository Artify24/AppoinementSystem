"use client";

import { useEffect, useState } from "react";
import { Calendar, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "./DataTable";
import { StatusTag } from "./StatusTag";
import type { Appointment } from "@/types/models";
import Link from "next/link";
import api from "@/lib/api";

const Appointment = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      const doctor = localStorage.getItem("doctor");
      const doctorId = JSON.parse(doctor!).adminId;

      try {
        const res = await api.get(
          `Appoinments/GetAllApoinments/${doctorId}`
        );
        setAppointments(res.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const columns = [
    {
      key: "patientName" as keyof Appointment,
      label: "Patient",
      render: (value: string) => (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-green-600" />
          </div>
          <div className="font-medium text-gray-900">{value}</div>
        </div>
      ),
    },
    {
      key: "appointmentDate" as keyof Appointment,
      label: "Date",
      render: (value: string) => {
        const date = new Date(value);
        return (
          <div>
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="w-4 h-4 mr-2" />
              {date.toLocaleDateString()}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="w-4 h-4 mr-2" />
              {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </div>
          </div>
        );
      },
    },
    {
      key: "isConclude" as keyof Appointment,
      label: "Status",
      render: (value: boolean) => (
        <StatusTag status={value ? "concluded" : "pending"} />
      ),
    },
    {
      key: "appointmentId" as keyof Appointment,
      label: "Actions",
      render: (value: number) => (
        <Button asChild size="sm" className="bg-green-600 hover:bg-green-700">
          <Link href={`/dashboard/appointment/${value}`}>View Details</Link>
        </Button>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Appointments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {appointments.length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Pending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {appointments.filter((a) => !a.isConclude).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Concluded
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {appointments.filter((a) => a.isConclude).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Appointments Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={appointments}
            columns={columns}
            searchPlaceholder="Search appointments..."
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Appointment;
