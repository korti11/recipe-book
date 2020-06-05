import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from "@nestjs/microservices";
import { RecipeService } from './recipe.service';
import { Recipe, RecipeInput } from "@recipe-book/entities";

@Controller()
export class RecipeController {
    constructor(private readonly recipeService: RecipeService) {}

    @MessagePattern({ cmd: "all" })
    async getAll(): Promise<Recipe[]> {
        Logger.log("Request for all recipes.");
        return this.recipeService.getAll();
    }

    @MessagePattern({ cmd: "byId" })
    async getById(id: number): Promise<Recipe> {
        Logger.log(`Request for the ID: ${id}.`);
        return this.recipeService.getById(id);
    }

    @MessagePattern({ cmd: "add" })
    async addRecipe(input: RecipeInput): Promise<Recipe> {
        Logger.log(`Add new recipe.`);
        return this.recipeService.addRecipe(input);
    }
}