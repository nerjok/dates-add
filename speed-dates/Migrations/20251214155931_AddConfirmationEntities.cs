using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace speed_dates.Migrations
{
    /// <inheritdoc />
    public partial class AddConfirmationEntities : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ConfirmedEmail",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    Confirmed = table.Column<bool>(type: "boolean", nullable: false),
                    UpdateDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConfirmedEmail", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ConfirmedPhone",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Phone = table.Column<string>(type: "text", nullable: false),
                    Confirmed = table.Column<bool>(type: "boolean", nullable: false),
                    UpdateDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConfirmedPhone", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ConfirmedEmail");

            migrationBuilder.DropTable(
                name: "ConfirmedPhone");
        }
    }
}
