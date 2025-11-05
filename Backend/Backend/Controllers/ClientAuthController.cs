using Backend.Data;
using Backend.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Services; 

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientAuthController : ControllerBase
    {
        private readonly SmartDocContext _context;
        private readonly PasswordService _passwordService;

        public ClientAuthController(SmartDocContext context, PasswordService passwordService)
        {
            _context = context;
            _passwordService = passwordService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> SignUp([FromBody] ClientSignUpDtos data)
        {
            if (data == null)
                return BadRequest("Invalid registration data.");

            // Check if email already exists
            if (await _context.Patients.AnyAsync(p => p.Email == data.Email))
                return BadRequest("Email already registered.");

            // Hash the password before saving
            var hashedPassword = _passwordService.HashPassword(data.Password);

            var patient = new Models.Patient
            {
                Fullname = data.FullName,
                Email = data.Email,
                Phone = data.Phone,
                Passwords = hashedPassword,
               Gender = data.Gender,
                Dob = data.DOB
            };

            _context.Patients.Add(patient);
            await _context.SaveChangesAsync();

            return Ok(new { 
                patient.Email,
                patient.Fullname,
                patient.Phone,
                patient.PatientId,
                patient.Gender,
                patient.Dob,
            });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] ClientLoginDtos data)
        {
            if (data == null)
                return BadRequest("Invalid login data.");

            var patient = await _context.Patients
                .FirstOrDefaultAsync(a => a.Email == data.Email);

            if (patient == null)
                return Unauthorized("Invalid email or password.");

            // Verify hashed password
            var isValid = _passwordService.VerifyPassword(patient.Passwords, data.Password);
            if (!isValid)
                return Unauthorized("Invalid email or password.");

            return Ok(new
            {
                patient.Email,
                patient.Fullname,
                patient.Phone,
                patient.PatientId,
                patient.Gender,
                patient.Dob,
            });
        }
    }
}
