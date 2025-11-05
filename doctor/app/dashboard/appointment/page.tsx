import Appointment from '@/components/Appointment'
import { Header } from '@/components/Header'
import React from 'react'

const page = () => {
  return (
    <>
        <Header title="Appoinments" doctor={{ name: "Dr. John Doe", email: "jhon@gamil.com", avatar: "/doctor-avatar.png" }} />
        <Appointment/>
    </>
  )
}

export default page