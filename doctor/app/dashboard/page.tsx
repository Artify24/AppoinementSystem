"use client";
import Dashboard from "@/components/Dashboard";
import { Header } from "@/components/Header";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Doctor {
  fullName: string;
  email: string;
}

const Page = () => {
  const router = useRouter();
  const [doctor, setDoctor] = useState<Doctor | null>(null);

  useEffect(() => {
    const storedDoctor = localStorage.getItem("doctor");
    if (!storedDoctor) {
      router.push("/login");
      return;
    }
    setDoctor(JSON.parse(storedDoctor));
  }, [router]);

  if (!doctor) return <div>Loading...</div>;

  return (
    <>
      <Header
        title="Dashboard"
        doctor={{
          name: doctor.fullName,
          email: doctor.email,
          avatar: "/doctor-avatar.png",
        }}
      />
      <Dashboard />
    </>
  );
};

export default Page;
