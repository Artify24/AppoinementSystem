using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Backend.Models;

public partial class Prescription
{
    [Key]
    [Column("prescriptionId")]
    public int PrescriptionId { get; set; }

    [Column("doctorId")]
    public int DoctorId { get; set; }

    [Column("patientId")]
    public int PatientId { get; set; }

    [Column("notes")]
    [StringLength(1000)]
    [Unicode(false)]
    public string Notes { get; set; } = null!;

    [Column(TypeName = "datetime")]
    public DateTime? CreatedAt { get; set; }

    [Column("diagnosis")]
    [StringLength(500)]
    [Unicode(false)]
    public string? Diagnosis { get; set; }

    [InverseProperty("Prescription")]
    public virtual ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();

    [ForeignKey("DoctorId")]
    [InverseProperty("Prescriptions")]
    public virtual Admin Doctor { get; set; } = null!;

    [ForeignKey("PatientId")]
    [InverseProperty("Prescriptions")]
    public virtual Patient Patient { get; set; } = null!;

    [InverseProperty("Prescription")]
    public virtual ICollection<PrescriptionMedicine> PrescriptionMedicines { get; set; } = new List<PrescriptionMedicine>();
}
