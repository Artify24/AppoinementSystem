using Backend.Data;
using Backend.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminAuthController : ControllerBase
    {
        private readonly SmartDocContext _context;
        public AdminAuthController(SmartDocContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDtos data)
        {
            if (data == null)
                return BadRequest("Invalid login data.");

            var admin = await _context.Admins
                .FirstOrDefaultAsync(a => a.Email == data.Email && a.Passwords == data.Passwords);
            return Ok(new
            {
                admin.AdminId,
                admin.Bio,
                admin.Specialty,
                admin.Fullname,
                admin.Phone
            });
        }


    } 
}
