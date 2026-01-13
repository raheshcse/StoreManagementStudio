using Microsoft.EntityFrameworkCore;
using StoreManagementStudio.Server.Models;

var builder = WebApplication.CreateBuilder(args);

// Controllers
builder.Services.AddControllers();

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// AutoMapper
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

// DbContext
builder.Services.AddDbContext<StoreManagementSystemContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("StoreDb"))
);

// CORS (React dev server)
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", policy =>
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod());
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();



app.UseRouting();

app.UseCors("CorsPolicy");

app.UseAuthorization();

// Map controllers
app.MapControllers();



app.Run();
