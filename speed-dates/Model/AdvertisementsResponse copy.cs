using speed_dates.Entities;


namespace speed_dates.Models;
public class AdvertisementsMessageRequest
{
    public string Content { get; set; }
    public Guid AdvertisementId { get; set; }
    public string SenderEmail { get; set; }
}