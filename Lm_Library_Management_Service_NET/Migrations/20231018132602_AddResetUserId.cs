using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Lm_Library_Management_Service_NET.Migrations
{
    /// <inheritdoc />
    public partial class AddResetUserId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM Users");
            migrationBuilder.Sql("DBCC CHECKIDENT ('Users', RESEED, 0);");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // This is the code to reverse the changes in the Down method.
            // If you don't need a way to undo the reset, you can leave this empty.
        }
    }
}

