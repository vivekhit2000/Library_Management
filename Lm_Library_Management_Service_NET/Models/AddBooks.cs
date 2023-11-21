namespace Lm_Library_Management_Service_NET.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class Book
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int BookId { get; set; }
        public string Title { get; set; }
        public string AuthorName { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
    }
}
