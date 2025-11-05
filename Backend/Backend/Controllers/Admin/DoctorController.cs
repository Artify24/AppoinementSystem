using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Backend.Data;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorController : ControllerBase
    {
        private readonly SmartDocContext _context;
        public DoctorController(SmartDocContext context)
        {
            _context = context;
        }
        [HttpGet("GetDoctors")]
        public async Task<IActionResult> GetDoctors()
        {
            var doctors = await _context.Admins.ToListAsync();
            if (doctors == null || !doctors.Any())
            {
                return NotFound("No doctors found.");
            }
            return Ok(doctors.Select(d => new
            {
                d.AdminId,
                d.Fullname,
                d.Email,
                d.Phone,
                d.Bio,
                d.Specialty
            }));
        }

        [HttpGet("GetAllPatinets/{docId}")]
        public async Task<IActionResult> GetAllPatinets(int docId)
        {
            var appointments = await _context.Appointments
                 .Where(a => a.DoctorId == docId)
                 .Include(a => a.Patient)
                 .Include(a => a.Doctor)
                 .Include(a => a.Prescription)
                 .ToListAsync();

            var appointmentDtos = appointments.Select(a => new
            {   a.Patient.PatientId,
                a.AppointmentDate,
                a.Patient.Fullname,
                a.Patient.Phone,
                a.Patient.Email,
                a.Patient.Gender,
                Diagnosis = a.Prescription != null ? a.Prescription.Diagnosis : null
            }).ToList();

            return Ok(appointmentDtos);
        }
    }
}
