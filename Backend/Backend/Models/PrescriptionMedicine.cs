using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Backend.Models;

public partial class PrescriptionMedicine
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("prescriptionId")]
    public int PrescriptionId { get; set; }

    [Column("medicineName")]
    [StringLength(200)]
    [Unicode(false)]
    public string MedicineName { get; set; } = null!;

    [Column("dosage")]
    [StringLength(100)]
    [Unicode(false)]
    public string? Dosage { get; set; }

    [Column("frequency")]
    [StringLength(100)]
    [Unicode(false)]
    public string? Frequency { get; set; }

    [Column("duration")]
    [StringLength(100)]
    [Unicode(false)]
    public string? Duration { get; set; }

    [Column("instructions", TypeName = "text")]
    public string? Instructions { get; set; }

    [ForeignKey("PrescriptionId")]
    [InverseProperty("PrescriptionMedicines")]
    public virtual Prescription Prescription { get; set; } = null!;
}
