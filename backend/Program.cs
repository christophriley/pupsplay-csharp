global using PupsPlay.Api.Models;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using PupsPlay.Api.Endpoints;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(opt =>
    opt.UseSqlite(builder.Configuration.GetConnectionString("Default"))
);

builder.Services.AddScoped<TokenService>();

var jwtSection = builder.Configuration.GetSection("Jwt");
builder
    .Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(opt =>
    {
        opt.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtSection["Issuer"],
            ValidAudience = jwtSection["Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(jwtSection["Secret"]!)
            ),
        };
    });

builder.Services.AddAuthorization();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
        policy.WithOrigins("http://localhost:5173").AllowAnyMethod().AllowAnyHeader()
    );
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
    scope.ServiceProvider.GetRequiredService<AppDbContext>().Database.Migrate();

app.UseCors();
app.UseAuthentication();
app.UseAuthorization();

app.MapAuthEndpoints();
app.MapPetEndpoints();

app.MapGet("/api/hello", () => new { message = "Hello world from PupsPlay!" });

app.Run();

record RegisterRequest(string Email, string Password);

record LoginRequest(string Email, string Password);
