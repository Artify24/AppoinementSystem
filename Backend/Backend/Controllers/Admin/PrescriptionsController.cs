using Backend.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    public class PrescriptionsController : ControllerBase
    {
        private readonly SmartDocContext _context;
        public PrescriptionsController(SmartDocContext context)
        {
            _context = context;
        }
        [HttpGet("GetAllPrescriptions/{id}")]
        public async Task<IActionResult> GetAllPrescriptions(int id)
        {
            var prescriptions = await _context.Prescriptions
                .Where(p => p.PatientId == id)
                .Include(p => p.PrescriptionMedicines)
                .Include(a => a.Patient)
                .Include(a => a.Doctor)
                .ToListAsync();

            var prescriptionDtos = prescriptions.Select(p => new
            {
                p.PrescriptionId,
                p.CreatedAt,
                p.Diagnosis,
                p.Notes,
                DoctorName = p.Doctor.Fullname,
                DoctorPhone = p.Doctor.Phone,
                DoctorEmail = p.Doctor.Email,
                PatientName = p.Patient.Fullname,
                PatientPhone = p.Patient.Phone,
                PatientEmail = p.Patient.Email,
                Medicines = p.PrescriptionMedicines.Select(pm => new
                {
                    pm.Id,
                    pm.MedicineName,
                    pm.Dosage,
                    pm.Frequency,
                    pm.Duration,
                    pm.Instructions
                }).ToList()
            }).ToList();

            if (prescriptions == null || !prescriptions.Any())
            {
                return NotFound("No prescriptions found for this appointment.");
            }
            return Ok(prescriptionDtos);
        }

        [HttpGet("GetAllPrescriptionsDoctors/{id}")]
        public async Task<IActionResult> GetAllPrescriptionsDoctors(int id)
        {
            var prescriptions = await _context.Prescriptions
                .Where(p => p.DoctorId == id)
                .Include(p => p.PrescriptionMedicines)
                .Include(a => a.Patient)
                .Include(a => a.Doctor)
                .ToListAsync();

            var prescriptionDtos = prescriptions.Select(p => new
            {
                p.PrescriptionId,
                p.CreatedAt,
                p.Diagnosis,
                p.Notes,
                DoctorName = p.Doctor.Fullname,
                DoctorPhone = p.Doctor.Phone,
                DoctorEmail = p.Doctor.Email,
                PatientName = p.Patient.Fullname,
                PatientPhone = p.Patient.Phone,
                PatientEmail = p.Patient.Email,
                Medicines = p.PrescriptionMedicines.Select(pm => new
                {
                    pm.Id,
                    pm.MedicineName,
                    pm.Dosage,
                    pm.Frequency,
                    pm.Duration,
                    pm.Instructions
                }).ToList()
            }).ToList();

            if (prescriptions == null || !prescriptions.Any())
            {
                return NotFound("No prescriptions found for this appointment.");
            }
            return Ok(prescriptionDtos);
        }


    }
}
