
using speed_dates.Interfaces;

namespace speed_dates.Entities;

public class Advertisement
{
  public Guid Id { get; set; }
  public string Name { get; set; } = "";
  public int Age { get; set; }
  public string Place { get; set; } = "";
  public string Content { get; set; } = "";
  public string Email { get; set; } = "";
  public string Phone { get; set; } = "";
  public bool ShowPhone { get; set; }
  public bool Confirmed { get; set; } = false;
  public string ConfirmationCode { get; set; } = "a1b2c3";
  public Category Category { get; set; }
  public DateTime CreateDate { get; set; } = DateTime.UtcNow;
  public DateTime UpdateDate { get; set; } = DateTime.UtcNow;
}
