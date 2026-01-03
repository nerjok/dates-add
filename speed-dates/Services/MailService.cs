using System.Net;
using System.Net.Mail;
using speed_dates.Interfaces;

namespace speed_dates.Services;

public class MailService : IMailService
{
    public MailService()
    {
    }

    public void SendMail(string email, Guid code, string confirmationCode)
    {
        var mailMessage = new MailMessage("from@example.com", email)
        {
            Subject = "Confirm your advertisement email",
            Body = $"<h1>Hello</h1><p>Please confirm advertisement email by clicking on the link <a href=\"http://localhost:5006/confirm?code={code}\">a link</a> ConfirmationCode {confirmationCode}</p>",
            IsBodyHtml = true
        };

        SendEmail(mailMessage);
        System.Console.WriteLine("Sent");
    }

    public void ConfirmEmail(string email, string confirmationCode)
    {
        var mailMessage = new MailMessage("from@example.com", email)
        {
            Subject = "Confirm your email",
            Body = $"<h1>Hello</h1><p>Please confirm email by clicking on the link <a href=\"http://localhost:5006/confirm-message?code={confirmationCode}\">a link</a> ConfirmationCode {confirmationCode}</p>",
            IsBodyHtml = true
        };

        SendEmail(mailMessage);
        System.Console.WriteLine("Sent");
    }

    public void SendMessage(string email, string senderEmail, string content)
    {
        var mailMessage = new MailMessage("pridehub@mail.com", email)
        {
            Subject = "You got a new message",
            ReplyToList = { new MailAddress(senderEmail) },
            Body = $"<h1>Hello</h1><p>{content}</p>",
            IsBodyHtml = true
        };

        SendEmail(mailMessage);
        System.Console.WriteLine("Sent");
    }

    private void SendEmail(MailMessage mailMessage)
    {
        var client = new SmtpClient("sandbox.smtp.mailtrap.io", 2525)
        {
            Credentials = new NetworkCredential("b2337c6573744d", "b7bfee9d8b4640"),
            EnableSsl = true
        };

        client.Send(mailMessage);
    }
}

