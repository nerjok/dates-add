using speed_dates.Entities;


namespace speed_dates.Models;
public class AdvertisementsResponse<T>
{
    public IEnumerable<T> Data { get; set; }
    public int Total { get; set; }
    public int Page { get; set; }
}