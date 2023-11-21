using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Lm_Library_Management_Service_NET.DatabaseContext;
using Lm_Library_Management_Service_NET.Models;
using Microsoft.AspNetCore.Cors;

namespace Lm_Library_Management_Service_NET.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UsersController(ApplicationDbContext context)
        {
            _context = context;
        }


        [HttpPost("Login")]
        public async Task<ActionResult<Users>> Login([FromBody] Users user)
        {
            var existingUser = await _context.Users
                .FirstOrDefaultAsync(u => u.userName == user.userName && u.password == user.password);

            if (existingUser == null)
            {
                return NotFound("Invalid username or password");
            }

            return existingUser;
        }
        


        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Users>>> GetUsers()
        {
          if (_context.Users == null)
          {
              return NotFound();
          }
            return await _context.Users.ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Users>> GetUsers(int id)
        {
          if (_context.Users == null)
          {
              return NotFound();
          }
            var users = await _context.Users.FindAsync(id);

            if (users == null)
            {
                return NotFound();
            }

            return users;
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUsers(int id, Users users)
        {
            if (id != users.userId)
            {
                return BadRequest();
            }

            _context.Entry(users).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsersExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPost]
        public async Task<IActionResult> PostUsers(Users users)
        {
            if (!ModelState.IsValid)
            {
                // If model validation fails, return a 400 (Bad Request) response
                return BadRequest(ModelState);
            }

            try
            {
                _context.Users.Add(users);
                await _context.SaveChangesAsync();

                // If successful, return a 201 (Created) response
                return CreatedAtAction("GetUsers", new { id = users.userId }, users);
            }
            catch (Exception ex)
            {
                // Handle other exceptions and return a 500 (Internal Server Error) response
                return StatusCode(StatusCodes.Status500InternalServerError, new
                {
                    errors = new
                    {
                        message = "An error occurred while processing the request.",
                        details = ex.Message
                    }
                });
            }
        }



        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUsers(int id)
        {
            if (_context.Users == null)
            {
                return NotFound();
            }
            var users = await _context.Users.FindAsync(id);
            if (users == null)
            {
                return NotFound();
            }

            _context.Users.Remove(users);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UsersExists(int id)
        {
            return (_context.Users?.Any(e => e.userId == id)).GetValueOrDefault();
        }
    }
}
