using Microsoft.EntityFrameworkCore;
using StoreManagementStudio.Server.Models;

var builder = WebApplication.CreateBuilder(args);

// Add Controllers
builder.Services.AddControllers();

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// AutoMapper
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

// Database Connection
builder.Services.AddDbContext<StoreManagementSystemContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("StoreDb")
    )
);

// CORS for React Frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins("https://localhost:8641", "http://localhost:8641")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

var app = builder.Build();

// Swagger
app.UseSwagger();
app.UseSwaggerUI();

app.UseRouting();

// Enable CORS
app.UseCors("AllowFrontend");

// Map API Controllers
app.MapControllers();

// Serve React Frontend
app.UseDefaultFiles();
app.UseStaticFiles();

app.MapFallbackToFile("index.html");

app.Run();