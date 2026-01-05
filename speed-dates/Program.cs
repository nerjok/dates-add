using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using MyApi.Models;
using speed_dates.Interfaces;
using speed_dates.Repositories;
using speed_dates.Services;

var builder = WebApplication.CreateBuilder(args);


var connString = "";
var DevelopmentCORS = "_myAllowSpecificOrigins";

connString = builder.Configuration.GetConnectionString("SampleDbConnection");


builder.Services.AddDbContext<ApiDbContext>(opt =>
    opt.UseNpgsql(connString));


builder.Services.AddScoped<IAdvertisementRepository, AdvertisementRepository>();

builder.Services.AddScoped<IMailService, MailService>();

builder.Services.AddScoped<IConfirmedEmailRepository, ConfirmedEmailRepository>();
builder.Services.AddScoped<IMessageRepository, MessageRepository>();
builder.Services.AddScoped<IConfirmationService, ConfirmationService>();


builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: DevelopmentCORS,
                      policy =>
                      {
                          policy.WithOrigins(
                                  "http://192.168.0.103:5006",
                                  "http://localhost:5173",
                                  "http://localhost:3000",
                                  "http://localhost:5006",
                                  "http://localhost:8080")
                                .AllowAnyMethod()
                                .WithHeaders("Content-Type", "Authorization");
                      });
});

if (builder.Environment.IsProduction())
{
    builder.WebHost.ConfigureKestrel(options =>
    {
        // HTTP
        options.ListenAnyIP(8080);

        // HTTPS
        options.ListenAnyIP(443, listenOptions =>
        {
            listenOptions.UseHttps("/https/aspnet.pfx", "phub");
        });
    });
}


var app = builder.Build();




if (builder.Environment.IsDevelopment())
{
    app.UseCors(DevelopmentCORS);
}

app.MapControllers();

app.MapGet("/kk", () => "Hello World!");


// fallback to front app
app.Use(async (context, next) =>
{
    if (!Path.HasExtension(context.Request.Path.Value))
    {
        var fileProvider = new PhysicalFileProvider(
        Path.Combine(Directory.GetCurrentDirectory(), "wwwroot")
        );
        var filename = context.Request.Path.Value!.TrimStart('/') ?? "index";
        var file = fileProvider.GetFileInfo(filename + ".html"); // root index.html
        if (file.Exists)
        {
            context.Request.Path = $"/{filename}.html";
        }
        else
        {
            context.Request.Path = "/index.html";
        }
    }

    await next();
});

// Client app static files
app.UseStaticFiles();
app.UseDefaultFiles();

// Run migrations Before starting the app
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
try
{
    var context = services.GetRequiredService<ApiDbContext>();
    await context.Database.MigrateAsync();
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occurred during migration");
}

app.Run();

