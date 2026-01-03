namespace speed_dates.Interfaces;

public interface IMailService
{
    public void SendMail(string email, Guid code, string confirmationCode);
    public void SendMessage(string email, string senderEmail, string content);
    public void ConfirmEmail(string email, string confirmationCode);
}