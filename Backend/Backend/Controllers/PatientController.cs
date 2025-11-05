using Backend.Data;
using Backend.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientController : ControllerBase
    {
        private readonly SmartDocContext _context;
        public PatientController(SmartDocContext context)
        {
            _context = context;
        }
        [HttpGet("GetPatientDetails/{id}")]
        public async Task<IActionResult> GetPatientAppoinmentsDetails(int id)
        {
            var patient = await _context.Patients.FindAsync(id);
            if (patient == null)
            {
                return NotFound("Patient Not found.");
            }
            var appointments = await _context.Appointments
                .Where(a => a.PatientId == id)
                .Include(a => a.Doctor)
                .Include(a => a.Patient) 
                .AsNoTracking()
                .Select(a => new AppoinmentsDtos
                {
                    AppointmentId = a.AppointmentId,
                    IsConclude = a.IsConclude,
                    CreatedAt = a.CreatedAt,
                    AppointmentDate = a.AppointmentDate,
                    DoctorName = a.Doctor.Fullname,
                    DoctorPhone = a.Doctor.Phone,
                    DoctorEmail = a.Doctor.Email,
                    PatientName = a.Patient.Fullname,
                    PatientPhone = a.Patient.Phone,
                    PatientEmail = a.Patient.Email
                })
                .ToListAsync();

            if (!appointments.Any())
            {
                return Ok(new { Message = "No appointments found for this patient." });
            }

            return Ok(appointments);
        }
       

    }
    

    }

