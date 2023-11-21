using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Lm_Library_Management_Service_NET.DatabaseContext;
using Lm_Library_Management_Service_NET.Models;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class LoginUsersController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public LoginUsersController(ApplicationDbContext context)
    {
        _context = context;
    }

    /* [HttpPost("Login")]
     public async Task<ActionResult<Users>> Login([FromBody] Users user)
     {
         var existingUser = await _context.Users
             .FirstOrDefaultAsync(u => u.userName == user.userName && u.password == user.password);

         if (existingUser == null)
         {
             return NotFound("Invalid username or password");
         }

         // Save the user data to the loginUsers table
         var loginUser = new loginUser
         {
             userName = existingUser.userName,
             password = existingUser.password
         };

         _context.loginUsers.Add(loginUser);
         await _context.SaveChangesAsync();

         return existingUser;
     }

    [HttpPost("Login")]
    public async Task<ActionResult<Users>> Login([FromBody] Users user)
    {
        var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.userName == user.userName && u.password == user.password);

        if (existingUser == null)
        {
            return NotFound("Invalid username or password");
        }

        // Check if the user is already in the loginUsers table
        var loginUser = await _context.loginUsers.FirstOrDefaultAsync(u => u.userName == existingUser.userName);

        if (loginUser != null)
        {
            // If the user is already in loginUsers, update the record
            loginUser.password = existingUser.password;
        }
        else
        {
            // If the user is not in loginUsers, add a new record
            loginUser = new loginUser
            {
                userName = existingUser.userName,
                password = existingUser.password
            };

            _context.loginUsers.Add(loginUser);
        }

        await _context.SaveChangesAsync();

        return existingUser;
    }


    [HttpDelete("Delete/{userId}")]
    public async Task<ActionResult> DeleteLoginUser(int userId)
    {
        var loginUser = await _context.loginUsers.FirstOrDefaultAsync(u => u.userId == userId);

        if (loginUser == null)
        {
            return NotFound("User not found");
        }

        _context.loginUsers.Remove(loginUser);
        await _context.SaveChangesAsync();

        return Ok("User deleted successfully");
    }*/

}
