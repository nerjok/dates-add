
using speed_dates.Interfaces;

namespace speed_dates.Entities;

public class ConfirmedPhone
{
  public Guid Id { get; set; }
  public required string Phone { get; set; }
  public bool Confirmed { get; set; } = false;
  public DateTime UpdateDate { get; set; } = DateTime.UtcNow;
}

