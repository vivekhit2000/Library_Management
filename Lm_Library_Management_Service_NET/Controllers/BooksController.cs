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
    public class BooksController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BooksController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Books
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Book>>> GetBooks()
        {
            if (_context.Books == null)
            {
                return NotFound();
            }
            return await _context.Books.ToListAsync();
        }

        [HttpGet("byName")]
        public async Task<ActionResult<IEnumerable<Book>>> GetBooksByName([FromQuery] string bookName)
        {
            try
            {
                var books = await _context.Books
                    .Where(b => b.Title.Contains(bookName))
                    .ToListAsync();

                if (books == null)
                {
                    return NotFound();
                }

                if (books.Count == 0)
                {
                    return NoContent();
                }

                return books;
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }




        // GET: api/Books/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> GetBook(int id)
        {
          if (_context.Books == null)
          {
              return NotFound();
          }
            var book = await _context.Books.FindAsync(id);

            if (book == null)
            {
                return NotFound();
            }

            return book;
        }

        // PUT: api/Books/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBook(int id, Book book)
        {
            if (id != book.BookId)
            {
                return BadRequest();
            }

            _context.Entry(book).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookExists(id))
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

        // POST: api/Books
        [HttpPost]
        public async Task<ActionResult<Book>> PostBook(Book book)
        {
            if (ModelState.IsValid)
            {
                _context.Books.Add(book);
                await _context.SaveChangesAsync();
                return CreatedAtAction("GetBook", new { id = book.BookId }, book);
            }
            return BadRequest(ModelState);
        }
        // DELETE: api/Books/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            if (_context.Books == null)
            {
                return NotFound();
            }
            var book = await _context.Books.FindAsync(id);
            if (book == null)
            {
                return NotFound();
            }

            _context.Books.Remove(book);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BookExists(int id)
        {
            return (_context.Books?.Any(e => e.BookId == id)).GetValueOrDefault();
        }
    }
}
