import { Injectable } from '@nestjs/common';
import { Recipe, RecipeInput } from "@recipe-book/entities";

@Injectable()
export class RecipeService {

    private recipeID = 0;
    private testData: Recipe[] = [
        {
            id: this.recipeID++,
            title: "Toast",
            description: "",
            ingredients: [
                {
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
            this.testData.push(recipe);
            res(recipe);
        });
    }

}
