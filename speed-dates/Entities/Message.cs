namespace speed_dates.Entities;

public class Message
{
  public Guid Id { get; set; }
  public required string SenderEmail { get; set; }
  public required string ReceiverEmail { get; set; }
  public required string Content { get; set; }
  public bool Confirmed { get; set; } = false;
  public string ConfirmationCode { get; set; } = "a1b2c3";
  public DateTime UpdateDate { get; set; } = DateTime.UtcNow;
}

