"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Stethoscope, CheckCircle2, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import api from "@/lib/api"

interface SymptomModalProps {
  isOpen: boolean
  onClose: () => void
  selectedDoctor?: {
    id: number
    name: string
    specialty: string
  } | null
}

const commonSymptoms = [
  "Fever", "Headache", "Cough", "Chest pain", 
  "Abdominal pain", "Fatigue", "Nausea", "Dizziness"
]



export function SymptomModal({ isOpen, onClose, selectedDoctor }: SymptomModalProps) {
  const [formData, setFormData] = useState({
    appointmentDate: "",
    appointmentTime: "",
    symptoms: "",
    selectedSymptoms: [] as string[],
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const getMinDate = () => {
    const today = new Date()
    return today.toISOString().split("T")[0]
  }

  const handleSymptomToggle = (symptom: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedSymptoms: prev.selectedSymptoms.includes(symptom)
        ? prev.selectedSymptoms.filter((s) => s !== symptom)
        : [...prev.selectedSymptoms, symptom],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    const patient = JSON.parse(localStorage.getItem("patientData") || "{}");
    if (!patient || !patient.patientId) {
      alert("Patient data not found. Please log in again.")

      setIsSubmitting(false)
      return
    }

    const mergedSymptoms = [...formData.selectedSymptoms, formData.symptoms].join(", ");
    console.log("Submitting form data:", formData,selectedDoctor?.id);
    try {
      const res = await api.post("/Appoinments/CreateAppointment",{
        DoctorId: selectedDoctor?.id,
        AppointmentDate: `${formData.appointmentDate}T${formData.appointmentTime}`,
        patientId: patient.patientId,
        Symptoms: mergedSymptoms,
      })
      console.log("API response:", res.data)
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("There was an error submitting your appointment. Please try again.")
      return
    }

    

    

    setIsSubmitting(false)
    onClose()

    // Reset form
    setFormData({
      appointmentDate: "",
      appointmentTime: "",
      symptoms: "",
      selectedSymptoms: [],
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Stethoscope className="w-5 h-5 text-emerald-600" />
            Book Appointment
          </DialogTitle>
          <DialogDescription>
            {selectedDoctor && (
              <span className="text-emerald-600 font-medium">
                Dr. {selectedDoctor.name} - {selectedDoctor.specialty}
              </span>
            )}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="appointmentDate">Preferred Date *</Label>
              <Input
                id="appointmentDate"
                type="date"
                value={formData.appointmentDate}
                onChange={(e) => setFormData((prev) => ({ ...prev, appointmentDate: e.target.value }))}
                min={getMinDate()}
                required
              />
            </div>

            <div>
              <Label htmlFor="appointmentTime">Appointment Time *</Label>
              <Input
                id="appointmentTime"
                type="time"
                value={formData.appointmentTime}
                onChange={(e) => setFormData((prev) => ({ ...prev, appointmentTime: e.target.value }))}
                required
                className="border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Symptoms checkboxes */}
          <div>
            <Label className="text-base font-medium">Primary Symptoms</Label>
            <p className="text-sm text-muted-foreground mb-3">Select your main symptoms</p>
            <div className="grid grid-cols-2 gap-2">
              {commonSymptoms.map((symptom) => (
                <div key={symptom} className="flex items-center space-x-2">
                  <Checkbox
                    id={symptom}
                    checked={formData.selectedSymptoms.includes(symptom)}
                    onCheckedChange={() => handleSymptomToggle(symptom)}
                  />
                  <Label htmlFor={symptom} className="text-sm cursor-pointer">
                    {symptom}
                  </Label>
                </div>
              ))}
            </div>
            {formData.selectedSymptoms.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {formData.selectedSymptoms.map((symptom) => (
                  <Badge key={symptom} variant="secondary" className="bg-emerald-100 text-emerald-800">
                    {symptom}
                    <button
                      type="button"
                      onClick={() => handleSymptomToggle(symptom)}
                      className="ml-2 hover:text-emerald-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Condition description */}
          <div>
            <Label htmlFor="symptoms">Describe Your Condition *</Label>
            <Textarea
              id="symptoms"
              value={formData.symptoms}
              onChange={(e) => setFormData((prev) => ({ ...prev, symptoms: e.target.value }))}
              placeholder="Please describe your symptoms and when they started..."
              rows={3}
              required
            />
          </div>

          

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 bg-transparent"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="flex-1 bg-emerald-600 hover:bg-emerald-700">
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Submitting...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Book Appointment
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
