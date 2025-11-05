"use client";
import LoginPage from '@/components/LoginPage'
import React, { useEffect } from 'react'
import "../globals.css"
import { useRouter } from 'next/navigation'

const page = () => {
  const router = useRouter()
   useEffect(() => {
      const storedDoctor = localStorage.getItem("doctor");
      if (!storedDoctor) {
        router.push("/login");
        return;
      }
      else{
        router.push("/dashboard");
      }
      
    }, [router]);
  return (
    
    <LoginPage/>
  )
}

export default page