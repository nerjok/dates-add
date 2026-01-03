using Microsoft.EntityFrameworkCore;
using MyApi.Models;
using speed_dates.Entities;
using speed_dates.Interfaces;

namespace speed_dates.Repositories;

public class MessageRepository : IMessageRepository
{

    private readonly ApiDbContext _context;

    public MessageRepository(ApiDbContext context)
    {
        _context = context;
    }

    public async Task<Message> AddAsync(Message message, CancellationToken cancellationToken = default)
    {
        var messageEntity = _context.Messages.Add(message);
        await _context.SaveChangesAsync();
        return messageEntity.Entity;
    }

    public async Task<Message?> GetMessage(Guid messageId, CancellationToken cancellationToken = default)
    {
        var message = await _context.Messages.FirstOrDefaultAsync(m => m.Id == messageId);
        return message;
    }

    public async Task<Message> ConfirmMessageAsync(string confirmationCode)
    {
        var message = await _context.Messages.FirstOrDefaultAsync(m => m.ConfirmationCode == confirmationCode);
        var isCorrectDate = message?.UpdateDate >= DateTime.UtcNow.AddDays(-1);
        if (message == null || !isCorrectDate)
        {
            return null;
        }
        message.Confirmed = true;
        await _context.SaveChangesAsync();
        return message;
    }

}
