using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Lm_Library_Management_Service_NET.Models
{
    public class loginUser
    {
        [Key] // Define 'userId' as the primary key

        public int userId { get; set; }

        [Required(ErrorMessage = "Name Is Required")]
        public string? userName { get; set; }

        [Required(ErrorMessage = "Password Is Required")]
        public string? password { get; set; }

        

    }
}
