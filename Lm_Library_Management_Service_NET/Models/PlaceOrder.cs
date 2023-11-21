using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Lm_Library_Management_Service_NET.Models
{
    public class PlaceOrder
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // Specifies that OrderId is auto-generated
        public int OrderId { get; set; }

        public int UserId { get; set; }
        public string UserName { get; set; }
        public string BookName { get; set; }
        public int BookId { get; set; }
        public string PhoneNo { get; set; }
        public DateTime IssueDate { get; set; }
        public string IssueStatus { get; set; }
        public DateTime ReturnDate { get; set; }
        public string ReturnStatus { get; set; }
    }
}
