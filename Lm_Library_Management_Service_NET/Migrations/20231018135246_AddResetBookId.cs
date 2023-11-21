using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Lm_Library_Management_Service_NET.Migrations
{
    /// <inheritdoc />
    public partial class AddResetBookId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM Books");
            migrationBuilder.Sql("DBCC CHECKIDENT ('Books', RESEED, 0);");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
