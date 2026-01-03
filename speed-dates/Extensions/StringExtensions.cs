using System.Security.Cryptography;
using System.Text;

namespace speed_dates.Extensions;

public static class StringExtensions
{
    public static string Truncate(this string value, int maxLength)
    {
        if (string.IsNullOrEmpty(value)) return value;
        return value.Length <= maxLength ? value : value.Substring(0, maxLength);
    }

    public static string ToHash6(this string input)
    {
        if (string.IsNullOrEmpty(input))
            return string.Empty;

        using var sha = SHA256.Create();
        var hash = sha.ComputeHash(Encoding.UTF8.GetBytes(input));

        return Convert.ToBase64String(hash)
            .Replace("+", "-")
            .Replace("/", "_")
            .Replace("=", "")
            .Substring(0, 6);

    }
}