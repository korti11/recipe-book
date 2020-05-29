import { Controller } from '@nestjs/common';
import { MessagePattern } from "@nestjs/microservices";
import { RecipeService } from './recipe.service';
import { Recipe } from "@recipe-book/entities";

@Controller('recipe')
export class RecipeController {
    constructor(private readonly recipeService: RecipeService) {}

    @MessagePattern({ cmd: "all" })
    async getAll(): Promise<Recipe[]> {
        return this.recipeService.getAll();
    }

    @MessagePattern({ cmd: "byId" })
    async getById(id: number): Promise<Recipe> {
        return this.recipeService.getById(id);
    }
}
