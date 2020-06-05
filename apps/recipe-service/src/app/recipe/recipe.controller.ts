import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from "@nestjs/microservices";
import { RecipeService } from './recipe.service';
import { Recipe, RecipeInput, RecipeUpdate, IngredientAdd, IngredientUpdate, IngredientRemove } from "@recipe-book/entities";

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

    @MessagePattern({ cmd: "remove" })
    async removeRecipe(id: number): Promise<boolean> {
        Logger.log(`Request to remove recipe with ID: ${id}`);
        return this.recipeService.removeRecipe(id);
    }

    @MessagePattern({ cmd: "update" })
    async updateRecipe(input: RecipeUpdate): Promise<Recipe> {
        Logger.log(`Request to update recipe with ID: ${input.id}`);
        return this.recipeService.updateRecipe(input);
    }

    @MessagePattern({ cmd: "addIngredient" })
    async addIngredient(input: IngredientAdd): Promise<Recipe> {
        Logger.log(`Request to add ingredient to recipe with ID: ${input.recipeId}`);
        return this.recipeService.addIngredient(input);
    }

    @MessagePattern({ cmd: "updateIngredient" })
    async updateIngredient(input: IngredientUpdate): Promise<Recipe> {
        Logger.log(`Request to update ingredient with ID: ${input.ingredientId} on recipe with ID: ${input.recipeId}`);
        return this.recipeService.updateIngredient(input);
    }

    @MessagePattern({ cmd: "removeIngredient" })
    async removeIngredient(input: IngredientRemove): Promise<boolean> {
        Logger.log(`Request to remove ingredient with ID: ${input.ingredientId} on recipe with ID: ${input.recipeId}`);
        return this.recipeService.removeIngredient(input);
    }
}
