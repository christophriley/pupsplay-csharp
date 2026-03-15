using Microsoft.EntityFrameworkCore;
using BC = BCrypt.Net.BCrypt;

namespace PupsPlay.Api.Endpoints;

public static class AuthEndpoints
{
    public static void MapAuthEndpoints(this WebApplication app)
    {
        app.MapPost(
            "/api/auth/register",
            async (RegisterRequest req, AppDbContext db, TokenService tokens) =>
            {
                if (await db.Users.AnyAsync(u => u.Email == req.Email))
                    return Results.Conflict(new { error = "Email already in use." });

                var user = new User
                {
                    Email = req.Email,
                    PasswordHash = BC.HashPassword(req.Password),
                };
                db.Users.Add(user);
                await db.SaveChangesAsync();

                return Results.Ok(new { token = tokens.Generate(user) });
            }
        );

        app.MapPost(
            "/api/auth/login",
            async (LoginRequest req, AppDbContext db, TokenService tokens) =>
            {
                var user = await db.Users.FirstOrDefaultAsync(u => u.Email == req.Email);
                if (user is null || !BC.Verify(req.Password, user.PasswordHash))
                    return Results.Unauthorized();

                return Results.Ok(new { token = tokens.Generate(user) });
            }
        );
    }
}
