using speed_dates.Entities;

namespace speed_dates.Interfaces;
    public interface IConfirmedEmailRepository
    {
        public Task<ConfirmedEmail> AddAsync(string email, CancellationToken cancellationToken = default);
        Task<bool> IsConfirmedAsync(string email, CancellationToken cancellationToken = default);
        Task<bool> ConfirmEmailAsync(string email);
    }