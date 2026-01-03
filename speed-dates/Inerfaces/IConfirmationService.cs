using speed_dates.Entities;

namespace speed_dates.Interfaces;

public interface IConfirmationService
{
    Task<bool> SendConfirmationAsync(string email, Guid advertisementId, string confirmationCode);
    Task<bool> VerifyConfirmationAsync(string email, string confirmationCode);

    Task<bool> ConfirmEmailAsync(string email);

    Task<bool> SendMessageAsync(Advertisement advertisement, string content, string senderEmail);

    Task<bool> ConfirmMessageAsync(string confirmationCode);
}