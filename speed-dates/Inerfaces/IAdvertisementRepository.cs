using speed_dates.Entities;
using speed_dates.Models;

namespace speed_dates.Interfaces;
    
public interface IAdvertisementRepository
{
    Task<AdvertisementsResponse<Advertisement>> GetAdvertisements(int page, Category category);

    Task<Advertisement> CreateAdvertisement(Advertisement advertisement);

    Task<Advertisement> ConfirmAdvertisementAsync(Guid confirmationCode);

    Task<Advertisement> ConfirmAdvertisementAsync(string confirmationCode);
}
