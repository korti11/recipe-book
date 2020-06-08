import { Resolver, Args, Int, Query, Mutation } from '@nestjs/graphql';
import { Recipe, RecipeInput, RecipeUpdate, IngredientAdd, IngredientUpdate, IngredientRemove } from '@recipe-book/entities';
import { RecipeService } from './recipe.service';

@Resolver()
export class RecipeResolver {
    constructor(private readonly recipeService: RecipeService) {}

    @Query(returns => Recipe, { name: "recipeById"})
    async getRecipeById(@Args("id", { type: () => String }) id: string): Promise<Recipe> {
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
    async addRecipe(@Args("data") data: RecipeInput) {
        return new Promise<Recipe>((res, rej) => {
            this.recipeService.addRecipe(data).subscribe((recipe: Recipe) => {
                res(recipe);
            });
        });
    }

    @Mutation(returns => Boolean, { name: "removeRecipe" })
    async removeRecipe(@Args("id", { type: () => String }) id: string): Promise<boolean> {
        return new Promise<boolean>((res, rej) => {
            this.recipeService.removeRecipe(id).subscribe((b: boolean) => {
                res(b);
            });
        });
    }

    @Mutation(returns => Recipe, { name: "updateRecipe" })
    async updateRecipe(@Args("data") data: RecipeUpdate): Promise<Recipe> {
        return new Promise<Recipe>((res, rej) => {
            this.recipeService.updateRecipe(data).subscribe((recipe: Recipe) => {
                res(recipe);
            });
        });
    }

    @Mutation(returns => Recipe, { name: "addIngredientToRecipe" })
    async addIngredient(@Args("data") data: IngredientAdd): Promise<Recipe> {
        return new Promise<Recipe>((res, rej) => {
            this.recipeService.addIngredient(data).subscribe((recipe: Recipe) => {
                res(recipe);
            });
        });
    }

    @Mutation(returns => Recipe, { name: "updateIngredientOfRecipe" })
    async updateIngredient(@Args("data") data: IngredientUpdate): Promise<Recipe> {
        return new Promise<Recipe>((res, rej) => {
            this.recipeService.updateIngredient(data).subscribe((recipe: Recipe) => {
                res(recipe);
            });
        });
    }

    @Mutation(returns => Boolean, { name: "removeIngredientOfRecipe" })
    async removeIngredient(@Args("data") data: IngredientRemove): Promise<boolean> {
        return new Promise<boolean>((res, rej) => {
            this.recipeService.removeIngredient(data).subscribe((b: boolean) => {
                res(b);
            });
        });
    }
}
