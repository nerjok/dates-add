using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using speed_dates.Entities;
using speed_dates.Interfaces;

namespace MyApi.Models;

public class ApiDbContext : DbContext
{
    public ApiDbContext(DbContextOptions<ApiDbContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }

    public DbSet<Advertisement> Advertisements {get; set;}

    public DbSet<ConfirmedEmail> ConfirmedEmail { get; set; }
    public DbSet<ConfirmedPhone> ConfirmedPhone { get; set; }
    public DbSet<Message> Messages { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        var categoryConverter = new ValueConverter<Category, string>(
            v => v.ToString(),              // enum -> text
            v => Enum.Parse<Category>(v));  // text -> enum

        modelBuilder.Entity<Advertisement>()
            .Property(e => e.Category)
            .HasConversion(categoryConverter)
            .HasColumnType("text");
    }
}

public class User
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
}
