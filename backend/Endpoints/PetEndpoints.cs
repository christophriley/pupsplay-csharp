using System.Security.Claims;
using Microsoft.EntityFrameworkCore;

namespace PupsPlay.Api.Endpoints;

public static class PetEndpoints
{
    public static void MapPetEndpoints(this WebApplication app)
    {
        app.MapGet("/api/pets", async (AppDbContext db) => await db.Pets.ToListAsync());


        app.MapPost(
                "/api/pets",
                async (CreatePetRequest req, AppDbContext db, ClaimsPrincipal user) =>
                {
                    var userId = int.Parse(
                        user.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "-1"
                    );

                    var pet = new Pet
                    {
                        OwnerId = userId,
                        Name = req.Name,
                        Breed = req.Breed,
                        Age = req.Age,
                    };
                    db.Pets.Add(pet);
                    await db.SaveChangesAsync();
                    return Results.Created($"/api/pets/{pet.Id}", pet);
                }
            )
            .RequireAuthorization();

        app.MapDelete(
                "/api/pets/{id}",
                async (int id, AppDbContext db, ClaimsPrincipal user) =>
                {
                    var userId = int.Parse(
                        user.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "-1"
                    );

                    var pet = await db.Pets.FindAsync(id);
                    if (pet is null)
                        return Results.NotFound();
                    if (pet.OwnerId != userId)
                        return Results.Forbid();

                    db.Pets.Remove(pet);
                    await db.SaveChangesAsync();
                    return Results.NoContent();
                }
            )
            .RequireAuthorization();
    }
}

record CreatePetRequest(string Name, string Breed, int Age);
