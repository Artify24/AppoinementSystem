using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Backend.Models;

public partial class Appointment
{
    [Key]
    [Column("appointmentId")]
    public int AppointmentId { get; set; }

    [Column("doctorId")]
    public int DoctorId { get; set; }

    [Column("patientId")]
    public int PatientId { get; set; }

    [Column("prescriptionId")]
    public int? PrescriptionId { get; set; }

    [Column("isConclude")]
    public bool IsConclude { get; set; }

    [Column("appointmentDate", TypeName = "datetime")]
    public DateTime AppointmentDate { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? CreatedAt { get; set; }

    [Column("symptoms")]
    [StringLength(1000)]
    [Unicode(false)]
    public string? Symptoms { get; set; }

    [ForeignKey("DoctorId")]
    [InverseProperty("Appointments")]
    public virtual Admin Doctor { get; set; } = null!;

    [ForeignKey("PatientId")]
    [InverseProperty("Appointments")]
    public virtual Patient Patient { get; set; } = null!;

    [ForeignKey("PrescriptionId")]
    [InverseProperty("Appointments")]
    public virtual Prescription? Prescription { get; set; }
}
