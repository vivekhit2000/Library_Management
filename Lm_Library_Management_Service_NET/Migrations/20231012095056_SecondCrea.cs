using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Lm_Library_Management_Service_NET.Migrations
{
    /// <inheritdoc />
    public partial class SecondCrea : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IssueDate",
                table: "loginUsers");

            migrationBuilder.DropColumn(
                name: "phone",
                table: "loginUsers");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "IssueDate",
                table: "loginUsers",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<long>(
                name: "phone",
                table: "loginUsers",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);
        }
    }
}
