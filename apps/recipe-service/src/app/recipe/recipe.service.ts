import { Injectable } from '@nestjs/common';
import { Recipe, RecipeInput, RecipeUpdate, Ingredient, IngredientAdd, IngredientUpdate, IngredientRemove } from "@recipe-book/entities";

@Injectable()
export class RecipeService {

    private recipeID = 0;
    private ingredientID = 0;
    private testData: Recipe[] = [
        {
            id: this.recipeID++,
            title: "Toast",
            description: "",
            ingredients: [
                {
                    id: this.ingredientID++,
                    name: "Toast",
                    amount: 1,
                    unit: "Stk."
                }
            ]
        }
    ];

    async getAll(): Promise<Recipe[]> {
        return new Promise<Recipe[]>((res, rej) => {
            res(this.testData);
        });     // mock for testing. Later MongoDB connection.
    }

    async getById(id: number): Promise<Recipe> {
        return new Promise<Recipe>((res, rej) => {
            res(this.testData.filter(recipe => recipe.id === id)[0]);
        });
    }

    async addRecipe(input: RecipeInput): Promise<Recipe> {
        return new Promise<Recipe>((res, rej) => {
            let recipe: Recipe = input as Recipe;
            recipe.id = this.recipeID++;
            recipe.ingredients.forEach((i) => i.id = this.ingredientID++);
            this.testData.push(recipe);
            res(recipe);
        });
    }

    async removeRecipe(id: number): Promise<boolean> {
        return new Promise<boolean>((res, rej) => {
            let newData: Recipe[] = this.testData.filter((r) => r.id !== id);
            let removed: boolean = newData.length < this.testData.length;
            this.testData = newData;
            res(removed);
        });
    }

    async updateRecipe(data: RecipeUpdate): Promise<Recipe> {
        return new Promise<Recipe>((res, rej) => {
            let recipe: Recipe = this.testData.filter((r) => r.id === data.id)[0];
            recipe.title = data.title ?? recipe.title;
            recipe.description = data.description ?? recipe.description;
            res(recipe);
        });
    }

    async addIngredient(data: IngredientAdd): Promise<Recipe> {
        return new Promise<Recipe>((res, rej) => {
            let recipe: Recipe = this.testData.filter((r) => r.id === data.recipeId)[0];
            let ingredient: Ingredient = data.ingredient as Ingredient;
            ingredient.id = this.ingredientID++;
            recipe.ingredients.push(ingredient);
            res(recipe);
        });
    }

    async updateIngredient(data: IngredientUpdate): Promise<Recipe> {
        return new Promise<Recipe>((res, rej) => {
            let recipe: Recipe = this.testData.filter((r) => r.id === data.recipeId)[0];
            let ingredient: Ingredient = recipe.ingredients.filter((i) => i.id === data.ingredientId)[0];
            ingredient.name = data.name ?? ingredient.name;
            ingredient.amount = data.amount ?? ingredient.amount;
            ingredient.unit = data.unit ?? ingredient.unit;
            res(recipe);
        });
    }

    async removeIngredient(data: IngredientRemove): Promise<boolean> {
        return new Promise<boolean>((res, rej) => {
            let recipe: Recipe = this.testData.filter((r) => r.id === data.recipeId)[0];
            let newIngredients: Ingredient[] = recipe.ingredients.filter((i) => i.id !== data.recipeId);
            let removed: boolean = newIngredients.length < recipe.ingredients.length;
            recipe.ingredients = newIngredients;
            res(removed);
        });
    }

}
