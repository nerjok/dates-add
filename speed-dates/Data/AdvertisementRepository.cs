using Microsoft.EntityFrameworkCore; // must be at the top
using MyApi.Models;
using speed_dates.Entities;
using speed_dates.Interfaces;
using speed_dates.Models;

namespace speed_dates.Repositories;

class AdvertisementRepository : IAdvertisementRepository
{
    private readonly ApiDbContext _context;

    public AdvertisementRepository(ApiDbContext context)
    {
        _context = context;
    }

    public async Task<AdvertisementsResponse<Advertisement>> GetAdvertisements(int page, Category category)
    {
        var pageSize = 10;
        var skip = page * pageSize;


        var total = _context.Advertisements.Where((entity) => entity.Category == category && entity.Confirmed == true).Count();

        var advertisements = await _context.Advertisements
            .Where((entity) => entity.Category == category && entity.Confirmed == true)
            // .Where((x) => x.Confirmed == true)
            .OrderByDescending(ad => ad.CreateDate)
            .Skip(skip)
            .Take(pageSize)
            .Select(ad => new Advertisement
            {
                Id = ad.Id,
                Content = ad.Content,
                Email = null,
                Phone = ad.ShowPhone ? ad.Phone : null,
                Name = ad.Name,
                Age = ad.Age,
                Place = ad.Place,
                Category = ad.Category,
                CreateDate = ad.CreateDate,
                UpdateDate =  ad.UpdateDate,
                ConfirmationCode = null,
                Confirmed = ad.Confirmed
            })
            .ToListAsync();


        return new AdvertisementsResponse<Advertisement>()
        {
            Data = advertisements,
            Page = page,
            Total = total
        };
    }

    public async Task<Advertisement> CreateAdvertisement(Advertisement advertisement)
    {
        advertisement.CreateDate = DateTime.UtcNow;
        advertisement.UpdateDate = DateTime.UtcNow;
        advertisement.ConfirmationCode = Guid.NewGuid().ToString()[..6];
        var addedTopic = _context.Advertisements.Add(advertisement);
        await _context.SaveChangesAsync();
        return addedTopic.Entity;
    }


    public async Task<Advertisement> ConfirmAdvertisementAsync(Guid confirmationCode)
    {
        var existing = _context.Advertisements.FirstOrDefault(e => e.Id == confirmationCode);
        if (existing == null)
        {
            return new Advertisement();
        }
        existing.Confirmed = true;
        existing.UpdateDate = DateTime.UtcNow;
        _context.Advertisements.Update(existing);
        await _context.SaveChangesAsync();
        return existing;
    }

    public async Task<Advertisement> ConfirmAdvertisementAsync(string confirmationCode)
    {
        var existing = _context.Advertisements.FirstOrDefault(e => e.ConfirmationCode == confirmationCode);
        if (existing == null)
        {
            return new Advertisement();
        }
        existing.Confirmed = true;
        existing.UpdateDate = DateTime.UtcNow;
        _context.Advertisements.Update(existing);
        await _context.SaveChangesAsync();
        return existing;
    }
}