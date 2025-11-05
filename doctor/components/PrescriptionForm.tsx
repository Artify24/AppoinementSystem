"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { PrescriptionMedicine } from "@/types/models"

interface PrescriptionFormProps {
  patientId: number
  patientName: string
  onSubmit: (data: {
    diagnosis: string
    notes: string
    medicines: PrescriptionMedicine[]
  }) => void
  isLoading?: boolean
  setShowPrescriptionForm: (show: boolean) => void
}

export function PrescriptionForm({ patientId, patientName, onSubmit, isLoading,setShowPrescriptionForm }: PrescriptionFormProps) {
  const [diagnosis, setDiagnosis] = useState("")
  const [notes, setNotes] = useState("")
  const [medicines, setMedicines] = useState<PrescriptionMedicine[]>([{ medicineName: "", dosage: "", duration: "" , instructions: "", frequency: "" }])

  const addMedicine = () => {
    setMedicines([...medicines, { medicineName: "", dosage: "", duration: "" , instructions: "", frequency: ""  }])
  }

  const removeMedicine = (index: number) => {
    setMedicines(medicines.filter((_, i) => i !== index))
  }

  const updateMedicine = (index: number, field: keyof PrescriptionMedicine, value: string) => {
    const updated = medicines.map((med, i) => (i === index ? { ...med, [field]: value } : med))
    setMedicines(updated)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      diagnosis,
      notes,
      medicines: medicines.filter((med) => med.medicineName.trim() !== ""),
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-green-700">Create Prescription for {patientName}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="diagnosis">Diagnosis</Label>
            <Input
              id="diagnosis"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              placeholder="Enter diagnosis"
              required
            />
          </div>

          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Additional notes and instructions"
              rows={4}
            />
          </div>
          

          <div>
            <div className="flex items-center justify-between mb-4">
              <Label>Medicines</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addMedicine}
                className="text-green-600 border-green-200 hover:bg-green-50 bg-transparent"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Medicine
              </Button>
            </div>

            <div className="space-y-4">
              {medicines.map((medicine, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border border-gray-200 rounded-lg"
                >
                  <div>
                    <Label htmlFor={`medicine-${index}`}>Medicine Name</Label>
                    <Input
                      id={`medicine-${index}`}
                      value={medicine.medicineName}
                      onChange={(e) => updateMedicine(index, "medicineName", e.target.value)}
                      placeholder="Medicine name"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`dosage-${index}`}>Dosage</Label>
                    <Input
                      id={`dosage-${index}`}
                      value={medicine.dosage}
                      onChange={(e) => updateMedicine(index, "dosage", e.target.value)}
                      placeholder="e.g., 500mg"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`duration-${index}`}>Duration</Label>
                    <Input
                      id={`duration-${index}`}
                      value={medicine.duration}
                      onChange={(e) => updateMedicine(index, "duration", e.target.value)}
                      placeholder="e.g., 7 days"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`frequency-${index}`}>Frequency</Label>
                    <Input
                      id={`frequency-${index}`}
                      value={medicine.frequency}
                      onChange={(e) => updateMedicine(index, "frequency", e.target.value)}
                      placeholder="e.g., Once daily"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`instructions-${index}`}>Instructions</Label>
                    <Input
                      id={`instructions-${index}`}
                      value={medicine.instructions}
                      onChange={(e) => updateMedicine(index, "instructions", e.target.value)}
                      placeholder="e.g., Take after meals"
                    />
                  </div>
                  <div className="flex items-end">
                    {medicines.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeMedicine(index)}
                        className="text-red-600 border-red-200 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex space-x-4">
            <Button type="submit" disabled={isLoading} className="bg-green-600 hover:bg-green-700">
              {isLoading ? "Concluding..." : "Mark As Concluded"}
            </Button>
            <Button type="button" variant="outline" onClick={() => setShowPrescriptionForm(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
