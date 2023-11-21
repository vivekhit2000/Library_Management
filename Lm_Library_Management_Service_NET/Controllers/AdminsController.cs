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
    public class AdminsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AdminsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Admins
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Admins>>> GetAdmin()
        {
          if (_context.Admin == null)
          {
              return NotFound();
          }
            return await _context.Admin.ToListAsync();
        }


        // Add an authentication endpoint
        [HttpPost("authenticate")]
        public async Task<IActionResult> AuthenticateAdmin(Admins admin)
        {
            try
            {
                var authenticatedAdmin = await _context.Admin
                    .Where(a => a.adminName == admin.adminName && a.password == admin.password)
                    .FirstOrDefaultAsync();

                if (authenticatedAdmin == null)
                {
                    return Unauthorized(); // 401 Unauthorized status for failed authentication
                }

                return Ok(authenticatedAdmin); // 200 OK status with the authenticated admin object
            }
            catch (Exception ex)
            {
                return BadRequest("Authentication failed: " + ex.Message);
            }
        }

        // GET: api/Admins/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Admins>> GetAdmins(int id)
        {
          if (_context.Admin == null)
          {
              return NotFound();
          }
            var admins = await _context.Admin.FindAsync(id);

            if (admins == null)
            {
                return NotFound();
            }

            return admins;
        }

        // PUT: api/Admins/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAdmins(int id, Admins admins)
        {
            if (id != admins.adminId)
            {
                return BadRequest();
            }

            _context.Entry(admins).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AdminsExists(id))
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

        // POST: api/Admins
        [HttpPost]
        public async Task<ActionResult<Admins>> PostAdmins(Admins admins)
        {
            if (_context.Admin == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Admin' is null.");
            }
            _context.Admin.Add(admins);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAdmins", new { id = admins.adminId }, admins);
        }



        // DELETE: api/Admins/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAdmins(int id)
        {
            if (_context.Admin == null)
            {
                return NotFound();
            }
            var admins = await _context.Admin.FindAsync(id);
            if (admins == null)
            {
                return NotFound();
            }

            _context.Admin.Remove(admins);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AdminsExists(int id)
        {
            return (_context.Admin?.Any(e => e.adminId == id)).GetValueOrDefault();
        }
    }
}
