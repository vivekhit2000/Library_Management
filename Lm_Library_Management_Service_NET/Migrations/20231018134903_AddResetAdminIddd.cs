using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Lm_Library_Management_Service_NET.Migrations
{
    /// <inheritdoc />
    public partial class AddResetAdminIddd : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM Admin");
            migrationBuilder.Sql("DBCC CHECKIDENT ('Admin', RESEED, 0);");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
