using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Backend.Models;

public partial class Patient
{
    [Key]
    [Column("patientId")]
    public int PatientId { get; set; }

    [Column("fullname")]
    [StringLength(100)]
    [Unicode(false)]
    public string Fullname { get; set; } = null!;

    [Column("email")]
    [StringLength(100)]
    [Unicode(false)]
    public string Email { get; set; } = null!;

    [Column("phone")]
    [StringLength(100)]
    [Unicode(false)]
    public string Phone { get; set; } = null!;

    [Column("gender")]
    [StringLength(100)]
    [Unicode(false)]
    public string Gender { get; set; } = null!;

    [Column("passwords")]
    [StringLength(100)]
    [Unicode(false)]
    public string Passwords { get; set; } = null!;

    [Column("dob", TypeName = "datetime")]
    public DateTime Dob { get; set; }

    [InverseProperty("Patient")]
    public virtual ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();

    [InverseProperty("Patient")]
    public virtual ICollection<Prescription> Prescriptions { get; set; } = new List<Prescription>();
}
