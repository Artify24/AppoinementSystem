import { Header } from '@/components/Header'
import PatientsPage from '@/components/PatientsPage'
import React from 'react'

const page = () => {
  return (
    <>  
             <Header title="Patients" doctor={{ name: "Dr. John Doe", email: "jhon@gamil.com", avatar: "/doctor-avatar.png" }} />
             <PatientsPage/>
    </>
  )
}

export default page