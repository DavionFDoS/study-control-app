﻿using Backend.Database;
using Backend.Extensions;
using Microsoft.EntityFrameworkCore;

namespace Backend.EndpointDefinitions;

public class SubjectCardEndpointDefinition : IEndpointDefinition
{
    private WebApplication app;

    public void DefineEndpoints(WebApplication app)
    {
        this.app = app;
        this.app.MapGet("/api/subjectcards", async (StudyControlDbContext dbContext) => Results.Json(await GetAllItems(dbContext))).RequireCors("allowAny");
        this.app.MapPut("/api/subjectcards", async (SubjectCardRequestBody body, StudyControlDbContext dbContext) => await AddNewItem(body, dbContext)).RequireCors("allowAny");
        this.app.MapDelete("/api/subjectcards/{id}", async (int id, StudyControlDbContext dbContext) =>
        {
            var subjectCard = await dbContext.SubjectCards.SingleOrDefaultAsync(x => x.SubjectCardId == id);

            if(subjectCard is null)
            {
                return Results.NotFound();
            }

            dbContext.SubjectCards.Remove(subjectCard);
            await dbContext.SaveChangesAsync();

            return Results.Ok();
        }).RequireCors("allowAny");
    }

    public void DefineServices(IServiceCollection services) {}

    private async Task<List<SubjectCard>> GetAllItems(StudyControlDbContext dbContext)
    {
        return await dbContext.SubjectCards.ToListAsync();
    }

    private async Task AddNewItem(SubjectCardRequestBody body, StudyControlDbContext dbContext)
    {
        var subjectCard = new SubjectCard()
        {
            SubjectName = body.SubjectName,
            TeacherName = body.TeacherName,
        };

        await dbContext.AddAsync(subjectCard);
        await dbContext.SaveChangesAsync();
    }
}
