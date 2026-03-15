namespace PupsPlay.Api.Models;

public class Pet
{
    public int Id { get; set; }
    public int OwnerId { get; set; }
    public User Owner { get; set; } = null!;
    public required string Name { get; set; }
    public required string Breed { get; set; }
    public int Age { get; set; }
}
