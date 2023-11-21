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
    
    public class PlaceOrdersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PlaceOrdersController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/PlaceOrders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PlaceOrder>>> GetPlaceOrders()
        {
            if (_context.PlaceOrders == null)
            {
                return NotFound();
            }
            return await _context.PlaceOrders.ToListAsync();
        }

     



        // GET: api/PlaceOrders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PlaceOrder>> GetPlaceOrder(int id)
        {
            if (_context.PlaceOrders == null)
            {
                return NotFound();
            }
            var placeOrder = await _context.PlaceOrders.FindAsync(id);

            if (placeOrder == null)
            {
                return NotFound();
            }

            return placeOrder;
        }

        // PUT: api/PlaceOrders/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPlaceOrder(int id, PlaceOrder placeOrder)
        {
            if (id != placeOrder.OrderId)
            {
                return BadRequest();
            }

            _context.Entry(placeOrder).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PlaceOrderExists(id))
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

        // POST: api/PlaceOrders
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PlaceOrder>> PostPlaceOrder(PlaceOrder placeOrder)
        {
            if (_context.PlaceOrders == null)
            {
                return Problem("Entity set 'ApplicationDbContext.PlaceOrders'  is null.");
            }
            _context.PlaceOrders.Add(placeOrder);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPlaceOrder", new { id = placeOrder.OrderId }, placeOrder);
        }

        [HttpPut("accept/{id}")]
        public IActionResult AcceptOrder(int id)
        {
            var placeOrder = _context.PlaceOrders.Find(id);
            if (placeOrder == null)
            {
                return NotFound();
            }

            placeOrder.IssueStatus = "Accepted"; // Update the issueStatus

            _context.SaveChanges(); // Save changes to the database

            return NoContent();
        }

        [HttpPut("reject/{id}")]
        public IActionResult RejectOrder(int id)
        {
            var placeOrder = _context.PlaceOrders.Find(id);
            if (placeOrder == null)
            {
                return NotFound();
            }

            placeOrder.IssueStatus = "Rejected"; // Update the issueStatus

            _context.SaveChanges(); // Save changes to the database

            return NoContent();
        }

       


        // DELETE: api/PlaceOrders/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePlaceOrder(int id)
        {
            if (_context.PlaceOrders == null)
            {
                return NotFound();
            }
            var placeOrder = await _context.PlaceOrders.FindAsync(id);
            if (placeOrder == null)
            {
                return NotFound();
            }

            _context.PlaceOrders.Remove(placeOrder);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/PlaceOrders/ByUser/{userId}
        [HttpGet("ByUser/{userId}")]
        public async Task<ActionResult<IEnumerable<PlaceOrder>>> GetPlaceOrdersByUser(int userId)
        {
            if (_context.PlaceOrders == null)
            {
                return NotFound();
            }

            var placeOrdersByUser = await _context.PlaceOrders
                .Where(order => order.UserId == userId)
                .ToListAsync();

            if (placeOrdersByUser == null || placeOrdersByUser.Count == 0)
            {
                return NotFound();
            }

            return placeOrdersByUser;
        }

        // GET: api/PlaceOrders/AcceptedOrdersByUser/{userId}
        [HttpGet("AcceptedOrdersByUser/{userId}")]
        public async Task<ActionResult<IEnumerable<PlaceOrder>>> GetAcceptedOrdersByUser(int userId)
        {
            if (_context.PlaceOrders == null)
            {
                return NotFound();
            }

            var acceptedOrdersByUser = await _context.PlaceOrders
                .Where(order => order.UserId == userId && order.IssueStatus == "Accepted")
                .ToListAsync();

            if (acceptedOrdersByUser == null || acceptedOrdersByUser.Count == 0)
            {
                return NotFound();
            }

            return acceptedOrdersByUser;
        }

        // PUT: api/PlaceOrders/return-request/{orderId}
        [HttpPut("return-request/{orderId}")]
        public IActionResult ReturnRequest(int orderId)
        {
            var placeOrder = _context.PlaceOrders.FirstOrDefault(po => po.OrderId == orderId);

            if (placeOrder == null)
            {
                return NotFound();
            }

            placeOrder.IssueStatus = "Return Requested"; ; // Update the issueStatus to "Returned"

            _context.SaveChanges(); // Save changes to the database

            return NoContent();
        }


        [HttpGet("ReturnRequestedOrders")]
        public async Task<ActionResult<IEnumerable<PlaceOrder>>> GetReturnRequestedOrders()
        {
            var returnRequestedOrders = await _context.PlaceOrders
                .Where(order => order.IssueStatus == "Return Requested")
                .ToListAsync();

            if (returnRequestedOrders == null || returnRequestedOrders.Count == 0)
            {
                return NotFound();
            }

            return returnRequestedOrders;
        }

        [HttpPut("return-approve/{orderId}")]
        public IActionResult ReturnApprove(int orderId)
        {
            var placeOrder = _context.PlaceOrders.Find(orderId);

            if (placeOrder == null)
            {
                return NotFound();
            }

            placeOrder.IssueStatus = "Returned"; // Update the issueStatus to "Returned"

            _context.SaveChanges(); // Save changes to the database

            return NoContent();
        }


        private bool PlaceOrderExists(int id)
        {
            return (_context.PlaceOrders?.Any(e => e.OrderId == id)).GetValueOrDefault();
        }
    }
}
