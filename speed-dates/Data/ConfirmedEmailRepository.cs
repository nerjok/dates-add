using MyApi.Models;
using speed_dates.Entities;
using speed_dates.Interfaces;

namespace speed_dates.Repositories;

public class ConfirmedEmailRepository : IConfirmedEmailRepository
{

    private readonly ApiDbContext _context;

    public ConfirmedEmailRepository(ApiDbContext context)
    {
        _context = context;
    }

    public async Task<ConfirmedEmail> AddAsync(string email, CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(email)) throw new ArgumentException("Email is required.", nameof(email));
        var existing = _context.ConfirmedEmail.FirstOrDefault(e => e.Email == email);
        if (existing != null)
        {
            return existing;
        }
        var confirmedEmail = new ConfirmedEmail
        {
            Email = email.Trim(),
            Confirmed = false,
            UpdateDate = DateTime.UtcNow
        };

        var emailEntity = _context.ConfirmedEmail.Add(confirmedEmail);
        await _context.SaveChangesAsync();
        return emailEntity.Entity;
    }

    public Task<bool> IsConfirmedAsync(string email, CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(email)) return Task.FromResult(false);
        var isConfirmed = _context.ConfirmedEmail.Any(e => e.Email == email.Trim() && e.Confirmed);

        return Task.FromResult(isConfirmed);
    }

    public Task<bool> ConfirmEmailAsync(string email)
    {
        if (string.IsNullOrWhiteSpace(email)) return Task.FromResult(false);
        var existing = _context.ConfirmedEmail.FirstOrDefault(e => e.Email == email.Trim());
        if (existing == null)
        {
            return Task.FromResult(false);
        }
        existing.Confirmed = true;
        existing.UpdateDate = DateTime.UtcNow;
        _context.ConfirmedEmail.Update(existing);
        _context.SaveChanges();
        return Task.FromResult(true);
    }
}
