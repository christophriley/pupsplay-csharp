namespace PupsPlay.Api.Models;

public class Pet
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string Breed { get; set; }
    public required int Age { get; set; }
}