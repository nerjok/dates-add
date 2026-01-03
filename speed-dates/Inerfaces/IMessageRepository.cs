using speed_dates.Entities;

namespace speed_dates.Interfaces;
    public interface IMessageRepository
    {
        public Task<Message> AddAsync(Message message, CancellationToken cancellationToken = default);
        Task<Message?> GetMessage(Guid messageId, CancellationToken cancellationToken = default);
        Task<Message> ConfirmMessageAsync(string confirmationCode);
    }