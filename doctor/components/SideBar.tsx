"use client";
import {  Calendar,  Users, FileText, User,Stethoscope } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"

const SideBar = () => {
  const pathname = usePathname();
  const router = useRouter();
      const sidebarItems = [
    { name: "Dashboard", icon: Calendar, active: pathname === "/dashboard", path: "/dashboard" },
    { name: "Appointments", icon: Calendar, active: pathname === "/dashboard/appointment", path: "/dashboard/appointment" },
    { name: "Patients", icon: Users, active: pathname === "/dashboard/patients" , path: "/dashboard/patients"},
    { name: "Prescriptions", icon: FileText, active: pathname === "/dashboard/prescriptions", path: "/dashboard/prescriptions"},
    { name: "Profile", icon: User, active: pathname === "/dashboard/profile" , path: "/dashboard/profile"},
  ]
  return (
    <>
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm border-r">
        <div className="p-6 border-b">
          <div className="flex items-center space-x-2">
            <div className="w-11 h-11 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <Stethoscope className="w-8 h-8 text-white" />
            </div>
            <span className="font-bold text-gray-900">MediPanel</span>
          </div>
        </div>

        <nav className="mt-6">
          {sidebarItems.map((item) => (
            <div
            onClick={()=> router.push(item.path)}
              key={item.name}
              className={`flex items-center px-6 py-3 text-lg font-bold cursor-pointer ${
                item.active
                  ? "bg-green-50 text-green-700 border-r-2 border-green-500"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </div>
          ))}
        </nav>
      </div>
    </>
  )
}

export default SideBar