using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Backend.Models;

public partial class Admin
{
    [Key]
    [Column("adminId")]
    public int AdminId { get; set; }

    [Column("fullname")]
    [StringLength(100)]
    [Unicode(false)]
    public string Fullname { get; set; } = null!;

    [Column("email")]
    [StringLength(100)]
    [Unicode(false)]
    public string Email { get; set; } = null!;

    [Column("specialty")]
    [StringLength(100)]
    [Unicode(false)]
    public string Specialty { get; set; } = null!;

    [Column("phone")]
    [StringLength(100)]
    [Unicode(false)]
    public string Phone { get; set; } = null!;

    [Column("bio")]
    [StringLength(1000)]
    [Unicode(false)]
    public string? Bio { get; set; }

    [Column("isActive")]
    public bool IsActive { get; set; }

    [Column("gender")]
    [StringLength(100)]
    [Unicode(false)]
    public string Gender { get; set; } = null!;

    [Column("passwords")]
    [StringLength(100)]
    [Unicode(false)]
    public string Passwords { get; set; } = null!;

    [Column(TypeName = "datetime")]
    public DateTime? CreatedAt { get; set; }

    [InverseProperty("Doctor")]
    public virtual ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();

    [InverseProperty("Doctor")]
    public virtual ICollection<Prescription> Prescriptions { get; set; } = new List<Prescription>();
}
