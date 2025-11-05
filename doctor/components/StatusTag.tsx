import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface StatusTagProps {
  status: "pending" | "concluded" | "cancelled" | "active" | boolean
  className?: string
}

export function StatusTag({ status, className }: StatusTagProps) {
  // normalize boolean → string
  let normalizedStatus: "pending" | "concluded" | "cancelled" | "active"

  if (typeof status === "boolean") {
    normalizedStatus = status ? "concluded" : "pending"
  } else {
    normalizedStatus = status
  }

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "concluded":
        return "bg-green-100 text-green-800 border-green-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      case "active":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <Badge className={cn(getStatusStyles(normalizedStatus), className)}>
      {normalizedStatus.charAt(0).toUpperCase() + normalizedStatus.slice(1)}
    </Badge>
  )
}
