import { Resolver, Args, Int, Query, Mutation } from '@nestjs/graphql';
import { Recipe, RecipeInput } from '@recipe-book/entities';
import { RecipeService } from './recipe.service';

@Resolver()
export class RecipeResolver {
    constructor(private readonly recipeService: RecipeService) {}

    @Query(returns => Recipe, { name: "recipeById"})
    async getRecipeById(@Args("id", { type: () => Int }) id: number): Promise<Recipe> {
        return new Promise<Recipe>((res, rej) => {
            this.recipeService.getById(id).subscribe((recipe: Recipe) => {
                res(recipe);
            });
        });
    }

    @Query(returns => [Recipe], { name: "recipe" })
    async getRecipe(): Promise<Recipe[]> {
        return new Promise<Recipe[]>((res, rej) => {
            this.recipeService.getAll().subscribe((recipes: Recipe[]) => {
                res(recipes);
            });
        });
    }

    @Mutation(returns => Recipe, { name: "addRecipe" })
    async addRecipe(@Args("recipeData") recipeData: RecipeInput) {
        return new Promise<Recipe>((res, rej) => {
            this.recipeService.addRecipe(recipeData).subscribe((recipe: Recipe) => {
                res(recipe);
            });
        });
    }
}
