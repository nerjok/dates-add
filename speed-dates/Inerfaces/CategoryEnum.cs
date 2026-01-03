
using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace speed_dates.Interfaces;

// public enum Category
// {
//     [EnumMember(Value = "mm")]
//     mm,
//     [EnumMember(Value = "mf")]
//     mf,
//     [EnumMember(Value = "ff")]
//     ff,
//     [EnumMember(Value = "fm")]
//     fm
// }

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum Category
{
    mm,
    mf,
    ff,
    fm
}