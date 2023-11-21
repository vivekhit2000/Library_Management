using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Lm_Library_Management_Service_NET.Models
{
    public class Admins
    {
        [Key] 
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int adminId { get; set; }

        [Required(ErrorMessage = "Name Is Required")]
        public string? adminName { get; set; }

        [Required(ErrorMessage = "Password Is Required")]
        public string? password { get; set; }

        [Required(ErrorMessage = "Date Is Required")]
        public DateTime dob { get; set; }

        [Required(ErrorMessage = "Phone Is Required")]
        [RegularExpression("^[0-9]*$", ErrorMessage = "The phone number should only contain numbers")]
        public long phone { get; set; }
    }
}

