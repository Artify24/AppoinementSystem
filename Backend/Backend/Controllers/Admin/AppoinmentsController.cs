using Backend.Data;
using Backend.DTOs;
using Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppoinmentsController : ControllerBase
    {
        private readonly Data.SmartDocContext _context;
        public AppoinmentsController(Data.SmartDocContext context)
        {
            _context = context;
        }
        [HttpGet("GetAllApoinments/{id}")]
        public async Task<IActionResult> GetAllApoinments(int id)
        {
            var appointments = await _context.Appointments
                .Where(a => a.DoctorId == id)
                .Include(a => a.Patient)
                .Include(a => a.Doctor)
                .Include(a => a.Prescription)
                .ToListAsync();
            var appointmentDtos = appointments.Select(a => new DTOs.AppoinmentsDtos
            {
                AppointmentId = a.AppointmentId,
                IsConclude = a.IsConclude,
                Symptoms = a.Symptoms,
                AppointmentDate = a.AppointmentDate,
                CreatedAt = a.CreatedAt,
                DoctorName = a.Doctor.Fullname,
                DoctorPhone = a.Doctor.Phone,
                DoctorEmail = a.Doctor.Email,
                PatientName = a.Patient.Fullname,
                PatientPhone = a.Patient.Phone,
                PatientEmail = a.Patient.Email,
            }).ToList();
            return Ok(appointmentDtos);
        }

        [HttpGet("GetAppoinmentDetail/{appoId}")]
        public async Task<IActionResult> GetAppoinmentDetail(int appoId)
        {
            var appointment = await _context.Appointments
                .Where(a => a.AppointmentId == appoId)
                .Include(a => a.Patient)
                .Include(a => a.Doctor)
                .Include(a => a.Prescription)
                .FirstOrDefaultAsync();

            if (appointment == null)
            {
                return NotFound();
            }

            var appointmentDtos = new AppoinmentsDtos
            {
                AppointmentId = appointment.AppointmentId,
                IsConclude = appointment.IsConclude,
                Symptoms = appointment.Symptoms,
                AppointmentDate = appointment.AppointmentDate,
                CreatedAt = appointment.CreatedAt,
                DoctorName = appointment.Doctor.Fullname,
                DoctorPhone = appointment.Doctor.Phone,
                DoctorEmail = appointment.Doctor.Email,
                PatientName = appointment.Patient.Fullname,
                PatientPhone = appointment.Patient.Phone,
                PatientEmail = appointment.Patient.Email,
            };

            return Ok(appointmentDtos);
        }


        [HttpPost("CreateAppointment")]
        public async Task<IActionResult> CreateAppointment([FromBody] TakeAppoinmentDtos appointment)
            {
            if (appointment == null)
            {
                return BadRequest("Invalid appointment data.");
            }
            var newAppointment = await _context.Appointments.AddAsync(new Models.Appointment
            {
                PatientId = appointment.PatientId,
                DoctorId = appointment.DoctorId,
                Symptoms = appointment.Symptoms,
                AppointmentDate = appointment.AppointmentDate,
                CreatedAt = DateTime.Now,
                IsConclude = false
            });
            await _context.SaveChangesAsync();
            return Ok("Appointment created successfully.");
        }

        [HttpPut("ConcludeAppointment/{appointmentId}")]
        public async Task<IActionResult> ConcludeAppointment(int appointmentId, [FromBody] CompleteAppoinmentsDtos dto)
        {
            if (dto == null)
                return BadRequest("Invalid data.");

         
            var appointment = await _context.Appointments
                .Include(a => a.Patient)
                .Include(a => a.Doctor)
                .FirstOrDefaultAsync(a => a.AppointmentId == appointmentId);

            if (appointment == null)
                return NotFound("Appointment not found.");

           
            var prescription = new Prescription
            {
                DoctorId = appointment.DoctorId,
                PatientId = appointment.PatientId,
                Notes = dto.Prescriptions.notes,
                CreatedAt = DateTime.Now,
                Diagnosis = dto.Prescriptions.diagnosis
            };

            _context.Prescriptions.Add(prescription);
            await _context.SaveChangesAsync(); 


            foreach (var medDto in dto.Prescriptions.medicines)
            {
                var prescriptionMedicine = new PrescriptionMedicine
                {
                    PrescriptionId = (int)prescription.PrescriptionId,
                    MedicineName = medDto.medicineName,
                    Dosage = medDto.dosage,
                    Frequency = medDto.frequency,
                    Duration = medDto.duration,
                    Instructions = medDto.instructions
                };

                _context.PrescriptionMedicines.Add(prescriptionMedicine);
            }


            appointment.IsConclude = true;
            appointment.PrescriptionId = prescription.PrescriptionId;

            await _context.SaveChangesAsync();

            return Ok(new
            {
                Message = "Appointment concluded successfully."
            });
        }

        [HttpGet("GetRecentAppointments/{drid}")]
        public async Task<IActionResult> GetRecentAppointments(int drid)
        {
            var appoinments = await _context.Appointments
                .Where(a => a.DoctorId == drid)
                .Where(a=> a.IsConclude == false)
                .Include(a => a.Patient)
                .ToListAsync();
            var appointmentDtos = appoinments.Select(a => new 
            {
                 a.AppointmentId,
                a.IsConclude,
                 a.AppointmentDate,
                 a.CreatedAt,
                a.Patient.Fullname,
                a.Patient.Gender,
            }).ToList();
            return Ok(appointmentDtos);
        }
}
    }

