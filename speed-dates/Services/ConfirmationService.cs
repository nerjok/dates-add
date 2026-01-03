using speed_dates.Entities;
using speed_dates.Extensions;
using speed_dates.Interfaces;

namespace speed_dates.Services;

public class ConfirmationService : IConfirmationService
{
    private readonly IConfirmedEmailRepository _confirmedEmailRepository;
    private readonly IMessageRepository _messageRepository;
    public IConfirmedEmailRepository ConfirmedEmailRepository => _confirmedEmailRepository;
    public IMessageRepository MessageRepository => _messageRepository;
    private readonly IMailService _mailService;

    public ConfirmationService(IConfirmedEmailRepository confirmedEmailRepository, IMessageRepository messageRepository, IMailService mailService)
    {
        _confirmedEmailRepository = confirmedEmailRepository ?? throw new System.ArgumentNullException(nameof(confirmedEmailRepository));
        _messageRepository = messageRepository;
        _mailService = mailService;
    }
    public async Task<bool> SendConfirmationAsync(string email, Guid advertisementId, string confirmationCode)
    {
        var isConfirmed = await _confirmedEmailRepository.IsConfirmedAsync(email);
        if (isConfirmed != true)
        {
            var emailDto = await _confirmedEmailRepository.AddAsync(email);

            if(emailDto == null)
            {
                throw new Exception("Could not create confirmed email record.");
            }
             _mailService.SendMail(email, advertisementId, confirmationCode);

            return false;
        }

        return true;
    }

    public async Task<bool> ConfirmEmailAsync(string email)
    {
        var result = await _confirmedEmailRepository.ConfirmEmailAsync(email);
        return result;
    }

    public async Task<bool> VerifyConfirmationAsync(string email, string confirmationCode)
    {
        // TODO: Implement confirmation verification logic
        await Task.Delay(0);
        return true;
    }

    public async Task<bool> SendMessageAsync(Advertisement advertisement, string content, string senderEmail)
    {
        var email = await _confirmedEmailRepository.AddAsync(senderEmail);
        if (email.Confirmed != true)
        {
            await _messageRepository.AddAsync(new Message
            {
                SenderEmail = senderEmail,
                ReceiverEmail = advertisement.Email,
                Content = content,
                Confirmed = false,
                ConfirmationCode = email.Email.ToHash6()
            });
            _mailService.ConfirmEmail(advertisement.Email, email.Email.ToHash6());
            return false;
        }
        _mailService.SendMessage(advertisement.Email, senderEmail, content);
        return true;
    }

    public async Task<bool> ConfirmMessageAsync(string confirmationCode)
    {
        var result = await _messageRepository.ConfirmMessageAsync(confirmationCode);

        if(result == null || result.Confirmed == true)
        {
            return false;
        }
        await _confirmedEmailRepository.ConfirmEmailAsync(result.SenderEmail);
        _mailService.SendMessage(result.ReceiverEmail, result.SenderEmail, result.Content);
        return true;
    }
}
