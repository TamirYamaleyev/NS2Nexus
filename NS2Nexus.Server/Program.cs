using NS2Nexus.Server.BLL.Interfaces;
using NS2Nexus.Server.BLL.Logic;
using NS2Nexus.Server.DAL.Interfaces;
using NS2Nexus.Server.DAL.Repositories;
using NS2Nexus.Server.Models;
using System.Text.Json.Serialization;

namespace NS2Nexus.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            var corsPolicyName = "AllowAllOrigins";
            builder.Services.AddCors(options =>
            {
                options.AddPolicy(corsPolicyName,
                    builder =>
                    {
                        builder.AllowAnyOrigin()
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                    });
            });

            builder.Logging.AddConsole();
            builder.Logging.AddDebug();

            // Add services to the container.
            builder.Services.AddDbContext<Ns2nexusContext>();
            builder.Services.AddScoped<IUserLogic, UserLogic>();
            builder.Services.AddScoped<IPlayerLogic, PlayerLogic>();
            builder.Services.AddScoped<IRoundLogic, RoundLogic>();
            builder.Services.AddScoped<IEntityBaseRepository<User>, EntityBaseRepository<User>>();
            builder.Services.AddScoped<IEntityBaseRepository<Player>, EntityBaseRepository<Player>>();
            builder.Services.AddScoped<IEntityBaseRepository<PlayerStats>, EntityBaseRepository<PlayerStats>>();
            builder.Services.AddScoped<IEntityBaseRepository<ClassPlaytime>, EntityBaseRepository<ClassPlaytime>>();
            builder.Services.AddScoped<IEntityBaseRepository<KillFeed>, EntityBaseRepository<KillFeed>>();
            builder.Services.AddScoped<IEntityBaseRepository<RoundPlayerStats>, EntityBaseRepository<RoundPlayerStats>>();
            builder.Services.AddScoped<IEntityBaseRepository<RoundInfo>, EntityBaseRepository<RoundInfo>>();

            // Configure JSON options to handle cycles
            builder.Services.AddControllers()
                .AddJsonOptions(options =>
                {
                    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve;
                    options.JsonSerializerOptions.WriteIndented = true;
                });

            // Configure SSL certificate validation
            builder.Services.AddHttpClient("YourHttpClient")
                .ConfigurePrimaryHttpMessageHandler(() => new HttpClientHandler
                {
                    ServerCertificateCustomValidationCallback = (sender, certificate, chain, sslPolicyErrors) => true
                });

            var app = builder.Build();

            app.UseCors(corsPolicyName);

            app.UseDefaultFiles();
            app.UseStaticFiles();

            var logger = app.Logger;
            logger.LogInformation("Application started.");

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.MapGet("/", () => "Hello World");

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();

            app.MapFallbackToFile("/index.html");

            app.Run();
        }
    }
}
